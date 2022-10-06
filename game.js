var colors = ["red","green","yellow","blue"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = 0;

$(document).keypress(function(){
    if(!started)
    {
        nextSequence();
        started = true;
    }
})

$(".btn").click(function(){

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
    playSound(userChosenColor);
    animatePress(userChosenColor);
})

function nextSequence()
{
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = colors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(name)
{
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor)
{
    $("."+currentColor).addClass("pressed");

    setTimeout(() => {
        $("."+currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel])
    {
        if (userClickedPattern.length === gamePattern.length){

            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
    }
    else
    {
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(() => {
        $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver()
{
    gamePattern = [];
    level = 0;
    started = false;
}