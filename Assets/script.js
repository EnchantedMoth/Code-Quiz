
var timerEl = document.querySelector(".timer")
var questionEl = document.querySelector(".question")
var startGame = document.querySelector("#start-game")
var form = document.querySelector(".form")
var highScoresEl = document.querySelector(".high-scores")
var saveScoreBtn = document.querySelector("#save-score")
var initialsInput = document.querySelector("#initials")
var highScoreClck = document.querySelector(".high-score")
var choicesContainer = document.querySelector(".choices")
var bonusContainer = document.querySelector(".bonus")
var rightWrongEl = document.querySelector("#right-wrong")
// placeholder for the scores pulled from local storage
var scores = []
// holds points
var points = 0;
// place holder for which answer is correct
var currentCorrectButton = a;

var isPlayingGame = false;

// targeting my buttons
var a = document.querySelector(".a");
var b = document.querySelector(".b");
var c = document.querySelector(".c");
var d = document.querySelector(".d");
// making sure buttons are hidden when page loads
choicesContainer.setAttribute("Hidden", true)

var bonusA = document.querySelector("#bonus-A")
var bonusB = document.querySelector("#bonus-B")
var bonusC = document.querySelector("#bonus-C")
var bonusD = document.querySelector("#bonus-D")

bonusContainer.setAttribute("Hidden",true)

form.setAttribute("Hidden",true)
// sets what the time limit of the quiz

highScoresEl.setAttribute("Hidden", true)
var secondsLeft = 0;
// using this for testing so I couldn't double click the button
var debounce = false;
// I set question and answer lists in the resetQA function
var questionList = [
];
// questions go here once used so they don't get used twice
var usedQuestions = []

var answerList = [
];
// answers go here once they are used
var usedAnswers = []

// function used to move Q's and A's from the list to the usedlist
function moveTableElement(indexToMove, removeFromTable, addToTable) {
    addToTable.unshift(removeFromTable[indexToMove]);
    removeFromTable.splice(indexToMove, 1);
 
    console.log(usedAnswers)
}
// function to select a new question and answer set then randomizing the answer order as well as setting the correct answer
function newQuestion() {
    
    
    // choosing a random question and answer set
  var i = Math.floor(Math.random() * questionList.length)

  var selectedQuestion = questionList [i]

  var selectedAnswer = answerList [i]

  var buttonList = [a, b, c, d];

  var usedButtons = [];
    // I randomize the button order here
  for (v=0; v < 4; v++){
    var buttonRandom = Math.floor(Math.random() * buttonList.length)
    
    moveTableElement(buttonRandom, buttonList, usedButtons)
  }

  currentCorrectButton = usedButtons[0]

  
    // making sure we have a question and answer to select
  if (selectedQuestion && selectedAnswer){
    
    // setting which button holds the correct answer after randomizing
    moveTableElement(i, questionList, usedQuestions)
    moveTableElement(i, answerList, usedAnswers)
    questionEl.textContent = usedQuestions[0]

    var splitAnswers = usedAnswers[0].split('*')
    var correctAnswer = splitAnswers[0]
    
    usedButtons[0].textContent = splitAnswers[0]
    usedButtons[1].textContent = splitAnswers[1]
    usedButtons[2].textContent = splitAnswers[2]
    usedButtons[3].textContent = splitAnswers[3]



  } else {
    // if there are no more questions we get a bonus question
    choicesContainer.setAttribute("Hidden", true)
    bonusContainer.removeAttribute("Hidden")

    questionEl.textContent = "Bonus Question: What is the airspeed velocity of an unladen swallow"
    bonusA.textContent = "32.5 Miles Per Hour"
    bonusB.textContent = "Is it an African or European Swallow?"
    bonusC.textContent = "Blue! No..wait-AHHHHHHH"
    bonusD.textContent = "20.1 Miles Per Hour"

  };
};

function gameTimer() {
    timerEl.removeAttribute("Hidden")
    timerEl.textContent = "Time: " + secondsLeft;
    var timerInterval = setInterval(function(){
        secondsLeft--;
        timerEl.textContent = "Time: " + secondsLeft;

        if(secondsLeft === 0 || secondsLeft < 0) {

            clearInterval(timerInterval);
            if(isPlayingGame === true){
                endGame(true)
            }
            
        }

    }, 1000);
}

// event listeners to either add points or remove time
a.addEventListener("click", function(){
    if(a === currentCorrectButton) {
        points = points+2;
        right()
        newQuestion()

    } else {
        wrong()
        secondsLeft = secondsLeft-5;
        newQuestion()

    }
    
});

b.addEventListener("click", function(){
    if(b === currentCorrectButton) {
        right()
        points = points+2;
        newQuestion()

    } else {
        wrong()
        secondsLeft = secondsLeft-5;
        newQuestion()
    }
    
});

c.addEventListener("click", function(){
    if(c === currentCorrectButton) {
        right()
        points = points+2;
        newQuestion()

    } else {
        wrong()
        secondsLeft = secondsLeft-5;
        newQuestion()

    }
    
});

d.addEventListener("click", function(){
    if(d === currentCorrectButton) {
        right()
        points = points+2;
        newQuestion()
    } else {
        wrong()
        secondsLeft = secondsLeft-5;
        newQuestion()
    }
    
});
//variable to track quantity of function calls
var varCountVar = 0

