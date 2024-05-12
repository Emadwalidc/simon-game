var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var level = -1;
var started = false;

function nextSequence() {
    userClickedPattern = [];
    level++;
    var theRandomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColours[theRandomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+ randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    $("h1").text("level "+level);
}


$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});


function playSound (name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}


$(document).keypress(function (){
    if(!started) {
        nextSequence();
        $("h1").text("level "+level);
        started = true;
    }
    
});

function checkAnswer(currentLevel) {
        if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
            console.log("success");

            if(userClickedPattern.length === gamePattern.length) {
                setTimeout(function () {
                    nextSequence();
                  }, 1000);
            }
        } else {
            console.log("failed");
            var audio = new Audio("sounds/wrong.mp3");
            audio.play();
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over"); 
            },200);
            $("h1").html("Game Over, Press Any Key to Restart");
            startOver();
        }
}

function startOver() {
    level = -1;
    started = false;
    gamePattern = [];
}