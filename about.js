gsap.to(".tbox h1", {
  opacity: 1,       // ✅ fixed spelling
  duration: 2,
  scale: 1.2   ,     // optional: animate scale slightly if you want
  y: 0,  
   ease: "power2.out"
});
const lines = document.querySelectorAll(".animated-text");

lines.forEach((line, index) => {
  const chars = line.textContent.split("");
  line.innerHTML = "";

  chars.forEach((char) => {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char; // preserve spaces
    line.appendChild(span);
  });

  gsap.to(line.querySelectorAll("span"), {
    opacity: 1,
    scale: 1,
    skewX: 0,
    duration: 0.6,
    ease: "back.out(1.7)",
    stagger: 0.03,
    delay: index * 0.4, // delay next line animation
  });
});


// === Animate .fti image ===
let tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page2",
    pin: true,
    start: "60% 60%",
    end: "200% 50%",
    scrub: 5,
    markers: false
  }
});

tl2.to(".fti", {
    width: "45vh",
    delay: 0.4,
    height: "45vh",
    opacity: 1,
    scale: 1,
    ease: "power3.out",
    duration: 1.2,
    boxShadow: "0px 20px 60px rgba(0, 0, 0, 0.3)",
    borderRadius: "2vh"
  })
  .to(".ft h2", {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    stagger: 0.2,
    ease: "power4.out"
  })
  .to(".ft1 h2", {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    stagger: 0.2,
    ease: "power4.out"
  })
  .to(".fti1", {
    width: "45vh",
    delay: 0.4,
    height: "40vh",
    opacity: 1,
    scale: 1,
    ease: "power3.out",
    duration: 1.2,
    boxShadow: "0px 20px 60px rgba(0, 0, 0, 0.3)",
    borderRadius: "2vh"
  });
  

  //page3 animation through timeline


let tl3 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page3",
    pin: true,
    start: "60% 60%",
    end: "200% 50%",
    scrub: 5,
    markers: false
  }
});

tl3.to(".fti3", {
    width: "45vh",
    delay: 0.4,
    height: "45vh",
    opacity: 1,
    scale: 1,
    ease: "power3.out",
    duration: 1.2,
    boxShadow: "0px 20px 60px rgba(0, 0, 0, 0.3)",
    borderRadius: "2vh"
  })
  .to(".ft3 h2", {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    stagger: 0.2,
    ease: "power4.out"
  })
  .to(".ft13 h2", {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    stagger: 0.2,
    ease: "power4.out"
  })
  .to(".fti13", {
    width: "45vh",
    delay: 0.4,
    height: "40vh",
    opacity: 1,
    scale: 1,
    ease: "power3.out",
    duration: 1.2,
    boxShadow: "0px 20px 60px rgba(0, 0, 0, 0.3)",
    borderRadius: "2vh"
  });
  


  // gsap.registerPlugin(ScrollTrigger);

      // Infinite marquee animation
      function initMarquee() {
          const boxes = document.querySelector('.boxes');
          const boxWidth = document.querySelector('.box').offsetWidth;
          const gap = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--gap'));
          const totalWidth = (boxWidth + gap) * boxes.children.length;

          // Clone the content for seamless looping
          boxes.innerHTML += boxes.innerHTML;

          // GSAP animation
          gsap.to(boxes, {
              x: -totalWidth,
              duration: 30, // Adjust speed here
              ease: "none",
              repeat: -1,
              modifiers: {
                  x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
              }
          });
      }

      // Initialize when DOM is loaded
      document.addEventListener('DOMContentLoaded', initMarquee);

// Infinite marquee animation
function initMarquee() {
  const boxes = document.querySelector('.boxes');
  const boxWidth = document.querySelector('.box').offsetWidth;
  const gap = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--gap'));
  const totalWidth = (boxWidth + gap) * boxes.children.length;

  // Clone the content for seamless looping
  boxes.innerHTML += boxes.innerHTML;

  // GSAP animation
  const animation = gsap.to(boxes, {
      x: -totalWidth,
      duration: 75, // Adjust speed here
      ease: "none",
      repeat: -1,
      modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
      }
  });

  // Add hover functionality
  boxes.addEventListener('mouseenter', () => {
      animation.pause(); // Pause animation on hover
  });

  boxes.addEventListener('mouseleave', () => {
      animation.resume(); // Resume animation when mouse leaves
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initMarquee);
 // 2. Hamburger Side Menu Toggle
    // -------------------------------
  
    const hamburger = document.getElementById("hamburger");
    const fullMenu = document.getElementById("full");
    const closeIcon = document.querySelector("#full h2 i");
  
    // Open side menu
    hamburger.addEventListener("click", () => {
      fullMenu.style.right = "0";
  
      // Animate menu items
      gsap.to("#amg h3", {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out"
      });
  
      gsap.to("#iconsss i", {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        delay: 0.3,
        ease: "power2.out"
      });
  
      gsap.to("#amg button", {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        delay: 0.5,
        ease: "power2.out"
      });
    });
  
    // Close side menu
    closeIcon.addEventListener("click", () => {
      fullMenu.style.right = "-100%";
  
      // Reset animations (fade out instantly)
      gsap.set("#amg h3, #iconsss i, #amg button", {
        opacity: 0,
        y: 20
      });
    });
