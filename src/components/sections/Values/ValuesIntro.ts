const initialiseValuesIntro = () => {
  const sections = document.querySelectorAll("[data-values-intro]");

  sections.forEach((section) => {
    if (!(section instanceof HTMLElement)) return;

    if (section.dataset.valuesIntroReady === "true") {
      return;
    }

    const title = section.querySelector("[data-values-intro-title]");

    if (!(title instanceof HTMLElement)) {
      return;
    }

    section.dataset.valuesIntroReady = "true";

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches) {
      section.classList.add("is-animated");
      return;
    }

    let userHasScrolled = false;
    let titleIsInTriggerArea = false;
    let hasAnimated = false;

    const runAnimation = () => {
      if (hasAnimated || !userHasScrolled || !titleIsInTriggerArea) {
        return;
      }

      hasAnimated = true;
      section.classList.add("is-animated");

      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };

    const handleScroll = () => {
      userHasScrolled = true;
      runAnimation();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        titleIsInTriggerArea = entry?.isIntersecting ?? false;
        runAnimation();
      },
      {
        threshold: 0,
        rootMargin: "-36% 0px -36% 0px",
      }
    );

    observer.observe(title);

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    document.addEventListener(
      "astro:before-swap",
      () => {
        observer.disconnect();
        window.removeEventListener("scroll", handleScroll);
      },
      {
        once: true,
      }
    );
  });
};

initialiseValuesIntro();

if (document.documentElement.dataset.valuesIntroPageListener !== "true") {
  document.documentElement.dataset.valuesIntroPageListener = "true";
  document.addEventListener("astro:page-load", initialiseValuesIntro);
}
