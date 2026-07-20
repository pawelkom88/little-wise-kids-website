const initHeader = () => {
  const header = document.querySelector<HTMLElement>("[data-site-header]");
  if (!header || header.dataset.ready) return;
  header.dataset.ready = "true";

  const body = document.body;
  const toggle = header.querySelector<HTMLButtonElement>("[data-mobile-toggle]");
  const panel = header.querySelector<HTMLElement>("[data-mobile-panel]");

  if (!toggle || !panel) return;

  const setOpen = (open: boolean) => {
    const updateState = () => {
      body.classList.toggle("menu-open", open);
      panel.setAttribute("aria-hidden", String(!open));
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };

    if ("startViewTransition" in document) {
      (document as any).startViewTransition(updateState);
    } else {
      updateState();
    }
  };

  toggle.addEventListener("click", () => {
    setOpen(!body.classList.contains("menu-open"));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && body.classList.contains("menu-open")) {
      setOpen(false);
      toggle.focus();
    }
  });

  header
    .querySelectorAll<HTMLAnchorElement>("[data-nav-link]")
    .forEach((link) =>
      link.addEventListener("click", () => {
        setOpen(false);
      })
    );

  const desktopViewport = matchMedia("(min-width: 64rem)");
  const resetForBreakpoint = () => {
    if (desktopViewport.matches) {
      setOpen(false);
    }
  };
  desktopViewport.addEventListener("change", resetForBreakpoint);
};

initHeader();
