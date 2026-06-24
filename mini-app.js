[24/06/2026 22:17] Y: const tg = window.Telegram.WebApp;
tg.expand();
tg.ready();

let selectedStake = 0;
let mainWalletBalance = 500; 
let stakeCounter = 0; 
let countdownInterval;
let gameplayInterval;
let mySelectedCards = []; 
let allBookedCardsInGame = []; 

const bingoCardsDatabase = {};

// 1. የቢንጎ ካርቴላዎችን እውነተኛ ባለ 5 ቁጥር አድርጎ ማመንጨት
function generateAllCards() {
    for (let cardNum = 1; cardNum <= 200; cardNum++) {
        let cardNumbers = [];
        while (cardNumbers.length < 5) {
            let num = Math.floor(Math.random() * 75) + 1;
            if (!cardNumbers.includes(num)) {
                cardNumbers.push(num);
            }
        }
        cardNumbers.sort((a, b) => a - b);
        bingoCardsDatabase[cardNum] = cardNumbers;
    }
}
generateAllCards();

// 2. ስቴፕ 1፦ ስቴክ መምረጥ
function selectStake(amount) {
    selectedStake = amount;
    resetGameDataForNewRound(); 
    
    document.getElementById('welcome-view').classList.add('style-hidden');
    document.getElementById('card-selection-view').classList.remove('style-hidden');
    document.getElementById('gameplay-view').classList.add('style-hidden');
    
    document.getElementById('main-wallet-display').innerText = mainWalletBalance;
    document.getElementById('play-wallet-display').innerText = amount;
    document.getElementById('stake-counter-display').innerText = stakeCounter;
    
    buildCardsGrid();
    startCountdown();
}

function resetGameDataForNewRound() {
    stakeCounter = 0;
    mySelectedCards = [];
    allBookedCardsInGame = [];
    if (gameplayInterval) clearInterval(gameplayInterval);
    if (countdownInterval) clearInterval(countdownInterval);
}

// 3. የ 200 ካርቴላዎች መደርደሪያ
function buildCardsGrid() {
    const container = document.getElementById('cards-container');
    let html = '';
    for (let i = 1; i <= 200; i++) {
        let innerNumbers = bingoCardsDatabase[i].join(',');
        html += 
            <div class="card-box" id="card-box-${i}" onclick="flipAndBuyCard(${i})">
                <div class="card-inner">
                    <div class="card-front">${i}</div>
                    <div class="card-back">BINGO<br>${innerNumbers}</div>
                </div>
            </div>
        ;
    }
    container.innerHTML = html;
}

// 4. ስቴፕ 2፦ ካርቴላ መግዛት
function flipAndBuyCard(cardNumber) {
    const cardElement = document.getElementById(card-box-${cardNumber});
    if (cardElement.classList.contains('flipped') || cardElement.classList.contains('deactivated')) return;
    
    if (mainWalletBalance < selectedStake) {
        alert("🚨 ይቅርታ፣ በቂ ቀሪ ሂሳብ የለዎትም!");
        return;
    }

    mySelectedCards.push(cardNumber);
    allBookedCardsInGame.push(cardNumber);
    mainWalletBalance -= selectedStake;
    document.getElementById('main-wallet-display').innerText = mainWalletBalance;
    
    cardElement.classList.add('flipped');
    setTimeout(() => {
        cardElement.classList.add('deactivated');
        stakeCounter += 1;
        document.getElementById('stake-counter-display').innerText = stakeCounter;
    }, 1200); 
}

// 5. የሰከንድ ቆጣሪ
function startCountdown() {
    let timeLeft = 15; 
    const timerDisplay = document.getElementById('game-timer');
    
    countdownInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = ${timeLeft} s;
        
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            
            if (mySelectedCards.length === 0) {
                let randomCard = Math.floor(Math.random() * 200) + 1;
                mySelectedCards.push(randomCard);
                allBookedCardsInGame.push(randomCard);
                stakeCounter += 1;
            }
            
            while (allBookedCardsInGame.length < 30) {
                let fakeBooked = Math.floor(Math.random() * 200) + 1;
                if (!allBookedCardsInGame.includes(fakeBooked)) {
                    allBookedCardsInGame.push(fakeBooked);
                    stakeCounter += 1;
                }
            }
            switchToGameplayScreen();
        }
    }, 1000);
}
// 6. ስቴፕ 3፦ የቀጥታ ጨዋታ ገጽ መክፈት
function switchToGameplayScreen() {
    document.getElementById('card-selection-view').classList.add('style-hidden');
    document.getElementById('gameplay-view').classList.remove('style-hidden');
    
    document.getElementById('my-card-number').innerText = mySelectedCards.join(', ');
    document.getElementById('live-players-game').innerText = allBookedCardsInGame.length;
    
    let calculatedDerash = (allBookedCardsInGame.length * selectedStake) - 40;
    document.getElementById('live-derash-game').innerText = calculatedDerash > 0 ? calculatedDerash : 0;
    
    const boardContainer = document.getElementById('bingo-numbers-board');
    let boardHtml = '';
    for (let i = 1; i <= 75; i++) {
        boardHtml += <div class="board-num" id="bn-${i}">${i}</div>;
    }
    boardContainer.innerHTML = boardHtml;
    
    const myNumbersContainer = document.getElementById('my-lucky-numbers');
    let myNumsHtml = '';
    mySelectedCards.forEach(cardId => {
        myNumsHtml += <div class="card-section-title" style="font-size:10px; color:#ffcc00; margin-top:5px; font-weight:bold;">ካርቴላ #${cardId}</div>;
        bingoCardsDatabase[cardId].forEach(num => {
            myNumsHtml += <div class="my-num-row" id="my-lucky-${cardId}-${num}">${num}</div>;
        });
    });
    myNumbersContainer.innerHTML = myNumsHtml;
    
    startSmartGameplay();
}

