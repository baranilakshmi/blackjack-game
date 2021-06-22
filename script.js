let blackjack = {
    'you': {'scorespan':'.result1', 'div':'.myscore','score':0},
    'deal': {'scorespan':'.result2', 'div':'.botscore','score':0},
    'cards': ['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsvalue': {'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':5,'J':8,'Q':10,'A':1},
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'hitrole': false,
    'standrole': false,
    'dealrole': false
   }
   

   const You = blackjack['you'];
   const Deal = blackjack['deal'];

const hitSound = new Audio('sounds/sounds_swish.m4a');
const bustSound = new Audio('sounds/sounds_aww.mp3');
const cashSound = new Audio('sounds/sounds_cash.mp3');
const drawSound = new Audio('sounds/sounds_draw.mp3');

document.querySelector('.hit').addEventListener('click',hitwork)
document.querySelector('.stand').addEventListener('click',dealwork)
document.querySelector('.deal').addEventListener('click',endfun);

   function randomcard() {
    let randomIndex =  Math.floor(Math.random() * 13);
    return blackjack['cards'][randomIndex];
   }



 async function hitwork(){

if (blackjack['hitrole'] === false){
    let card = randomcard();
    showcard(card, You);
    scoreupdate(card, You);
    lastscore(You);

    if (You['score'] > 32) {
        await sleep(1000);
      blackjack['dealrole'] = false;
      blackjack['hitrole'] = true;
      dealwork();
    }
}
}

function showcard(card,activeplayer){

if(activeplayer['score']+blackjack['cardsvalue'][card]<=32){

let imageofcard = document.createElement('img');
imageofcard.src = `./images/${card}.png`;
document.querySelector(activeplayer['div']).appendChild(imageofcard);
hitSound.play();
}
}

function scoreupdate(card,activeplayer){

activeplayer['score'] += blackjack['cardsvalue'][card];

} 

function lastscore(activeplayer){

if(activeplayer['score'] >32){

document.querySelector(activeplayer['scorespan']).innerText = 'Bust';
document.querySelector(activeplayer['scorespan']).style.color = 'red';

}
else {
    document.querySelector(activeplayer['scorespan']).innerText = activeplayer['score'];

}
}


async function dealwork(){

if(blackjack['dealrole'] === false){

blackjack['hitrole'] = true; 
while (Deal['score']<28){
    let card = randomcard();
    showcard(card, Deal);
    scoreupdate(card, Deal);
    lastscore(Deal);
    await sleep(2000);
}
blackjack['standrole'] = true;
let victor = winner();
showresult(victor);
blackjack['dealrole'] = true;

}
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}


function winner(){

let victor;

if (You['score']<=32){
if (You['score']>Deal['score'] || (Deal['score']<32)){
victor = You;
}
else if (You['score']<Deal['score']){
console.log('You Lost');
victor = Deal;
}
else if (You['score']=== Deal['score']){
    console.log('You Draw');
}
}
else if (You['score']>32 && Deal['score'] <= 32){
    victor = Deal;
}
else if (You['score']>32 && Deal['score']){
    console.log('You Draw');
}
return victor;
}
    
function showresult(victor){

let message,color;

if (victor === You){

message = "You Won!";
color = "darkGreen";
cashSound.play();
blackjack['wins'] ++
document.getElementById('wins').innerText = blackjack['wins'];
}
else if(victor === Deal){

    message = "You Lost!";
    color = "red";
    bustSound.play();
    blackjack['losses']++
    document.getElementById('losses').innerText = blackjack['losses'];
}
else {

    message = "You Draw!";
    color = "darkblue";
    drawSound.play();
    blackjack['draws']++
    document.getElementById('draws').innerText = blackjack['draws'];
}
resultdiv = document.getElementById("heading");
resultdiv.innerText = message;
resultdiv.style.color = color;
}

function endfun(){

if (blackjack['standrole'] === true) {

blackjack['hitrole'] = false;
removecard(You);
removecard(Deal);
let resultdiv = document.getElementById('heading');
resultdiv.innerText = "Let's Play";
resultdiv.style.color = 'white';
blackjack['standrole'] = false;
blackjack['dealrole'] = false;
}
}

function removecard(activeplayer) {

let Images = document.querySelector(activeplayer['div']).querySelectorAll('img');

for (i=0; i< Images.length; i++){
    Images[i].remove();
}
hitSound.play();
activeplayer['score'] = 0;
document.querySelector(activeplayer['scorespan']).innerText = activeplayer['score'];
document.querySelector(activeplayer['scorespan']).style.color = 'white';

}