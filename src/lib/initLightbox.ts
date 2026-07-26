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

  const updateDialogContent = (trigger: HTMLElement) => {
    if (!mediaContainer || !captionContainer) return;

    const img = trigger.querySelector("img");
    if (img) {
      const clonedImg = img.cloneNode(true) as HTMLImageElement;
      clonedImg.style.viewTransitionName = "none";
      clonedImg.style.opacity = "0";
      clonedImg.style.transition = "opacity 0.2s ease";

      mediaContainer.innerHTML = "";
      mediaContainer.appendChild(clonedImg);

      requestAnimationFrame(() => {
        clonedImg.style.opacity = "1";
      });
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

    triggers.forEach((t) => (t.style.viewTransitionName = "none"));
    trigger.style.viewTransitionName = "gallery-active-image";
    mediaContainer.style.viewTransitionName = "none";

    const doOpen = () => {
      updateDialogContent(trigger);
      trigger.style.viewTransitionName = "none";
      mediaContainer.style.viewTransitionName = "gallery-active-image";
      dialog.style.display = "flex";
      document.body.style.overflow = "hidden";
    };

    interface DocumentWithVT extends Document {
      startViewTransition?: (cb: () => void) => { finished: Promise<void> };
    }
    const docWithVT = document as DocumentWithVT;
    if (docWithVT.startViewTransition) {
      const vt = docWithVT.startViewTransition(() => {
        doOpen();
      });
      vt.finished.then(() => {
        mediaContainer.style.viewTransitionName = "none";
      });
    } else {
      doOpen();
    }
  };

  const closeLightbox = () => {
    if (!dialog || !mediaContainer) return;

    const trigger = triggers[currentIndex];

    triggers.forEach((t) => (t.style.viewTransitionName = "none"));
    mediaContainer.style.viewTransitionName = "gallery-active-image";
    if (trigger) trigger.style.viewTransitionName = "none";

    const doClose = () => {
      mediaContainer.style.viewTransitionName = "none";
      if (trigger) trigger.style.viewTransitionName = "gallery-active-image";
      dialog.style.display = "none";
      document.body.style.overflow = "";
    };

    if (docWithVT.startViewTransition) {
      const vt = docWithVT.startViewTransition(() => {
        doClose();
      });
      vt.finished.then(() => {
        if (trigger) trigger.style.viewTransitionName = "none";
      });
    } else {
      doClose();
    }
  };

  const navigate = (direction: 1 | -1) => {
    if (!dialog || triggers.length === 0) return;

    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = triggers.length - 1;
    if (newIndex >= triggers.length) newIndex = 0;

    currentIndex = newIndex;
    const newTrigger = triggers[currentIndex];
    if (newTrigger) {
      updateDialogContent(newTrigger);
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

    closeBtn?.addEventListener("click", () => closeLightbox());

    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) {
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

    document.addEventListener("keydown", (e) => {
      if (dialog.style.display !== "flex") return;

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
