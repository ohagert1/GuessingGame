function Game() {
	this.playersGuess = null;
	this.pastGuesses = [];
	this.winningNumber = generateWinningNumber();
}

Game.prototype.playersGuessSubmission = function(playerInput) {
	if(playerInput < 1 || playerInput > 100 || !(typeof playerInput === 'number')) {
		throw 'That is an invalid guess.'
	}
	this.playersGuess = playerInput;
	return this.checkGuess();
}

Game.prototype.checkGuess = function() {
	var diff = this.difference();
	if(this.playersGuess == this.winningNumber) {
		return "You Win!";
	} else if(this.pastGuesses.indexOf(this.playersGuess) !== -1) {
		return "You have already guessed that number.";
	} else {
		this.pastGuesses.push(this.playersGuess)
		if(this.pastGuesses.length === 5) {
			return "You Lose.";
		} else if(diff < 10) {
			return 'You\'re burning up!';
		} else if(diff < 25) {
			return 'You\'re lukewarm.';
		} else if(diff < 50) {
			return 'You\'re a bit chilly.';
		} else if(diff < 100) {
			return 'You\'re ice cold!';
		}
	} 
}

Game.prototype.difference = function() {
	return Math.abs(this.playersGuess - this.winningNumber);
}

Game.prototype.isLower = function() {
	return this.playersGuess < this.winningNumber;
}

Game.prototype.provideHint = function() {
	return shuffle([generateWinningNumber(), generateWinningNumber(), this.winningNumber]);
}


function generateWinningNumber() {
	return Math.floor(Math.random() * 100) + 1;
}

function newGame() {
	return new Game();
}

function shuffle(arr) {
	for(var i=arr.length-1; i>=0; i--) {
		var randIndex = Math.floor(Math.random() * (i + 1))
		var tempVal = arr[i]
		arr[i] = arr[randIndex]
		arr[randIndex] = tempVal;
	}
	return arr;
}

