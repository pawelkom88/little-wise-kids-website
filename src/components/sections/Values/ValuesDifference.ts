const initialiseValuesDifference = () => {
  const sections = document.querySelectorAll("[data-values-difference]");

  sections.forEach((section) => {
    if (!(section instanceof HTMLElement)) {
      return;
    }

    if (section.dataset.valuesDifferenceInitialised === "true") {
      return;
    }

    const heading = section.querySelector("[data-values-difference-heading]");

    if (!(heading instanceof HTMLElement)) {
      return;
    }

    section.dataset.valuesDifferenceInitialised = "true";

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches) {
      section.classList.add("is-heading-animated");
      return;
    }

    let hasAnimated = false;
    let hasUserScrolled = false;
    let headingIsInTriggerArea = false;

    const cleanUp = () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };

    const animateHeading = () => {
      if (hasAnimated || !hasUserScrolled || !headingIsInTriggerArea) {
        return;
      }

      hasAnimated = true;
      section.classList.add("is-heading-animated");
      cleanUp();
    };

    const handleScroll = () => {
      hasUserScrolled = true;
      animateHeading();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        headingIsInTriggerArea = entry?.isIntersecting ?? false;
        animateHeading();
      },
      {
        threshold: 0,
        rootMargin: "-38% 0px -38% 0px",
      }
    );

    observer.observe(heading);

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    document.addEventListener("astro:before-swap", cleanUp, {
      once: true,
    });
  });
};

initialiseValuesDifference();

if (document.documentElement.dataset.valuesDifferencePageListener !== "true") {
  document.documentElement.dataset.valuesDifferencePageListener = "true";
  document.addEventListener("astro:page-load", initialiseValuesDifference);
}
