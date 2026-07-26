import { useTouchSwipe } from "./useTouchSwipe";

export function initLightbox(container: HTMLElement | Document = document) {
  const dialog = document.getElementById("gallery-lightbox") as HTMLDivElement | null;
  if (!dialog) return;

  if (dialog.parentElement !== document.body) {
    document.body.appendChild(dialog);
  }

  const mediaContainer = document.getElementById("gallery-lightbox-media");
  const captionContainer = document.getElementById("gallery-lightbox-caption");
  const closeBtn = dialog.querySelector(".gallery-lightbox__close");
  const prevBtn = dialog.querySelector(".gallery-lightbox__arrow--prev");
  const nextBtn = dialog.querySelector(".gallery-lightbox__arrow--next");
  const controlsContainer = dialog.querySelector(".gallery-lightbox__controls") as HTMLElement | null;

  const triggers = Array.from(
    container.querySelectorAll<HTMLElement>("[data-lightbox-trigger]")
  );

  if (triggers.length <= 1 && controlsContainer) {
    controlsContainer.style.display = "none";
  } else if (controlsContainer) {
    controlsContainer.style.display = "flex";
  }

  let currentIndex = 0;

  const updateDialogContent = (trigger: HTMLElement, isNavigating = false) => {
    if (!mediaContainer || !captionContainer) return;

    const img = trigger.querySelector("img");
    if (img) {
      const clonedImg = img.cloneNode(true) as HTMLImageElement;
      if (isNavigating) {
        clonedImg.style.opacity = "0";
        clonedImg.style.transform = "scale(0.97)";
        clonedImg.style.transition = "opacity 200ms ease, transform 200ms ease";
      }

      mediaContainer.innerHTML = "";
      mediaContainer.appendChild(clonedImg);

      if (isNavigating) {
        requestAnimationFrame(() => {
          clonedImg.style.opacity = "1";
          clonedImg.style.transform = "scale(1)";
        });
      }
    }

    const caption = trigger.querySelector("figcaption");
    if (caption) {
      captionContainer.innerHTML = caption.innerHTML;
    } else {
      captionContainer.innerHTML = "";
    }
  };

  const openLightbox = (index: number) => {
    if (!dialog || !mediaContainer) return;

    currentIndex = index;
    const trigger = triggers[currentIndex];
    if (!trigger) return;

    updateDialogContent(trigger, false);
    dialog.style.display = "flex";
    // Force browser reflow before adding open class for smooth CSS transition
    void dialog.offsetWidth;
    dialog.classList.add("gallery-lightbox--open");
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    if (!dialog) return;

    dialog.classList.remove("gallery-lightbox--open");
    document.body.style.overflow = "";

    setTimeout(() => {
      if (!dialog.classList.contains("gallery-lightbox--open")) {
        dialog.style.display = "none";
      }
    }, 280);
  };

  const navigate = (direction: 1 | -1) => {
    if (!dialog || triggers.length === 0) return;

    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = triggers.length - 1;
    if (newIndex >= triggers.length) newIndex = 0;

    currentIndex = newIndex;
    const newTrigger = triggers[currentIndex];
    if (newTrigger) {
      updateDialogContent(newTrigger, true);
    }
  };

  triggers.forEach((trigger, index) => {
    if (trigger.dataset.lightboxBound === "true") return;
    trigger.dataset.lightboxBound = "true";

    trigger.addEventListener("click", () => openLightbox(index));
    trigger.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(index);
      }
    });
  });

  if (dialog.dataset.lightboxBound !== "true") {
    dialog.dataset.lightboxBound = "true";

    closeBtn?.addEventListener("click", (e) => {
      e.stopPropagation();
      closeLightbox();
    });

    dialog.addEventListener("click", (e) => {
      if (e.target === dialog || e.target === dialog.querySelector(".gallery-lightbox__content")) {
        closeLightbox();
      }
    });

    prevBtn?.addEventListener("click", (e) => {
      e.stopPropagation();
      navigate(-1);
    });

    nextBtn?.addEventListener("click", (e) => {
      e.stopPropagation();
      navigate(1);
    });

    useTouchSwipe(dialog, {
      onSwipeLeft: () => {
        if (dialog.classList.contains("gallery-lightbox--open")) {
          navigate(1);
        }
      },
      onSwipeRight: () => {
        if (dialog.classList.contains("gallery-lightbox--open")) {
          navigate(-1);
        }
      },
    });

    document.addEventListener("keydown", (e) => {
      if (!dialog.classList.contains("gallery-lightbox--open")) return;

      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowLeft") {
        navigate(-1);
      } else if (e.key === "ArrowRight") {
        navigate(1);
      }
    });
  }
}
