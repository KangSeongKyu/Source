var ganvas = document.getElementById("myBack");
var gtx = ganvas.getContext('2d');
var baImage = new Image();
baImage.src = "back.png";
baImage.onload = function(){
	  if(score>=0&&score<300){
      baImage.src = "back1.png";
    }else if(score>=300&&score<600){
      baImage.src = "back2.png";
    }else if(score>=600&&score<900){
      baImage.src = "back3.png";
    }else if(score>=900&&score<1200){
      baImage.src = "back4.png";
    }else{
      baImage.src = "back5.png";
    }
	  gtx.drawImage(baImage,0,0,ganvas.width,ganvas.height);

	  gtx.strokeStyle = 'white';
	  gtx.font = '40px Bombardment';
	  gtx.fillText("LIVE ", 30, 35);
	  gtx.fillStyle = 'white';
	  gtx.font = '40px Bombardment';
	  gtx.fillText(lives, 130, 35);

	  gtx.strokeStyle = 'white';
	  gtx.font = '40px Bombardment';
	  gtx.fillText("SCORE ", 30, 635);
	  gtx.fillStyle = 'white';
	  gtx.font = '40px Bombardment';
	  gtx.fillText(score, 160, 635);//fixed
}

////////////////////////////////////////////////////////////////////////
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext('2d');
////////////////////////////////////////////////////////////////////////
ganvas.width = window.innerWidth;
ganvas.height = window.innerHeight;
canvas.width = window.innerWidth;
canvas.height = window.innerWidth*(11/7);
////////////////////////////////////////////////////////////////////////
var tout; // setTimeout(detectCollision) 담는 변수
var max; // 실행해서 나왔던 게임점수 중 가장 고득점 뽑는 변수
var score = 0;
var lives = 2;
var maxScore = [];
var cnt = 15; // 키 갯수
var point=0; // 점수 
var speed = 5; // 레이저 속도
var ballpixel=canvas.width/7; // 볼(벽) 크기
var px=5; //캐릭터 최초 시작 x축 지점
var py=10; //캐릭터 최초 시작 y축 지점
////////////////////////////////////////////////////////////////////////
var backImage = new Image(); // 배경화면
 backImage.src = "back.png";
 backImage.onload = function(){
    ctx.drawImage(backImage, 0, 0);
 };
////////////////////////////////////////////////////////////////////////
 var ball = {}; // 캐릭터
 ball.x = ballpixel*px;     
 ball.y = ballpixel*py;     
 var ballImage = new Image();
 ballImage.src = "ryan.png";
 ballImage.onload = function(){
   if(lives==2){
   	   ctx.drawImage(ballImage, ball.x, ball.y, ballpixel, ballpixel);
   }else{
   	   ctx.drawImage(bombImage, ball.x, ball.y, ballpixel, ballpixel);
   }

 };
////////////////////////////////////////////////////////////////////////
 var wall = new Image(); // 장애물 벽
 wall.src = "wall.png";
 wall.onload = function(){
    for (var y = 0; y < canvas.height-ballpixel+1; y=y+(ballpixel*2)) { 
       for (var x = 0; x < canvas.width-ballpixel+1; x=x+(ballpixel*2)) { 
          ctx.drawImage(wall, x, y, ballpixel, ballpixel); 
       }
    } 
 };
////////////////////////////////////////////////////////////////////////
//캐릭터가 먹어야 하는 아이템 관련 코드
var key = {};
var keyImage = new Image();
keyImage.src = "key.png";
var keyx = [ballpixel,ballpixel,ballpixel,ballpixel,ballpixel,
  (ballpixel*3),(ballpixel*3),(ballpixel*3),(ballpixel*3),(ballpixel*3),
  (ballpixel*5),(ballpixel*5),(ballpixel*5),(ballpixel*5),(ballpixel*5)];
var keyy = [ballpixel,(ballpixel*3),(ballpixel*5),(ballpixel*7),(ballpixel*9),
  ballpixel,(ballpixel*3),(ballpixel*5),(ballpixel*7),(ballpixel*9),
  ballpixel,(ballpixel*3),(ballpixel*5),(ballpixel*7),(ballpixel*9)];
