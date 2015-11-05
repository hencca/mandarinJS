var Mandarin = function (name) {

    var styleSheet = document.createElement('style')
    document.head.appendChild(styleSheet)


        Mandarin.objectsContainer = Mandarin.objectsContainer ? Mandarin.objectsContainer : [];

        Mandarin.pauseAll = function () {

            var c = Mandarin.objectsContainer;
            for(var i = 0; i <  c.length; i++) {
                c[i].pause();
            }

        };


        Mandarin.resumeAll = function () {

            var c = Mandarin.objectsContainer;
            for(var i = 0; i <  c.length; i++) {
                c[i].resume();
            }

        };


        Mandarin.startOver = function () {

            var c = Mandarin.objectsContainer;
            for(var i = 0; i <  c.length; i++) {
                c[i].startOver();

            }

            Mandarin.resumeAll();

        };



        var animObject = {};


        var animNum = 0;

        var n_name = name;

        var animElement = document.getElementById(name);

        animObject.animElement = animElement;

        // add the DOM object to array, for future use
        Mandarin.objectsContainer.push(animObject);




        animElement.style.position = "absolute";

        var animation_text = "animation";
        var transform_text = "transform";
        var animationDelay_text = "animationDelay";
        var browserPrefix = "";


        if (animElement.style.webkitAnimation !== undefined) { // webkit
            animation_text = "webkitAnimation";
            animationDelay_text = "webkitAnimationDelay";
            browserPrefix = "-webkit-";
            transform_text = "webkitTransform";

        }

        var animSquence = [];
        var easingSequence = [];
        var animationTime = [];
        var animationDelay = [0];




        var y = 0;
        var x = 0;
        var rotation = 0;
        var scale = 1;
        var alpha = 1;
        var ease = "ease-out"
        var delayNum = 0;


    // just set it someweher without animating
    animObject.set = function (obj) {

        this.addAnim(0,obj);

        return animObject;

    };


    animObject.pause = function () {
        animElement.style.webkitAnimationPlayState="paused";
        animElement.style.animationPlayState="paused";
        return animObject;
    }

    animObject.resume = function () {
        animElement.style.webkitAnimationPlayState="running";
        animElement.style.animationPlayState="running";
        return animObject;
    }


    animObject.wait = function(time) {
        this.addAnim(time,{});

        return animObject;

    }



        animObject.addAnim = function (time, obj) {


            var animationName = "animationMaker" + n_name + "_" + animNum;
            animObject.animationName = animationName;
            animationDelay.push(time);
            animationTime.push(time);

            //scale, rotate, alpha, x, y;

            var sec = "{0% {} 100% {}}";

            if (obj) {

                var percent0 = "";
                var percent100 = "";

                //delay
                delayNum = (obj.delay !== undefined) ? obj.delay : 0;
                //animationDelay[animNum]+= 1;
                //easing
                ease = (obj.ease !== undefined) ? obj.ease : "linear";


                // y
                percent0 += "top:" + y + "px; ";
                y = (obj.y !== undefined) ? obj.y : y;
                percent100 += "top:" + y + "px; ";


                //x
                percent0 += "left:" + x + "px; ";
                x = (obj.x !== undefined) ? obj.x : x;
                percent100 += "left:" + x + "px; ";


                // transform 0%


                var transform = "translate(" + (-animElement.clientWidth * .5) + "px," + (-animElement.clientHeight * .5) + "px)";
               // var transform = "";
               // var transform = "transform-origin: 50% 50%; ";
                //var transform = "translate(500px,0 ) ";
                //var transform = "";
                //rotation 0%
                transform += " rotate(" + rotation + "deg) ";

                //scale
                transform += "scale(" + scale + "," + scale + ") ";
                percent0 += browserPrefix + "transform:" + transform + ";";


                scale = (obj.scale !== undefined) ? obj.scale : scale;
                rotation = (obj.rotation !== undefined) ? obj.rotation : rotation;


                // 100%
                transform = "translate(" + (-animElement.clientWidth * .5) + "px," + (-animElement.clientHeight * .5) + "px)";
               // transform = "";
                transform += "rotate(" + rotation + "deg) ";
                //scale
                transform += "scale(" + scale + "," + scale + ") ";
                percent100 += browserPrefix + "transform:" + transform + ";";


                //alpha
                percent0 += "opacity:" + alpha + "; ";
                alpha = (obj.alpha !== undefined) ? obj.alpha : alpha;
                percent100 += "opacity:" + alpha + "; ";


                sec = "{0%{" + percent0 + "} 100% {" + percent100 + "} }";


                //x = obj.x;

            }

            var keyframes = "@" + browserPrefix + "keyframes " + animationName + " " + sec;
            easingSequence.push(ease);
            animSquence.push(animationName);

            //alert(animationName);




           styleSheet.sheet.insertRule(keyframes, 0);

            //document.styleSheets[0].insertRule(keyframes, 0);

            animNum++;

            return animObject;
        }









        animObject.startOver = function () {

            animElement.className = "";
            var that = animObject;

            setTimeout(function () {
                animElement.style.webkitAnimationPlayState="running";
                animElement.style.animationPlayState="running";
                animElement.className += " " + that.animationName + "_class";
            }, 10)

            return animObject;
        }

        animObject.startAnim = function () {
            var str1 = "";
            var str2 = "";
            var delay = 0;
            for (var i = 0; i < animSquence.length; i++) {
                str1 += animSquence[i] + " " + animationTime[i] + "s " + easingSequence[i];
                if (i != animSquence.length - 1) str1 += ",";
                delay += animationDelay[i];
                str2 += delay + "s";
                if (i != animSquence.length - 1) str2 += ",";

            }





            styleSheet.sheet.insertRule("." + animObject.animationName + "_class {" + browserPrefix + "animation:" + str1 + "; " + browserPrefix + "animation-delay:" + str2 + "; " + browserPrefix + "animation-fill-mode:forwards}", 0);
            animElement.className += " " + animObject.animationName + "_class";



            animObject.str1 = str1;
            animObject.str2 = str2;
            return animObject;

        }

        return animObject;

}
