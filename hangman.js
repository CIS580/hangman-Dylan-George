var stickman = document.getElementById('scaffold');
var wordDiv = document.getElementById('word');
var lettersDiv = document.getElementById('letters');
var guessesDiv = document.getElementById('guesses');
var secretWord = "";
var blanks = "";

//The index of each underscore in wordDiv's innerHTML
var underscoreLocations = [];
//Total number of wrong guesses
var numberWrong = 0;
//Total number of correct guesses
var numberRight = 0;
//The number of wrong turns until stick man is complete
var maxChances = 6;

/**
 * Initializes a new game.
 */
function init() {  
  numberWrong = 0;
  clearGuesses();
  resetLetters();
  drawStickMan(0);
  chooseSecretWord();
  drawBlanks(); 
  findUnderscoreLocations();
};
init();

/** 
 * Clear the guesses div of all prior guesses
 */
function clearGuesses() {
  guessesDiv.innerHTML = "";
}

/**
 * Resets the letters div with an anchor tag for each letter 
 * in the alphabet
 */
function resetLetters() {
  var letters = [];
  for(i=0; i<26; i++) {
    var letter = String.fromCharCode(65 + i); 
    letters.push('<a id="' + letter + '" onclick=guessLetter(' + letter + ') href="#' + letter + '">' + letter + '</a>');    
  }
  lettersDiv.innerHTML = letters.join('');
}

/**
 * Scans the wordDiv innerHTML for all underscores, storing
 * each underscores spot in an array. This position is used later
 * to replace the underscores
 */
function findUnderscoreLocations()
{
  for (i = 0; i < wordDiv.innerHTML.length; i++)
  {
	if(wordDiv.innerHTML.charAt(i) == '_')
	{
		underscoreLocations.push(i);
	}
  }
}

/**
 * Guesses a single letter, removes it from possible guesses, 
 * checks to see if it is in the secret word, and if it is
 * adds it to the secret word, if not, draws another hangman part
 * @param {elm} the element clicked
 */
function guessLetter(elm) {
  var letter = elm.id;

  // Remove the letter from possible guesses element
  var node = document.getElementById(letter);
  node.parentElement.removeChild(node);

  // Add the letter to the guesses div
  node = document.createElement('span');
  node.innerHTML = letter;
  guessesDiv.appendChild(node);

  // TODO: Determine if the letter is in the secret word,
  // if so, reveal it in the secretWordDiv, otherwise
  // add a part to our hangman
  
  /*Class solution
  
	if(secretWord.indexOf(letter.toLowerCase()) != -1)
	{
		var oldBlanks = blanks;
		blanks = "";
		for(i=0; i<secretWord.length; i++)
		{
			if (secretWord.charAt(i) == letter.toLowerCase())
			{
				blanks += letter.toLowerCase(); 
			}
			else
			{
				blanks += oldBlanks.charAt(i);
			}
		}
		drawBlanks();
	}
	else
	{
		wrongGues++;
		drawStickMan(numberWrong);
	}
  
  */
  
  var noneRight = true;
  //Search through each space, comparing the guess to each character of the secret word
  for(i = 0; i < blanks.length; i++)
  {
	if (letter == secretWord.charAt(i).toUpperCase())
	{
		
		//Replaces innerHTML by removing underscore and replacing with guessed character
		wordDiv.innerHTML = wordDiv.innerHTML.substr(0, underscoreLocations[i]) + letter + 
			wordDiv.innerHTML.substr(underscoreLocations[i]+1);
		noneRight = false;
		numberRight++;
	}
  }
  	//if no matches were found, add to stick man
  if(noneRight == true)
  {
	numberWrong++;
	drawStickMan(numberWrong);
  }

  // TODO: Determine if the game is over, and if so,
  // let the player know if they have won or lost
  
  //The alerts pop up before the final letter is placed
  //and before the final stick man piece is drawn,
  //but I don't know how to fix that
  if(numberRight == secretWord.length)
  {
	alert("Congratulations. You won!");
  }
  else if (numberWrong == maxChances)
  {
	alert("You lost. Game Over.");
  }
  
}

/**
 * Draws the stickman
 * @param {wrongGuesses} the number of wrong guesses
 */
function drawStickMan(wrongGuesses) {
  if(wrongGuesses == 0) {
    scaffold.src = "scaffold.png";
  }
  else {
    scaffold.src = "stickman" + wrongGuesses + ".png";
  }
}

/**
 * Chooses a random word from the dictionary to be our secret word
 * and set blanks to match the number of letters.
 */
function chooseSecretWord() {
  var index = Math.floor(Math.random() * dictionary.length);
  secretWord = dictionary[index].word; 
  blanks = '';
  for(i = 0; i < secretWord.length; i++) {
    blanks += '_';
  } 
}

/**
 * Renders the blanks and known letters of the secret word into
 * the wordDiv
 */
function drawBlanks(){
  var html = [];
  for(i=0; i < blanks.length; i++) {
    html.push('<span>' + blanks.charAt(i) + '</span>');
  }
  wordDiv.innerHTML = html.join('');
}