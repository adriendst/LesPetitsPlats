let ingredients = []
let appareils = []
let ustensils = []

let selectedIngredients = []
let selectedApparails = []
let selectedUstensils = []

let displayIngredients = []
let displayAppareils = []
let displayUstensils = []

let results;

async function init() {
    results = await fetch('./recipes.json').then((response) => response.json());

    displayData(results)
    initSelect(results)
}

init()


function search() {
    const search = document.getElementsByTagName('input')[0].value

    if (search.length > 2 || selectedApparails.length > 0 || selectedIngredients.length > 0 || selectedUstensils.length > 0) {
        let data = results;
        if (search.length > 2) {
            data = data.filter(recipe => {
                if (recipe['name'].toLowerCase().includes(search.toLowerCase())) {
                    return true
                }
                if (recipe['description'].toLowerCase().includes(search.toLowerCase())) {
                    return true
                }
                let isIngredient;
                recipe['ingredients'].forEach((recipeIngredient) => {
                    if (recipeIngredient.ingredient.toLowerCase().includes(search.toLowerCase())) {
                        isIngredient = true
                    }
                });
                if (isIngredient) return true
            })
        }

        if (selectedApparails.length > 0) {
            data = data.filter(recipe => {
                if (selectedApparails.some(selectedApparail => selectedApparail.toLowerCase() === recipe.appliance.toLowerCase())) {
                    return true
                }
            })
        }
        if (selectedIngredients.length > 0) {
            data = data.filter(recipe => {
                let isAllIngredient = false;
                let isIngredients = []
                selectedIngredients.forEach(selectedIngredient => {
                    let isIngredient = []
                    isIngredient.push(recipe.ingredients.filter(ingredient => {
                        return ingredient.ingredient.toLowerCase() === selectedIngredient.toLowerCase()
                    })[0])
                    if (isIngredient[0] !== undefined) isIngredients.push(isIngredient[0])

                })
                if (isIngredients.length === selectedIngredients.length) {
                    isAllIngredient = true
                }
                else {
                    isAllIngredient = false
                }
                return isAllIngredient
            })
        }
        if (selectedUstensils.length > 0) {
            data = data.filter(recipe => {
                let isAllUstensils = false;
                let isUstensils = []
                selectedUstensils.forEach(selectedUstensil => {
                    let isUstensil = []
                    isUstensil.push(recipe.ustensils.filter(ustensil => {
                        return ustensil.toLowerCase() === selectedUstensil.toLowerCase()
                    })[0])
                    if (isUstensil[0] !== undefined) isUstensils.push(isUstensil[0])

                })
                if (isUstensils.length === selectedUstensils.length) {
                    isAllUstensils = true
                }
                else {
                    isAllUstensils = false
                }
                return isAllUstensils
            })
        }
        initSelect(data)
        displayData(data)
    }
    else if (Number(document.getElementsByClassName('recipeNumbers')[0].innerHTML.split(' ')[0]) < 50) {
        initSelect(results)
        displayData(results)
    }

}

function displayData(data) {
    const recipeNumbers = document.querySelector('.recipeNumbers')
    recipeNumbers.innerHTML = data.length + ' recettes'

    const main = document.querySelector('main')

    if (document.getElementsByClassName('recipes')[0]) {
        document.getElementsByClassName('recipes')[0].remove()
    }

    const recipes = document.createElement('div')
    recipes.setAttribute('class', 'flex flex-wrap justify-around recipes')


    data.map(d => {
        const article = document.createElement('article')
        article.setAttribute('class', 'w-96 bg-white rounded-3xl flex-50 mb-12 max-w-96')

        const img = document.createElement('img')
        img.setAttribute('class', 'w-full h-64 object-cover rounded-t-3xl')
        img.setAttribute('src', `./images/recette/${d.image}`)

        const h2 = document.createElement('h2')
        h2.setAttribute('class', 'mb-5 text-lg')
        h2.innerHTML = d.name.charAt(0).toUpperCase() + d.name.slice(1);

        const h3 = document.createElement('h3')
        h3.setAttribute('class', 'text-xs text-stone-500 mb-3')
        h3.innerHTML = 'RECETTE'

        const description = document.createElement('p')
        description.setAttribute('class', 'overflow-hidden text-ellipsis text-sm')
        description.innerHTML = d.description.charAt(0).toUpperCase() + d.description.slice(1);

        const secondh3 = document.createElement('h3')
        secondh3.setAttribute('class', 'text-xs text-stone-500 mt-3 mb-3')
        secondh3.innerHTML = 'INGRÉDIENTS'

        const section = document.createElement('section')
        section.setAttribute('class', 'flex flex-wrap')
        d.ingredients.map(ingredient => {
            const div = document.createElement('div')
            div.setAttribute('class', 'w-1/2 flex flex-col mb-3 text-sm flex-50')
            const p = document.createElement('p')
            p.innerHTML = ingredient.ingredient.charAt(0).toUpperCase() + ingredient.ingredient.slice(1);
            div.append(p)

            const span = document.createElement('span')
            span.setAttribute('class', 'text-stone-500')
            span.innerHTML = `${ingredient.quantity ? ingredient.quantity : ''} ${ingredient.unit ? ingredient.unit : ''}`
            div.append(span)
            section.append(div)
        })

        const cardContent = document.createElement('div')
        cardContent.setAttribute('class', 'card-content m-5')

        cardContent.append(h2)
        cardContent.append(h3)
        cardContent.append(description)
        cardContent.append(secondh3)
        cardContent.append(section)

        article.append(img)
        article.append(cardContent)

        recipes.append(article)

    });

    main.append(recipes)
}