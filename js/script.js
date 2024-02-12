const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function landingPageAnim(){
    var tl = gsap.timeline();
    tl.from("#nav",{
        y:'+25',
        opacity:0,
        duration: 1,
        ease: Expo.easeInOut
    })

        .to(".boundingElem", {
            y: 0,
            ease: Expo.easeInOut,
            duration: 2,
            stagger: .1
        })

        .to(".boundingElemUP", {
            y: 0,
            ease: Expo.easeInOut,
            duration: 1,
            delay:-1.2,
            stagger:.2
        });

        tl.from("#landingPageFooter",{
            y:'-1',
            opacity:0,
            duration: 1,
            delay: -.5,
            ease: Expo.easeInOut
        }); 
}

function mouseSkew(){
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function(dets){
        xscale = gsap.utils.clamp(.8, 1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(.8, 1.2, dets.clientY- yprev);

        xprev = dets.clientX;
        yprev = dets.clientY;


        mouseCursorFollower(xscale , yscale);
    });
}

mouseSkew();

function mouseCursorFollower(xscale , yscale){
    window.addEventListener("mousemove", function(dets){
        document.querySelector("#cursorFollower").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale} , ${yscale}`;
    });
}



mouseCursorFollower();
landingPageAnim();


document.querySelectorAll(".elem").forEach(function(elem){
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mouseleave", function(details) {

        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
        }); 
    });


    elem.addEventListener("mousemove", function(details) {
        var diff = details.clientY - elem.getBoundingClientRect.top;
        diffrot = details.clientX - rotate;
        rotate = details.clientX;

        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: details.clientX,
            rotate : gsap.utils.clamp(-20,20 , diffrot)
        }); 
    });
});