let inventory = 0; // Number of star drops in inventory
let maxDailyDrops = 3;
let rewardsGiven = 0; // Tracks how many rewards have been opened


const inventoryStatus = document.getElementById('inventory-status');
const openInventoryButton = document.getElementById('open-inventory');
const starDropButton = document.getElementById('star-drop');
const rewardMessage = document.getElementById('reward-message');
const backToMenuButton = document.getElementById('back-to-menu');

const checkboxes = {
  physical: document.getElementById('physical-win'),
  mental: document.getElementById('mental-win'),
  spiritual: document.getElementById('spiritual-win')
};

const rewardMessages = {
  rare: "You unlocked a Rare Star Drop!",
  epic: "You unlocked an Epic Star Drop!",
  legendary: "You unlocked a Legendary Star Drop!"
};

const rewardTimes = {
  rare: 2000, // 2 seconds
  epic: 5000, // 5 seconds
  legendary: 10000 // 10 seconds
};

// Initialize inventory tracking
function updateInventoryStatus() {
  inventoryStatus.textContent = `Star Drops in Inventory: ${inventory}`;
  openInventoryButton.disabled = inventory === 0;
}

// Limit star drops to a maximum of 3 daily
function limitDailyStarDrops() {
  if (inventory >= maxDailyDrops) {
    for (let key in checkboxes) {
      checkboxes[key].disabled = true;
    }
  }
}

// Collect star drops from checkboxes
for (let key in checkboxes) {
  checkboxes[key].addEventListener('change', (e) => {
    if (e.target.checked && inventory < maxDailyDrops) {
      inventory++;
      updateInventoryStatus();
      limitDailyStarDrops();
    }
  });
}

// Open all star drops in inventory
openInventoryButton.addEventListener('click', () => {
  document.getElementById('menu-screen').classList.add('hidden');
  document.getElementById('game-screen').classList.remove('hidden');
  rewardsGiven = 0;
  processNextStarDrop();
});

// Simulate star drop opening
function processNextStarDrop() {
  if (rewardsGiven >= inventory) {
    rewardMessage.textContent = "All star drops opened!";
    backToMenuButton.classList.remove('hidden');
    inventory = 0; // Reset inventory after all star drops are opened
    updateInventoryStatus();
    return;
  }

  rewardMessage.textContent = "TAP AND HOLD!";
  let rewardType = getRewardType();
  setTimeout(() => {
    rewardMessage.textContent = rewardMessages[rewardType];
    rewardsGiven++;
    setTimeout(processNextStarDrop, 1000);
  }, rewardTimes[rewardType]);
}

openInventoryButton.addEventListener('click', () => {
    // Hide inventory button and show game screen
    openInventoryButton.style.display = 'none';
    menuScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    rewardsGiven = 0;
    processNextStarDrop();
  });

// Return to menu
backToMenuButton.addEventListener('click', () => {
  document.getElementById('menu-screen').classList.remove('hidden');
  document.getElementById('game-screen').classList.add('hidden');
  backToMenuButton.classList.add('hidden');
});


// Reward calculation
function getRewardType() {
  const random = Math.random();
  if (random < 0.65) return 'rare';
  if (random < 0.98) return 'epic';
  return 'legendary';
}


// Initial setup
updateInventoryStatus();
limitDailyStarDrops();
