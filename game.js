let buttonColors=["red","green","blue","yellow"];
let gamePattern=[];
let userClickedPattern=[];
let level=0;
let started=false;



$(document).keypress(function(){
    if(!started){
    $("h1").text(`Level ${level}`);
    nextSequence();
    started=true;
}
}
)

function nextSequence(){
    userClickedPattern = [];
    level++;

    $("h1").text(`Level ${level}`);

    let randomNumber= Math.floor(Math.random()*4);
    let randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    
    $("#"+randomChosenColor).fadeOut(150).fadeIn(150); 
    playsound(randomChosenColor); 
  
  
    return gamePattern;
}

$(".btn").click(function(){
    userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatepress(userChosenColour);
    playsound(userChosenColour);
    
      checkAnswer(userClickedPattern.length - 1);
});

function playsound(color){
    let sound=new Audio(`sounds/${color}.mp3`);
    sound.play();
}

function animatepress(currentColor){
$("#"+currentColor).addClass("pressed")
setTimeout(function(){$("#"+currentColor).removeClass("pressed")},100);
}


function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
      
        if(userClickedPattern.length == gamePattern.length)
        {
            setTimeout(function(){
                nextSequence();
            },500);
        }

    }
    else
    {
        $("body").addClass("game-over");
        playsound("wrong");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over Press any key to restart");
        restart();
        
    }
    
   
   }

   function restart(){
       gamePattern = [];
       userClickedPattern=[];
       level=0;
       started=false;
   }