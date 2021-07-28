"use strict";
//Oprtion2 -jQuery smooth scroll
const blocks = document.querySelectorAll("main article");

// Option 2 - jQuery Smooth Scrolling
$(".navbar a").on("click", function (e) {
  if (this.hash !== "") {
    e.preventDefault();

    const hash = this.hash;

    $("html, body").animate(
      {
        scrollTop: $(hash).offset().top,
      },
      800
    );
  }
});

const blocksObserver = new IntersectionObserver(
  (entries) => {
    // entries === elements
    return entries.forEach((event) => {
      // destructures the values we want to check for in the animateVisible function
      const { target, intersectionRatio, isIntersecting } = event;
      // Call function when an intersection triggers.
      animateVisible(target, intersectionRatio, isIntersecting);
    });
  },
  // threshold means the percentage between 0-1 (0 = 0, 1 = 100) when we want the intersection callback to trigger.
  // This Intersection Observer triggers when the element is in view for at least half of it's height.
  { threshold: 0.5 }
);
for (const block of blocks) {
  blocksObserver.observe(block);
}
gsap.set("main article *", { autoAlpha: 0, y: "1rem" });

// Is triggered in the Intersection Bbserver
const animateVisible = (block, ratio, isIntersecting) => {
  // When the element is in view:
  if (ratio > 0 && isIntersecting) {
    // Animate all the children of this element
    gsap.to(block.querySelectorAll("*"), {
      // duration is one second
      duration: 1,
      // animate back to visible
      autoAlpha: 1,
      // animate back to top
      y: "0",
      // stagger will make all animations fire 0.3 seconds after each other.
      stagger: 0.3,
      // Ease In Out: accelerates --> decelerates
      ease: "power3.inOut",
    });
  } else {
    // When the element is not in view anymore we set it to invisible and downward for 1rem (16px usually)
    gsap.set(block.querySelectorAll("*"), {
      autoAlpha: 0,
      y: "1rem",
    });
  }
};
