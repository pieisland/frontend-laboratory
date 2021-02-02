slider.addEventListener("click", (e) => {
  if (timer != undefined) {
    clearInterval(timer);
  }

  let diff = e.clientX - slider.getBoundingClientRect().x;
  bar.style.left = diff;
  let ratio = diff / slider.getBoundingClientRect().width;

  ball.style.top = ratio * (pos2[0] - pos1[0]) + "px";
  ball.style.left = ratio * (pos2[1] - pos1[1]) + "px";
});

play.addEventListener("click", () => {
  console.log("click btn");
  if (timer != undefined) {
    clearInterval(timer);
  }

  let cnt = 0;
  let divide = 100;
  timer = setInterval(function () {
    cnt++;
    if (cnt > divide) {
      clearInterval(timer);
    }
    ball.style.top = (cnt / divide) * (pos2[0] - pos1[0]) + "px";
    ball.style.left = (cnt / divide) * (pos2[1] - pos1[1]) + "px";
  }, 1000 / divide);

  //이거를 쓰는 게 되게... 아.. 별론데 ㅋㅋㅋㅋ
  //애니메이션으로 움직인 변화에 대해서는 html로 확인을 할 수도 없네요.
  //ball.style.animationPlayState = "running";
});
