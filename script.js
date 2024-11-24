// script.js
let isHolding = false;
let holdStartTime = 0;
let rewardType = ''; // This will store the reward type
const rewardMessages = {
  rare: "You unlocked a Rare Star Drop!",
  epic: "You unlocked an Epic Star Drop!",
  legendary: "You unlocked a Legendary Star Drop!"
};

const rewardTimes = {
  rare: 2000, // 2 seconds
  epic: 5000, // 5 seconds
  legendary: 11000 // 11 seconds
};

const starDropButton = document.getElementById('star-drop');
const rewardMessage = document.getElementById('reward-message');

// Function to get a reward based on probability
function getRewardType() {
  const random = Math.random(); // Get a random number between 0 and 1
  if (random < 0.55) {
    return 'rare'; // 55% chance
  } else if (random < 0.95) {
    return 'epic'; // 40% chance
  } else {
    return 'legendary'; // 5% chance
  }
}

starDropButton.addEventListener('mousedown', (e) => {
  isHolding = true;
  holdStartTime = Date.now();
  rewardMessage.textContent = 'TAP AND HOLD...';

  // Get the reward type and set the required hold time
  rewardType = getRewardType();
  setTimeout(() => {
    rewardMessage.textContent = rewardMessages[rewardType];
  }, rewardTimes[rewardType]);
});

starDropButton.addEventListener('mouseup', () => {
  if (isHolding) {
    const holdDuration = Date.now() - holdStartTime;
    isHolding = false;
    // If the user releases too early, show a message
    if (holdDuration >= rewardTimes[rewardType]) {
      rewardMessage.textContent = rewardMessages[rewardType];
    } else {
      rewardMessage.textContent = 'You released too early!';
    }
  }
});

starDropButton.addEventListener('mouseleave', () => {
  if (isHolding) {
    isHolding = false;
    rewardMessage.textContent = 'You released too early!';
  }
});
