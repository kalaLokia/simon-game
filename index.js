
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
    n = randomNumber();
    gameLevel.push(colorButtons[n]);
    buttonAnimation($("#" + colorButtons[n]));
    console.log("Array: " + gameLevel);
    $("h1").text("Level " + gameLevel.length);
    user_inputs = 0;
}


function buttonClicks() {
    console.log("Level : " + gameLevel.length);

    if (play === false) {
        gameOver();
    }
    else if (user_inputs >= gameLevel.length) {
        gameOver();
        play = false;
    }
    else if ($(this).attr("id") !== gameLevel[user_inputs]) {
        play = false;
        gameOver();
    }
    else if (user_inputs === gameLevel.length - 1) {
        buttonAnimation($(this));
        setTimeout(newSequence, 1000);

    }
    else {
        buttonAnimation($(this));
        user_inputs += 1;
    }
}


function gameOver() {
    gameLevel = [];
    buttonSound("wrong");
    $("body").addClass("game-over").delay(100).queue(function (next) {
        $("body").removeClass("game-over");
        next();
    });
    $("h1").text("Game Over, Press Any Key to Restart");
}


function buttonAnimation(pressedButton) {

    buttonSound(pressedButton.attr("id"));
    pressedButton.addClass("pressed").delay(100).queue(function (next) {
        pressedButton.removeClass("pressed");
        next();
    });
}


function buttonSound(button) {
    switch (button) {
        case "green":
            var green_audio = new Audio("sounds/green.mp3");
            green_audio.play();
            break;
        case "red":
            var red_audio = new Audio("sounds/red.mp3");
            red_audio.play();
            break;
        case "yellow":
            var yellow_audio = new Audio("sounds/yellow.mp3");
            yellow_audio.play();
            break;
        case "blue":
            var blue_audio = new Audio("sounds/blue.mp3");
            blue_audio.play();
            break;
        case "wrong":
            var wrong_audio = new Audio("sounds/wrong.mp3");
            wrong_audio.play();
            break;
        default:
            console.log("Could not play the audio.");
    }
}


function randomNumber() {
    return Math.floor(Math.random() * 3);
}



// // Alternative method for button click using setTimout function.
// $(".btn").click(function (e) {
//     $(e.target).addClass("pressed");
//     setTimeout(function () {
//         $(e.target).removeClass("pressed");
//         console.log(e.target);
//     }, 100);
// });
