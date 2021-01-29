const quizData = [
    {
        question: 'Web pages are written using ?',
        a: 'FTP',
        b: 'HTTP',
        c: 'HTML',
        d: 'URL',
        
        correct: 'c',
    }, {
        question: ' Which of the following is not an example of an Operating System?',
        a: 'Windows 98',
        b: 'BSD Unix',
        c: 'Microsoft Office XP',
        d: 'Red Hat Linux',

        correct: 'c',
    }, {
        question: 'Which of the following is used to Manage DataBase?',
        a: 'DBMS',
        b: 'Compiler',
        c: 'Operating System',
        d: 'None of above',

        correct: 'c',
    }, {
        question: 'The Number System based on “0” and “1” only is known as',
        a: 'Binary System',
        b: 'Barter System',
        c: 'NumberSystem',
        d: 'Hexadecimal System',

        correct: 'a',
    }, {
        question: 'Which of the following attributes is used to add link to any element?',
        a: 'link',
        b: 'ref',
        c: 'href',
        d: 'newref',

        correct: 'c',
    },
] ;

const start_btn = document.querySelector(".start_btn");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_container = document.querySelector(".quiz-container");

// if startQuiz button clicked
start_btn.onclick = ()=>{
    info_box.style.visibility = "visible"; //show info box
}

// if exitQuiz button clicked
exit_btn.onclick = ()=>{
    info_box.style.visibility = "hidden"; //hide info box
}


    

const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");

const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");

const timer = document.querySelector(".quiz-header");

let currentQuiz = 0;
let score = 0;

var minute = 4;
var sec = 59;

// if continueQuiz button clicked
continue_btn.onclick = () => {
    start_btn.style.visibility = "hidden";
    info_box.style.visibility = "hidden";
    quiz_container.style.visibility = "visible"; //show quiz box
}

loadQuiz();
setInterval(function() {
    timer.innerHTML = minute + " : " + sec;
    sec--;
    if (sec == 00) {
      minute --;
      sec = 59;
      if (minute == 0) {
        quiz.innerHTML = `
        <h2>You answered correctly at ${score}/${quizData.length} questions.</h2>
        
        <button onclick="location.reload()">Reload</button>
    `;
      }
    }
    
  }, 1000);
function loadQuiz() {
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];

    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
}

function getSelected() {
    let answer = undefined;

    answerEls.forEach( (answerEl) => {
       if(answerEl.checked) {
           answer = answerEl.id;
       }

    } );
    console.log(answer);
    return answer;
   
}

function deselectAnswers() {
    answerEls.forEach((answerEl) => {
    answerEl.checked = false;
    });
}

submitBtn.addEventListener("click", () => {
    // check to see the answer
    const answer = getSelected();

    if(answer === undefined){
        if(confirm("Are you sure you want to skip this Question?")){
            currentQuiz++;
        }
    }
    
    if(answer){
        if (answer === quizData[currentQuiz].correct) {
        score++;
    }
        currentQuiz++;
    }
    if(currentQuiz < quizData.length) {
        loadQuiz();
    }else{
        quiz.innerHTML = `
        <h2>You answered correctly at ${score}/${quizData.length} questions.</h2>
        
        <button onclick="location.reload()">Reload</button>
    `;
    }
        
} );
