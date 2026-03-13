let targetNumber;
let attemptsLeft;
let guessCount;
const maxAttempts = 10;

const guessInput = document.getElementById('guessInput');
const guessButton = document.getElementById('guessButton');
const restartButton = document.getElementById('restartButton');
const messageArea = document.getElementById('message');
const attemptsLeftDisplay = document.getElementById('attemptsLeft');
const guessCountDisplay = document.getElementById('guessCount');
const container = document.querySelector('.container');

function initGame() {
    targetNumber = Math.floor(Math.random() * 100) + 1;
    attemptsLeft = maxAttempts;
    guessCount = 0;
    
    guessInput.value = '';
    guessInput.disabled = false;
    guessButton.disabled = false;
    restartButton.classList.add('hidden');
    
    messageArea.textContent = '快开始吧！';
    messageArea.className = 'message';
    
    updateDisplay();
}

function updateDisplay() {
    attemptsLeftDisplay.textContent = attemptsLeft;
    guessCountDisplay.textContent = guessCount;
}

function handleGuess() {
    const userGuess = parseInt(guessInput.value);
    
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        showMessage('请输入 1 到 100 之间的有效数字！', 'error');
        container.classList.add('shake');
        setTimeout(() => container.classList.remove('shake'), 300);
        return;
    }

    guessCount++;
    attemptsLeft--;
    
    if (userGuess === targetNumber) {
        endGame(true);
    } else if (attemptsLeft === 0) {
        endGame(false);
    } else {
        const hint = userGuess < targetNumber ? '太小了！再大一点。' : '太大了！再小一点。';
        showMessage(hint, 'hint');
    }
    
    updateDisplay();
    guessInput.value = '';
    guessInput.focus();
}

function showMessage(text, type) {
    messageArea.textContent = text;
    messageArea.className = `message ${type}`;
}

function endGame(isWin) {
    guessInput.disabled = true;
    guessButton.disabled = true;
    restartButton.classList.remove('hidden');
    
    if (isWin) {
        showMessage(`恭喜你！猜对了！答案就是 ${targetNumber}。🎉`, 'success');
    } else {
        showMessage(`游戏结束！次数用光了。正确答案是 ${targetNumber}。😢`, 'error');
    }
}

guessButton.addEventListener('click', handleGuess);
guessInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleGuess();
});
restartButton.addEventListener('click', initGame);

// 初始化游戏
initGame();
