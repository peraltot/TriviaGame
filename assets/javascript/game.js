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
        }, {
            question: '"Bruce Willis" and "Brad Pitt: star in what 1995 Terry Gillam science fictiorn film?',
            possibles: ['Time Bandits', '12 Monkeys', 'Jupiter Ascending', 'The Zero Theorem'],
            id: 'question-four',
            answer: 1
        }, {
            question: '"Jane Fonda" travels 41st-century space with her blind guardian angel "Pygar" in what 1968 science film?',
            possibles: ['Thunderbird 6', 'Countdown', 'Voyage to the Prehistoric Women', 'Barbarella'],
            id: 'question-five',
            answer: 3
        }, {
            question: 'Select the correct subtitle to the 1984 film "Star Trek III"?',
            possibles: ['The Voyage Home', 'The Final Frontier', 'Wrath of Khan', 'The Search for Spock'],
            id: 'question-six',
            answer: 3
        }, {
            question: 'What is the name of Malcolm McDowells character in the 1971 film "A Clockwork Orange"?',
            possibles: ['Daniel DeLarge', 'Thomas DeLarge', 'Alex Delarge', 'Steven DeLarge'],
            id: 'question-seven',
            answer: 2
        }, {
            question: 'Released in 2006, which of the following films is an adaptation of the P.D. James novel?',
            possibles: ['Altered', 'Children of Men', 'The Host', 'The Prestige'],
            id: 'question-eight',
            answer: 1
        }, {
            question: 'Who directed the 2009 epic science fiction film "Avatar"?',
            possibles: ['Steven Spielberg', 'James Cameron', 'Ridley Scott', 'George Lucas'],
            id: 'question-nine',
            answer: 1
        }, {
            question: 'With which classic science fiction film would you associate the quote "Game over, man Game Over!"?',
            possibles: ['Close Encounters of the Third Kind', 'The Thing', 'Predator', 'Alien'],
            id: 'question-ten',
            answer: 3
        }, {
            question: 'What year saw the release of the science fiction comedy film "Men in Black"?',
            possibles: ['1993', '1999', '1995', '1997'],
            id: 'question-eleven',
            answer: 3
        }, {
            question: 'What is the name of the character that Tom Cruise plays in the 2014 film "Edge of Tomorrow"?',
            possibles: ['Kimmel', 'Skinner', 'Cage', 'Farrell'],
            id: 'question-twelve',
            answer: 2
        }, {
            question: 'The Wachowski Brothers became well-known for which science fiction films series?',
            possibles: ['Men in Black', 'Jurassic Park', 'The Matrix', 'Predators'],
            id: 'question-thirteen',
            answer: 2
        }, {
            question: '"Kevin Spacey" and "Sam Rockwell" co-star in which 2009 British science fiction film?',
            possibles: ['Gravity', 'Europa Report', 'Mission to Mars', 'Moon'],
            id: 'question-fourteen',
            answer: 3
        }, {
            question: '"The Terminator" was the first film in which Arnold Schwarzenegger said what catchphrase?',
            possibles: ['Hasta La Vista, Baby', 'Youre Terminated', 'Chill Out, Dickwad', 'Ill be back'],
            id: 'question-fifteen',
            answer: 0
        }, {
            question: 'Genetically perfect DNA is the subject of which science fiction film?',
            possibles: ['The Final Cut', 'Equilibrium', 'Gattaca', 'THX 1138'],
            id: 'question-sixteen',
            answer: 2
        }, {
            question: 'What were the bad guys led by Deacon in the film "Waterworld"?',
            possibles: ['Riffs', 'Stokers', 'Smokers', 'Fins'],
            id: 'question-seventeen',
            answer: 2
        }, {
            question: 'How many of the six Star Wars films did George Lucas direct?',
            possibles: ['Five', 'Two', 'Four', 'Six'],
            id: 'question-eighteen',
            answer: 2
        }, {
            question: 'Who played the role of the game show host Damon Killian in Stephen Kings film "The Running Man"?',
            possibles: ['Dweezil Zappa', 'Richard Dawson', 'Mick Fleetwood', 'Jesse Ventura'],
            id: 'question-nineteen',
            answer: 1
        }, {
            question: 'What film from the Mad Max series stars "Mel Gibson" and "Tina Turner"?',
            possibles: ['Mad Max - Beyond Thunderdome', 'Mad Max', 'Mad Max - Fury Road', 'Mad Max - The Road Warrior'],
            id: 'question-twenty',
            answer: 0
        }]
    }
    
    $('#movie_video').html('<h2>' + "Pick your answers, anything left blank or wrong will be counted as incorrect!" + '</h2>');

    // This initializes the button that starts the game 

    $("#startGame").on("click", function () {
        $(this).hide();
        buildQuestions();
        run();
        $('#movie_video').html('<video width="420" height="315"  controls autoplay><source src="assets/images/BLADE RUNNER - Official Trailer.mp4" type="video/mp4"></video>');

        // create a function with an onclick event for the doneButton that both checks the Answers 
        // and stops the clock when "done" button is pressed

        $('#doneButton').on('click', function () {
            checkAnswers();
            stop();
            $("#messageDiv").html("Game Over!");
        })

    });

    // These events start the timer: set the number of seconds the guesser has 
    var number = 141;
    $('#timeLeft').on('click', ".startGame", run);

    // This function enables the number of seconds to decrease with time, and to display
    // the result of that decrease until time is up. 
    function decrement() {
        number--;
        $('#timeLeft').html('<h2>'+ "Time Remaining: " + number + " seconds" + '</h2>');
        if (number === 0) {
            $("#messageDiv").html("Times UP " + " Game Over!");
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
        $('#movie_video').html('<video width="420" height="315"  controls autoplay><source src="assets/images/Terminator-2---Hasta-La-Vista-Baby.mp4" type="video/mp4"></video>');
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
            var possiblelist = possibles[i];
            qString = qString + "<input type='radio' name='" + data.id + "' value= " + i + " > " + possiblelist + "<br>";
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

    function isCorrect(Checkquestion) {
        var answers = $('[name=' + Checkquestion.id + ']');
        var correct = answers.eq(Checkquestion.answer);
        var isChecked = correct.is(':checked');
        return isChecked;
    }

});