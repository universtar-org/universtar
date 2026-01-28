export function initHorizontalScroll() {
  const el = document.getElementById("horizontal-scroll");
  if (!el) {
    return;
  }

  el.addEventListener(
    "wheel",
    (e: WheelEvent) => {
      if (e.shiftKey || el.scrollWidth <= el.clientWidth) {
        return;
      }

      e.preventDefault();
      el.scrollLeft += e.deltaY;
    },
    { passive: false },
  );
}
