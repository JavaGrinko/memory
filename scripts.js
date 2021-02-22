window.onload = init;

function init() {
    let openedCards = [];
    console.log("Скрипты подключены");
    let cards = document.getElementsByTagName("td");
    for (let card of cards) {
        card.onclick = () => onCardClick(card);
    }
    function onCardClick(card) {
        if (card.classList.contains('open')) {
            card.classList.remove('open');
        } else {
            card.classList.add('open');
            openedCards.push(card);
        }
        console.log(openedCards);
        setTimeout(() => {
            if (openedCards.length >= 2) {
                let isSame = isSameCards(openedCards[0], openedCards[1]);
                if (isSame) {
                    openedCards[0].style["visibility"] = "hidden";
                    openedCards[1].style["visibility"] = "hidden";
                } else {
                    openedCards[0].classList.remove('open');
                    openedCards[1].classList.remove('open');
                    openedCards = [];
                }
            }
        },1000);
        
    }

    function isSameCards(card1, card2) {
        let value1 = card1.children[1].innerText;
        let value2 = card2.children[1].innerText;
        return value1 === value2;
    }
}