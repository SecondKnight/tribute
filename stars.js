const sky = document.querySelector(".sky");
const tombstone = document.querySelector(".tombstone");
const tombstoneRect = tombstone.getBoundingClientRect();
const numStars = 150;

for (let i = 0; i < numStars; i++) {
  const star = document.createElement("div");
  star.classList.add("star");

  let x, y;

  do {
    // Random position anywhere in the sky
    x = Math.random() * window.innerWidth;
    y = Math.random() * window.innerHeight;

    // Keep generating until star is outside the tombstone bounds
  } while (
    x > tombstoneRect.left - 20 &&
    x < tombstoneRect.right + 20 &&
    y > tombstoneRect.top - 20 &&
    y < tombstoneRect.bottom + 20
  );

  star.style.left = `${x}px`;
  star.style.top = `${y}px`;

  sky.appendChild(star);
}
