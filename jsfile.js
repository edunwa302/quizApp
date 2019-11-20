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
    let average = 12;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const unSelector = `input[name=question${questionNumber}]`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;
      console.log(userAnswer);
      // if answer is correct
      // let num = `${questionNumber.value}`;
      // avTo = parseInt(num * 2);
      //
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

  // quizContainer.addEventListener('click', autoCorrectAnswerChecker);
  function autoCorrectAnswerChecker () {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    // let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      // const unSelector = `input[name=question${questionNumber}]`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;
      var hidden = quizContainer.querySelector('.ans').className = 'dispAns';
      // avoid double select
      if (selector) {
        var selectInput = quizContainer.querySelectorAll('input[type="radio"]');
        var i;
        for (i = 0; i < selectInput.length; i+= 1) {
          selectInput[i].disabled = true;
        }
      } else {
        console.log('not checked');
      }
      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        console.log(currentQuestion.correctAnswer);
        // add to the number of correct answers
        // numCorrect++
        // console.log('oh sorry the correct answer is: ' + validAnswer);
        // color the answers green
        answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        console.log('oh sorry the correct answer is: ' + currentQuestion.correctAnswer);
         // var hidInput = hidden.querySelector('ans');
         // hidden.className = 'dispAns';
        // var hiddenInput = quizContainer.querySelector('input[type="hidden"]').type = 'text';
        // hiddenInput.type="text";
        answerContainers[questionNumber].style.color = "red";
      }

      if (userAnswer !== currentQuestion.correctAnswer) {
        hidden.className = 'disAns';
      }
      // second if statement end
    });
  };

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

  function showNextSlide() {
    showSlide(currentSlide + 1);
      $("input[type=radio]").attr('disabled',false);
    // // var hiddenInput = quizContainer.querySelector('input[type="hidden"]').type = "hidden";
      // var hidden = quizContainer.querySelector('.ans').className = 'ans';
      //   var hidden = quizContainer.querySelector('.ans');
      // hidden.className = 'dispAns';
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const average = document.getElementById("average");
  const submitButton = document.getElementById("submit");

  // display quiz right away
  buildQuiz();
  // setInterval(autoCorrectAnswerChecker, 1000);

  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(0);

  // on submit, show results
  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
  var radioBtn = quizContainer.querySelector('.active-slide');
  quizContainer.addEventListener('click', autoCorrectAnswerChecker);
})();
