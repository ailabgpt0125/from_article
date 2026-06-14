(function () {
  "use strict";

  const body = document.body;
  const productsPath = body.dataset.productsPath;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    setupQuietMotion();
    setupHeaderState();
    setupObjectFilters();
    checkProductData();
  }

  function setupQuietMotion() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = Array.from(document.querySelectorAll([
      ".hero .eyebrow",
      ".hero h1",
      ".hero-copy",
      ".lead",
      ".section-heading",
      ".statement",
      ".quiet-card",
      ".object-card",
      ".object-type-section",
      ".prose p",
      ".other-links"
    ].join(",")));

    if (!targets.length) return;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    targets.forEach((target, index) => {
      target.classList.add("reveal-on-scroll");
      target.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 70}ms`);
    });
    body.classList.add("motion-ready");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          });
        }, {
          rootMargin: "0px 0px -12% 0px",
          threshold: 0.14
        });

        targets.forEach((target) => observer.observe(target));
      });
    });
  }

  function setupHeaderState() {
    const update = () => body.classList.toggle("is-scrolled", window.scrollY > 16);
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  function setupObjectFilters() {
    const filterPanel = document.querySelector("[data-object-filters]");
    const cards = Array.from(document.querySelectorAll("[data-product-card]"));
    if (!filterPanel || !cards.length) return;

    const state = {
      world: "all",
      type: "all"
    };
    const emptyMessage = filterPanel.querySelector("[data-filter-empty]");

    filterPanel.addEventListener("click", (event) => {
      const button = event.target.closest("[data-filter-group][data-filter-value]");
      if (!button) return;

      const group = button.dataset.filterGroup;
      const value = button.dataset.filterValue;
      if (!Object.prototype.hasOwnProperty.call(state, group)) return;
      state[group] = value;

      filterPanel.querySelectorAll(`[data-filter-group="${group}"]`).forEach((item) => {
        item.classList.toggle("is-active", item === button);
      });

      let visibleCount = 0;
      cards.forEach((card) => {
        const worlds = (card.dataset.filterWorlds || "").split(/\s+/).filter(Boolean);
        const types = (card.dataset.filterTypes || "").split(/\s+/).filter(Boolean);
        const matchesWorld = state.world === "all" || worlds.includes(state.world);
        const matchesType = state.type === "all" || types.includes(state.type);
        const shouldShow = matchesWorld && matchesType;
        card.hidden = !shouldShow;
        if (shouldShow) visibleCount += 1;
      });
      if (emptyMessage) emptyMessage.hidden = visibleCount > 0;
    });
  }

  async function checkProductData() {
    if (!productsPath) return;
    try {
      const response = await fetch(productsPath);
      if (!response.ok) throw new Error();
      await response.json();
    } catch (error) {
      const container = document.querySelector("[data-product-list]");
      if (!container) return;
      const message = document.createElement("p");
      message.className = "notice notice--error";
      message.textContent = "収蔵データの読み込みに失敗しました。時間をおいて再度ご確認ください。";
      container.before(message);
    }
  }
})();
