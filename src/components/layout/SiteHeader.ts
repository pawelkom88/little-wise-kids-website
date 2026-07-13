const initHeader = () => {
  const header = document.querySelector<HTMLElement>("[data-site-header]");
  if (!header || header.dataset.ready) return;
  header.dataset.ready = "true";
  const menu = header.querySelector<HTMLElement>("[data-mega-menu]")!;
  const triggers = [...header.querySelectorAll<HTMLButtonElement>("[data-mega-trigger]")];
  const panels = [...header.querySelectorAll<HTMLElement>("[data-mega-panel]")];
  const topItems = [...header.querySelectorAll<HTMLElement>(".site-nav > a, .site-nav > button")];
  let active: string | null = null;

  const setInactive = (element: HTMLElement) => { element.hidden = true; element.setAttribute("inert", ""); };
  const setActive = (element: HTMLElement) => { element.hidden = false; element.removeAttribute("inert"); };
  const closeDesktop = (restore = false) => {
    const trigger = triggers.find((item) => item.dataset.megaTrigger === active);
    active = null;
    triggers.forEach((item) => item.setAttribute("aria-expanded", "false"));
    panels.forEach(setInactive);
    menu.hidden = true;
    menu.setAttribute("aria-hidden", "true");
    if (restore) trigger?.focus();
  };
  const openDesktop = (id: string, focusFirst = false) => {
    active = id;
    triggers.forEach((item) => item.setAttribute("aria-expanded", String(item.dataset.megaTrigger === id)));
    panels.forEach((panel) => panel.dataset.megaPanel === id ? setActive(panel) : setInactive(panel));
    menu.hidden = false;
    menu.setAttribute("aria-hidden", "false");
    if (focusFirst) panels.find((panel) => panel.dataset.megaPanel === id)?.querySelector("a")?.focus();
  };
  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => active === trigger.dataset.megaTrigger ? closeDesktop() : openDesktop(trigger.dataset.megaTrigger!));
    trigger.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown") { event.preventDefault(); openDesktop(trigger.dataset.megaTrigger!, true); }
      if (event.key === "Escape" && active) { event.preventDefault(); closeDesktop(true); }
    });
  });
  panels.forEach((panel) => panel.addEventListener("keydown", (event) => {
    const links = [...panel.querySelectorAll<HTMLAnchorElement>("a")];
    const trigger = triggers.find((item) => item.dataset.megaTrigger === panel.dataset.megaPanel);
    if (event.key === "Escape") { event.preventDefault(); closeDesktop(true); }
    if (event.key === "Tab" && event.shiftKey && document.activeElement === links[0]) { event.preventDefault(); closeDesktop(); trigger?.focus(); }
    if (event.key === "Tab" && !event.shiftKey && document.activeElement === links.at(-1)) {
      event.preventDefault();
      const next = topItems[topItems.indexOf(trigger!) + 1];
      closeDesktop(); next?.focus();
    }
  }));
  document.addEventListener("pointerdown", (event) => { if (active && !header.contains(event.target as Node)) closeDesktop(); });
  header.addEventListener("focusout", () => requestAnimationFrame(() => { if (active && !header.contains(document.activeElement)) closeDesktop(); }));

  const mobile = header.querySelector<HTMLDetailsElement>("[data-mobile-menu]")!;
  const mobileSummary = mobile.querySelector<HTMLElement>("summary")!;
  const mobileClose = mobile.querySelector<HTMLButtonElement>("[data-mobile-close]")!;
  const mobileTriggers = [...mobile.querySelectorAll<HTMLButtonElement>("[data-mobile-trigger]")];
  const closeMobileSections = (except?: string) => mobileTriggers.forEach((trigger) => {
    if (trigger.dataset.mobileTrigger === except) return;
    trigger.setAttribute("aria-expanded", "false");
    const panel = document.getElementById(trigger.getAttribute("aria-controls")!);
    if (panel) setInactive(panel);
  });
  mobileTriggers.forEach((trigger) => trigger.addEventListener("click", () => {
    const open = trigger.getAttribute("aria-expanded") === "true";
    closeMobileSections();
    if (!open) { trigger.setAttribute("aria-expanded", "true"); setActive(document.getElementById(trigger.getAttribute("aria-controls")!)!); }
  }));
  mobileClose.addEventListener("click", () => {
    mobile.open = false;
    closeMobileSections();
    mobileSummary.focus();
  });
  mobile.addEventListener("toggle", () => { if (!mobile.open) closeMobileSections(); });
  mobile.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    const expanded = mobileTriggers.find((trigger) => trigger.getAttribute("aria-expanded") === "true");
    event.preventDefault();
    if (expanded) { closeMobileSections(); expanded.focus(); } else { mobile.open = false; mobileSummary.focus(); }
  });
  header.querySelectorAll<HTMLAnchorElement>("[data-nav-link]").forEach((link) => link.addEventListener("click", () => { closeDesktop(); mobile.open = false; }));
  const desktopViewport = matchMedia("(min-width: 64rem)");
  const resetForBreakpoint = () => { closeDesktop(); closeMobileSections(); if (desktopViewport.matches) mobile.open = false; };
  desktopViewport.addEventListener("change", resetForBreakpoint);
};

initHeader();
