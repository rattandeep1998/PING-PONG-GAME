var playarea = document.getElementById("playarea");
var playarea1 = document.getElementById("playarea1");
var playarea2 = document.getElementById("playarea2");
var platearea1 = document.getElementById("platearea1");
var platearea2 = document.getElementById("platearea2");
var plate1 = document.getElementById("plate1");
var plate2 = document.getElementById("plate2");
var ballframe = document.getElementById("ballframe");
var ball = document.getElementById("ball");
var scorep1 = document.getElementById("scorep1");
var scorep2 = document.getElementById("scorep2");
var rounddisplay = document.getElementById("rounddisplay");
var gamestatus = document.getElementById("gamestatus");


var playareaRect = playarea.getBoundingClientRect();
var ballframeRect = ballframe.getBoundingClientRect();
var playarea1Rect = platearea1.getBoundingClientRect();
var playarea2Rect = platearea2.getBoundingClientRect();
var platearea1Rect = platearea1.getBoundingClientRect();
var platearea2Rect = platearea2.getBoundingClientRect();
var scorep1Rect = scorep1.getBoundingClientRect();
var scorep2Rect = scorep2.getBoundingClientRect();
var rounddisplayRect = rounddisplay.getBoundingClientRect();
 
var ballRect = ball.getBoundingClientRect();



scorep1.style.left = scorep1Rect.left - scorep1Rect.width/2 + "px";
scorep2.style.left = scorep2Rect.left - scorep2Rect.width/2 + "px";
rounddisplay.style.left = rounddisplayRect.left - rounddisplayRect.width/2 + "px";


ballframe.style.top = ballframeRect.top - ballframeRect.height/2 + "px";
ballframe.style.left = ballframeRect.left - ballframeRect.width/2 + "px";

ball.style.top = ballRect.top - ballRect.height/2 + "px";
ball.style.left = ballRect.left - ballRect.width/2 + "px";

var plate1Rect = plate1.getBoundingClientRect();
var plate2Rect = plate2.getBoundingClientRect();

plate1.style.top = plate1Rect.top - plate1Rect.height/2 + "px";
plate2.style.top = plate2Rect.top - plate2Rect.height/2 + "px";


var initialplate1Rect = plate1.getBoundingClientRect();
var initialplate2Rect = plate2.getBoundingClientRect();
var initialballRect = ball.getBoundingClientRect();

var totalRound=3;
var roundNumber=0;
var id = null;
var scorePlayer1=0;
var scorePlayer2=0;

var currentPlayer=1;  //it will be reversed while giving setInterval id

//MovePlate
document.addEventListener("keydown",nextround);

function moveplate(event) {
	console.log(event);
	if(!roundOver())
	{
		var plate1Rect = plate1.getBoundingClientRect();
		var plate2Rect = plate2.getBoundingClientRect();
		if(currentPlayer === 1)
		{
			if(event.which === 87  && upwardmovePossible(plate1,platearea1)) {
				plate1.style.top = plate1Rect.top - 10 + "px";  //w
			}
			if(event.which === 83 && downwardmovePossible(plate1,platearea1)) {
				plate1.style.top = plate1Rect.top + 10 + "px";  //s
			}
		}
		if(currentPlayer === 2)
		{
			if(event.which === 38 && upwardmovePossible(plate2,platearea2)) {
				plate2.style.top = plate2Rect.top - 10 + "px";  //up
			}
			if(event.which === 40 && downwardmovePossible(plate2,platearea2)) {
				plate2.style.top = plate2Rect.top + 10 + "px";  //down
			}
		}
	}
}



function upwardmovePossible(platemoved,platearea) {
	var platemovedRect = platemoved.getBoundingClientRect();
	var plateareaRect = platearea.getBoundingClientRect();
	if(platemovedRect.top<plateareaRect.top)
	{
		platemoved.style.top = 0+"px";
		return 0;
	}
	return 1;
}

function downwardmovePossible(platemoved,platearea) {
	var platemovedRect = platemoved.getBoundingClientRect();
	var plateareaRect = platearea.getBoundingClientRect();
	if(platemovedRect.bottom>plateareaRect.bottom)
	{
		platemoved.style.top = plateareaRect.height - platemoved.height + "px";
		return 0;
	}

	return 1;
}


var speed=20;
var deltaX=5;
var deltaY=5;


function moveball()
{
	if(!roundOver())
	{
		var ballRect = ball.getBoundingClientRect();
		
		newtop = ballRect.top - deltaY ;
		newleft = ballRect.left - deltaX ;
		if(newtop<playareaRect.top)
		{
			newtop=playareaRect.top;
			deltaY = deltaY * -1;
		}
		if(newtop+ballRect.height>playareaRect.bottom)
		{
			newtop = playareaRect.bottom - ballRect.height;
			deltaY = deltaY * -1;	 	
		}
		if(newleft<platearea1Rect.right)
		{
			newleft = platearea1Rect.right;
			deltaX = deltaX * -1.05;
		}
		if(newleft+ballRect.width > platearea2Rect.left)
		{
			newleft = platearea2Rect.left-ballRect.width;
			deltaX = deltaX * -1.05;	
		}

		//var newtop1 = ballRect.top - deltaY + "px";
		//var newleft1 = ballRect.left - deltaX + "px";

		ball.style.top = newtop + "px";
		ball.style.left = newleft + "px";
	}
	else
	{
		clearInterval(id);
		//nextround();
	}
}

