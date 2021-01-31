const arrowObj = document.querySelector(".arrow");
const clientRect = arrowObj.getBoundingClientRect();
window.addEventListener("click", (e) => {
  console.log(e.clientY, e.clientX);
  console.log("발사!");
});

window.addEventListener("mousemove", (e) => {
  //console.log(e.clientX, e.clientY);
  let y1 = clientRect.y - clientRect.height / 2;
  let x1 = clientRect.x + clientRect.width / 2;
  let y2 = e.clientY;
  let x2 = e.clientX;

  const dy = y2 - y1;
  const dx = x2 - x1;

  const a = Math.sqrt(dy * dy + dx * dx);
  const b = Math.abs(dx);
  //   console.log("a: ", a);
  //   console.log("b:", b);
  let degree = (Math.acos(b / a) * 360) / (2 * Math.PI);
  //console.log("각도", degree);

  degree = -degree;
  if (y2 > y1) {
    degree = -degree;
  }

  //좀 이상하긴 함.
  if (x2 < x1) {
    degree = -degree;
  }

  arrowObj.style.webkitTransform = "rotate(" + degree + "deg)";
});
