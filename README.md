mandarinJS
==========

A ridiculously lightweight CSS animation class.

new in version v1.1

Chaining:
Mandarin("myDiv").set({x:500,y:600}).wait(1.6).addAnim(1,{rotation:20,x:0}).wait(1).addAnim(1,{rotation:180,x:900}).startAnim();

.set() method, just set the values without animating

.wait(senconds)  will wait that number of seconds

.pause()

.reume()

 Mandarin.pauseAll();
pauses all instances


 Mandarin.resumeAll();
resumes all instances