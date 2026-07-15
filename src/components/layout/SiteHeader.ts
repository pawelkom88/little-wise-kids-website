const initHeader = () => {
  const header = document.querySelector<HTMLElement>("[data-site-header]");
  if (!header || header.dataset.ready) return;
  header.dataset.ready = "true";

  const mobile =
    header.querySelector<HTMLDetailsElement>("[data-mobile-menu]")!;
  const mobileSummary = mobile.querySelector<HTMLElement>("summary")!;
  const mobileClose = mobile.querySelector<HTMLButtonElement>(
    "[data-mobile-close]"
  )!;

  mobileClose.addEventListener("click", () => {
    mobile.open = false;
    mobileSummary.focus();
  });

  header
    .querySelectorAll<HTMLAnchorElement>("[data-nav-link]")
    .forEach((link) =>
      link.addEventListener("click", () => {
        mobile.open = false;
      })
    );

  const desktopViewport = matchMedia("(min-width: 64rem)");
  const resetForBreakpoint = () => {
    if (desktopViewport.matches) mobile.open = false;
  };
  desktopViewport.addEventListener("change", resetForBreakpoint);
};

initHeader();
