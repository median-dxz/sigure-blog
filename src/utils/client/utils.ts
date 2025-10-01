function setupClickAway(panelId: string, ignores: string[], onClose?: (event: MouseEvent | TouchEvent) => void) {
  const panelDom = document.getElementById(panelId);
  if (!panelDom) return;

  // Ignore clicks on the panel itself
  ignores.push(panelId);

  const handler = (event: MouseEvent | TouchEvent) => {
    const target = event.target;
    if (!(target instanceof Node)) return; // Ensure the event target is an HTML Node

    for (const ig of ignores) {
      const ignoreEl = document.getElementById(ig);
      if (ignoreEl?.contains(target)) return;
    }

    if (panelDom.contains(target)) return;

    onClose?.(event);
    panelDom.classList.add("float-panel-closed");

    document.removeEventListener("click", handler);
    document.removeEventListener("touchstart", handler);
  };

  document.addEventListener("click", handler);
  document.addEventListener("touchstart", handler);
}

export { setupClickAway };
