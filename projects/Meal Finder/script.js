const searchInput = document.getElementById('search-input'),
submit = document.getElementById('submit'),
random = document.getElementById('random-btn'),
mealsEl = document.getElementById('meals'),
resultHeading = document.getElementById('result-heading'),
singleMealEl = document.getElementById('single-meal');

// Search meals and fetch from API
function searchMeal(e) {
    e.preventDefault();

    // Clear single meal
    singleMealEl.innerHTML = '';

    // Get search term
    const term = searchInput.value;
    // console.log(term);

    // Check empty
    if (term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then(res => res.json())
            .then(data => {
                resultHeading.innerHTML = `<h2>Search results for ${term}:</h2>`;
                console.log(data);
                const meals = data.meals;

                if (meals === null) {
                    resultHeading.innerHTML = '<h2>There are no search results. Please try again!</h2>';
                } else {
                    mealsEl.innerHTML = meals.map(meal => `
                        <div class="meal">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                            <div class="meal-info" data-mealID="${meal.idMeal}">
                                <h3>${meal.strMeal}</h3>
                            </div>
                        </div>
                    `).join('');
                }

                // Clear search text
                searchInput.value = '';
            });


    } else {
        alert('Please enter a search term.');
    }

}

// Fetch meal by ID
function getMealById(mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0];
            console.log(meal);
            addMealToDOM(meal);
        });
}

// Fetch random meal from API
function getRandomMeal() {
    // Clear meal and heading
    mealsEl.innerHTML = '';
    resultHeading.innerHTML = '';

    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0];
            console.log(meal);
            addMealToDOM(meal);
        })
}

// Add meal to DOM
function addMealToDOM(meal) {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        } else {
            break;
        }
    }
    // console.log(ingredients);

    singleMealEl.innerHTML = `
        <div class="single-meal">
            <h1>${meal.strMeal}</h1>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <div class="single-meal-info">
                ${meal.strCategrory ? `<p>${meal.strCategrory}</p>` : ''}
                ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
            </div>

            <div class="meal-instruction">
                <p>${meal.strInstructions}</p>
                <h2>Ingredients</h2>
                <ul>
                    ${ingredients.map(ing => `<li>${ing}</li>`).join('')}               
                </ul>
            </div>
        </div>
    `
    
}



// Event Listener
submit.addEventListener('submit', searchMeal);
random.addEventListener('click', getRandomMeal);

mealsEl.addEventListener('click', e => {
    const mealInfo = e.path.find(item => {
        if (item.classList) {
            return item.classList.contains('meal-info');
        } else {
            return false;
        }

       
        
    })
    console.log(mealInfo);

    if (mealInfo) {
        const mealID = mealInfo.getAttribute('data-mealID');
        console.log(mealID);
        getMealById(mealID);
    }
})

