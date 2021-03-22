let openedCards = [];
let initTime = 60;
let time = 0;
let score = 0;
let cards;

window.onload = function() {
    console.log("Скрипты подключены");
    init();
    initUI();
}

function initUI() {
    const startButton = document.getElementById("start");
    const menu = document.getElementById("menu");
    const timerTag = document.getElementById("timer");
    const scoreTag = document.getElementById("score");
    startButton.onclick = () => {
        const container = document.getElementsByClassName("game-container")[0];
        container.style['background-image'] = "url(images/wood.jpg)";
        shuffleCards(cards);
        time = initTime;
        score = 0;
        menu.style["display"] = "none";
        timerTag.innerText = time;
        scoreTag.innerText = score;
        showAllCards();
        setTimeout(() => {
            hideAllCards();
            let interval = setInterval(() => {
                time--;
                if (time < 0) {
                    clearInterval(interval);
                    menu.style["display"] = "flex";
                } else {
                    timerTag.innerText = time;
                    scoreTag.innerText = score;
                }
            }, 1000);
        }, 5000);     
    }
}

function winner() {
    const container = document.getElementsByClassName("game-container")[0];
    container.style['background-image'] = "url(winner.gif)";
}

function checkWinner() {
    for (let card of cards) {
        if (card.style["visibility"] !== 'hidden') {
            return false;
        }
    }
    return true;
}

function showAllCards() {
    document.getElementById("blocker").style["display"] = "block";
    for (let card of cards) {
        card.classList.add('open')
    }
}

function hideAllCards() {
    document.getElementById("blocker").style["display"] = "none";
    for (let card of cards) {
        card.classList.remove('open')
    }
}

function init() {
    cards = document.getElementsByTagName("td");
    for (let card of cards) {
        card.onclick = () => onCardClick(card);
        card.style["visibility"] = "visible";
    }
    function onCardClick(card) {
        if (openedCards.length >= 2) return;
        if (openedCards.includes(card)) return;
        if (card.classList.contains('open')) {
            card.classList.remove('open');
        } else {
            card.classList.add('open');
            openedCards.push(card);
        }
        setTimeout(() => {
            if (openedCards.length >= 2) {
                let isSame = isSameCards(openedCards[0], openedCards[1]);
                if (isSame) {
                    openedCards[0].style["visibility"] = "hidden";
                    openedCards[1].style["visibility"] = "hidden";
                    score++;
                    if (checkWinner()) {
                        winner();
                    }
                }
                for (let card of openedCards) {
                    card.classList.remove('open');
                }
                openedCards = [];
            }
        }, 1500);

    }

    function isSameCards(card1, card2) {
        let value1 = card1.children[1].children[0].src;
        let value2 = card2.children[1].children[0].src;
        return value1 === value2;
    }
}

function shuffleCards(cards) {
    for (let i = 0; i < 500; i++) {
        let cardIndex1 = Math.round(Math.random() * (cards.length - 1));
        let cardIndex2 = Math.round(Math.random() * (cards.length - 1));
        let card1 = cards[cardIndex1];
        let card2 = cards[cardIndex2];
        let imgTmp = card1.children[1].children[0].src;
        card1.children[1].children[0].src = card2.children[1].children[0].src;
        card2.children[1].children[0].src = imgTmp;
    }
}