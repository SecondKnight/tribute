window.addEventListener("load", function () {
  const container = document.querySelector(".tombtext");
  const toggle = document.getElementById("toggleTyping");

  const saved = localStorage.getItem("typingEnabled");
  const enableTyping = saved !== "false";
  toggle.checked = enableTyping;

  const original = Array.from(container.querySelectorAll("p, pre")).map(
    (el) => {
      return {
        tag: el.tagName.toLowerCase(),
        html: el.innerHTML,
      };
    }
  );

  // Clear initial DOM
  container.innerHTML = "";

  const BATCH_SIZE = 20;
  let index = 0;

  // Used for both modes
  function createElement(tag, html, useAnimation = false) {
    const el = document.createElement(tag);
    el.innerHTML = html;

    if (!useAnimation) {
      el.classList.add("show", "no-anim");
      container.appendChild(el);
      return;
    }

    // Set initial state
    el.classList.add("pre-show");
    container.appendChild(el);

    // Force a reflow so the browser registers .pre-show styles
    void el.offsetHeight;

    // Apply .show so transition can occur
    el.classList.remove("pre-show");
    el.classList.add("show");
  }

  // MODE 1: Typing animation reveal (toggle ON)
  if (enableTyping) {
    const totalDuration = 5 * 60 * 1000;
    const interval = totalDuration / original.length;

    function revealNext() {
      if (index >= original.length) return;

      for (let i = 0; i < 2 && index < original.length; i++, index++) {
        const { tag, html } = original[index];
        createElement(tag, html, true);
      }

      setTimeout(revealNext, interval);
    }

    revealNext();
    return; // skip the scroll listener
  }

  // MODE 2: Lazy load on scroll (toggle OFF)
  function loadNextBatch() {
    const next = original.slice(index, index + BATCH_SIZE);
    next.forEach(({ tag, html }) => {
      createElement(tag, html, false);
    });
    index += BATCH_SIZE;
  }

  // Initial batch
  loadNextBatch();

  window.addEventListener("scroll", () => {
    const scrollBottom = window.scrollY + window.innerHeight;
    const containerBottom = container.offsetTop + container.offsetHeight;

    if (scrollBottom + 100 > containerBottom && index < original.length) {
      loadNextBatch();
    }
  });
});
