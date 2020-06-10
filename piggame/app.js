/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
//variable declarations 
var scores, roundScore, activePlayer, gamePlaying;

init();

//rolls the dice 
document.querySelector('.btn-roll').addEventListener('click', () => { //displays the correct dice when dice is rolled 
        if (gamePlaying){
            //1. random number
            var dice = Math.floor(Math.random() * 6 + 1);
            //2. display result
            var diceDOM = document.querySelector('.dice');
            diceDOM.style.display = 'block';
            diceDOM.src = 'dice-' + dice + '.png';

            //3. update round score ONLY if number !== 1
            if(dice !== 1){
                //add score
                roundScore += dice;
                document.querySelector("#current-" + activePlayer).textContent = roundScore;
            } else {
                //moves to next player
                nextPlayer();
            }
    }
});

//holds the score 
document.querySelector('.btn-hold').addEventListener('click', () => {
    
    if(gamePlaying){
        //Add CURRENT score to GLOBAL score 
        scores[activePlayer] += roundScore;

        //Update UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //Check if player won the game
        if (scores[activePlayer] >= 20){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active'); 
            gamePlaying = false;
        } else {
            //next player
            nextPlayer();
        }
    }
    
});

//new game button 
document.querySelector('.btn-new').addEventListener('click', init);


function nextPlayer() {
    //next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    
    //if player rolls 1
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //remove active class when turn changes 
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //changes UI when player turn changes 
    document.querySelector('.dice').style.display = 'none';
};

function init(){

    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
   
    document.querySelector('.dice').style.display = 'none'; //hides the middle dice before anything is rolled 

    //initializes all scores to 0
    document.getElementById('score-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('#name-0').textContent = 'Player 1'; 
    document.querySelector('#name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
};

