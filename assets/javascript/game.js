// initialize the .js document with this. It contains all of the code for the .js file:


$(document).ready(function () {

    // this game object holds all of the questions, possible answers, and then the index of the correct answer for each
    var game = {
        questions: [{
            question: 'What character does Felicity Jones play in the 2016 Walt Disney film "Star Wars Rogue One?',
            possibles: ['Rey', 'Padme Amidala', 'Jyn Erso', 'Leia Organa'],
            id: 'question-one',
            answer: 2
        }, {
            question: '"Rick Deckard" is a character associated with which film that was directed by Ridley Scott?',
            possibles: ['Prometheus', 'Blade Runner', 'Legend', 'Alien'],
            id: 'question-two',
            answer: 1
        }, {
            question: 'Who played the role of "The Fly" (1986)?',
            possibles: ['Jeff Goldblum', 'Richard Attenborough', 'Micheal Keaton', 'Sam Neill'],
            id: 'question-three',
            answer: 0
        }]
    }

    // This initializes the button that starts the game 
    $(".startGame").on("click", function () {
        $('.wrapper').show();
        $(this).hide();
        buildQuestions();
        run();

        // create a function with an onclick event for the doneButton that both checks the Answers 
        // and stops the clock when "done" button is pressed

        $('#doneButton').on('click', function () {
            checkAnswers();
            stop();
            $("#messageDiv").html("Game Over!");
        })

    });

    // These events start the timer: set the number of seconds the guesser has 
    var number = 60;
    $('#timeLeft').on('click', ".startGame", run);

    // This function enables the number of seconds to decrease with time, and to display
    // the result of that decrease until time is up. 
    function decrement() {
        number--;
        $('#timeLeft').html('<h2>' + number + " seconds" + '</h2>');
        if (number === 0) {
            $("#messageDiv").html("Time UP " + " Game Over!");
            stop();
            checkAnswers();
        }
    }

    // the run function sets the spacing of the decrement function's time interval so that
    // it can be equal to a second per number decrement.
    function run() {
        counter = setInterval(decrement, 1000);
    }

    // The stop function
    function stop() {
        // Clears our "counter" interval. The interval name is passed to the clearInterval function.
        clearInterval(counter);
    }

    // this function takes the template created in the Template function, allows it to be displayed on the page
    function buildQuestions() {
        var questionBOX = ''
        for (var i = 0; i < game.questions.length; i++) {
            questionBOX = questionBOX + formTemplate(game.questions[i]);
        }
        $('#questions-container').html(questionBOX);

    }

    // this function dynamically creates the inputs needed for the form 
    function formTemplate(data) {
        // the first variable relates the form field for question with the data 
        var qString = "<br><strong><form id='questionOne'>" + data.question + "</strong><br>";
        var possibles = data.possibles;
        for (var i = 0; i < possibles.length; i++) {
            var possible = possibles[i];
            qString = qString + " <input type='radio' name='" + data.id + "' value= " + i + " > " + possible + "<br>";
        }
        return qString + "</form>";
    }

    // function to tabulate the guesser results
    function checkAnswers() {
        var resultsHTML = '';
        var correct = 0;
        var incorrect = 0;

        for (var i = 0; i < game.questions.length; i++) {
            if (isCorrect(game.questions[i])) {
                correct++;
            } else {
                incorrect++;
            }
        }
        $('.results').html('Correct: ' + correct + "<br>" + 'Incorrect: ' + incorrect + "<br>");
    }

    function isCorrect(question) {
        var answers = $('[name=' + question.id + ']');
        var correct = answers.eq(question.answer);
        var isChecked = correct.is(':checked');
        return isChecked;
    }

});