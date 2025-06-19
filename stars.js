window.onload = function () {
  const canvas = document.createElement("canvas");
  canvas.classList.add("star-canvas");
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  const animatedStars = [];
  const staticStars = [];
  const NUM_ANIMATED = 150; // fewer animated stars
  const NUM_STATIC = 600; // more static stars
  let canvasW = 0;
  let canvasH = 0;

  function resizeCanvas() {
    const tombstone = document.querySelector(".tombstone");
    const rect = tombstone.getBoundingClientRect();
    const scrollY = window.scrollY || document.documentElement.scrollTop;

    const tombLeft = rect.left;
    const tombRight = rect.right;
    const tombTop = rect.top + scrollY;
    const tombBottom = rect.bottom + scrollY;

    canvasW = canvas.width = window.innerWidth;
    canvasH = canvas.height = Math.max(window.innerHeight, tombBottom + 100);

    canvas.dataset.tombLeft = tombLeft;
    canvas.dataset.tombRight = tombRight;
    canvas.dataset.tombTop = tombTop;
    canvas.dataset.tombBottom = tombBottom;
  }

  function outsideTombstone(x, y) {
    const tombLeft = parseFloat(canvas.dataset.tombLeft);
    const tombRight = parseFloat(canvas.dataset.tombRight);
    const tombTop = parseFloat(canvas.dataset.tombTop);
    const tombBottom = parseFloat(canvas.dataset.tombBottom);
    return x < tombLeft || x > tombRight || y < tombTop || y > tombBottom;
  }

  function generateStars() {
    staticStars.length = 0;
    animatedStars.length = 0;

    for (let i = 0; i < NUM_STATIC; i++) {
      let x, y;
      do {
        x = Math.random() * canvasW;
        y = Math.random() * canvasH;
      } while (!outsideTombstone(x, y));

      staticStars.push({ x, y, radius: Math.random() * 1.2 + 0.2 });
    }

    for (let i = 0; i < NUM_ANIMATED; i++) {
      let x, y;
      do {
        x = Math.random() * canvasW;
        y = Math.random() * canvasH;
      } while (!outsideTombstone(x, y));

      animatedStars.push({
        x,
        y,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random(),
        delta: Math.random() * 0.02 + 0.005,
      });
    }
  }

  function drawStars() {
    ctx.clearRect(0, 0, canvasW, canvasH);

    // Static stars first
    ctx.fillStyle = "white";
    staticStars.forEach((star) => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
      ctx.fill();
    });

    // Animated twinkling stars
    animatedStars.forEach((star) => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
      ctx.fill();

      // Update alpha
      star.alpha += star.delta;
      if (star.alpha <= 0 || star.alpha >= 1) {
        star.delta = -star.delta;
      }
    });
  }

  function animate() {
    requestAnimationFrame(animate);
    drawStars();
  }

  // Setup
  resizeCanvas();
  generateStars();
  animate();

  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      resizeCanvas();
      generateStars();
    }, 100);
  });

  window.addEventListener("scroll", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      resizeCanvas();
      generateStars();
    }, 100);
  });
};