//function to make the current right or wrong disappear
function stopShowingRightWrong(){
    varCountVar++
    var currentCount = varCountVar
    setTimeout(function(){
        if (varCountVar === currentCount){
        rightWrongEl.innerHTML = "";
    }
    },1500)
}
// functions to display if the answer select was right or wrong
function right(){
    rightWrongEl.innerHTML ="";
    var correct = document.createElement('p')
    correct.textContent = "Correct"
    rightWrongEl.append(correct)
    stopShowingRightWrong()
}

function wrong(){
    rightWrongEl.innerHTML ="";
    var incorrect = document.createElement('p')
    incorrect.textContent = "Incorrect"
    rightWrongEl.append(incorrect)
    stopShowingRightWrong()
}
// event listeners for the bonus question
bonusA.addEventListener("click", function(){
    endGame(true)
});

bonusB.addEventListener("click", function(){
    points = points + 10
    endGame(true)
});

bonusC.addEventListener("click", function(){
    points = points + 5
    endGame(true)
});

bonusD.addEventListener("click", function(){
    points = points + 4
    endGame(true)
});

// all my functions to start and restart the game
startGame.addEventListener("click", function() {
    
    if (debounce === false){
        form.setAttribute("Hidden", true)
        startGame.setAttribute("Hidden", true);
        highScoresEl.setAttribute("Hidden", true)
        choicesContainer.removeAttribute("Hidden");
        isPlayingGame = true;
        points = 0;
        debounce = true;
        secondsLeft = 60;
        resetQAs()
        gameTimer();
        newQuestion();
    }
});


// ends game and lets person enter their score
function endGame(isEndGame) {
    rightWrongEl.innerHTML = "";
    isPlayingGame = false;
    timerEl.setAttribute("Hidden", true)
    choicesContainer.setAttribute("Hidden", true);
    bonusContainer.setAttribute("Hidden", true)
    secondsLeft = 0
    questionEl.textContent = "Your score: " + points
    if(isEndGame === true){
    form.removeAttribute("Hidden")
    startGame.textContent = "Try again?"
} else {startGame.textContent = "Start Game"}
    debounce = false;
    startGame.removeAttribute("Hidden");
    
}
// where all my questions and answers are stored so when I call the function I can repopulate the variabls
function resetQAs() {
    questionList = [
        "When setting an interval which of these would equal 2 seconds?",
        "What is the index of smell? var senses = ['sight', 'sound', 'smell', 'taste', 'touch']", 
        "What will the following code output: console.log(typeof(42))?",
        "Which of the following is NOT a valid JavaScript data type?",
        "What function is used to print content to the console in JavaScript?",
        "What is the result of the expression: '5' + 3 in JavaScript?",
        "How can you comment in JavaScript?",
        "Which keyword is used to declare a function in JavaScript?",
        "Which method is used to add an element to the end of an array in JavaScript?"
    ];
    
    usedQuestions = []
    
    answerList = [ //correct answer is always answer 1
        "2000*twoSeconds*2s*time = 2.seconds",
        "[2]*[3]*[smell]*indexOfSenses = 'smell'",
        "number*42*string*undefined",
        "Character*String*Number*Boolean",
        "console.log()*log()*print()*prettyPleaseLogThisToTheConsole()",
        "53*8*'8'*Error",
        "// This is a comment*<!-- This is a comment -->*/ This is a comment /*com.('This is a comment')",
        "function*func*def*declare",
        "push()*addElement()*append()*insert()"
    ];
    
    usedAnswers = []
}
// event listener so when you click on save your score it can run the functions
saveScoreBtn.addEventListener("click", function(event){
    event.preventDefault();
    console.log(points)
    if(initialsInput.value.length === 3) {
        var score = {
            initials: initialsInput.value.toUpperCase(),
            pointsScored: points
        }
        scores.push(score)
        form.setAttribute("Hidden", true)
        storeMyScores()
        showScores()
    } else {
        alert("Please enter 3 letters for your initials to save your score")   
        initialsInput.value = ""
        return;
    }
    initialsInput.value = ""
});
// this function sorts my scores from highest to lowest highest then removes the lowest score from the array then dynamically builds that array through the loop so they can be shown
function setScores(){
    var sortedScores = scores.sort(function (a, b){
        return b.pointsScored - a.pointsScored
    })

    console.log(sortedScores)

    scores.splice(5,1)

    console.log(scores)
    highScoresEl.innerHTML =''

    for(var i = 0; i < scores.length; i++){
        var h3 = document.createElement('h3')
        h3.textContent = "#" + [i+1] + " "  + scores[i].initials + " - " + scores[i].pointsScored

        highScoresEl.append(h3)

    }
}
// shows scores
function showScores(){
    setScores()
    questionEl.textContent = "Top Five Scores!"
    highScoresEl.removeAttribute("Hidden")
}
// checks for scores then adds them through the set scores function
function localScoresCheck() {
    var storedScores  = JSON.parse(localStorage.getItem("scores"));

    if (storedScores !== null){
        scores = storedScores;
    }
    console.log(scores)


    setScores()
}
// stores my scores to local storage
function storeMyScores () {
    
    localStorage.setItem("scores", JSON.stringify(scores))
}
//lets you check high scores whenever but also ends the game
highScoreClck.addEventListener("click", function(){
    endGame(false)
    showScores()
    form.setAttribute("Hidden", true)
})


//checks the local storage for stored scores when the page loads
localScoresCheck()




// The acceptance criteria

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