mandarinJS
==========

A ridiculously lightweight CSS animation class.

to use:

   var an2 = new Mandarin ("myDiv") ; // dom element to animate
        an2.addAnim (0, {scale:.3,x:100,y:100})\n
        an2.addAnim (.7, {scale:.4,x:140,y:100})
        an2.addAnim(1.1, {scale:1 ,x:200,y:200,alpha:1,rotation:-2,ease:"ease-out"});
        an2.addAnim(1, {rotation:-4,ease:"ease-in-out"});
        an2.addAnim(1, {scale:22,ease:"ease-in"});
        an2.startAnim();
