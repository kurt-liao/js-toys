const randomButton = document.querySelector(".random");
const copyButton = document.querySelector(".copy");
const paletteButton = document.querySelector(".palette");

let style = "",
  id = null;

const blendModes = [
  "normal",
  "multiply",
  "screen",
  "overlay",
  "lighten",
  "hard-light",
  "soft-light",
  "hue",
  "color"
];

function reset() {
  document.body.removeAttribute("style");

  const packColors = document.querySelectorAll(".palette-color");
  packColors.forEach((e) => e.remove());
}

function copy(value) {
  if (id) return;

  const textArea = document.createElement("textarea");
  textArea.value = value;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);

  const hint = document.getElementById("copy-hint");
  let base = 20;
  let pos = hint.getBoundingClientRect().top;
  let center = document.body.scrollHeight / 2;
  let percent = 1 / ((pos - center) / base);
  let resetRate = 1 / base;

  let i = 0;
  clearInterval(id);
  id = setInterval(animate, 10);

  function animate() {
    if (pos < center) {
      clearInterval(id);
      hint.style.opacity = 1;
      i = 0;

      setTimeout(() => {
        id = setInterval(resetHint, 20);
      }, 300);
    } else {
      pos -= base;
      hint.style.top = pos + "px";
      hint.style.opacity = percent * i;
      i++;
    }
  }

  function resetHint() {
    if (hint.style.opacity <= 0) {
      clearInterval(id);
      hint.style.top = document.body.scrollHeight + "px";
      hint.style.opacity = 0;
      id = null;
    } else {
      hint.style.opacity = 1 - resetRate * i;
      i++;
    }
  }
}

function css(element, style) {
  for (const property in style) element.style[property] = style[property];
}

function createNode(bgColor) {
  const div = document.createElement("div");
  div.addEventListener("click", () => copy(bgColor.toUpperCase()));
  div.classList.add("palette-color");
  css(div, {
    "background-color": bgColor,
    position: "relative"
  });

  const span = document.createElement("span");
  span.innerText = bgColor.toUpperCase();
  css(span, {
    color: "#fff",
    "background-color": "rgba(0, 0, 0, .3)",
    padding: "3px 6px",
    position: "absolute",
    bottom: "3px",
    left: 0
  });

  div.appendChild(span);

  return div;
}

function generateGradient() {
  reset();

  let gradient = "",
    mode = "";
  for (let i = 0; i < 4; i++) {
    const deg = Math.floor(Math.random() * 180);
    const firstColor = randomColor({
      luminosity: "bright",
      hue: "blue",
      format: "rgba"
    });
    const lastColor = randomColor({
      luminosity: "light",
      hue: "red",
      format: "rgba",
      alpha: 0.5
    });
    const firstSpread = Math.floor(Math.random() * 90);
    const lastSpread = Math.floor(Math.random() * 180);
    mode += `${blendModes[Math.floor(Math.random() * blendModes.length)]},`;
    gradient += `linear-gradient(${deg}deg, ${firstColor} ${firstSpread}%, ${lastColor} ${lastSpread}%),`;
  }

  style = `background-image: ${gradient.slice(
    0,
    -1
  )}; background-blend-mode: ${mode.slice(0, -1)};`;

  document.body.style = style;
}

function generatePackColors() {
  reset();

  const first = randomColor();
  const second = randomColor();
  const third = randomColor();
  const last = randomColor();

  const nodes = [first, second, third, last].map((e) => createNode(e));
  nodes.forEach((node) => {
    document.body.appendChild(node);
  });
}

generateGradient();

randomButton.addEventListener("click", (e) => {
  e.preventDefault();
  generateGradient();
});

paletteButton.addEventListener("click", (e) => {
  e.preventDefault();
  generatePackColors();
});

document.body.addEventListener("click", () => copy(style));
