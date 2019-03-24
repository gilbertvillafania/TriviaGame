$(document).ready(function() {
	
	var question1 = {
		text: "Which Ninja Turtle has a Blue Mask?", 
		answer: [
			"<div class='text-center btn btn-info btn-block' data-correct='true'>Leonardo</div>", 
			"<div class='text-center btn btn-info btn-block'>Donatello</div>", 
			"<div class='text-center btn btn-info btn-block'>Raphael</div>", 
			"<div class='text-center btn btn-info btn-block'>Michaelangelo</div>"],
		correct: false,
	}

	var question2 = {
		text: "Which Ninja Turtle said Raph was 'a little too Raph' from the live action 1991 movie TMNT II: The Secret of the Ooze?", 
		answer: [
			"<div class='text-center btn btn-info btn-block' data-correct='true'>Michaelangelo</div>",
			"<div class='text-center btn btn-info btn-block'>Raphael</div>",
			"<div class='text-center btn btn-info btn-block'>Leonardo</div>",
			"<div class='text-center btn btn-info btn-block'>Donatello</div>"],
		correct: false,
	}

	var question3 = {
		text: "Which Ninja Turtle enemy is a brain living in the stomach of a robot?", 
		answer: [
			"<div class='text-center btn btn-info btn-block' data-correct='true'>Krang</div>",
			"<div class='text-center btn btn-info btn-block'>Beebop</div>", 
			"<div class='text-center btn btn-info btn-block'>Shredder</div>", 
			"<div class='text-center btn btn-info btn-block'>Rocksteady</div>"],
		correct: false,
	}

	var question4 = {
		text: "Which expression was shared by the Ninja Turtles and Bart Simpson back in the 80's and 90's?", 
		answer: [
			"<div class='text-center btn btn-info btn-block' data-correct='true'>Cowabunga!</div>",
			"<div class='text-center btn btn-info btn-block'>Shpadoinkle!</div>", 
			"<div class='text-center btn btn-info btn-block'>Talk to the hand!</div>", 
			"<div class='text-center btn btn-info btn-block'>As if!</div>"],
		correct: false,
	}

	var questionBank = [question1, question2, question3, question4];
	var bankLength = questionBank.length;
	var count = 0;
	var intervalID; 
	var time = 10;


$("#start").click(function() {


	createQuestions(questionBank[count]);
	$("#splashScreen").css('display', 'none');
	$("#questions").css('display', 'inherit');

});



function createQuestions(array) {

	randomizeAnswers();
	intervalID = setInterval(timer, 1000);
	$("#snarf").css('background', '#FFF');
	$("#text").html("<div><h4>" + array.text);

	for (var i = 0; i < array.answer.length; i++) {
		$("#answers").append(array.answer[i]);
	};

	correct();
}


function nextQuestion() {
	createQuestions(questionBank[count]);
}


function correct() {
	$("#answers div").click(function() {

		var questCorrect = $(this).data("correct");

		if (questCorrect === true) {
			$(this).css('background', '#5CB85C');
			questionBank[count].correct = "Correct!";
			count++;
			clearInterval(intervalID);
			time = 10;
			setTimeout(function() {
				checkGameEnd();		
			}, 300);

		} else {
			$(this).css('background', '#D9534F');
			questionBank[count].correct = "Bogus!";
			count++;
			clearInterval(intervalID);
			time = 10;
			setTimeout(function() {
				checkGameEnd();		
			}, 300);	
		}

	});
}


function checkGameEnd() {
	if (count === questionBank.length) {
	$("#questions").css('display', 'none');	
	createResults();
	$("#gameOver").css('display', 'inherit');

	} else {
		$("#answers").empty();
		nextQuestion();
	}
}


function createResults() {

	for (var i = 0; i < bankLength; i++) {

		$("#results").append("<div>Question #"+[i+1]+': ' + questionBank[i].correct + "</div>");
	}
}


$("#restart").click(function() {

	count = 0;
	$("#results").empty();	

	for (var i = 0; i < bankLength; i++) {
		questionBank[i].correct = false;
	}

	$("#answers").empty();
	$("#gameOver").css('display', 'none');
	$("#splashScreen").css('display', 'inherit');

});


function timer() {
	$("#timer h1").html(time);
	$("#timer").css('visibility', 'inherit');

	if (time === 0) {

		$("#snarf").css('background', '#D9534F');
		clearInterval(intervalID);
		time = 10;
		questionBank[count].correct = "Correct!";
		count++;
		setTimeout(function() {
			checkGameEnd();		
		}, 600);
	}
	time--;
};

function randomizeAnswers() {
	for (var i = 0; i < questionBank.length; i++) {
		questionBank[i].answer.sort(function(a, b){return 0.5 - Math.random()});
	}
}


});




