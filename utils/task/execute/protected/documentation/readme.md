In the initial version the executor would try to subscribe a single task.
However, it would reuse the same cluster locks as the startup service uses.

And not only are the locks reentrant (you need to unlock as many times as you lock) but apparently it also has to happen in the same order?