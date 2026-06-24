// 1. የቴሌግራም ሚኒ አፕን ማገናኘት
const tg = window.Telegram.WebApp;
let telegramUserId = "Guest";

if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
    telegramUserId = tg.initDataUnsafe.user.id;
}

// መነሻ ሂሳብ
let userBalance = 0; 
let selectedStake = 0;

// 2. 200 የተለያዩ የቢንጎ ካርቴላዎችን ማዘጋጃ ሲስተም
const bingoCardsDatabase = {};

function generateAllCards() {
    for (let cardNum = 1; cardNum <= 200; cardNum++) {
        let cardNumbers = [];
        while (cardNumbers.length < 15) {
            let num = Math.floor(Math.random() * 90) + 1;
            if (!cardNumbers.includes(num)) {
                cardNumbers.push(num);
            }
        }
        cardNumbers.sort((a, b) => a - b);
        bingoCardsDatabase[cardNum] = cardNumbers;
    }
}
generateAllCards();

// 3. ተጠቃሚው 10 ወይም 20 ሲጫን ወደ ካርቴላ ምርጫ ገጽ ማሳለፍ
function selectStake(amount) {
    selectedStake = amount;
    showCardSelectionPage();
}

// 4. የካርቴላ መምረጫ ገጽ ማሳያ
function showCardSelectionPage() {
    const mainContent = document.querySelector('.main-content');
    const liveJackpot = selectedStake * 150; 
    const livePlayers = Math.floor(Math.random() * 400) + 1200; 

    mainContent.innerHTML = 
        <div style="background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); padding: 12px; border-radius: 15px; width: 100%; margin-bottom: 15px; text-align: center;">
            <div style="font-size: 14px; color: #ffcccc; font-weight: bold;">🟢 LIVE PLAYERS: <span style="color: #00ff00;">${livePlayers} 🔥</span></div>
            <div style="font-size: 18px; font-weight: 800; margin-top: 5px;">🏆 ESTIMATED WINNING: <span style="color: #fff;">${liveJackpot} ETB</span></div>
        </div>

        <h3 style="color: #fff; margin-bottom: 5px; font-size: 18px;">🎟️ የካርቴላ ምርጫ (Bingo 7)</h3>
        <p style="font-size: 13px; margin-bottom: 15px; color: #ffcccc;">የእርስዎ ቀሪ ሂሳብ: <span style="font-weight:bold; color:#fff;">${userBalance} ETB</span></p>
        
        <div class="cards-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; max-height: 260px; overflow-y: auto; width: 100%; padding: 10px; background: rgba(0,0,0,0.4); border-radius: 15px; border: 1px solid rgba(255,255,255,0.1);">
            ${generateCardsGridHTML()}
        </div>
        
        <p style="font-size: 11px; color: #ffcccc; margin-top: 10px;">⚠️ ማሳሰቢያ: ካርቴላ ለመውሰድ ሂሳብዎ ላይ በቂ ብር መኖር አለበት።</p>
    ;
}

function generateCardsGridHTML() {
    let html = '';
    for (let i = 1; i <= 200; i++) {
        html += 
            <button onclick="confirmCardSelection(${i})" style="background: #ffffff; color: #b30000; border: none; padding: 12px 5px; font-weight: bold; border-radius: 8px; font-size: 16px; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.2); transition: 0.2s;">
                ${i}
            </button>
        ;
    }
    return html;
}

// 5. ካርቴላ ሲነካ መከልከል
function confirmCardSelection(cardNumber) {
    if (userBalance < selectedStake) {
        alert(🚨 ይቅርታ! ካርቴላ ቁጥር ${cardNumber} ለመውሰድ በቂ ቀሪ ሂሳብ የለዎትም።\n\nእባክዎ መጀመሪያ ወደ ቦቱ ተመልሰው /deposit በመጠቀም አካውንትዎን ይሙሉ እና ያሸንፉ! 💰);
        return;
    }
    
    userBalance -= selectedStake;
    let chosenNumbers = bingoCardsDatabase[cardNumber];
    alert(🎉 ማረጋገጫ: ካርቴላ ቁጥር ${cardNumber} በተሳካ ሁኔታ ወስደዋል!\n\nየእርስዎ ቁጥሮች: ${chosenNumbers.join(', ')});
}

function showRules() {
    alert("የቢንጎ 7 ጨዋታ ህጎች እዚህ ይዘረዘራሉ!");
}

function switchTab(tabName) {
    alert(tabName + " ገጽ በቅርቡ ይከፈታል!");
}