function roundOver() {
	var ballRect = ball.getBoundingClientRect();
	var plate1Rect = plate1.getBoundingClientRect();
	var plate2Rect = plate2.getBoundingClientRect();
	
	if(ballRect.left <= plate1Rect.right)
	{
		if((ballRect.top+ballRect.height/2) >= plate1Rect.top-10 && (ballRect.top+ballRect.height/2) <= plate1Rect.bottom+10)
		{
			currentPlayer = (currentPlayer === 1) ? 2 : 1; //Toggle Player
			return 0;
		}
		else
		{
			return -1;
		}
	}
	if(ballRect.left + ballRect.width >= plate2Rect.left)
	{
		if((ballRect.top+ballRect.height/2) >= plate2Rect.top-10 && (ballRect.top+ballRect.height/2) <= plate2Rect.bottom+10)
		{
			currentPlayer = (currentPlayer === 1) ? 2 : 1; //Toggle Player
			return 0;
		}
		else
		{
			return 1;
		}
	}
	return 0;
}






function nextround()
{

	if(event.which === 32)
	{

		if(roundNumber > totalRound-1)
		{
			console.log(roundNumber);
			//document.getElementById("gamestatus").innerHTML = "GAME OVER";
			roundNumber=0;
			window.location.reload();
		}



		console.log(event);
		if(roundOver())
		{

			var roundwin = roundOver();
			if(roundwin==1)
			{
				currentPlayer=1;
				scorePlayer1 += 1;
				scorep1.innerHTML = scorePlayer1;
			}
			else
			{
				currentPlayer=2;
				scorePlayer2 += 1;
				scorep2.innerHTML = scorePlayer2;	
			}
			//1 Player1 wins
			//-1 Player2 wins
			



			
			if(roundNumber === totalRound-1)
			{
				if(scorePlayer1 === Math.floor(totalRound/2)+1)
				{
					playarea.style.opacity=0.6;
					
					gamestatus.innerHTML = "Player 1 Wins<br/>GAME OVER";
					gamestatus.style.visibility="visible";
					var gamestatusRect = gamestatus.getBoundingClientRect();

					gamestatus.style.top = gamestatusRect.top - gamestatusRect.height/2 + "px";
					gamestatus.style.left = gamestatusRect.left - gamestatusRect.width/2 + "px";
					
				}
				if(scorePlayer2 === Math.floor(totalRound/2)+1)
				{
					playarea.style.opacity=0.6;
					gamestatus.innerHTML = "Player 2 Wins<br/>GAME OVER";
					gamestatus.style.visibility="visible";
					var gamestatusRect = gamestatus.getBoundingClientRect();

					gamestatus.style.top = gamestatusRect.top - gamestatusRect.height/2 + "px";
					gamestatus.style.left = gamestatusRect.left - gamestatusRect.width/2 + "px";
					
					//roundNumber = totalRound-1;
				}

				roundNumber=roundNumber+1;
			}
			else
			{


				roundNumber=roundNumber+1;
				document.getElementById("rounddisplay").innerHTML = "Round Number : " + (roundNumber+1);
				plate1.style.top = initialplate1Rect.top + "px";
				plate2.style.top = initialplate2Rect.top + "px";
				ball.style.top = initialballRect.top + "px";
				ball.style.left = initialballRect.left + "px";

				if(scorePlayer1 === Math.floor(totalRound/2)+1)
				{
					playarea.style.opacity=0.6;
					gamestatus.innerHTML = "Player 1 Wins<br/>GAME OVER";
					
					gamestatus.style.visibility="visible";
					var gamestatusRect = gamestatus.getBoundingClientRect();

					gamestatus.style.top = gamestatusRect.top - gamestatusRect.height/2 + "px";
					gamestatus.style.left = gamestatusRect.left - gamestatusRect.width/2 + "px";
					roundNumber = totalRound;
				}
				if(scorePlayer2 === Math.floor(totalRound/2)+1)
				{
					playarea.style.opacity=0.6;
					gamestatus.innerHTML = "Player 2 Wins<br/>GAME OVER";
					
					gamestatus.style.visibility="visible";
					var gamestatusRect = gamestatus.getBoundingClientRect();
					gamestatus.style.top = gamestatusRect.top - gamestatusRect.height/2 + "px";
					gamestatus.style.left = gamestatusRect.left - gamestatusRect.width/2 + "px";
					roundNumber = totalRound;
				}
					
			}
		}
		else
		{
			//currentPlayer = (currentPlayer === 1) ? 2 : 1; //Toggle Player
			deltaX = (deltaX > 0) ? 5 : -5;
			deltaY = (deltaY > 0) ? 5 : -5;
			id = setInterval(moveball,speed);
		}
	}
	else
	{
		moveplate(event);
	}
}
