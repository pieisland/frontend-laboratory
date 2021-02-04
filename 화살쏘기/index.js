const bowObj = document.querySelector(".bow");
const clientRect = bowObj.getBoundingClientRect();

function getDegree(e) {
  //중간 위치를 (y1, x1)으로 잡았어요.
  let y1 = clientRect.y + clientRect.height / 2;
  let x1 = clientRect.x + clientRect.width / 2;
  //사용자가 클릭한 위치
  let y2 = e.clientY;
  let x2 = e.clientX;

  //차이
  const dy = y2 - y1;
  const dx = x2 - x1;

  //삼각형의 윗변과 아랫변을 구한다.
  const a = Math.sqrt(dy * dy + dx * dx);
  const b = Math.abs(dx);

  //acos으로
  //각도 = 라디안 * 360 / 2pi
  let degree = (Math.acos(b / a) * 360) / (2 * Math.PI);

  //각을 좀 조정해줍니다...
  //음수로 바꿔주는 이유는 아래로 내려가는 방향이 각이 증가하는 방향이기 때문.
  degree = -degree;
  if (y2 > y1) {
    //사용자가 클릭한 위치가 더 아래에 있으면
    degree = -degree;
  }

  if (x2 < x1) {
    //사용자가 클릭한 위치가 더 왼쪽에 있으면
    degree = 180 - degree;
    //degree = -degree;
  }

  return degree;
}

window.addEventListener("click", (e) => {
  let c1, c2;

  //활의 중간 위치(y1, x1)
  let y1 = clientRect.y + clientRect.height / 2;
  let x1 = clientRect.x + clientRect.width / 2;
  //사용자가 클릭한 위치(y2, x2)
  let y2 = e.clientY;
  let x2 = e.clientX;

  //새로운 화살을 만든다.
  let newArrow = document.createElement("div");
  newArrow.classList.add("arrow");
  //body에 자식으로 붙이고 원하는 위치에서 바로나올 수 있도록 position을 absolute로 준다.
  document.querySelector("body").appendChild(newArrow);
  newArrow.style.position = "absolute";

  //활과 동일한 위치에 배치한다.
  newArrow.style.top = "300px"; //clientRect.y + clientRect.height / 2;
  newArrow.style.left = "300px"; //clientRect.x + clientRect.width / 2;

  //console.log("position", newArrow.style.top, newArrow.style.left);
  //화살도 회전시킨다.
  let degree = getDegree(e);
  newArrow.style.transform = "rotate(" + degree + "deg)";

  //화살이 날아가는 방향을 계산함에 있어 양수 각도가 필요해 다시 abs로 계산합니다.
  let tmpDegree = Math.abs(degree);
  //왼쪽 위가 (0, 0)이고 오른쪽 아래가 (n, n)이기 때문에
  //증가 감소가 생각과 좀 다르다.

  if (y1 > y2 && x1 < x2) {
    //1사분면. 오른쪽 위로 날아가야하므로
    console.log("1사분면");
    c1 = 1; //x는 증가
    c2 = -1; //y는 감소
  } else if (y1 > y2 && x1 > x2) {
    //2사분면
    console.log("2사분면"); //.. 근데 이게 뭐 각도때문에 뭔가 안맞음 ^0^
    c1 = 1; //x는 감소 -1
    c2 = 1; //y는 감소 -1
  } else if (y1 < y2 && x1 > x2) {
    //3사분면
    console.log("3사분면");
    c1 = 1; //x는 감소 -1
    c2 = 1; //y는 증가 1
  } else {
    console.log("4사분면");
    c1 = 1; //x는 증가
    c2 = 1; //y는 증가
  }

  // console.log(Math.cos(tmpDegree), Math.sin(tmpDegree));
  //degree를 라디안으로 바꿔서 얼마나 움직여야할지 계산해준다.
  //각도 = 라디안 * 360 / 2pi
  let diffx = 100 * Math.cos((tmpDegree * Math.PI) / 180);
  let diffy = 100 * Math.sin((tmpDegree * Math.PI) / 180);
  //console.log("diffx, diffy", diffx, diffy);

  let cnt = 0;
  let timer = setInterval(() => {
    cnt++;
    if (cnt > 10) {
      //화살 삭제
      document.querySelector("body").removeChild(newArrow);

      clearInterval(timer);
    }

    //300은 시작위치고요. diffx는 해당 각도로 봤을 때 cosine, sine 구해가지고 얼마나 가는지 구하는 것.
    newArrow.style.left = 300 + diffx * cnt * c1 + "px"; //x
    newArrow.style.top = 300 + diffy * cnt * c2 + "px"; //y
  }, 100);
});

window.addEventListener("mousemove", (e) => {
  //console.log(e.clientX, e.clientY);
  let degree = getDegree(e);
  // console.log(degree);

  bowObj.style.webkitTransform = "rotate(" + degree + "deg)";
});
