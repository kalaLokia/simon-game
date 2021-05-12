
var n;
var play = false;
var colorButtons = ["green", "red", "yellow", "blue"];
var gameLevel = [];
var user_inputs = 0;


$(".start-btn").click(function () {
    toggleTitleElements();
    play = true;
    setTimeout(newSequence, 400);
});


$(".btn").click(buttonClicks);

// // Made a button instead of tapping a keyboard key
// $(document).on("keydown", function (event) {
//     if (event.keyCode > 64 && event.keyCode <= 122 && play === false) {
//         console.log("Game started");
//         play = true;
//         setTimeout(newSequence, 400);
//     }
// });


function newSequence() {
    user_inputs = 0;
    n = randomNumber();
    gameLevel.push(colorButtons[n]);
    $("#" + colorButtons[n]).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(colorButtons[n]);
    $("h1").text("Level " + gameLevel.length);
}


function buttonClicks() {
    user_inputs += 1;
    buttonPressedAnimation($(this));

    if (play === false) {
        flashingRedScreenAnimation();
    }
    else if (user_inputs > gameLevel.length) {      //This never happens, but for a pre-caution
        clearTimeout(next_sequence_time);           //In case user double tapped, clear next excecution of newSequence.
        gameOver();
    }
    else if ($(this).attr("id") !== gameLevel[user_inputs - 1]) {
        gameOver();
    }
    else if (user_inputs === gameLevel.length) {
        playSound($(this).attr("id"));
        next_sequence_time = setTimeout(newSequence, 1000);
    }
    else {
        playSound($(this).attr("id"));
    }
}


function gameOver() {
    console.log('GAME OVER');
    gameLevel = [];
    play = false;
    playSound("wrong");
    flashingRedScreenAnimation();

    $("h1").text("Game Over.");

    setTimeout(function () {
        $("h1").text("Try again!");
    }, 1500);

    setTimeout(function () {
        toggleTitleElements();
        $("h1").text("Level 0");
    }, 2500);
}


function toggleTitleElements() {
    $("h1").toggleClass("hide-me");
    $(".start-btn").toggleClass("hide-me");
}


function buttonPressedAnimation(pressedButton) {
    pressedButton.addClass("pressed").delay(100).queue(function (next) {
        pressedButton.removeClass("pressed");
        next();
    });
}

function flashingRedScreenAnimation() {
    $("body").addClass("game-over").delay(100).queue(function (next) {
        $("body").removeClass("game-over");
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
