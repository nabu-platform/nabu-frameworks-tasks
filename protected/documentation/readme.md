# Known issues

- DDL synchronization does not work yet with affixes, so if you are using affixes for your task tables,
	- the task framework will deduce wrongly that the tables are not in sync
	- as a workaround you can create an explicit configuration of the connection, which will make sure it is picked up

# Human workflow

- create (can optionally assign a target)
- start: someone picks up the task to start working on it, owner is set to the user. other people can not pick up the task
- once started you can "stop" (with succeeded or failed) or "release" 

# Block window

Sometimes you don't want tasks to be executed during a specific period. E.g. no tasks between midnight and 5 AM (because other systems have downtime), no tasks in the weekend etc.
To this end you can configure one or more block windows.

How it works is: the schedule is calculated as per usual (run in, run at, according to queue schedule, task schedule, or no scheduled at all which means "now").
If the end result falls within a block period, it will be moved to the end of the block period.

For example if we submit a task with no schedule on a saturday and the weekend is blocked, it will be scheduled at midnight monday morning: the first available moment after the block period.

Syntax for the block period is the same as a regular schedule syntax but followed by a duration. Use ";" separation to list multiple:

For example:

```
* * 0 PT5H;* * * * * * P2D
```

The first block is for anything between midnight and 5, the second block is for the weekend.

# Performance

Important index for querying tasks per queue:

create index idx_tasks_queue on tasks(task_queue_id);

To get the logs on a task:

create index idx_task_logs_task_id on task_logs(task_id)


CREATE INDEX idx_task_task_queue ON tasks(task_queue_id, "state", scheduled, task_type, owner, target, created);
CREATE INDEX idx_task_queues_name_state ON task_queues(name, "state");

# Timezones

By default the task framework will calculate the next run in the timezone of the server.
So suppose your server is set to UTC, the numbers you enter in the scheduler format (e.g. * * 10,12,14,16,18,20,22 * * * *) will be interpreted in UTC. So that is 10 in the morning UTC time.

This can be counterintuitive and potentially environment specific and servers may not be in line with expectations so there is a server-wide override: "nabu.tasks.timezone". If set, this will be the default timezone schedulers are calculated in.

# Queue

## Transactions

Transactions are a complex thing when it comes to queueing. For example what use is kickstarting the task executor if your root service uses a default transaction that has to wait for all publishing to be done?

Some concurrency issues with for example queue dependencies also require finegrained transaction control.

For that reason, if you do _not_ pass in an explicit transaction, the services will manage their own transactions in general!

This still allows for complex transactional usecases but only explicit ones, not default ones.

## State

ACTIVE: the queue is active
PAUSED: the queue is paused, likely due to an error
WAITING: the queue is waiting until another queue is done
FINISHED: the queue is done

## Concurrency

### Serial

If concurrency is set to 0, only one consumer can work on the queue at any time. You must first get a cluster-wide lock before you can even approach the queue.

Note that when we serially process a queue and the server suddenly halts, the cluster wide lock is released and another server picks it up.
It is his duty to first reset the running task (there should only be one) knowing that the previous server must have failed seeing as the lock is gone.

(Note that there is an edge case for split brain)

**Important**: if you publish scheduled tasks to a "serial" queue, they will only be considered for the queue once the schedule triggers, that means they are effectively not part of the serialness.
In other words, a task scheduled in the far future will not block other earlier tasks on a concurrency=0 queue.

If you need serial processing in the future, you could submit all the tasks with the same or incremental timestamps, once the time-constraint is fulfilled, the tasks become part of the serial queue again.

### Parallel

If concurrency is larger, we take on local locks per task that is running, for example if we can run 2 tasks at once, we lock "queue-id-1" and "queue-id-2" locally.

If either can be locked, we retrieve a task, otherwise we skip to the next queue. If a task is processed for a queue, we start a new scan only for that queue to see if we can continue processing. If not we release the lock.

To prevent double pickup of a task, suppose we hava concurrency of 2, we pick up 2 tasks and submit them for execution.
First step in execution is to (in a separate transaction) update the task where the task still has the state WAITING. If this fails (update count == 0) then we assume someone else picked it up and immediately chain a new task for execution (if any).

Assuming tasks take "some" amount of time, this means servers will hop over one another finishing tasks.

## Scheduled timestamps

If there is no scheduled timestamp provided and the queue has no schedule, we use the database timestamp to fill it up.
This is specifically the database timestamp and _not_ the application server timestamp because to select tasks we also compare against the database timestamp.

# Task

## State

STAGED: the task is staged but not yet part of the actual queue, it is likely awaiting an external trigger to start it
CREATED: the task is published but requires someone to pick it up and start it
WAITING: the task is picked up but awaiting processing
RUNNING: the task is being processed
SUCCEEDED: the task was run successfully
ERROR: the task failed and a decision has to be made about it (retry or set to failed)
TRANSIENT_ERROR: a transient error which will automatically be retried by the system up to a max time
FAILED: a permanent failure
CANCELLED: task is no longer necessary

# Human task

Human tasks can also be modelled in tasks, they use all the same fields but sometimes in slightly different ways. Human tasks are mostly a standardized way to use tasks and as such it is captured in this framework. Other frameworks (like process engine, cms,...) may build upon this for their respective issues (e.g. state management, security,...)

Note that the state model of a human task in the task system is limited to a subset of the states of a regular service task:

CREATED: the task is published but requires someone to pick it up and start it
RUNNING: a user has picked up the task and is working on it, this prevents the same task from being picked up multiple times in case it takes a while
SUCCEEDED: the task was completed successfully
FAILED: the task was completed but with a failed state (e.g. rejected)
CANCELLED: task is no longer necessary, should only be triggered from the system that created it (?)

You can "release" a human task which effectively rolls it back, this allows someone else to pick it up