/*
Plane and Simple Quiz App
By Chris Slaight, 2015
*/

/*
Define Global variables for current question and number of correct answers
*/
var currQuestion = 0; //Application will iterate through as questions progress
var numberCorrect = 0; //Will increment each time an answer is correct

/*
Create a constructor for the Questions object, which will contain the following:
question text, array of answers, array index of correct answer, detail of answer,
link to citation source of answer and location of answer image link
*/
function Questions(question, answers, correct, answerDetail, sourceLink, imageLink) {
	this.question = question; //Stores question text
	this.answers = answers; //Stores a string array of possible answers
	this.correct = correct; //Stores the array index of the correct answer
	this.answerDetail = answerDetail; //Stores the detail of the answer
	this.sourceLink = sourceLink; //URL of citation source
	this.imageLink = imageLink; //Image location for correct answer
}

var questionArray = new Array(); //Create a new Array of Question objects

/*
Initialize the array of questions with hard coded values for the five questions
This could be dynamically driven through a database result set in the future using AJAX
*/
questionArray[0] = new Questions('What was the first commercial passenger airliner?',['Boeing 707','DeHaviland DH-106 Comet','Douglas DC-8','Lockheed L-1011 TriStar'],1, 'The British deHaviland DH-106 Comet was the first commercial airliner in service, entering with the British Overseas Airways Corporation (BOAC) on May 2nd, 1952.','http://news.bbc.co.uk/onthisday/hi/dates/stories/may/2/newsid_2480000/2480339.stm','images/comet.jpg');
questionArray[1] = new Questions('As of 2015, what is the busiest international airport based on passenger volume?',['Hartsfield–Jackson Atlanta International Airport','John F. Kennedy International Airport','London-Heathrow Airport','Tokyo Haneda Airport'],0,'Hartsfield-Jackson International Airport in Atlanta, Georgia is the worlds busiest airport in terms of passenger volume, with over 96 million passengers in 2014.','http://www.atlanta-airport.com/docs/Traffic/201412.pdf','images/atl.jpg');
questionArray[2] = new Questions('What is the largest commercial airliner in terms of passenger capacity?',['Boeing 747','McDonnell Douglas MD-11','Embraer E190','Airbus A380'],3,'In a full coach class configuration, the massive double-decker Airbus A380 can hold up to 853 passengers.','http://www.airbus.com/aircraftfamilies/passengeraircraft/a380family/specifications/','images/a380.jpg');
questionArray[3] = new Questions('What is the worlds best selling passenger airliner?',['Airbus A320','Boeing 737','Bombardier Canadair Regional Jet','McDonnell Douglas MD-80'],1,'With over 8,000 aircraft sold since 1967, the Boeing 737 is the worlds best selling commercial passenger aircraft.','http://www.bloomberg.com/bw/articles/2014-04-16/boeing-s-737-turns-8-000-the-best-selling-plane-ever-isn-t-slowing','images/737.jpg');
questionArray[4] = new Questions('Which of the following does Donald Trump own as a personal jet?',['Gulfstream G650','Bombardier Learjet 85','Boeing 757','McDonnell Douglas DC-10'],2,'The Donald travels the world in style with a luxuriously appointed Boeing 757 airliner.','http://www.businessinsider.com/donald-trump-plane-2011-8','images/trump-plane.jpg');

/*
Upon document load, the following functionality is available to be executed
*/
$(document).ready(function(){

	//console.log("Initial: Current question is " + currQuestion);

	/*
	Define the on click event listeners for each of the buttons
	*/
	//Start new game button from initial view
	$('#startGame').on('click', function(){
		startNewGame(); //Call startNewGame() function to initialize a new game
		//console.log("New Game: Current question is " + currQuestion);
	});

	//Start another game button funcionality 
	$('#startAnotherGame').on('click', function(){
		startNewGame(); //Call startNewGame() function to initialize a new game
		//console.log("Start Over: Current question is " + currQuestion);
	});

	//Button to start game over from answer screens
	$('#answer-start-over').on('click', function(){
		startNewGame(); //Call startNewGame() function to initialize a new game
		//console.log("Start Over: Current question is " + currQuestion);
	});

	//Button to start game over from question screens
	$('#questions-start-over').on('click', function(){
		startNewGame(); //Call startNewGame() function to initialize a new game
		//console.log("Start Over: Current question is " + currQuestion);
	});

	//Button to progress quiz onto the next question from answer page
	$('#nextQuestion').on('click', function(){
		nextQuestion(); //Call nextQuestion() function to continue the quiz
		//console.log("Next Q: Current question is " + currQuestion);
	});

	//Button to submit selected answer
	$('#submit').on('click', function(){
		var selectedValue = $('input:radio[name=option]:checked').val(); //Get selected option value
		//console.log("Selected value is " + selectedValue);
		//console.log("Current question is " + currQuestion);
		//if there is no value selected (undefined)
		if(typeof selectedValue == "undefined")
		{
			chooseSomething(); //Call function to inform the user to choose an answer
		}
		//Otherwise if a valid choice is selected
		else 
		{
			var currAnswer = questionArray[currQuestion].correct; //Get answer value for current question
			//console.log("Current Answer is " + currAnswer);
		if(selectedValue == currAnswer) //if the selected option value equals the answer value
		{
			correctAnswer(); //perform correctAnswer() function
		}
		else
		{
			incorrectAnswer(); //perform incorrectAnswer() function
		}
		}
	});

}); //end of document.ready code

