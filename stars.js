window.onload = function () {
  const canvas = document.createElement("canvas");
  canvas.classList.add("star-canvas");

  // Append canvas inside .sky, not body
  const skyContainer = document.querySelector(".sky");
  skyContainer.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  let stars = [];
  const numStars = 300;
  let prevTombBottom = 0;

  function resizeCanvas() {
    const tombstone = document.querySelector(".tombstone");
    const rect = tombstone.getBoundingClientRect();
    const scrollY = window.scrollY || document.documentElement.scrollTop;

    const tombLeft = rect.left;
    const tombRight = rect.right;
    const tombTop = rect.top + scrollY;
    const tombBottom = rect.bottom + scrollY;

    canvas.width = window.innerWidth;
    canvas.height = Math.max(window.innerHeight, tombBottom + 100);

    canvas.dataset.tombLeft = tombLeft;
    canvas.dataset.tombRight = tombRight;
    canvas.dataset.tombTop = tombTop;
    canvas.dataset.tombBottom = tombBottom;

    return tombBottom;
  }

  function generateStars() {
    stars = [];
    const tombLeft = parseFloat(canvas.dataset.tombLeft);
    const tombRight = parseFloat(canvas.dataset.tombRight);
    const tombTop = parseFloat(canvas.dataset.tombTop);
    const tombBottom = parseFloat(canvas.dataset.tombBottom);

    for (let i = 0; i < numStars; i++) {
      let x, y;

      do {
        x = Math.random() * canvas.width;
        y = Math.random() * canvas.height;
      } while (x > tombLeft && x < tombRight && y > tombTop && y < tombBottom);

      stars.push({
        x,
        y,
        radius: Math.random() * 1.5 + 0.3,
        alpha: Math.random(),
        delta: Math.random() * 0.02 + 0.005,
      });
    }
  }

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let star of stars) {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
      ctx.fill();

      // Twinkle
      star.alpha += star.delta;
      if (star.alpha <= 0 || star.alpha >= 1) {
        star.delta = -star.delta;
      }
    }
  }

  function animate() {
    requestAnimationFrame(animate);

    const currentTombBottom = resizeCanvas();

    if (currentTombBottom !== prevTombBottom) {
      generateStars(); // only when height changes
      prevTombBottom = currentTombBottom;
    }

    drawStars();
  }

  // Initial setup
  prevTombBottom = resizeCanvas();
  generateStars();
  animate();
};
