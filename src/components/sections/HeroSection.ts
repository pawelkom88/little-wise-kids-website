import { initialiseVideoModal } from "../media/videoModal";

const root = document.querySelector<HTMLElement>("[data-home-video-modal]");

if (root) {
  const trigger = root.querySelector<HTMLElement>("[data-video-trigger]");
  const dialog = root.querySelector<HTMLDialogElement>("[data-video-dialog]");
  const modalVideo = root.querySelector<HTMLVideoElement>("[data-modal-video]");
  const previewVideo = root.querySelector<HTMLVideoElement>("[data-preview-video]");
  const closeButton = root.querySelector<HTMLButtonElement>("[data-video-close]");

  if (trigger && dialog && modalVideo && previewVideo && closeButton) {
    initialiseVideoModal({
      trigger,
      dialog,
      modalVideo,
      previewVideo,
      closeButton,
    });
  }
}
