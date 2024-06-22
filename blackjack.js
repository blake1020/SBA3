//Styling of page
// document.getElementById("rules").style.
// Define deck, shuffle function, and initial game state
let gameOver = false;
const deck = [];
const suits = ['Hearts', "Diamonds", 'Clubs', "Spades"];
const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
let playerPoints = 1000;
let playerHand = [];
let dealerHand = [];
let currentBet = 0;

function createBettingDiv() {
    const bettingDiv = document.createElement('div');
    bettingDiv.classList.add('betting');

    const label = document.createElement('label');
    label.textContent = "Bet:"
    label.setAttribute('for', 'bet');
    
    const input = document.createElement('input');
    input.setAttribute('type', 'number');
    input.setAttribute('id', 'bet');
    input.setAttribute('min', 1);
    input.setAttribute('max', playerPoints);
    

    const placeBetBtn = document.createElement('button');
    placeBetBtn.setAttribute('id', 'place-bet-btn');
    placeBetBtn.textContent = 'Place Bet';
    placeBetBtn.addEventListener("click", placeBet);

    const betAllBtn= document.createElement('button');
    betAllBtn.textContent = 'Bet All Points';
    betAllBtn.addEventListener('click', () => { currentBet = playerPoints;
        playerPoints =0;
        updatePointsDisplay();
        alert(`You've bet all of your points. Game continues with ${currentBet} points`);
        placeBetBtn.disabled = true;

    });


    bettingDiv.appendChild(label);
    bettingDiv.appendChild(input);
    bettingDiv.appendChild(placeBetBtn);
    
    const buttonsDiv = document.querySelector('.buttons');
    buttonsDiv.appendChild(bettingDiv);
}

function placeBet() {
    const betInput =document.getElementById('bet');
    const betAmount = parseInt(betInput.value);

    if (betAmount <= 0 || betAmount> playerPoints) {
        alert('Please enter a valid bet amount.')
        return;
    }
    currentBet = betAmount;
    playerPoints -= betAmount;
    updatePointsDisplay();
    alert(`Bet placed: ${betAmount} points.`);
    betInput.value = ''; 
}

// Deal initial cards function
function createDeck() {
    for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
        for (let valueIdx = 0; valueIdx < values.length; valueIdx++) {
            let card = {
                suit: suits[suitIdx],
                value: values[valueIdx]
            };
            deck.push(card);
        }
        //console.log(card);
    }

}
//shufling the deck
function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}


// Function to deal a single card
function dealCard() {
    let card = deck.pop();
    while (isCardInHand(card, playerHand) || isCardInHand(card, dealerHand)) {
        card = deck.pop();

    }
    return card;
}

function isCardInHand(card, hand) {
    return hand.some(c => c.suit === card.suit && c.value === card.value);
}

// Initial deal (player and dealer each get two cards)
function initialDeal() {
    playerHand = [dealCard(), dealCard()];
    dealerHand = [dealCard(), dealCard()];
}
function startGame() {

    createDeck();
    shuffleDeck();
    initialDeal();
    renderHands();
    updatePointsDisplay();
    const playerScore = calculateScore(playerHand);
    const dealerScore = calculateScore(dealerHand);
    console.log(playerScore);
    if (playerScore === 21 && dealerScore === 21) {
        alert("Both player and dealer have Blackjack! It's a tie!");
        gameOver = true;
    } else if (playerScore === 21) {
        alert("BLACKJACK! PLAYER WINS");
        gameOver = true;
    } else if (dealerScore === 21) {
        alert("Dealer has blackjack! Dealer wins!");
        gameOver = true;
    }

}


function renderHands() {
    const dealerCardsElement = document.getElementById('dealer-hand');
    const playerCardsElement = document.getElementById('player-hand');
    dealerCardsElement.innerHTML = '';
    playerCardsElement.innerHTML = '';

    dealerHand.forEach(card => {
        const cardItem = document.createElement('li');
        cardItem.textContent = `${card.value} of ${card.suit}`;
        dealerCardsElement.appendChild(cardItem);
    });

    playerHand.forEach(card => {
        const cardItem = document.createElement("li");
        cardItem.textContent = `${card.value} of ${card.suit}`;
        playerCardsElement.appendChild(cardItem);
    })
}



//Function to calculate score for players hands
function calculateScore(hand) {
    let score = 0;
    let hasAce = false;

    //loop through each card in player hand
    hand.forEach(card => {
        if (card.value === "A") {
            hasAce = true; //shows that player has an A
        }
        //Face cards
        if (card.value === "J" || card.value === 'Q' || card.value === "K") {
            score += 10;
        } else if (card.value != "A") {
            score += parseInt(card.value);
        }
    });
    //Ace 1 or 11
    if (hasAce && score <= 21) {
        score += 10;
    }
    return score;
}


//Check if the dealer or the player have 21 
//Player hit acton btn
function playerHit() {
    if (!gameOver) {

        const newCard = dealCard();
        playerHand.push(newCard);

        //updates hands
        renderHands();


        //calculate player score calculaton, bust check, split, double (if not all in)
        const playerScore = calculateScore(playerHand);
        console.log(`Player's current score: ${playerScore}`);

        if (playerScore > 21) {
            //console.log('Player busts! Gameover.');
            gameOver = true;
            alert(`Game over! Player Has Bust! Score: ${playerScore}` );
        }

    }

}
//Function to handle player's stand action 
function playerStand() {
    if (!gameOver) {
 
        gameOver = true;
        renderHands();
        dealerPlay();
        //displayGameOutcome();

        }
    }


function dealerPlay() {
    while(calculateScore(dealerHand)< 17) {
        const newCard = dealCard();
        dealerHand.push(newCard);
        renderHands();
    }
    determineGameOutcome();
    
} 

function determineGameOutcome() {
        
    const dealerScore = calculateScore(dealerHand);
    const playerScore =calculateScore(playerHand);

    if (dealerScore > 21) {
        alert(`Dealer busts! Score: ${dealerScore} Player wins! `);
    } else if (dealerScore > playerScore){
        alert(`Dealer Wins. Score: ${dealerScore}`);
    } else if (dealerScore < playerScore){
        alert("Player wins. ");
    } else {
        alert('It\'s a tie.');
    }
}


function resetGame() {
    playerHand = [];
    dealerHand = [];
    gameOver = false;
    playerPoints = 1000;
    currentBet = 0;
    deck.length = 0;


    createDeck();
    shuffleDeck();
    initialDeal();
     renderHands();
     updatePointsDisplay();
}

function updatePointsDisplay() {
    const pointsDisplay = document.getElementById('points-display');
    pointsDisplay.textContent= `Points: ${playerPoints}`;
}


//Event listeners for buttons
 const container = document.getElementById("container");
 const dealbtn = container.querySelector('#deal-btn');
 dealbtn.addEventListener('click', startGame);

 //hit button
 const hitBtn = document.getElementById('hit-btn')
hitBtn.addEventListener("click", playerHit);

// stand button
const standBtn = document.getElementById('stand-btn')
standBtn.addEventListener('click', playerStand);
document.getElementById("newGame-btn").addEventListener('click', resetGame);

//Initial game setup
createBettingDiv();
startGame()
//Print Dealers hand
console.log('Dealer:');
dealerHand.forEach(card => {
    console.log(`${card.value} of ${card.suit}`)
})

console.log('Player:');
playerHand.forEach(card => {

    console.log(`${card.value} of ${card.suit}`);

})
startGame();

