This service will calculate the next instance of each scheduled task and add it to the queue if it is not there yet

Important: suppose you have a single scheduler to run every 10 seconds without overlap, we "can" get this behavior:

00: next run is 10, does not exist yet so insert
...sleep until 10
10: next run is 20: depending on how fast the task executor is, the 10 entry has been processed or not
	if not processed and overlap is false, we will _not_ insert the 20, instead going to sleep until 20
20: next run is 30: the 10 is done, so insert 30

In the end we get a 20s interval. This means if we don't create the next instance because of allow overlap, we should reschedule a little bit before the next run
That means we start up a bit earlier, the 10 run should be done, the 20 run can be inserted
The only downside is we will trigger at say 19.9, insert for 20, then wake up at 20 again. We have no way of knowing whether we were in an overlap situation.
Depending on the situation, this can mean that the scheduler can trigger twice _every_ time if you are unlucky.

Alternatively if we actually insert a next run into the database, we could calculate the run after that and sleep until a bit before then.
Define "a bit" though, if we take for example 100ms with the deviation of the sleep time and perhaps heavy load, we might skip right past the next schedule due to delays in calculation.

We could trigger the scheduler if a scheduled task is finished. This ensures that the task is done and overlapping is not an issue. This means however we definitely always get dual runs for the scheduler.

unless if we have overlap set to false and there is still a task waiting, we drop the "earliest" from the output, it is not taken into account
knowing that the scheduler will wake up if the task ends

why wake up at all if done tasks trigger scheduler? can still do _with_ overlap