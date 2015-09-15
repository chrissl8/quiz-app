var currQuestion = 0;
var numberCorrect = 0;

//Questions object constructor to create objects
function Questions(question, answers, correct) {
	this.question = question;
	this.answers = answers;
	this.correct = correct;
}

var questionArray = new Array();

questionArray[0] = new Questions('What was the first commercial passenger airliner?',['Boeing 707','DeHaviland DH-106 Comet','Douglas DC-8','Lockheed L-1011 TriStar'],1);
questionArray[1] = new Questions('As of 2015, what is the busiest international airport based on passenger volume?',['Hartsfield–Jackson Atlanta International Airport','John F. Kennedy International Airport','London-Heathrow Airport','Tokyo Haneda Airport'],0);
questionArray[2] = new Questions('What is the largest commercial airliner in terms of passenger capacity?',['Boeing 747','McDonnell Douglas MD-11','Embraer E190','Airbus A380'],3);
questionArray[3] = new Questions('What is the worlds best selling passenger airliner?',['Airbus A320','Boeing 737','Bombardier Canadair Regional Jet','McDonnell Douglas MD-80'],1);
questionArray[4] = new Questions('Which of the following does Donald Trump own as a personal jet?',['Gulfstream G650','Bombardier Learjet 85','Boeing 757','McDonnell Douglas DC-10'],2);
//On document ready/loaded
$(document).ready(function(){
console.log("Initial: Current question is " + currQuestion);
//var sampleQuestion = new Questions('Test Question',['answer1','answer2'],1);

//console.log('Question is ' + sampleQuestion.question);
//console.log('Answer 1 is ' + sampleQuestion.answers[0]);
//console.log('Answer 2 is ' + sampleQuestion.answers[1]);

	$('#startGame').on('click touchstart', function(){
		startNewGame();
		console.log("New Game: Current question is " + currQuestion);
	});

	$('#startAnotherGame').on('click touchstart', function(){
		startNewGame();
		console.log("Start Over: Current question is " + currQuestion);
	});

	$('#answer-start-over').on('click touchstart', function(){
		startNewGame();
		console.log("Start Over: Current question is " + currQuestion);
	});

	$('#questions-start-over').on('click touchstart', function(){
		startNewGame();
		console.log("Start Over: Current question is " + currQuestion);
	});

	$('#nextQuestion').on('click touchstart', function(){
		nextQuestion();
		console.log("Next Q: Current question is " + currQuestion);
	});

	//displayQuestion(questionArray[0]);

	$('#submit').on('click touchstart', function(){
		var selectedValue = $('input:radio[name=option]:checked').val();
		console.log("Selected value is " + selectedValue);
		console.log("Current question is " + currQuestion);
		if(typeof selectedValue == "undefined")
			{
				alert("Choose something");
			}
		else 
			{
			var currAnswer = questionArray[currQuestion].correct;
			console.log("Current Answer is " + currAnswer);
			if(selectedValue == currAnswer)
			{
				correctAnswer();
			}
			else
			{
				incorrectAnswer();
			}
		}


		//console.log($('input:radio[name=option]:checked').val());
		//progressQuiz();
	});

});

function nextQuestion() {
	if(currQuestion < 4)
	{
		$('.response').hide();
		$('input[type=radio]').prop('checked',false);
		$('.question-container').fadeIn(500);
		progressQuiz();
	}
	else
	{
		endGame();
		console.log("end of game");
	}
}

function endGame() {
	$('.question-container').hide();
	$('.response').hide();
	$('#score').text(numberCorrect);
	$('.finished').fadeIn(500);
};

function correctAnswer() {
	numberCorrect++;
	$('.question-container').hide();
	$('.response-text').text("Correct!")
	$('.response').fadeIn(500);
};

function incorrectAnswer() {
	$('.question-container').hide();
	$('.response-text').text("Incorrect!")
	$('.response').fadeIn(500);
};

function startNewGame() {
	currQuestion = 0;
	numberCorrect = 0;
	$('input[type=radio]').prop('checked',false);
	$('.newgame').hide();
	$('.response').hide();
	$('.finished').hide();
	var currQuestionDisplay = currQuestion + 1;
	$('#currentQuestion').text(currQuestionDisplay);
	$('.question-container').fadeIn(500);
	initiateQuiz();
};

function initiateQuiz() {
	if(currQuestion ==0 || currQuestion < 5)
	{
	displayQuestion(questionArray[currQuestion]);
	}
};

function progressQuiz() {
	if(currQuestion ==0 || currQuestion < 5)
	{
	currQuestion++;
	var currQuestionDisplay = currQuestion + 1;
	$('#currentQuestion').text(currQuestionDisplay);
	displayQuestion(questionArray[currQuestion]);
	}
};

function displayQuestion(currentQuestion) {

$('.question').text(currentQuestion.question);
$('#answer1').text(currentQuestion.answers[0]);
$('#answer2').text(currentQuestion.answers[1]);
$('#answer3').text(currentQuestion.answers[2]);
$('#answer4').text(currentQuestion.answers[3]);

};