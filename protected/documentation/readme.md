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

WAITING: the task is published but requires someone to pick it up and start it
RUNNING: the task is being processed
SUCCEEDED: the task was run successfully
ERROR: the task failed and a decision has to be made about it (retry or set to failed)
FAILED: a permanent failure
