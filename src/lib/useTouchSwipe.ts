export interface TouchSwipeOptions {
  threshold?: number;
  maxVerticalRatio?: number;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
}

export function useTouchSwipe(
  element: HTMLElement | Document | Window,
  options: TouchSwipeOptions
): () => void {
  const threshold = options.threshold ?? 35;
  const maxVerticalRatio = options.maxVerticalRatio ?? 0.8;

  let startX = 0;
  let startY = 0;
  let currentX = 0;
  let currentY = 0;
  let isTracking = false;

  const onTouchStart = (e: Event) => {
    const touchEvent = e as TouchEvent;
    if (touchEvent.touches.length !== 1) return;
    const touch = touchEvent.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
    currentX = touch.clientX;
    currentY = touch.clientY;
    isTracking = true;
  };

  const onTouchMove = (e: Event) => {
    if (!isTracking) return;
    const touchEvent = e as TouchEvent;
    if (touchEvent.touches.length !== 1) return;
    const touch = touchEvent.touches[0];
    currentX = touch.clientX;
    currentY = touch.clientY;
  };

  const onTouchEnd = () => {
    if (!isTracking) return;
    isTracking = false;

    const deltaX = currentX - startX;
    const deltaY = currentY - startY;

    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    if (absX >= threshold && absY / (absX || 1) <= maxVerticalRatio) {
      if (deltaX < 0 && options.onSwipeLeft) {
        options.onSwipeLeft();
      } else if (deltaX > 0 && options.onSwipeRight) {
        options.onSwipeRight();
      }
    } else if (absY >= threshold && absX / (absY || 1) <= maxVerticalRatio) {
      if (deltaY < 0 && options.onSwipeUp) {
        options.onSwipeUp();
      } else if (deltaY > 0 && options.onSwipeDown) {
        options.onSwipeDown();
      }
    }
  };

  element.addEventListener("touchstart", onTouchStart, { passive: true });
  element.addEventListener("touchmove", onTouchMove, { passive: true });
  element.addEventListener("touchend", onTouchEnd, { passive: true });
  element.addEventListener("touchcancel", onTouchEnd, { passive: true });

  return () => {
    element.removeEventListener("touchstart", onTouchStart);
    element.removeEventListener("touchmove", onTouchMove);
    element.removeEventListener("touchend", onTouchEnd);
    element.removeEventListener("touchcancel", onTouchEnd);
  };
}
