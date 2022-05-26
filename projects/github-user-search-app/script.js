const colourMode = document.getElementById('colour-mode');
const themeStyle = document.getElementById('theme-style');

const searchInput = document.getElementById('search');
const search = document.getElementById('search-user');
const errorMessage = document.getElementById('error-message');

const userImage = document.querySelector('.profile-img img');
const userTitle = document.querySelector('.profile h1');
const userName = document.querySelector('.profile a');
const userJoinDate = document.querySelector('.profile small');
const userBio = document.querySelector('.github-profile p');
const dataNums = document.querySelectorAll('.data-section h2');

const socialMedias = document.querySelectorAll('.social-link a');
const socialSmalls = document.querySelectorAll('.social-link a small');

const firstUser = 'Octocat';

function switchTheme() {
    if (themeStyle.getAttribute("href") == "#") {
        themeStyle.href = 'styles/dark.css';
    } else {
        themeStyle.href = '#';
    }
}

function notAvailable(item, text) {    
    item.classList.add("not-available");
    return text;
}

// Enable social media link
function enableLink(item) {   
    const itemClass = item.getAttribute('class');
    if (itemClass.includes('not-available')) {
        item.classList.remove('not-available');
    } 
    if (!itemClass.includes('hover')) {
        item.classList.add('hover');
    }
    if (item.style.pointerEvents == 'none') {
        item.style.pointerEvents = 'auto';
    }
    
}

// Disable social media link
function disableLink(item) {
    item.style.pointerEvents = 'none'; 
    if (item.getAttribute('class').includes('hover')) {
        item.classList.remove('hover');
    }
}

function getGithubUser(username) {
    fetch(`https://api.github.com/users/${username}`)
        .then(res => res.json())
        .then(data => {
            if(data['message'] === 'Not Found') {
                errorMessage.style.display = 'inline-block';
            } else {
                console.log(data);
                localStorage.setItem('currentUser', username);
                console.log(localStorage.getItem('currentUser'));
                if(errorMessage.style.display = 'inline-block') {
                    errorMessage.style.display = 'none';
                }
                userImage.src= data['avatar_url'];
                userTitle.innerText = data['name'] == null? username : data['name'];

                userName.innerText = `@${username}`;
                userName.href = `https://github.com/${username}`;
                
                const dateJoined = new Date(data['created_at'].slice(0, 10)).toUTCString().slice(5, 16);
                userJoinDate.innerText = `Joined ${dateJoined}`;

                userBio.innerText = data['bio'] == null? notAvailable(userBio, 'This profile has no bio.') : data['bio'];

                // update data-section (follower,etc.)
                const dataList = [data['public_repos'], data['followers'], data['following']];
                for(let i = 0; i < dataNums.length; i++) {
                    dataNums[i].innerText = dataList[i];
                }
                
                // update social-link
                const socialList = [data['location'], data['twitter_username'], data['blog'], data['company']];
                for(let i = 0; i < socialMedias.length; i++) {

                    if(socialList[i] == null || socialList[i] === "") {
                        
                        socialSmalls[i].innerText = notAvailable(socialMedias[i], 'Not Available');
                        disableLink(socialMedias[i]);

                         
                    } else {
                        enableLink(socialMedias[i])
                        socialSmalls[i].innerText = socialList[i];
                        switch(i) {
                            case 0:
                                socialMedias[i].href = `https://twitter.com/${socialList[i]}`;
                            case 1:
                                if (socialList[i].includes(' ')) {
                                    socialList[i].replaceAll(' ', '+');
                                }
                                socialMedias[i].href = `https://www.google.com/maps/place/${socialList[i]}`;
                                break;
                            case 2:
                                socialMedias[i].href = socialList[i];
                                break;
                            case 3:
                                socialMedias[i].href = `https://github.com/${socialList[i].substring(1)}`;
                        }
                    }

                }
               
            }
            
        })
}

function searchUser(e) {
    e.preventDefault();
    const user = searchInput.value;
    getGithubUser(user);
}


getGithubUser(firstUser);
colourMode.onclick = switchTheme;
search.onsubmit = searchUser;