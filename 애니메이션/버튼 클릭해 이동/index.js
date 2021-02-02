const btn1 = document.querySelector("#btn1");
const btn2 = document.querySelector("#btn2");
const arrow = document.querySelector(".arrow");

btn1.addEventListener("click", () => {
  let pre = parseInt(arrow.style.left);
  arrow.style.left = pre - 10 + "px";
});

btn2.addEventListener("click", () => {
  let pre = parseInt(arrow.style.left);
  arrow.style.left = pre + 10 + "px";
});
