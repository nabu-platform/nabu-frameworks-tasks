When we tell a queue to subscribe, it will take the first available task. If tasks are scheduled in the past, they are not necessarily picked up first, they are simply queued with other tasks.
This means a task could be scheduled in the past.

Additionally, depending on the parallel settings and resources in use by other unrelated queues, it might take a while to get to that scheduled task.

In the past we always took the "oldest" scheduled and waited for that, but if there was a backlog of scheduled tasks, the checker would go into an endless loop trying to get it started.
Now we only wait for tasks scheduled in the future though we do log tasks that are scheduled in the past as this most likely points to a resource problem or an overloaded queue.

Note that this should only occur if the queue is actually already processing a task which means when that task ends, it will trigger an interrupt and kickstart this checker anyway, so there should be no need to wait for past scheduled tasks.