function drawKey(a,b){
  for(var i=0; i<a.length; i++){
    if(a[i]==undefined&&b[i]==undefined){
      i++;
    }
    if(a[i]==ball.x&&b[i]==ball.y){
      point=point+10; //fixed
      a.splice(i,1);
      b.splice(i,1);
      cnt--;
    }
  }
  if(cnt==0){
    keyx.push(ballpixel,ballpixel,ballpixel,ballpixel,ballpixel,
			  (ballpixel*3),(ballpixel*3),(ballpixel*3),(ballpixel*3),(ballpixel*3),
			  (ballpixel*5),(ballpixel*5),(ballpixel*5),(ballpixel*5),(ballpixel*5));
    keyy.push(ballpixel,(ballpixel*3),(ballpixel*5),(ballpixel*7),(ballpixel*9),
			  ballpixel,(ballpixel*3),(ballpixel*5),(ballpixel*7),(ballpixel*9),
			  ballpixel,(ballpixel*3),(ballpixel*5),(ballpixel*7),(ballpixel*9));
    cnt=15;
  }
  if(point>=150){//fixed
    point=0;//fixed
    speed=speed+1.5;
  }
  return a,b;
}
////////////////////////////////////////////////////////////////////////
var ran = function(a, b){ // 레이저 나오는 구역 랜덤으로 추출할 함수
    var ranNum = Math.floor(Math.random()*(b-a+1))+a;
    return ranNum;
};
////////////////////////////////////////////////////////////////////////
var laserA = {}; // 세로 레이저 관련 코드
laserA.x = -(ballpixel);
laserA.y = -(ballpixel);
function movelaserA(){
  var aX = [ballpixel,(ballpixel*3),(ballpixel*5)];
  var rx = ran(0,aX.length);
  ctx.drawImage(laserAImage, laserA.x, laserA.y += speed, ballpixel, (ballpixel*2));
    if(laserA.x < 0){
       laserA.x = aX[rx];
    }
    if(laserA.x >canvas.width){
       laserA.x = aX[rx];
    }
    if(laserA.y > canvas.height){
       laserA.x = aX[rx];
       laserA.y = -(ballpixel*2);
    }
}
var laserAImage = new Image();
laserAImage.src = "laserC.png";
laserAImage.onload = function(){
  laserAReady = true;
};        
////////////////////////////////////////////////////////////////////////
var laserB = {}; //가로 레이저 관련 코드
laserB.x = -(ballpixel);
laserB.y = -(ballpixel);
function movelaserB(){
	var aY = [ballpixel,(ballpixel*3),(ballpixel*5),(ballpixel*7),(ballpixel*9)];
    var ry = ran(0,aY.length);
 
    ctx.drawImage(laserBImage, laserB.x += speed, laserB.y, (ballpixel*2), ballpixel);

    if(laserB.y < 0){
       laserB.y = aY[ry];
    }
    if(laserB.y >canvas.height){
       laserB.y = aY[ry];
    }
    if(laserB.x > canvas.width){
       laserB.x = -(ballpixel*2);
       laserB.y = aY[ry];
    }
}
var laserBImage = new Image();
laserBImage.src = "laserR.png";
laserBImage.onload = function(){
	laserBReady = true;
};
////////////////////////////////////////////////////////////////////////
var collision = {};
var bombImage = new Image();
bombImage.src = "ryan2.png";
bombImage.onload = function(){
  bool_bomb = true;
};
function drawBomb(){
  ctx.drawImage(bombImage,ball.x,ball.y,ballpixel,ballpixel);
}
function detectCollision(){
  a1 = laserA.y;
  a2 = a1+ballpixel;
  a3 = a1+(ballpixel*2);
  a4 = a2+(ballpixel*2);

  b1 = laserB.x;
  b2 = b1+(ballpixel*2);
  b3 = b1+ballpixel;
  b4 = b2+ballpixel;

  if((ball.x>b1&&ball.x<b2&&ball.y==laserB.y)||
    (ball.y>a1&&ball.y<=a3-(ballpixel/6)&&ball.x==laserA.x)){
    bool_collision = true;
    if(lives <= 0){
    	lives = 0;
    	gameOver();
    } else {
    	lives--;
  	}
  }
  return lives;
  
}
////////////////////////////////////////////////////////////////////////
function gameOver(){
	isGameOver = true;
	bool_bomb = false;
	keyx = [];
	keyy = [];
	cnt = 15;
	point = 0;//fixed
	maxScore.push(score);
	var max = Math.max.apply(null, maxScore);
	$("#maxScore").text("MAX SCORE: "+max);
	clearTimeout(tout);
	$("#gameover").css("display","block");
}
////////////////////////////////////////////////////////////////////////
function restart(){
	isGameOver = false;
	bool_bomb = true;
	lives=2;
	score=0;
	restartOpt();
	$("#gameover").css("display","none");
}
function restartOpt(){
  speed = 5;
  laserA.x = -(ballpixel);
  laserA.y = -(ballpixel);
  laserB.x = -(ballpixel);
  laserB.y = -(ballpixel);
  ball.x = ballpixel*px;
  ball.y = ballpixel*py;
  keyx = [ballpixel,ballpixel,ballpixel,ballpixel,ballpixel,
  (ballpixel*3),(ballpixel*3),(ballpixel*3),(ballpixel*3),(ballpixel*3),
  (ballpixel*5),(ballpixel*5),(ballpixel*5),(ballpixel*5),(ballpixel*5)];
  keyy = [ballpixel,(ballpixel*3),(ballpixel*5),(ballpixel*7),(ballpixel*9),
  ballpixel,(ballpixel*3),(ballpixel*5),(ballpixel*7),(ballpixel*9),
  ballpixel,(ballpixel*3),(ballpixel*5),(ballpixel*7),(ballpixel*9)];
  for(var i=0; i<keyx.length; i++){
	  ctx.drawImage(keyImage, keyx[i]+(ballpixel/4), keyy[i]+(ballpixel/4), (ballpixel/2), (ballpixel/2));
  }	
}
$("#restart").click(function(){
	restart();
});
/////////////////////////////////////////////////////////////////////////
var isGameOver = false;
var bool_collision = false;
var bool_bomb = false;
var laserAReady = false;
var laserBReady = false;
var baReady = false;
var backReady = false;
var ballReady = false;
var wallReady = false;
var keyReady = false;

