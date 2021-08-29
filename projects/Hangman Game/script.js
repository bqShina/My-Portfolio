const wordEle = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-btn');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correntLetters = [];
const wrongLetters = [];

function displayWord() {
    wordEle.innerHTML = `
        ${selectedWord
        .split('')
        .map(letter => `
            <span class="letter">
                ${correntLetters.includes(letter) ? letter : ''}
            </span>
        `).join('')
    }
    `;

    const innerWord = wordEle.innerText.replace(/\n/g, '');

    if (innerWord === selectedWord) {
        finalMessage.innerText = 'Congratulation! You won! :)';
        popup.style.display = 'flex';
    }

}

// Update the wrong letters
function updateWrongLettersEl() {
    // Display wrong letters
    wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;
    // Display figure parts
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if (index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    })

    // Check if lost
    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'Unfunturnately you lost. :(';
        popup.style.display = 'flex';
    }
}

// Show notification
function showNotification() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000)
}

// Keydown letter press
window.addEventListener('keydown', e => {
    const keyNumber = e.keyCode;
    if (keyNumber >= 65 && keyNumber <= 90) {
        const letter = e.key;

        if (selectedWord.includes(letter)) {
            if (!correntLetters.includes(letter)) {
                correntLetters.push(letter);
                displayWord();
            } else {
                showNotification();
            }
        } else {
            if (!wrongLetters.includes(letter)) {

                wrongLetters.push(letter);
                updateWrongLettersEl();
            } else {
                showNotification();
            }          
        }
    }
});
 
// Restart game and play again
playAgainBtn.addEventListener('click', () => {
    // Empty arrays
    correntLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayWord();

    updateWrongLettersEl();

    popup.style.display = 'none';
});

displayWord();