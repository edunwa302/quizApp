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

  // counters
  let currentScore = 0;
  let countLoop = 0;

  let questionsAnswered = 0;

  let add = 0;
  let subtract = 0;

  let checkArraylenghtMatch = 0;

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
          `<label class="lable-identity" id="${letter}">
             <input type="radio" name="question${questionNumber}" value="${letter}" id="question${questionNumber}" class="group-input">
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
        `<div class="slide item${questionNumber}">
           <div class="question"> ${currentQuestion.question} </div>
           <div class="answers answers${questionNumber}"> ${answers.join('')} </div>
           <p class="ans">oh uh! correct answer is : ${currentQuestion.correctAnswer}</p>
         </div>`
         // The join() method returns the array as a string.
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
    autoCorrectAnswerChecker();
  }

  // quiz event check function
  function autoCorrectAnswerChecker() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");
    var selectInput = quizContainer.querySelectorAll('input[type="radio"]');
    var i;
    for (i = 0; i < selectInput.length; i+= 1) {
      selectInput[i].addEventListener('click', selectAnswer);
    }
  };
  // correct answer checker
  // showResults function to loop over the answers, check them,
   // and show the results.
  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");
    // keep track of user's answers
    let numCorrect = 0;
    let score = 0;
    let average = 20;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;
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

  function selectAnswer() {
      // get the current answer container :
      let answerContainer =  document.querySelector('.answers'+countLoop);// at first here countloop is 0.

         // input : limits it to input tags.
         // [name=question${questionNumber}] : limits it to tags with the name that match question${questionNumber} within the previous group.
         // checked : limits it to checkboxes/radio buttons that is selected within the previous group.
      const selector = `input[name=question${countLoop}]:checked`;
       // get the radio button that is selected.
      const selectedBtn = answerContainer.querySelector(selector);
      // disabling radio button for only one option select
      var selectInput = quizContainer.querySelectorAll('input[type="radio"]');
      var i;
      for (i = 0; i < selectInput.length; i+= 1) {
        // stop user from sellecting more than ones
        if (selector) {
           selectInput[i].disabled = true;
        }
      }

       // check if a button is checked, if true submit the question if false do noting;
      if (selectedBtn) {

          ifBtnIsSelected();
          nextButton.disabled = false;
          resultsContainer.className = "dispAns";
          nextButton.style.background = '#279';

      } else {
          alert('please select a button');
          return;
      }

      function ifBtnIsSelected() {
           // get the value of the radio button that was checked inside the current answer container.
          let userAnswer = selectedBtn.value;

          // get the current item from the array : here i make use of counter as the index for the array.
          let currentItem = myQuestions[countLoop]; // here at first countloop is 0.

           // if the value of the radio button that was checked matches the value of the property name {'correctAnswer'}
           // on the current item in the array{myQuestions}
          if (userAnswer === currentItem.correctAnswer ) {
          // increment this counter by 1 for each correct answer
          currentScore++;

           // first on the active answerContainer color the hole text inside the label to red;
          // answerContainer.style.color = "red";
          answerContainer.querySelector('#'+userAnswer).style.color = "lightgreen";
          resultsContainer.innerHTML = `Good Job!`;

           // inside the active answerContainer get the lable elem with ID vaule
           // that match thesame with the value of the radio button that was checked: {logic} and change the color of the text to "lightgreen".

          } else {
             // get the lable element with an id that match thesame with the value of the radio button that was checked and change the color
            // answerContainer.querySelector('#'+userAnswer).style.color = "red";

           // first on the active answerContainer color the hole text inside the label to red;
          answerContainer.querySelector('#'+userAnswer).style.color = "red";
          resultsContainer.innerHTML = `oh uh wrong ! correct answer is : <span class= "animated zoomIn infinite slow"> ${currentItem.correctAnswer}`;


           // On the active answerContainer get the lable who's iD attribute value matches with that of the correctAnswer property value
           // on the active item in the array
          answerContainer.querySelector('#'+currentItem.correctAnswer).style.color = "lightgreen";
          }

           // increment the numb by o
           countLoop++;

           // increment this numb by one
          checkArraylenghtMatch++;

          // result is equal to the user score plus the number of Avaliable question;

          questionsAnswered++;
          // attemptedQuestions.innerHTML = `You have Answered : ${questionsAnswered} Out Of ${myQuestions.length} Questions`;
      }
  }
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

    if (currentSlide < 9) {
      nextButton.disabled = true;
      nextButton.style.background = '#f1f1';
    }
    if (currentSlide > slides.length - 2) {
       nextButton.style.display = 'none';
    }
    if (currentSlide === slides.length - 1) {
      submitButton.style.display = "inline-block";
    } else {
      // nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }
  // function hideNextBtn(obj) {
  //   nextButton.disabled = true;
  // }
  function showNextSlide(e) {
    showSlide(currentSlide + 1);
    resultsContainer.className = "ans";
      $("input[type=radio]").attr('disabled',false);
      // $("p").hide();
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
    $("input[type=radio]").attr('disabled',true);
    nextButton.disabled = false;
    nextButton.style.background = '#279';
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
