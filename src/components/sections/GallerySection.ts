const initialiseGalleries = () => {
  document.querySelectorAll<HTMLElement>("[data-gallery]").forEach((gallery) => {
    if (gallery.dataset.galleryInitialised === "true") return;

    gallery.dataset.galleryInitialised = "true";

    const track = gallery.querySelector<HTMLElement>("[data-gallery-track]");
    const previousButton = gallery.querySelector<HTMLButtonElement>(
      "[data-gallery-previous]",
    );
    const nextButton = gallery.querySelector<HTMLButtonElement>(
      "[data-gallery-next]",
    );
    const currentElement = gallery.querySelector<HTMLElement>(
      "[data-gallery-current]",
    );
    const totalElement = gallery.querySelector<HTMLElement>(
      "[data-gallery-total]",
    );
    const desktopDots = Array.from(
      gallery.querySelectorAll<HTMLButtonElement>("[data-gallery-dot]"),
    );
    const mobileDots = Array.from(
      gallery.querySelectorAll<HTMLButtonElement>("[data-gallery-mobile-dot]"),
    );

    if (
      !track ||
      !previousButton ||
      !nextButton ||
      !currentElement ||
      !totalElement
    ) {
      return;
    }

    const mobileQuery = window.matchMedia("(width < 48rem)");
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    let activeIndex = 0;
    let scrollFrame = 0;

    const getTargets = () =>
      Array.from(
        gallery.querySelectorAll<HTMLElement>(
          mobileQuery.matches
            ? "[data-gallery-card]"
            : "[data-gallery-page]",
        ),
      );

    const getActiveDots = () =>
      mobileQuery.matches ? mobileDots : desktopDots;

    const getTargetLeft = (target: HTMLElement) => {
      const trackBounds = track.getBoundingClientRect();
      const targetBounds = target.getBoundingClientRect();

      return targetBounds.left - trackBounds.left + track.scrollLeft;
    };

    const updateControls = (index: number) => {
      const targets = getTargets();
      const dots = getActiveDots();

      activeIndex = Math.max(0, Math.min(index, targets.length - 1));

      currentElement.textContent = String(activeIndex + 1);
      totalElement.textContent = String(targets.length);

      previousButton.disabled = activeIndex === 0;
      nextButton.disabled = activeIndex === targets.length - 1;

      [...desktopDots, ...mobileDots].forEach((dot) => {
        dot.removeAttribute("aria-current");
      });

      dots[activeIndex]?.setAttribute("aria-current", "true");
    };

    const findClosestTarget = () => {
      const targets = getTargets();
      const trackLeft = track.getBoundingClientRect().left;

      return targets.reduce(
        (closest, target, index) => {
          const distance = Math.abs(
            target.getBoundingClientRect().left - trackLeft,
          );

          return distance < closest.distance
            ? { index, distance }
            : closest;
        },
        { index: 0, distance: Number.POSITIVE_INFINITY },
      ).index;
    };

    const scrollToIndex = (index: number) => {
      const targets = getTargets();
      const nextIndex = Math.max(0, Math.min(index, targets.length - 1));
      const target = targets[nextIndex];

      if (!target) return;

      track.scrollTo({
        left: getTargetLeft(target),
        behavior: reducedMotionQuery.matches ? "auto" : "smooth",
      });

      updateControls(nextIndex);
    };

    previousButton.addEventListener("click", () => {
      scrollToIndex(activeIndex - 1);
    });

    nextButton.addEventListener("click", () => {
      scrollToIndex(activeIndex + 1);
    });

    [...desktopDots, ...mobileDots].forEach((dot) => {
      dot.addEventListener("click", () => {
        const index = Number(dot.dataset.galleryIndex);

        if (Number.isFinite(index)) {
          scrollToIndex(index);
        }
      });
    });

    track.addEventListener("scroll", () => {
      window.cancelAnimationFrame(scrollFrame);

      scrollFrame = window.requestAnimationFrame(() => {
        updateControls(findClosestTarget());
      });
    });

    track.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollToIndex(activeIndex - 1);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollToIndex(activeIndex + 1);
      }

      if (event.key === "Home") {
        event.preventDefault();
        scrollToIndex(0);
      }

      if (event.key === "End") {
        event.preventDefault();
        scrollToIndex(getTargets().length - 1);
      }
    });

    mobileQuery.addEventListener("change", () => {
      activeIndex = 0;
      track.scrollTo({ left: 0, behavior: "auto" });
      updateControls(0);
    });

    const resizeObserver = new ResizeObserver(() => {
      scrollToIndex(activeIndex);
    });

    resizeObserver.observe(track);
    updateControls(0);
  });
};

initialiseGalleries();
