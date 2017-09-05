function generateWinningNumber(){
	var wn = Math.floor(Math.random() * 100) + 1;
	if (wn === 0){
		return 1;
	}
	return wn;
}

function shuffle(arr){
	var m = arr.length
	while (m){
		var i = Math.floor(Math.random() * m--);
		t = arr[m]
		arr[m] = arr[i];
		arr[i] = t;
	}
	return arr;
}

function Game(){
	this.playersGuess = null;
	this.pastGuesses = [];
	this.winningNumber = generateWinningNumber();

}

Game.prototype.difference = function(){
	return Math.abs(this.playersGuess - this.winningNumber);
}

Game.prototype.isLower = function(){
	return (this.playersGuess < this.winningNumber);
}

Game.prototype.playersGuessSubmission = function(n){
	if (n < 1 || n > 100 || isNaN(n)){
		$('h1').text("Invalid Number!")
		$('h2').text("Guess Again!")
	} else {
		this.playersGuess = n;
		return this.checkGuess()
	}
}

Game.prototype.checkGuess = function(){

	if (this.playersGuess === this.winningNumber){
		$('#hnt, #sub').prop("disabled", true);
		$('h2').text("Press the Reset button to play again!");
		return "You Win!";
	} else if (this.pastGuesses.includes(this.playersGuess)) {
		return "You have already guessed that number.";
	} else {
		this.pastGuesses.push(this.playersGuess)
		$('#guesses li:nth-child('+ this.pastGuesses.length +')').text(this.playersGuess);
	} 
	if (this.isLower()){
		$('h2').text("Guess Higher!")
	} else {
		$('h2').text("Guess Lower!")
	}
	if (this.pastGuesses.length === 5){
		$('#hnt, #sub').prop("disabled", true);
		$('h2').text("Press the Reset button to play again!");
		return "You Lose.";
	}
	if (this.difference() < 10){
		return "You're burning up!";
	} else if (this.difference() < 25){
		return "You're lukewarm.";
	} else if (this.difference() < 50){
		return "You're a bit chilly.";
	} else if (this.difference() < 100){
		return "You're ice cold!";
	}


}

function newGame(){
	return new Game();
}

Game.prototype.provideHint = function(){
	var result = [this.winningNumber, generateWinningNumber(), generateWinningNumber()];
	shuffle(result);
	return result;
}

function guess(game){
	var gs = $('#gt').val();
	$('#gt').val("");
	var result = game.playersGuessSubmission(parseInt(gs));
	console.log(game.pastGuesses)
	$('h1').text(result)
}

$(document).ready(function(){
	var game = newGame();
	var wn = game.winningNumber;
	console.log("winning number: "+wn.toString())
	$('#sub').on('click', function(e){
		guess(game);
	 });
	$('#rst').on('click', function(e){
		game = newGame();
		$('h1').text("Guessing Game!");
		$('h2').text("min: 1, max: 100");
		$('.guess').text("-");
		$('#gt').val("#")
		$('#hnt, #sub').prop("disabled", false);
	 });
	$('#gt').keypress(function(e){
		if (e.which === 13){
			guess(game);
		}
	});
	$('#hnt').click(function(){
		var hnts = game.provideHint();
		$('h1').text('The winning number is '+hnts[0]+', '+hnts[1]+', or '+hnts[2]);
		$('#hnt').prop("disabled", true)
	})
})
