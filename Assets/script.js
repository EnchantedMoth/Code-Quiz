
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

var count = 0;
// holds points
var points = 0;
// place holder for which answer is correct
var currentCorrectButton = a;

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
// holds all my questions
var questionList = [
    // "When setting an interval which of these would equal 2 seconds",
    // "What is the index of smell var senses = ['sight', 'sound', 'smell', 'taste', 'touch']", 
    // "question3"
];
// questions go here once used so they don't get used twice
var usedQuestions = []
// holds all my answers
var answerList = [ //correct answer is always answer 1
    // "2000*twoSeconds*2s*time = 2.seconds",
    // "[2]*[3]*[smell]*indexOfSenses = 'smell'",
    // "3answer1*answer2*answer3*answer4"
];
// answers go here once they are used
var usedAnswers = []

// function used to move Q's and A's from the holder to the used
function moveTableElement(indexToMove, removeFromTable, addToTable) {
    addToTable.unshift(removeFromTable[indexToMove]);
    removeFromTable.splice(indexToMove, 1);
 
    console.log(usedAnswers)
}
// function to select a new question and answer set then randomizing the answer order as well as setting the correct answer
function newQuestion() {
    
    

  var i = Math.floor(Math.random() * questionList.length)

  var selectedQuestion = questionList [i]

  var selectedAnswer = answerList [i]

  var buttonList = [a, b, c, d];

  var usedButtons = [];

  for (v=0; v < 4; v++){
    var buttonRandom = Math.floor(Math.random() * buttonList.length)
    
    moveTableElement(buttonRandom, buttonList, usedButtons)
  }

  currentCorrectButton = usedButtons[0]

  console.log(usedButtons)

  if (selectedQuestion && selectedAnswer){
    

    moveTableElement(i, questionList, usedQuestions)
    moveTableElement(i, answerList, usedAnswers)
    questionEl.textContent = usedQuestions[0]

    var splitAnswers = usedAnswers[0].split('*')
    var correctAnswer = splitAnswers[0]
    
    usedButtons[0].textContent = splitAnswers[0]
    usedButtons[1].textContent = splitAnswers[1]
    usedButtons[2].textContent = splitAnswers[2]
    usedButtons[3].textContent = splitAnswers[3]

    console.log(points)


  } else {
    choicesContainer.setAttribute("Hidden", true)
    bonusContainer.removeAttribute("Hidden")

    questionEl.textContent = "Bonus Question: What is the airspeed velocity of an unladen swallow"
    bonusA.textContent = "32.5 Miles Per Hour"
    bonusB.textContent = "Is it an African or European Swallow?"
    bonusC.textContent = "Blue! No..wait-AHHHHHHH"
    bonusD.textContent = "20.1 Miles Per Hour"

    // how do I make all of these event listeners remove when one is selected

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
            endGame()
        }

    }, 1000);
}


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

function right(){
    rightWrongEl.innerHTML ="";
    var correct = document.createElement('p')
    correct.textContent = "Correct"
    rightWrongEl.append(correct)
}

function wrong(){
    rightWrongEl.innerHTML ="";
    var incorrect = document.createElement('p')
    incorrect.textContent = "Incorrect"
    rightWrongEl.append(incorrect)
}

bonusA.addEventListener("click", function(){
    endGame()
});

bonusB.addEventListener("click", function(){
    points = points + 10
    endGame()
});

bonusC.addEventListener("click", function(){
    points = points + 5
    endGame()
});

bonusD.addEventListener("click", function(){
    points = points + 4
    endGame()
});


startGame.addEventListener("click", function() {
    
    if (debounce === false){
        form.setAttribute("Hidden", true)
        startGame.setAttribute("Hidden", true);
        highScoresEl.setAttribute("Hidden", true)
        choicesContainer.removeAttribute("Hidden");
        points = 0;
        debounce = true;
        secondsLeft = 60;
        resetQAs()
        gameTimer();
        newQuestion();
    }
});



function endGame() {
    timerEl.setAttribute("Hidden", true)
    choicesContainer.setAttribute("Hidden", true);
    bonusContainer.setAttribute("Hidden", true)
    secondsLeft = 0
    questionEl.textContent = "Your score: " + points
    form.removeAttribute("Hidden")
    debounce = false;
    startGame.removeAttribute("Hidden");
    startGame.textContent = "Try again?"
}

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

saveScoreBtn.addEventListener("click", function(event){
    highScoresEl.removeAttribute("Hidden")
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
        return;
    }
    initialsInput.value = ""
});

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

function showScores(){
    setScores()
    questionEl.textContent = "Top Five Scores!"
    highScoresEl.removeAttribute("Hidden")
}

function localScoresCheck() {
    var storedScores  = JSON.parse(localStorage.getItem("scores"));

    if (storedScores !== null){
        scores = storedScores;
    }
    console.log(scores)


    setScores()
}

function storeMyScores () {
    
    localStorage.setItem("scores", JSON.stringify(scores))
}

highScoreClck.addEventListener("click", function(){
    endGame()
    showScores()
    form.setAttribute("Hidden", true)
})

var scores = []

localScoresCheck()


























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