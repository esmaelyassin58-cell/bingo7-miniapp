// 1. የቴሌግራም ሚኒ አፕን ማገናኘት
const tg = window.Telegram.WebApp;
tg.expand(); // ሚኒ አፑ ሙሉ ስክሪን እንዲሆን ያደርጋል

// የቴሌግራም ተጠቃሚ ስም መግጠም
if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
    const userNameElement = document.getElementById('user-name');
    const userAvatarElement = document.getElementById('user-avatar');
    if (userNameElement) userNameElement.innerText = tg.initDataUnsafe.user.first_name;
    if (userAvatarElement) userAvatarElement.innerText = tg.initDataUnsafe.user.first_name.charAt(0).toUpperCase();
}

// የጨዋታው መነሻ ዳታዎች
let userBalance = 0; 
let selectedStake = 0;
const bingoCardsDatabase = {};

// 2. 200 የቢንጎ ካርቴላዎችን በዘፈቀደ ማመንጫ ሲስተም
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

// 3. ተጠቃሚው 10 ወይም 20 ሲጫን የካርቴላ መምረጫ ገጽ ማሳያ
function selectStake(amount) {
    selectedStake = amount;
    
    // የእንኳን ደህና መጡ ገጽን መደበቅ እና የካርቴላ መምረጫ ገጽን ማሳየት
    document.getElementById('welcome-view').style.display = 'none';
    const cardSelectionView = document.getElementById('card-selection-view');
    cardSelectionView.style.display = 'block';
    
    // የጃክፖት ብር እና የኦንላይን ሰዎችን ቁጥር ማዘመን
    document.getElementById('jackpot-amount').innerText = amount * 150;
    document.getElementById('live-players-count').innerText = Math.floor(Math.random() * 200) + 400; // ቀለል ያሉ ቁጥሮች
    document.getElementById('user-balance-display').innerText = userBalance + " ETB";
    
    // 200 የካርቴላ ቁልፎችን በስክሪኑ ላይ መደርደር
    const container = document.getElementById('cards-container');
    let html = '';
    for (let i = 1; i <= 200; i++) {
        html += <button class="card-select-btn" onclick="confirmCardSelection(${i})">${i}</button>;
    }
    container.innerHTML = html;
}

// 4. ተጠቃሚው አንድ ካርቴላ ሲመርጥ የሚፈጠር ማረጋገጫ (የባላንስ መቆጣጠሪያ)
function confirmCardSelection(cardNumber) {
    if (userBalance < selectedStake) {
        alert(🚨 ይቅርታ! ካርቴላ ቁጥር ${cardNumber} ለመውሰድ በቂ ቀሪ ሂሳብ የለዎትም።\n\nእባክዎ መጀመሪያ ወደ ቦቱ ተመልሰው /deposit በመጠቀም አካውንትዎን ይሙሉ እና ያሸንፉ! 💰);
        return;
    }
    
    userBalance -= selectedStake;
    document.getElementById('user-balance-display').innerText = userBalance + " ETB";
    let chosenNumbers = bingoCardsDatabase[cardNumber];
    alert(🎉 ማረጋገጫ: ካርቴላ ቁጥር ${cardNumber} በተሳካ ሁኔታ ወስደዋል!\n\nየእርስዎ ቁጥሮች: ${chosenNumbers.join(', ')});
}

function showRules() {
    alert("የቢንጎ 7 ጨዋታ ህጎች እዚህ ይዘረዘራሉ!");
}

function switchTab(tabName) {
    alert(tabName + " ገጽ በቅርቡ ይከፈታል!");
}