/*
Application functions
*/

/*
This function progresses the quiz to the next question after the answer screen is displayed
*/
function nextQuestion() {
	if(currQuestion < 4) //If the current question count is less than 4, as there are only four hard coded questions
	{
		$('.response').hide(); //Hide the previous answer response div
		$('input[type=radio]').prop('checked',false); //Clear all selected radio buttons
		$('.question-container').fadeIn(500); //Fade in the question container for next question
		progressQuiz(); //Call progressQuiz() function to iterate to the next question in the array 
	}
	else
	{
		endGame(); //Call endGame() function to display score rather than next question
		//console.log("end of game");
	}
}

/*
Function to temporarily fade in (4 seconds) the message to inform users to choose an answer if a submit happens with no selected answer
*/
function chooseSomething() {
	$('.no-selection').fadeIn(500); //Quickly fade in the 'no-selection' element
	$('.no-selection').delay(4000).fadeOut(500); //After a delay of 4 seconds, fade the 'no-selection' element out
};

/*
Function called at the end of all questions that provides user score and the option to start over
*/
function endGame() {
	$('.question-container').hide(); //Hide div containing questions
	$('.response').hide(); //Hide answer response div
	$('#score').text(numberCorrect); //Set #score span on finished div to equal the number of correct answers from global numberCorrect variable
	$('.finished').fadeIn(500); //Transition to .finished div once the above content loads
};

/*
Function to be called when a user submits a correct answer
*/
function correctAnswer() {
	numberCorrect++; //Increment the global numberCorrect variable to increase the user's score
	$('.question-container').hide(); //Hide the question div
	$('.response-text').css('color','#33CC66'); //Set response text to green
	$('.response-text').text("Correct"); //Set response text to display Correct
	$('.response-detail').text(questionArray[currQuestion].answerDetail); //Set response detail to state fact
	$('.response-source a').prop('href',questionArray[currQuestion].sourceLink); //Set Source link to fact citation
	$('img').attr('src',questionArray[currQuestion].imageLink); //Set image to paired question image
	$('.response').fadeIn(500); //Fade in response div once all above elements are built
	//console.log(questionArray[currQuestion].answerDetail);
};

/*
Function to be called when a user submits an incorrect answer
*/
function incorrectAnswer() {
	$('.question-container').hide(); //Hide the question div
	$('.response-text').css('color','red'); //Set response text to green
	$('.response-text').text("Incorrect"); //Set response text to display incorrect
	$('.response-detail').text(questionArray[currQuestion].answerDetail); //Set response detail to state fact
	$('.response-source a').prop('href',questionArray[currQuestion].sourceLink); //Set Source link to fact citation 
	$('img').attr('src',questionArray[currQuestion].imageLink); //Set image to paired question image
	$('.response').fadeIn(500); //Fade in response div once all above elements are built
};

/*
Function to start a new game and disregard current progress
*/
function startNewGame() {
	currQuestion = 0; //Reset global current question variable to 0
	numberCorrect = 0; //Reset global score variable to 0
	$('input[type=radio]').prop('checked',false); //Clear all selected radio button options
	$('.newgame').hide(); //Hide new game div
	$('.response').hide(); //Hide answer response div
	$('.finished').hide(); //Hide end of game finished div
	var currQuestionDisplay = currQuestion + 1; //Set the current question display to the current question + 1 (to compensate for array value)
	$('#currentQuestion').text(currQuestionDisplay); //Set current question span text value
	$('.question-container').fadeIn(500); //Fade in question container
	initiateQuiz(); //Initiate the quiz by having the questions displayed from the beginning
};


/*
Function to initiate the quiz by displaying the first question after variables are reset
*/
function initiateQuiz() {
	if(currQuestion ==0 || currQuestion < 5) //If the current question is between 0 and 4
	{
	displayQuestion(questionArray[currQuestion]); //Call displayQuestion() function to display the next question in the container
	}
};

/*
Function to progress the quiz after the answer screen is closed
*/
function progressQuiz() {
	if(currQuestion ==0 || currQuestion < 5) //As long as the current question number is valid (between 0 and 4)
	{
	currQuestion++; //Increment current question global variable
	var currQuestionDisplay = currQuestion + 1; //Define current question display variable as current question + 1 (to compensate for array value)
	$('#currentQuestion').text(currQuestionDisplay); //Set current question span text value
	displayQuestion(questionArray[currQuestion]); //Call displayQuestion() function to display the next question in the container
	}
};

/*
Function to update the quiz-container DOM elements to reflect the current question and answer values
*/
function displayQuestion(currentQuestion) {

	$('.question').text(currentQuestion.question); //Set .question to be current question value
	$('#answer1').text(currentQuestion.answers[0]); //Set radio button value for answer 1
	$('#answer2').text(currentQuestion.answers[1]); //Set radio button value for answer 2
	$('#answer3').text(currentQuestion.answers[2]); //Set radio button value for answer 3
	$('#answer4').text(currentQuestion.answers[3]); //Set radio button value for answer 4

};