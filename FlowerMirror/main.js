var pointID = 0;//初始化生成小花朵的ID
var magicFlag = 1;//初始化花神的flag，0为红，1为蓝
var score = 0;//统计玩家得分
var gameEnd = 0;//游戏结束flag，1表示已结束
var speed = 1000;

function init(){
  pointID = 0;
  magicFlag = 1;
  $(".centerCircle").css({"background-image": "url(src/centerCircleBlue.png)"});

  score = 0;
  gameEnd = 1;
  speed = 800;
  clearInterval(sh);
}

window.setInterval(createPoint, speed);

//生成小花朵
function createPoint(){
if(gameEnd === 0){
  var smallPoint = document.createElement("div");
  smallPoint.setAttribute("class", "smallPoint");

  //随机一种花的颜色
  var pointType = Math.round(Math.random());
  if(pointType === 0){
    //console.log("000"+pointType);
    smallPoint.setAttribute("typeID", "0");
    smallPoint.id="pointRed";
  }else{
    //console.log(pointType);
    smallPoint.setAttribute("typeID", "1");
    smallPoint.id="pointBlue";
  }

  //将花朵随机放置在外围圆圈上
  var x;
  var y;
  var angle = 2*Math.PI*Math.random();
  x = 300 + 250*(Math.cos(angle));
  y = 300 + 250*(Math.sin(angle));
  //console.log(x);
  //console.log(y);

  $(".outerCircle").append(smallPoint);
  smallPoint.style.left = (x - 15) + "px";
  smallPoint.style.top = (y - 15) + "px";

  //控制花朵运动向中心
  var pointsh = window.setInterval(function(){
    if(gameEnd === 0){
      distance2 = getDistanceToCenter(x, y, 30, 30);
      if(distance2 > 800){
        x-=2*Math.cos(angle);
        y-=2*Math.sin(angle);
        smallPoint.style.left = (x - 15) + "px";
        smallPoint.style.top = (y - 15) + "px";
      }else{//到达中心后判断是否终止游戏
        if(smallPoint.getAttribute("typeID") === ""+magicFlag){//得分
          score ++;
          document.getElementById("score").setAttribute("value", score+" 点");
          console.log(score);
          pointID ++;
          smallPoint.setAttribute("typeID", "2")
        }
        else if(smallPoint.getAttribute("typeID") === "0" || smallPoint.getAttribute("typeID") === "1"){//游戏终止
          pointID ++;
          smallPoint.setAttribute("typeID", "2");
          alert("end!");
          init();
        }
        smallPoint.remove();
        clearInterval(pointsh);
      }
    }else{
      smallPoint.remove();
      clearInterval(pointsh);
    }
  }, 15);
}
};

function getDistanceToCenter(x, y, dx, dy){
  var cx = x + dx/2;
  var cy = y + dy/2;
  var distance2 = (cx - 315)*(cx - 315) + (cy - 315)*(cy - 315);
  return distance2;
}

$(document).keydown(function (e){
  if (e.keyCode === 32){
    if(magicFlag === 0){
      magicFlag = 1;
      $(".centerCircle").css({"background-image": "url(src/centerCircleBlue.png)"});
    }else{
      magicFlag = 0;
      $(".centerCircle").css({"background-image": "url(src/centerCircleRed.png)"});
    }
  }
});

$("#start").on('click', function(e){
  location.reload(false);
});
