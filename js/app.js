var currQuestion = 0;
var numberCorrect = 0;

//Questions object constructor to create objects
function Questions(question, answers, correct, answerDetail, sourceLink, imageLink) {
	this.question = question;
	this.answers = answers;
	this.correct = correct;
	this.answerDetail = answerDetail;
	this.sourceLink = sourceLink;
	this.imageLink = imageLink;
}

var questionArray = new Array();

questionArray[0] = new Questions('What was the first commercial passenger airliner?',['Boeing 707','DeHaviland DH-106 Comet','Douglas DC-8','Lockheed L-1011 TriStar'],1, 'The British deHaviland DH-106 Comet was the first commercial airliner in service, entering with the British Overseas Airways Corporation (BOAC) on May 2nd, 1952.','http://news.bbc.co.uk/onthisday/hi/dates/stories/may/2/newsid_2480000/2480339.stm','images/comet.jpg');
questionArray[1] = new Questions('As of 2015, what is the busiest international airport based on passenger volume?',['Hartsfield–Jackson Atlanta International Airport','John F. Kennedy International Airport','London-Heathrow Airport','Tokyo Haneda Airport'],0,'Hartsfield-Jackson International Airport in Atlanta, Georgia is the worlds busiest airport in terms of passenger volume, with over 96 million passengers in 2014.','http://www.atlanta-airport.com/docs/Traffic/201412.pdf','images/atl.jpg');
questionArray[2] = new Questions('What is the largest commercial airliner in terms of passenger capacity?',['Boeing 747','McDonnell Douglas MD-11','Embraer E190','Airbus A380'],3,'In a full coach class configuration, the massive double-decker Airbus A380 can hold up to 853 passengers.','http://www.airbus.com/aircraftfamilies/passengeraircraft/a380family/specifications/','images/a380.jpg');
questionArray[3] = new Questions('What is the worlds best selling passenger airliner?',['Airbus A320','Boeing 737','Bombardier Canadair Regional Jet','McDonnell Douglas MD-80'],1,'With over 8,000 aircraft sold since 1967, the Boeing 737 is the worlds best selling commercial passenger aircraft.','http://www.bloomberg.com/bw/articles/2014-04-16/boeing-s-737-turns-8-000-the-best-selling-plane-ever-isn-t-slowing','images/737.jpg');
questionArray[4] = new Questions('Which of the following does Donald Trump own as a personal jet?',['Gulfstream G650','Bombardier Learjet 85','Boeing 757','McDonnell Douglas DC-10'],2,'The Donald travels the world in style with a luxuriously appointed Boeing 757 airliner.','http://www.businessinsider.com/donald-trump-plane-2011-8','images/trump-plane.jpg');
//On document ready/loaded
$(document).ready(function(){
console.log("Initial: Current question is " + currQuestion);
//var sampleQuestion = new Questions('Test Question',['answer1','answer2'],1);

//console.log('Question is ' + sampleQuestion.question);
//console.log('Answer 1 is ' + sampleQuestion.answers[0]);
//console.log('Answer 2 is ' + sampleQuestion.answers[1]);

	$('#startGame').on('click', function(){
		startNewGame();
		console.log("New Game: Current question is " + currQuestion);
	});

	$('#startAnotherGame').on('click', function(){
		startNewGame();
		console.log("Start Over: Current question is " + currQuestion);
	});

	$('#answer-start-over').on('click', function(){
		startNewGame();
		console.log("Start Over: Current question is " + currQuestion);
	});

	$('#questions-start-over').on('click', function(){
		startNewGame();
		console.log("Start Over: Current question is " + currQuestion);
	});

	$('#nextQuestion').on('click', function(){
		nextQuestion();
		console.log("Next Q: Current question is " + currQuestion);
	});

	//displayQuestion(questionArray[0]);

	$('#submit').on('click', function(){
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
	$('.response-text').css('color','#33CC66');
	$('.response-text').text("Correct");
	$('.response-detail').text(questionArray[currQuestion].answerDetail);
	$('.response-source a').prop('href',questionArray[currQuestion].sourceLink);
	$('img').attr('src',questionArray[currQuestion].imageLink);
	$('.response').fadeIn(500);
	console.log(questionArray[currQuestion].answerDetail);
};

function incorrectAnswer() {
	$('.question-container').hide();
	$('.response-text').css('color','red');
	$('.response-text').text("Incorrect");
	$('.response-detail').text(questionArray[currQuestion].answerDetail);
	$('.response-source a').prop('href',questionArray[currQuestion].sourceLink);
	$('img').attr('src',questionArray[currQuestion].imageLink);
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