baImage.onload = function(){
   baReady = true;
};

backImage.onload = function(){
   backReady = true;
};
ballImage.onload = function(){
   ballReady = true;
};
wall.onload = function(){
   wallReady = true;
};
keyImage.onload = function(){
  keyReady = true;
};
////////////////////////////////////////////////////////////////////////
// render 함수 //
var lastup = 0;
var acDelta =0;
var msFrame = 1000;
var render = function(){
 	var delta = Date.now() - lastup;
 	if(acDelta > msFrame){
 		acDelta = 0;
	 	if(baReady){
		  if(score>=0&&score<300){
		  	baImage.src = "back1.png";
		  }else if(score>=300&&score<600){
		  	baImage.src = "back2.png";
		  }else if(score>=600&&score<900){
		  	baImage.src = "back3.png";
		  }else if(score>=900&&score<1200){
        baImage.src = "back4.png";
      }else{
        baImage.src = "back5.png";
      }
		  gtx.drawImage(baImage,0,0,ganvas.width,ganvas.height);

		  gtx.strokeStyle = 'white';
		  gtx.font = '40px Bombardment';
		  gtx.fillText("LIVE ", 30, 35);
		  gtx.fillStyle = 'white';
		  gtx.font = '40px Bombardment';
		  gtx.fillText(lives, 130, 35);

		  gtx.strokeStyle = 'white';
		  gtx.font = '40px Bombardment';
		  gtx.fillText("SCORE ", 30, 635);
		  gtx.fillStyle = 'white';
		  gtx.font = '40px Bombardment';
		  gtx.fillText(score, 160, 635);//fixed
		}
	   	if(backReady){
	         ctx.drawImage(backImage, 0, 0);
	    }
	    if(wallReady){
	        for (var y = 0; y < canvas.height-ballpixel+1; y=y+(ballpixel*2)) { 
	            for (var x = 0; x < canvas.width-ballpixel+1; x=x+(ballpixel*2)) { 
	                ctx.drawImage(wall, x, y, ballpixel, ballpixel); 
	            }
	        } 
	    }
	    if(ballReady){
			if(lives==2){
		   	   ctx.drawImage(ballImage, ball.x, ball.y, ballpixel, ballpixel);
		   }else{
		   	   ctx.drawImage(bombImage, ball.x, ball.y, ballpixel, ballpixel);
		   }
	    }
	    if(keyReady){
	      for(var i=0; i<keyx.length; i++){
	        ctx.drawImage(keyImage, keyx[i]+(ballpixel/4), keyy[i]+(ballpixel/4), (ballpixel/2), (ballpixel/2));
	      }
	    }
	    if(laserAReady){
	    	movelaserA();
	    }
	    if(laserBReady){
	    	movelaserB();
	    }
    }else{
    	acDelta += delta;
    }
};
////////////////////////////////////////////////////////////////////////
//키보드 이벤트//

