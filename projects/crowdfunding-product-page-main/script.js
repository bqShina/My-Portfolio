const backBtn = document.getElementById('back-btn');
const bookmark = document.getElementById('bookmark');
const bookmarkText = document.querySelector('.bookmark span');

const modal = document.getElementById('modal');
const modalCloseIcon = document.getElementById('modal-close-icon');

const selectRewardBtns = document.querySelectorAll('.select-reward-btn');
const rewardContiBtns = document.querySelectorAll('.continue-btn');

const productCards = document.querySelectorAll('.product-card');
const productRadios = document.querySelectorAll('.product-card input[type="radio"]');

const moneyInputs = document.querySelectorAll('.price-input input');
const currentMoneyPlace = document.getElementById('current-money');
const totalBackersPlace = document.getElementById('total-backers');
const moneyBar = document.getElementById('blue-bar');
const bambooLefts = document.querySelectorAll('.bamboo-left');
const blackLefts = document.querySelectorAll('.black-left');

const success = document.getElementById('success');
const gotItBtn = document.querySelector('.success button');

const closeMenu = document.getElementById('close-menu');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelectorAll('nav ul li');
const headerContainer = document.querySelector('.header-container');

const totalMoney = 100000;
let bambooNum = 101;
let blackNum = 64;
let totalBackers = 5007;
let currentMoney = 89914;

// Pop up modal
function openModal() {
    modal.style.display = 'block';
}

// Close modal
function closeModal() {
    modal.style.display = 'none';
}

function closeModalByWindow(e) {
    e.target == modal? closeModal() : false;
}

// Pop up success
function openSuccess() {
    success.style.display = 'block';
}

// Close success
function closeSuccess() {
    success.style.display = 'none';
}

// Active the bookmark
function activeBookmark() {
    bookmark.classList.toggle('active');
    if (bookmark.classList.contains('active')) {
        bookmarkText.innerHTML = 'Bookmarked';
    } else {
        bookmarkText.innerHTML = 'Bookmark';
    }    
}

// Check other active product card and remove the active class
function checkAcitveCard(i) {
    for (let j = 0; j < productCards.length; j++) {
        if (productCards[j].classList.contains('active') && j != i) {
            productCards[j].classList.remove('active');
        }
    } 
}

// Update Money
function updateMoney(i) {
    currentMoney += Number(moneyInputs[i].value);
    currentMoneyPlace.innerText = `$${currentMoney.toLocaleString("en-US")}`;
    const progressPercent = (currentMoney / totalMoney) * 100;
    moneyBar.style.width = `${progressPercent < 100? progressPercent : 100}%`;
}

// Update Numbers
function updateNumbers() {
    totalBackers++;
    totalBackersPlace.innerText = totalBackers.toLocaleString("en-US");
}

// Update left
function updateleft(itemlist, number) {
    itemlist[0].innerHTML = number;
    itemlist[1].innerHTML = `${number}<span>left</span>`;
}

// Open nav menu
function openNavMenu() {
    headerContainer.classList.add('open');
}

// Close nav menu
function closeNavMenu() {
    headerContainer.classList.remove('open');
}

// -------- Add events --------
backBtn.onclick = openModal;
modalCloseIcon.onclick = closeModal;
window.onclick = closeModalByWindow;
bookmark.onclick = activeBookmark;
gotItBtn.onclick = closeSuccess;
hamburger.onclick = openNavMenu;
closeMenu.onclick = closeNavMenu;

// Select reward 
for (let i = 0; i < selectRewardBtns.length; i++) {
    selectRewardBtns[i].onclick = () => {
        openModal();
        productRadios[i + 1].checked = true;
        productCards[i + 1].classList.add('active');
        checkAcitveCard(i + 1);
    }
}

// Modal Product Cards
for (let i = 0; i < productRadios.length; i++) {
    productRadios[i].onclick = () => {
        if (productRadios[i].checked) {
            productCards[i].classList.add('active');
        }
        checkAcitveCard(i);
    }   
}

// Reward Continue button add event
for (let i = 0; i < rewardContiBtns.length; i++) {
    rewardContiBtns[i].onclick = () => {
        updateMoney(i); 
        if (i > 0) {
            updateNumbers();
        } 
        switch(i) {
            case 1:
                bambooNum--;
                updateleft(bambooLefts, bambooNum);
                break;
            case 2:
                blackNum--;
                updateleft(blackLefts, blackNum);
        }            
        closeModal();
        openSuccess();
    }
}

// Add close nav menu to nav links
for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].onclick = closeNavMenu;
}

