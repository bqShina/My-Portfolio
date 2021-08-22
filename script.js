const themeStyle = document.getElementById('theme-style');
// const lightDot = document.getElementById('light-mode');
// const blueDot = document.getElementById('blue-mode');
// const greenDot = document.getElementById('green-mode');
// const purpleDot = document.getElementById('purple-mode');

// lightDot.addEventListener('click', () => {
//     themeStyle.href = 'styles/style.css';
// })
// blueDot.addEventListener('click', () => {
//     themeStyle.href = 'styles/blue.css';
// })
// greenDot.addEventListener('click', () => {
//     themeStyle.href = 'styles/green.css';
// })
// purpleDot.addEventListener('click', () => {
//     themeStyle.href = 'styles/purple.css';
// })
const theme = localStorage.getItem('theme');

if (theme == null) {
    setTheme();
} else {
    setTheme(theme);
}

const themeDots = document.getElementsByClassName('theme-dot');

for(let i = 0; i < themeDots.length; i++) {
    let dot = themeDots[i];
    dot.addEventListener('click', () => {
        let mode = dot.dataset.mode;
        localStorage.setItem('theme', mode);
        setTheme(mode);
    })
}

function setTheme(mode = 'light') {
    switch(mode) {
        case 'blue':
            themeStyle.href = "styles/blue.css";
            break;
        case 'green':
            themeStyle.href = "styles/green.css";
            break;
        case 'purple':
            themeStyle.href = "styles/purple.css";
            break;
        default:
            themeStyle.href = "styles/style.css";
    }
}

