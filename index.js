
var n;
var play = false;
var colorButtons = ["green", "red", "yellow", "blue"];
var gameLevel = [];
var user_inputs = 0;

$(".btn").click(buttonClicks);

$(document).on("keydown", function (event) {
    if (event.keyCode > 64 && event.keyCode <= 122 && play === false) {
        console.log("Game started");
        play = true;
        setTimeout(newSequence, 400);
    }
});


function newSequence() {
    user_inputs = 0;
    n = randomNumber();
    gameLevel.push(colorButtons[n]);
    $("#" + colorButtons[n]).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(colorButtons[n]);
    $("h1").text("Level " + gameLevel.length);
}


function buttonClicks() {
    buttonPressedAnimation($(this));

    if (play === false) {
        gameOver();
    }
    else if (user_inputs >= gameLevel.length) {     //This never happens, but for a pre-caution
        gameOver();
    }
    else if ($(this).attr("id") !== gameLevel[user_inputs]) {
        gameOver();
    }
    else if (user_inputs === gameLevel.length - 1) {
        playSound($(this).attr("id"));
        setTimeout(newSequence, 1000);

    }
    else {
        playSound($(this).attr("id"));
        user_inputs += 1;
    }
}


function gameOver() {
    gameLevel = [];
    play = false;
    playSound("wrong");
    $("body").addClass("game-over").delay(100).queue(function (next) {
        $("body").removeClass("game-over");
        next();
    });
    $("h1").text("Game Over, Press Any Key to Restart");
}


function buttonPressedAnimation(pressedButton) {
    pressedButton.addClass("pressed").delay(100).queue(function (next) {
        pressedButton.removeClass("pressed");
        next();
    });
}


function playSound(sound) {
    var audio = new Audio("sounds/" + sound + ".mp3");
    audio.play();
}


function randomNumber() {
    return Math.floor(Math.random() * 4);
}



// // Alternative method for button click using setTimout function.
// $(".btn").click(function (e) {
//     $(e.target).addClass("pressed");
//     setTimeout(function () {
//         $(e.target).removeClass("pressed");
//         console.log(e.target);
//     }, 100);
// });
