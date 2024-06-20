//Styling of page
// document.getElementById("rules").style.
// Define deck, shuffle function, and initial game state
const deck = [];
const suits = ['Hearts', "Diamonds", 'Clubs', "Spades"];
const values = [2,3,4,5,6,7,8,9,10,'J', 'Q', 'K', 'A'];
// Deal initial cards function
function createDeck() {
    for (let suitIdx=0; suitIdx < suits.length; suitIdx++) {
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
    for (let i = deck.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

let playerHand = [];
let dealerHand = [];

// Function to deal a single card
function dealCard() {
    return deck.pop();
}

// Initial deal (player and dealer each get two cards)
function initialDeal() {
    playerHand = [dealCard(), dealCard()];
    dealerHand = [dealCard(), dealCard()];
}
createDeck();
shuffleDeck();
initialDeal();

//Print Dealers hand
console.log('Dealer:');
dealerHand.forEach(card => {
    console.log(`${card.value} of ${card.suit}`)
}) 

console.log('Player:');
playerHand.forEach(card => {
  
console.log(`${card.value} of ${card.suit}`);
  
})

// Player actions (hit, stand)

// Dealer actions (automated)

// Calculate scores function

// Determine game outcome function

// Display cards and game messages on UI

// Event listeners for user actions (hit, stand buttons)

// Game loop and restart function
