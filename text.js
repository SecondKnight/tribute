window.addEventListener("load", function () {
  const elements = document.querySelectorAll(".tombtext p, .tombtext pre");
  const totalDuration = 5 * 60 * 1000; // 5 minutes in ms
  const interval = totalDuration / elements.length;

  let index = 0;
  function revealNext() {
    if (index >= elements.length) return;

    for (let i = 0; i < 2 && index < elements.length; i++, index++) {
      elements[index].classList.add("show");
    }

    setTimeout(revealNext, interval);
  }

  revealNext();
});
