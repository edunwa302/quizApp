(function() {
  const myQuestions = [
    {
      question: "Who is the strongest?",
      answers: {
        a: "Superman",
        b: "The Terminator",
        c: "Waluigi, obviously"
      },
      correctAnswer: "c"
    },
    {
      question: "What is the best site ever created?",
      answers: {
        a: "SitePoint",
        b: "Simple Steps Code",
        c: "Trick question; they're both the best"
      },
      correctAnswer: "c"
    },
    {
      question: "Where is Waldo really?",
      answers: {
        a: "Antarctica",
        b: "Exploring the Pacific Ocean",
        c: "Sitting in a tree",
        d: "Minding his own business, so stop asking"
      },
      correctAnswer: "d"
    },
    {
      question: "Which is the best description of a variable?",
      answers: {
        a: "Identifies a portion of a string",
        b: "A method to join strings",
        c: "Allows you to store information so it can be reused throughout the program",
        b: "Allows you to make a decision based on a condition",
      },
      correctAnswer: "c"
    },
    {
      question: "Which is the best description of the substring method?",
      answers: {
        a: "Identifies a portion of a string.",
        b: "A method to join strings.",
        c: "Allows you to store information so it can be reused throughout the program.",
        b: "Allows you to make a decision based on a condition.",
      },
      correctAnswer: "b"
    },
    {
      question: "Which is the best description of an if statement?",
      answers: {
        a: "Identifies a portion of a string.",
        b: "A method to join strings.",
        c: "Allows you to store information so it can be reused throughout the program.",
        d: "Allows you to make a decision based on a condition.",
      },
      correctAnswer: "d"
    },
    {
      question: "Inside which HTML element do we put the JavaScript?",
      answers: {
        a: "script",
        b: "scripting",
        c: "javascript",
        d: "js",
      },
      correctAnswer: "a"
    },
    {
      question: "What is the correct JavaScript syntax to change the content of the HTML element select id ?",
      answers: {
        a: "document.getElementsByName",
        b: "document.getElementById",
        c: "#demo.innerHTML",
        d: "document.getElement",
      },
      correctAnswer: "b"
    },
    {
      question: "Where is the correct place to insert a JavaScript?",
      answers: {
        a: "The <head> section",
        b: "Both the <head> section and the <body> section are correct",
        c: "The <body> section",
      },
      correctAnswer: "b"
    },
    {
      question: "What is the correct syntax for referring to an external script called `xxx.js`?",
      answers: {
        a: "script name ",
        b: "script src ",
        c: "script href ",
      },
      correctAnswer: "b"
    },
  ];

  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    // forEach calls a function once on each array element
    // currentQuestion = value and questionNumber = question index
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
             <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
           </label>`
        );
      }
      // <input type="hidden" name="question${questionNumber}" value = "oh uh! correct answer is : ${currentQuestion.correctAnswer}">
      // add this question and its answers to the html output
      // using template literials to creat and grab our dynamically created elemt and
      //pass the unique answer values into them
      // template literials (``) accpets palceholders &{value} and pass into a Function
      // which concatenate it into a string
      output.push(
        `<div class="slide">
           <div class="question"> ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join('')} </div>
           <p class="ans">oh uh! correct answer is : ${currentQuestion.correctAnswer}</p>
         </div>`
         // The join() method returns the array as a string.
      );

    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
    autoCorrectAnswerChecker();
  }
  // correct answer checker
  // showResults function to loop over the answers, check them,
   // and show the results.
  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");
    console.log(answerContainers);
    // keep track of user's answers
    let numCorrect = 0;
    let score = 0;
    let average = 20;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const unSelector = `input[name=question${questionNumber}]`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;
      console.log(userAnswer);
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;
        score+= 2;

        // color the answers green
        answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });
    console.log(score);

    // show number of correct answers out of total
    let total = score / average * 100;
    resultsContainer.innerHTML = `You Answered: ${numCorrect} questions correctly out of:
    ${myQuestions.length} total questions
    <br>Your Average Score Is: ${total.toFixed(2)} out of 100`;
  }

  const quizContainer = document.getElementById("quiz");
  // var quizAct = document.querySelectorAll('.answers');
  $("input[type=radio]").click(function() {
    $(this).hide();
  });

  // quiz event check function
  function autoCorrectAnswerChecker() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");
    // keep track of user's answers
    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      // const unSelector = `input[name=question${questionNumber}]`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;
      var hidden = quizContainer.querySelector('.ans');
      // avoid double select
      var selectInput = quizContainer.querySelectorAll('input[type="radio"]');
      var i;
      for (i = 0; i < selectInput.length; i+= 1) {
        selectInput[i].addEventListener('click', showAnswer);
      }
      // second if statement end
    });
  };

  function showAnswer(e) {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");
    // keep track of user's answers
    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      console.log('yes');
      // const unSelector = `input[name=question${questionNumber}]`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;
      var hidden = quizContainer.querySelector('.ans');
      // avoid double select
      var selectInput = quizContainer.querySelectorAll('input[type="radio"]');
      var i;
      for (i = 0; i < selectInput.length; i+= 1) {
        // stop user from sellecting more than ones
        if (selector) {
           selectInput[i].disabled = true;
        }
      }
        // selectInput[i].disabled = true;
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // show correct answer
         $("p").show(1000);
        answerContainers[questionNumber].style.color = "red";
      }
      // second if statement end
    })
  };
  // quizAct.addEventListener('click', autoCorrectAnswerChecker);
  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;

    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }

    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }

  function showNextSlide(e) {
    showSlide(currentSlide + 1);
      $("input[type=radio]").attr('disabled',false);
      $("p").hide();
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
    $("input[type=radio]").attr('disabled',true);
  }

  // const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const average = document.getElementById("average");
  const submitButton = document.getElementById("submit");
  // display quiz right away
  buildQuiz();

  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(0);

  // on submit, show results
  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();
