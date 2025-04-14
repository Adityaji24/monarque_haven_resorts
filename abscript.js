let currentIndex = 0;
const items = document.querySelectorAll(".crosel .list .item");
const thumbnails = document.querySelectorAll(".thumbnail .item");
const totalItems = items.length;
let autoplay;

// Set initial visibility state
items.forEach((item, i) => {
  const textEls = item.querySelectorAll("[data-animate]");
  if (i !== currentIndex) {
    gsap.set(item, {
      autoAlpha: 0,
      scale: 0.9,
      y: 50,
      zIndex: 1,
    });
    gsap.set(textEls, {
      autoAlpha: 0,
      y: 30,
      scale: 0.95,
    });
  } else {
    gsap.set(item, {
      autoAlpha: 1,
      scale: 1,
      y: 0,
      zIndex: 2,
    });
    gsap.set(textEls, {
      autoAlpha: 1,
      y: 0,
      scale: 1,
    });
  }
});

function showItem(index) {
  if (index === currentIndex) return;

  const currentItem = items[currentIndex];
  const nextItem = items[index];

  const currentTextEls = currentItem.querySelectorAll("[data-animate]");
  const nextTextEls = nextItem.querySelectorAll("[data-animate]");

  // Animate current item out
  gsap.to(currentItem, {
    autoAlpha: 0,
    scale: 0.9,
    y: -30,
    zIndex: 1,
    duration: 0.8,
    ease: "power3.inOut",
  });

  // Hide text of current item quickly
  gsap.to(currentTextEls, {
    autoAlpha: 0,
    y: 30,
    scale: 0.95,
    duration: 0.3,
    stagger: 0.05,
  });

  // Prepare next item text hidden before showing
  gsap.set(nextTextEls, {
    autoAlpha: 0,
    y: 30,
    scale: 0.95,
  });

  // Animate next item in
  gsap.fromTo(
    nextItem,
    {
      autoAlpha: 0,
      scale: 1.1,
      y: 100,
      zIndex: 2,
    },
    {
      autoAlpha: 1,
      scale: 1,
      y: 0,
      zIndex: 2,
      duration: 1,
      ease: "power3.out",
      onComplete: () => {
        // Animate text of next item with stagger
        gsap.to(nextTextEls, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.1,
        });
      },
    }
  );

  // Thumbnail active
  thumbnails.forEach((thumb, i) => {
    thumb.classList.toggle("active", i === index);
  });

  currentIndex = index;
}

document.getElementById("next").addEventListener("click", () => {
  const next = (currentIndex + 1) % totalItems;
  showItem(next);
});

document.getElementById("prev").addEventListener("click", () => {
  const prev = (currentIndex - 1 + totalItems) % totalItems;
  showItem(prev);
});

thumbnails.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    showItem(index);
  });
});

// Autoplay
function startAutoplay() {
  autoplay = setInterval(() => {
    const next = (currentIndex + 1) % totalItems;
    showItem(next);
  }, 15000);
}
startAutoplay();

// Pause autoplay on hover
const carousel = document.querySelector(".crosel");
carousel.addEventListener("mouseenter", () => clearInterval(autoplay));
carousel.addEventListener("mouseleave", () => startAutoplay());

// Init first
showItem(currentIndex);
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