// 7. የቁጥሮች ማደባለቂያ አልጎሪዝም
function shuffleBingoNumbers() {
    let numbers = [];
    for (let i = 1; i <= 75; i++) numbers.push(i);
    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    return numbers;
}

// 8. የቢንጎ መስመር አይነትን የመለያ ተግባር
function getWinPatternName(calledCount) {
    const patterns = ["በአግድም (Horizontal Line)", "በቁመት (Vertical Line)", "በዲያጎናል (Diagonal Line)"];
    if (calledCount <= 15) return patterns; 
    if (calledCount > 15 && calledCount <= 30) return patterns;
    return patterns;
}

// 9. ዋናው የጨዋታ እጣ መጣያ እና የ 10 ሰከንዶች ማሳያ መቆጣጠሪያ
function startSmartGameplay() {
    const shuffledPool = shuffleBingoNumbers();
    let calledNumbers = [];
    let callsCount = 0;
    const statusMsg = document.getElementById('game-status-message');
    const finalPrize = document.getElementById('live-derash-game').innerText;

    gameplayInterval = setInterval(() => {
        if (shuffledPool.length === 0) {
            clearInterval(gameplayInterval);
            return;
        }

        let nextNum = shuffledPool.pop();
        calledNumbers.push(nextNum);
        callsCount++;
        
        document.getElementById('live-calls-count').innerText = callsCount;
        
        const activeElements = document.querySelectorAll('.current-active');
        activeElements.forEach(el => el.classList.remove('current-active'));
        
        const boardElement = document.getElementById(bn-${nextNum});
        if (boardElement) {
            boardElement.classList.add('called');
            boardElement.classList.add('current-active');
        }
        
        mySelectedCards.forEach(cardId => {
            const luckyElement = document.getElementById(my-lucky-${cardId}-${nextNum});
            if (luckyElement) luckyElement.classList.add('hit');
        });
        
        statusMsg.innerText = 🔄 ቁጥር ${nextNum} ወጥቷል!;
        
        // አሸናፊዎችን መፈተሽ
        let winningBookedCards = [];

        for (let cardId = 1; cardId <= 200; cardId++) {
            let cardNums = bingoCardsDatabase[cardId];
            let isCardClosed = cardNums.every(num => calledNumbers.includes(num));
            
            if (isCardClosed && allBookedCardsInGame.includes(cardId)) {
                winningBookedCards.push(cardId);
            }
        }
  // 🎉 የተያዘ እውነተኛ ካርቴላ ከዘጋ
        if (winningBookedCards.length > 0) {
            clearInterval(gameplayInterval); 
            
            let shareAmount = Math.floor(parseInt(finalPrize) / winningBookedCards.length);
            let pattern = getWinPatternName(callsCount); 
            
            // 🛑 የተረጋጋ፣ የማይንቀሳቀስ እና የማያብለጨልጭ የአሸናፊ ሳጥን (Flat Design)
            let winMessageHTML = 
                <div style="background:#ffcc00; color:#000; padding:10px; border-radius:6px; margin-top:5px; border:2px solid #ffffff; font-weight:bold; text-align:center;">
// 🛑 አዲሱ የተረጋጋ እና በጥሞና ጎላ እያለ የሚቀንስ የአሸናፊ ሳጥን
            let winMessageHTML = 
                <div style="background:#ffcc00; color:#000; padding:10px; border-radius:6px; margin-top:5px; border:2px solid #ffffff; font-weight:bold; text-align:center; animation: pulse 1.5s infinite alternate ease-in-out;">
                    🏆 ቢንጎ ተገኝቷል! 🏆<br>
                    ካርቴላ ቁጥር፡ <span>${winningBookedCards.join(', ')}</span><br>
                    የሰራው መስመር፡ <span>${pattern}</span><br>
                    ሽልማት፡ <span>${shareAmount} ETB</span>
                </div>
            ;
            statusMsg.innerHTML = winMessageHTML;                    

            // የ 10 ሰከንድ ቆጣሪ ማሳያ
            let secondsLeftToShow = 10;
            const countdownTimerElement = document.createElement('div');
            countdownTimerElement.style.cssText = "font-size:11px; color:#ff9999; margin-top:6px; text-align:center; font-weight:bold;";
            statusMsg.appendChild(countdownTimerElement);

            let showDelayInterval = setInterval(() => {
                secondsLeftToShow--;
                countdownTimerElement.innerText = 🔄 በ ${secondsLeftToShow} ሰከንድ ውስጥ ወደ አዲስ ካርቴላ መያዣ ይመለሳል...;
                
                if (secondsLeftToShow <= 0) {
                    clearInterval(showDelayInterval);
                    // አውቶማቲካሊ ወደ ስቴፕ 2 መመለስ
                    selectStake(selectedStake); 
                }
            }, 1000);
        }
        
    }, 1800); 
}  
