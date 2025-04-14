
// menu page1
document.addEventListener("DOMContentLoaded", function () {
  const menu = document.querySelector("#nav i");
  const close = document.querySelector("#full h2");

  if (!menu || !close) {
    console.error("Menu या Close नहीं मिला!");
    return;
  }

  menu.addEventListener("click", function () {
    gsap.to("#full", {
      right: 0,
      duration: 0.5,
      opacity: 1,
      ease: "power2.out",
    });
    var tl = gsap.timeline()
    
    tl.to("#amg h3,#iconsss i,#amg button",{
     opacity: 1,
     stagger : 0.3
    })
  
    tl.to(".day-box", {
      y: 0,
      opacity: 1,
      duration: 0.4,
  //     delay: 2,
      ease: "power2.out",
      stagger: 0.1,
    });
   tl.to(".day-box",{
       x: -800,
       duration: 0.6,
       delay: 2,
       ease: "power2.out",
      stagger: 0.1,
    });
  
    tl.to("#zero #coff,#zero #pizza",{
       x: 800,
       opacity: 1,
       delay: 0.3,
       duration: 2,
     })
     tl.to("#zero #coff,#zero #pizza",{
       x: 1600,
       // opacity: 0,
       delay: 2,
       duration: 2,
     })
     tl.to("#one #idli,#one #samosa",{
       x: -700,
       opacity: 1,
       // delay: 0.3,
       duration: 2,
     })
     tl.to("#one #idli,#one #samosa",{
       x: -1500,
       // opacity: 0,
       delay: 2,
       duration: 2,
     })
     tl.to("#two #steam,#two #rice",{
       x: 800,
       opacity: 1,
       // delay: 0.3,
       duration: 2,
     })
     tl.to("#two #steam,#two #rice",{
       x: 1600,
       // opacity: 0,
       delay: 2,
       duration: 2,
     })
     tl.to("#three #kadai,#three #enjoy",{
       x: -700,
       opacity: 1,
       // delay: 0.3,
       duration: 2,
     })
     tl.to("#three #kadai, #three #enjoy",{
       x: -1500,
       // opacity: 0,
       delay: 2,
       duration: 2,
     })
  });

  close.addEventListener("click", function () {
    gsap.to("#full", {
      right: "-100%",
      duration: 0.5,
      ease: "power2.in",
    });
  });
});


//  loader
var tl1 = gsap.timeline();
var load = document.querySelector("#loader");
var loadh2 = document.querySelector("#loader img");
var video = document.getElementById("myVideo");

tl1.to("#loader img", {
  scale: 0.1,
  rotate: 400,  
  duration: 3,  
  ease: "power2.inOut",  
  stagger: 0.5  
});
tl1.to("#loader", {
  // y: -1000,
  opacity: 0,
  
})
.to("#loader img", {
  opacity: 0,
  duration: 1
})
.to("#video-container", {
  opacity: 1
},">")
.to("#video-container ", {
  opacity: 1,
  scale: 1,
  width: "100vw",  
  height: "100vh",
  duration: 2,
  borderRadius: "0",
  top: "50%",
  // delay: 0.1,
  ease: "power2.inOut",
},">")
.from("#nav button , #nav i",{
  y: -100,
  opacity: 1,
  // duration: 0.3,
  stagger: 0.2
})

// .to("#video-container", {
//   scale: 1.2,  // Full width on scroll
//   scrollTrigger: {
//       trigger: ".video-container",
//       start: "top center",
//       end: "bottom top",
//       scrub: true,
//     },
//     // y: -50

// });

gsap.utils.toArray(".dish").forEach(dish => {
 gsap.from(dish, {
     y: 100,
     opacity: 0,
     scrollTrigger: {
         trigger: dish,
         start: "top 80%",
         end: "bottom 20%",
         scrub: 2,
     }
 });
});