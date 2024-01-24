
var timerEl = document.querySelector(".timer")

var startGame = document.querySelector("#start-game")

var a = document.querySelector(".a");
var b = document.querySelector(".b");
var c = document.querySelector(".c");
var d = document.querySelector(".d");


var secondsLeft = 5;
var debounce = false;

var questionList = [
    "question One",
    "question2", 
    "question3"
];

var usedQuestions = []

var answerList = [
    "answer1*answer2*answer3*answer4",
    "answer1*answer2*answer3*answer4",
    "answer1*answer2*answer3*answer4"
];

var usedAnswers = []




function newQuestion() {
  var questionSelect = Math.floor(Math.random() * questionList.length)

  var selectedQuestion = questionList [questionSelect]

  if (selectedQuestion != null){

  } else {

  };

  console.log(selectedQuestion)
};

function gameTimer() {
    timerEl.textContent = "Time: " + secondsLeft;
    var timerInterval = setInterval(function(){
        secondsLeft--;
        timerEl.textContent = "Time: " + secondsLeft;

        if(secondsLeft === 0) {
            clearInterval(timerInterval);
            debounce = false;
            startGame.removeAttribute("Hidden");
            startGame.textContent = "Try again?"
        }

    }, 1000);

   console.log(secondsLeft)
}



startGame.addEventListener("click", function() {
    
    if (debounce === false){
        startGame.setAttribute("Hidden", true)
        debounce = true;
        secondsLeft = 5;
        gameTimer();
        newQuestion();
    }
})

// gameTimer()
































// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and my score