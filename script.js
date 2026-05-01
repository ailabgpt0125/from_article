(function () {
  "use strict";

  const body = document.body;
  const productsPath = body.dataset.productsPath;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    setupStaticFilters();
    checkProductData();
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
