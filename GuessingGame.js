function Game() {
	this.playersGuess = null;
	this.pastGuesses = [];
	this.winningNumber = generateWinningNumber();
	this.over = false;
}

Game.prototype.playersGuessSubmission = function(playerInput) {
	if(playerInput < 1 || playerInput > 100 || !Number.isInteger(parseInt(playerInput))) {
		return 'That is an invalid guess.'
	}
	this.playersGuess = parseInt(playerInput);
	return this.checkGuess();
}

Game.prototype.checkGuess = function() {
	var diff = this.difference();
	if(this.pastGuesses.indexOf(this.playersGuess) !== -1) {
		return "You have already guessed that number.";
	}
	this.pastGuesses.push(this.playersGuess)
	if(this.playersGuess == this.winningNumber) {
		return "You Win!";
	} else {
		this.playersGuess = null;
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
	if(this.pastGuesses.length > 2) {
		return "It's one of the following: " + shuffle([generateWinningNumber(), generateWinningNumber(), this.winningNumber]);
	} else {
		return "You haven't even tried yet"
	}
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

$(document).ready(function() {
	function resetGame() {
		newGame = new Game();
		$('.guess').text('-');
		$('#player-input').val('');
		$('#title').text('Guessing Game');
		$('#subtitle').text('Guess any number between 1 and 100');
	}
	function submit(){
		if(!newGame.over) {
			var newGuess = $('#player-input').val();
			var result = newGame.playersGuessSubmission(newGuess);
			$('#title').text(result);
			if(result != "That is an invalid guess." && result != "You have already guessed that number.") {
				if(newGame.pastGuesses.length <= 5) {
					$('.guess').eq(newGame.pastGuesses.length - 1).text(newGuess);
				}
				if(result === 'You Win!' || result === 'You Lose.') {
					newGame.over = true;
				}
			}
			$('#player-input').val('');
		}
	}
	var newGame;
	resetGame();
	$('#submit').click(submit);
	$('body').on('keydown', function(key) {
		if(key.keyCode == 13) {
			submit();
		}
	})
	$('#reset').click(function() {
		resetGame();
	})
	$('body').on('keydown', function(key) {
		if(key.keyCode == 72) {
			alert(newGame.winningNumber);
		}
	})
	$(':button').on('mouseenter', function() {
		$(this).animate({'top' : '-=2px'}, 100);
	});
	$(':button').on('mouseleave', function() {
		$(this).animate({'top' : '+=2px'}, 100);
	});
	$('#hint').click(function(){
		alert(newGame.provideHint());
	})
});

