export type VideoModalElements = {
  trigger: HTMLElement;
  dialog: HTMLDialogElement;
  modalVideo: HTMLVideoElement;
  previewVideo: HTMLVideoElement;
  closeButton: HTMLButtonElement;
};

let lockedScrollY = 0;
let previousBodyTop = "";
let previouslyFocusedElement: HTMLElement | null = null;

function lockPageScroll(): void {
  lockedScrollY = window.scrollY;
  previousBodyTop = document.body.style.top;

  document.body.style.top = `-${lockedScrollY}px`;
  document.body.classList.add("video-modal-open");
}

function unlockPageScroll(): void {
  document.body.classList.remove("video-modal-open");
  document.body.style.top = previousBodyTop;

  window.scrollTo(0, lockedScrollY);
}

function syncVideoTime(
  source: HTMLVideoElement,
  target: HTMLVideoElement,
): void {
  if (!Number.isFinite(source.currentTime)) return;

  const applyTime = (): void => {
    try {
      target.currentTime = source.currentTime;
    } catch (error) {
      console.warn("Unable to synchronise video time.", error);
    }
  };

  if (target.readyState >= HTMLMediaElement.HAVE_METADATA) {
    applyTime();
  } else {
    target.addEventListener("loadedmetadata", applyTime, { once: true });
  }
}

async function safelyPlay(
  video: HTMLVideoElement,
  context: string,
): Promise<void> {
  try {
    await video.play();
  } catch (error) {
    console.warn(`${context} could not play.`, error);
  }
}

export function initialiseVideoModal({
  trigger,
  dialog,
  modalVideo,
  previewVideo,
  closeButton,
}: VideoModalElements): void {
  if (trigger.dataset.videoModalInitialised === "true") return;
  trigger.dataset.videoModalInitialised = "true";

  if (import.meta.env?.DEV) {
    modalVideo.addEventListener("error", () => {
      console.error("Modal video failed to load.", {
        currentSrc: modalVideo.currentSrc,
        networkState: modalVideo.networkState,
        readyState: modalVideo.readyState,
        mediaErrorCode: modalVideo.error?.code,
        mediaErrorMessage: modalVideo.error?.message,
      });
    });
  }

  const openModal = async (): Promise<void> => {
    if (dialog.open) return;

    previouslyFocusedElement =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    previewVideo.pause();
    syncVideoTime(previewVideo, modalVideo);

    lockPageScroll();
    dialog.showModal();

    closeButton.focus({ preventScroll: true });
    await safelyPlay(modalVideo, "Modal video");
  };

  const closeModal = (): void => {
    if (!dialog.open) return;

    modalVideo.pause();
    syncVideoTime(modalVideo, previewVideo);
    dialog.close();
  };

  const completeClose = (): void => {
    unlockPageScroll();

    void safelyPlay(previewVideo, "Preview video");
    previouslyFocusedElement?.focus({ preventScroll: true });
    previouslyFocusedElement = null;
  };

  trigger.addEventListener("click", () => {
    void openModal();
  });

  trigger.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key !== "Enter" && event.key !== " ") return;

    event.preventDefault();
    void openModal();
  });

  closeButton.addEventListener("click", closeModal);

  dialog.addEventListener("click", (event: MouseEvent) => {
    if (event.target === dialog) {
      closeModal();
    }
  });

  dialog.addEventListener("cancel", (event: Event) => {
    event.preventDefault();
    closeModal();
  });

  dialog.addEventListener("close", completeClose);

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry) return;

      if (entry.isIntersecting && !dialog.open) {
        void safelyPlay(previewVideo, "Preview video");
      } else {
        previewVideo.pause();
      }
    },
    { threshold: 0.05 },
  );

  observer.observe(previewVideo);
}
