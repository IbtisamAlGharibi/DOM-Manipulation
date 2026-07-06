
const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Tool Markup Language",
            "Home Text Markup Language"
        ],
        correctAnswer: 0
    },
    {
        question: "Which language is used for styling web pages?",
        options: [
            "HTML",
            "CSS",
            "Java",
            "Python"
        ],
        correctAnswer: 1
    },
    {
        question: "Which language adds interactivity to web pages?",
        options: [
            "CSS",
            "Java",
            "JavaScript",
            "C++"
        ],
        correctAnswer: 2
    },
    {
        question: "Which symbol is used for IDs in CSS?",
        options: [
            ".",
            "#",
            "*",
            "@"
        ],
        correctAnswer: 1
    },
    {
        question: "Which method selects an element by ID?",
        options: [
            "queryAll()",
            "getElementById()",
            "getElements()",
            "findElement()"
        ],
        correctAnswer: 1
    }
];
const quizContainer = document.getElementById("quizContainer");
const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");
const resultDisplay = document.getElementById("resultDisplay");

let quizSubmitted = false;
function loadQuestions(){
    quizContainer.innerHTML = "";
    questions.forEach(function(question, questionIndex){
        const card = document.createElement("div");
        card.className = "question-card";
        card.dataset.questionIndex = questionIndex;
        const questionText = document.createElement("h3");
        questionText.textContent = question.question;
        card.appendChild(questionText);
        question.options.forEach(function(option, optionIndex){
            const optionElement = document.createElement("div");
            optionElement.className = "option";
            optionElement.textContent = option;
            optionElement.dataset.optionIndex = optionIndex;

            card.appendChild(optionElement);

        });
      quizContainer.appendChild(card);
    });
    quizSubmitted = false;
}

quizContainer.addEventListener("click", function(event){
    if(quizSubmitted){
        return;
    }
    if(event.target.classList.contains("option")){
        const questionCard = event.target.parentElement;
        const questionIndex = questionCard.dataset.questionIndex;
        const optionIndex = event.target.dataset.optionIndex;
        selectAnswer(questionIndex, optionIndex);
    }
});

function selectAnswer(questionIndex, optionIndex){
    const questionCard = document.querySelector(
        `[data-question-index="${questionIndex}"]`
    );
    const options = questionCard.querySelectorAll(".option");
    options.forEach(function(option){
        option.classList.remove("selected");
    });
    options[optionIndex].classList.add("selected");
}
submitBtn.addEventListener("click", submitQuiz);
function submitQuiz(){
    let score = 0;
    const cards = document.querySelectorAll(".question-card");
    cards.forEach(function(card, index){
        const selectedOption = card.querySelector(".selected");
        if(selectedOption){
            const selectedIndex = Number(selectedOption.dataset.optionIndex);
            if(selectedIndex === questions[index].correctAnswer){

                score++;
                card.classList.add("correct");

            }else{

                card.classList.add("incorrect");

            }
        }else{

            card.classList.add("incorrect");

        }
        const options = card.querySelectorAll(".option");
        options.forEach(function(option){
            if(Number(option.dataset.optionIndex) === questions[index].correctAnswer){

                option.classList.add("correct-answer");

            }
        });
    });
    resultDisplay.textContent =
        "You scored " + score + " out of " + questions.length + "!";

    quizSubmitted = true;

}
resetBtn.addEventListener("click", resetQuiz);
function resetQuiz(){
    resultDisplay.textContent = "";
    loadQuestions();
}
loadQuestions();