window.addEventListener("load", function () {
  const paragraphs = document.querySelectorAll(".tombtext p");
  const footerPara = document.querySelector(".tombstone > footer p");

  const allParas = Array.from(paragraphs);
  if (footerPara) allParas.push(footerPara);

  const texts = allParas.map((p) => p.textContent);
  allParas.forEach((p) => (p.textContent = ""));

  const typingSpeed = 50;

  function typeParagraph(index = 0) {
    if (index >= allParas.length) return;

    const para = allParas[index];
    const text = texts[index];
    let i = 0;

    function typeNext() {
      if (i < text.length) {
        para.textContent += text.charAt(i);
        i++;
        setTimeout(typeNext, typingSpeed);
      } else {
        typeParagraph(index + 1);
      }
    }

    typeNext();
  }

  typeParagraph();
});