var downx, downy, upx, upy;

document.addEventListener('touchmove', function(event) {


    event.preventDefault();


    var touch = event.touches[0];


    alert("Touch x:" + touch.pageX + ", y:" + touch.pageY);

}, false);

addEventListener("keydown", function(e){
  if(38 === e.keyCode){
     ball.y = ball.y-ballpixel;
  }
  if(40 === e.keyCode){
     ball.y = ball.y+ballpixel;
  }
  if(37 === e.keyCode){
     ball.x = ball.x-ballpixel;
  }
  if(39 === e.keyCode){
     ball.x = ball.x+ballpixel;
  }
  if(ball.x <=0){
     ball.x=0;
  }
  if(ball.x>=canvas.width-ballpixel){
     ball.x = canvas.width-ballpixel;
  }
  if(ball.y <=0){
     ball.y=0;
  }
  if(ball.y>=canvas.height-ballpixel){
     ball.y = canvas.height-ballpixel;
  }
  for (var i = 0; i < canvas.height-ballpixel+1; i=i+(ballpixel*2)){ 
     for (var j = 0; j < canvas.width-ballpixel+1; j=j+(ballpixel*2)){
        if(ball.x==j && ball.y==i){
           if(38===e.keyCode){ // up
              ball.x = ball.x;
              ball.y = ball.y+ballpixel;
           }
           if(40===e.keyCode){ //down
              ball.x = ball.x;
              ball.y = ball.y-ballpixel;
           }
           if(37===e.keyCode){ //left
              ball.x = ball.x+ballpixel;
              ball.y = ball.y;
           }
           if(39===e.keyCode){ //right
              ball.x = ball.x-ballpixel;
              ball.y = ball.y;
           }
        }
     }
  }
  for(var i=0; i<keyx.length; i++){
    if(ball.x == keyx[i]&& ball.y==keyy[i]){
      drawKey(keyx, keyy);
      score=score+10;
    }
  }
  render();
  console.log("Cwidth:", canvas.width);
  console.log("Gwidth:", ganvas.width);
  console.log("Cheight:", canvas.height);
  console.log("Gheight:", ganvas.height);
  console.log("windowwidth:", window.innerWidth);
  console.log("windowHeight:", window.innerHeight);
},false);
////////////////////////////////////////////////////////////////////////
//게임 실행할 main 함수//
var main = function(){
  console.log("Cwidth:", canvas.width);
  console.log("Gwidth:", ganvas.width);
  console.log("Cheight:", canvas.height);
  console.log("Gheight:", ganvas.height);
  console.log("windowwidth:", window.innerWidth);
  console.log("windowHeight:", window.innerHeight);
  if(!isGameOver){
  	render();
  }
  if(lives<2){
  	tout = setTimeout("detectCollision()", 2000);
  }else{
  	detectCollision();
  }
  requestAnimationFrame(main);
};

main();
