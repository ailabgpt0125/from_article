(function () {
  "use strict";

  const body = document.body;
  const productsPath = body.dataset.productsPath;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    setupQuietMotion();
    setupHeaderState();
    setupStaticFilters();
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
  }

  function setupHeaderState() {
    const update = () => body.classList.toggle("is-scrolled", window.scrollY > 16);
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  function setupStaticFilters() {
    const filterList = document.querySelector("[data-filter-list]");
    const cards = Array.from(document.querySelectorAll("[data-product-card]"));
    if (!filterList || !cards.length) return;

    filterList.addEventListener("click", (event) => {
      const button = event.target.closest("[data-filter-category]");
      if (!button) return;

      const category = button.dataset.filterCategory;
      filterList.querySelectorAll(".filter-button").forEach((item) => {
        item.classList.toggle("is-active", item === button);
      });

      cards.forEach((card) => {
        const shouldShow = category === "all" || card.dataset.category === category;
        card.hidden = !shouldShow;
      });
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
      message.textContent = "商品情報の読み込みに失敗しました。時間をおいて再度お試しください。";
      container.before(message);
    }
  }
})();
