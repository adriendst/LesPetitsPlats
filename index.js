let ingredients = []
let appareils = []
let ustensils = []

let selectedIngredients = []
let selectedApparails = []
let selectedUstensils = []

let displayIngredients = []
let displayAppareils = []
let displayUstensils = []

const ingredientSelect = document.getElementById('ingredientSelect')
const appareilSelect = document.getElementById('appareilSelect')
const ustensilsSelect = document.getElementById('ustensilSelect')

ingredientSelect.children[0].addEventListener('click', showOptions)
ingredientSelect.children[1].children[0].addEventListener('input', searchOptions)
appareilSelect.children[0].addEventListener('click', showOptions)
appareilSelect.children[1].children[0].addEventListener('input', searchOptions)
ustensilsSelect.children[0].addEventListener('click', showOptions)
ustensilsSelect.children[1].children[0].addEventListener('input', searchOptions)


function showOptions(event) {
    if (event.currentTarget.parentElement.children[1].style.display === 'flex') {
        event.currentTarget.style.borderBottomLeftRadius = null
        event.currentTarget.style.borderBottomRightRadius = null
        event.currentTarget.parentElement.children[1].style.display = null
    }
    else {
        event.currentTarget.style.borderBottomLeftRadius = '0px'
        event.currentTarget.style.borderBottomRightRadius = '0px'
        event.currentTarget.parentElement.children[1].style.display = 'flex'
    }
}

async function init() {
    results = await fetch('./recipes.json').then((response) => response.json());

    displayData(results)
    initSelect(results)
}

function initIngredientSelect(data) {
    const selectIngredient = document.getElementById('ingredientOptions')

    if (selectIngredient.children[3] !== undefined) {
        selectIngredient.children[3].remove()
    }

    const divIngredient = document.createElement('div')
    divIngredient.setAttribute('class', 'options')
    selectIngredient.append(divIngredient);

    ingredients = []

    data.map(d => {
        d.ingredients.map(ingredient => {
            if (!ingredients.includes(ingredient.ingredient.toLowerCase())) {
                ingredients.push(ingredient.ingredient.toLowerCase());
                if (!selectedIngredients.includes(ingredient.ingredient.toLowerCase())) {
                    const option = document.createElement('span');
                    option.innerHTML = ingredient.ingredient.charAt(0).toUpperCase() + ingredient.ingredient.slice(1);
                    selectIngredient.children[3].append(option);
                    option.addEventListener('click', () => select(option))
                }
            }
        });

    })

    displayIngredients = ingredients.filter(ingredient => {
        return !selectedIngredients.includes(ingredient)
    })

    return data
}

function initAppareilSelect(data) {
    const selectAppareil = document.getElementById('appareilOptions')
    if (selectAppareil.children[3] !== undefined) {
        selectAppareil.children[3].remove()
    }

    const divAppareil = document.createElement('div')
    divAppareil.setAttribute('class', 'options')
    selectAppareil.append(divAppareil);

    appareils = []

    data.map(d => {
        if (!appareils.includes(d.appliance.toLowerCase())) {
            appareils.push(d.appliance.toLowerCase());
            if (!selectedApparails.includes(d.appliance.toLowerCase())) {
                const option = document.createElement('span');
                option.innerHTML = d.appliance.charAt(0).toUpperCase() + d.appliance.slice(1);
                selectAppareil.children[3].append(option);
                option.addEventListener('click', () => select(option))
            }
        }
    })

    displayAppareils = appareils.filter(appareil => {
        return !selectedApparails.includes(appareil)
    })
    return data
}

function initUstensilSelect(data) {
    const ustensilsSelect = document.getElementById('ustensilOptions')
    if (ustensilsSelect.children[3] !== undefined) {
        ustensilsSelect.children[3].remove()
    }

    const divUstensil = document.createElement('div')
    divUstensil.setAttribute('class', 'options')
    ustensilsSelect.append(divUstensil);
    ustensils = []
    data.map(d => {
        d.ustensils.map(ustensil => {
            if (!ustensils.includes(ustensil.toLowerCase())) {
                ustensils.push(ustensil.toLowerCase());
                if (!selectedUstensils.includes(ustensil.toLowerCase())) {
                    const option = document.createElement('span');
                    option.innerHTML = ustensil.charAt(0).toUpperCase() + ustensil.slice(1);
                    ustensilsSelect.children[3].append(option);
                    option.addEventListener('click', () => select(option))
                }
            }
        });
    })


    displayUstensils = ustensils.filter(ustensil => {
        return !selectedUstensils.includes(ustensil)
    })
    return data
}

function initSelect(data) {
    data = initAppareilSelect(data)
    data = initIngredientSelect(data)
    data = initUstensilSelect(data)
}

init()

let ingredientSearch = ''
let appareilSearch = ''
let ustensilSearch = ''

function searchOptions(event) {
    if (event.target.parentElement.id === 'ingredientOptions') {
        ingredientSearch = event.target.value
        searchIngredient(ingredientSearch)
    }
    if (event.target.parentElement.id === 'ustensilOptions') {
        ustensilSearch = event.target.value
        searchUstensil(ustensilSearch)
    }
    if (event.target.parentElement.id === 'appareilOptions') {
        appareilSearch = event.target.value
        searchAppareil(appareilSearch)
    }
}

function searchIngredient(ingredientSearch) {
    const searchedIngredient = displayIngredients.filter(ingredient => {
        return ingredient.toLowerCase().includes(ingredientSearch.toLowerCase())
    })

    const selectIngredient = document.getElementById('ingredientOptions')

    if (selectIngredient.children[3] !== undefined) {
        selectIngredient.children[3].remove()
    }

    const divIngredient = document.createElement('div')
    divIngredient.setAttribute('class', 'options')
    selectIngredient.append(divIngredient);

    searchedIngredient.map(ingredient => {
        const option = document.createElement('span');
        option.innerHTML = ingredient.charAt(0).toUpperCase() + ingredient.slice(1);
        selectIngredient.children[3].append(option);
        option.addEventListener('click', () => select(option))
    });
}

function searchAppareil(appareilSearch) {
    const searchedAppareil = displayAppareils.filter(appareil => {
        return appareil.toLowerCase().includes(appareilSearch.toLowerCase())
    })

    const selectAppareil = document.getElementById('appareilOptions')

    if (selectAppareil.children[3] !== undefined) {
        selectAppareil.children[3].remove()
    }

    const divIngredient = document.createElement('div')
    divIngredient.setAttribute('class', 'options')
    selectAppareil.append(divIngredient);

    searchedAppareil.map(appareil => {
        const option = document.createElement('span');
        option.innerHTML = appareil.charAt(0).toUpperCase() + appareil.slice(1);
        selectAppareil.children[3].append(option);
        option.addEventListener('click', () => select(option))
    });
}

function searchUstensil(ustensilSearch) {
    const searchedUstensil = displayUstensils.filter(ustensil => {
        return ustensil.toLowerCase().includes(ustensilSearch.toLowerCase())
    })

    const selectUstensil = document.getElementById('ustensilOptions')

    if (selectUstensil.children[3] !== undefined) {
        selectUstensil.children[3].remove()
    }

    const divIngredient = document.createElement('div')
    divIngredient.setAttribute('class', 'options')
    selectUstensil.append(divIngredient);

    searchedUstensil.map(ustensil => {
        const option = document.createElement('span');
        option.innerHTML = ustensil.charAt(0).toUpperCase() + ustensil.slice(1);
        selectUstensil.children[3].append(option);
        option.addEventListener('click', () => select(option))
    });
}

function deselectOption(option, event) {
    let isSelect = false;
    let options;
    let optionToAdd;

    isSelect = ustensils.concat(selectedUstensils).some(ustensil => ustensil.toLowerCase() === option.toLowerCase())
    if (isSelect === true) {
        selectedUstensils = selectedUstensils.filter(selectedUstensil => selectedUstensil.toLowerCase() !== option.toLowerCase())
        options = document.getElementById('ustensilOptions')
        optionToAdd = document.createElement('span')
    }
    isSelect = appareils.concat(selectedApparails).some(appareil => appareil.toLowerCase() === option.toLowerCase())
    if (isSelect === true) {
        selectedApparails = selectedApparails.filter(selectedApparail => selectedApparail.toLowerCase() !== option.toLowerCase())
        options = document.getElementById('appareilOptions')
        optionToAdd = document.createElement('span')
    }
    isSelect = ingredients.concat(selectedIngredients).some(ingredient => ingredient.toLowerCase() === option.toLowerCase())
    if (isSelect === true) {
        selectedIngredients = selectedIngredients.filter(selectedIngredient => selectedIngredient.toLowerCase() !== option.toLowerCase())
        options = document.getElementById('ingredientOptions')
        optionToAdd = document.createElement('span')
    }

   Array.from(options.children[2].children).map(optionSelect => {  optionSelect.innerHTML === option && optionSelect.remove() })

    event.srcElement.parentElement.remove()

    search()
}

function select(option) {
    const parentElement = option.parentElement.parentElement
    parentElement.style.display = 'none'

    parentElement.parentElement.children[0].style.borderBottomLeftRadius = null
    parentElement.parentElement.children[0].style.borderBottomRightRadius = null

    let divOptions

    if (parentElement.id === 'ustensilOptions') {
        divOptions = document.getElementsByClassName('ustensilOptions')[0]
        divOptionsSelected = document.getElementById('ustensilOptions')
        selectedUstensils.push(option.innerHTML.toLowerCase())
        document.getElementById('ustensilInput').value = ''
    }
    else if (parentElement.id === 'ingredientOptions') {
        divOptions = document.getElementsByClassName('ingredientOptions')[0]
        divOptionsSelected = document.getElementById('ingredientOptions')
        selectedIngredients.push(option.innerHTML.toLowerCase())
        document.getElementById('ingredientInput').value = ''
    }
    else if (parentElement.id === 'appareilOptions') {
        divOptions = document.getElementsByClassName('appareilOptions')[0]
        divOptionsSelected = document.getElementById('appareilOptions')
        selectedApparails.push(option.innerHTML.toLowerCase())
        document.getElementById('appareilInput').value = ''
    }

    const span = document.createElement('span')
    const label = document.createElement('label')
    label.innerHTML = option.innerHTML.charAt(0).toUpperCase() + option.innerHTML.slice(1);
    const i = document.createElement('i')
    i.setAttribute('class', 'fa-solid fa-xmark fa-lg')
    i.addEventListener('click', (event) => deselectOption(option.innerHTML, event))

    span.append(label)
    span.append(i)
    divOptions.append(span)
    option.remove()

    const span2 = document.createElement('span')
    span2.innerHTML = option.innerHTML.charAt(0).toUpperCase() + option.innerHTML.slice(1);
    divOptionsSelected.children[2].append(span2)

    search()
}

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
    recipes.setAttribute('class', 'recipes')


    data.map(d => {
        const article = document.createElement('article')

        const img = document.createElement('img')
        img.setAttribute('src', `./images/recette/${d.image}`)

        const h2 = document.createElement('h2')
        h2.innerHTML = d.name.charAt(0).toUpperCase() + d.name.slice(1);

        const h3 = document.createElement('h3')
        h3.innerHTML = 'RECETTE'

        const description = document.createElement('p')
        description.innerHTML = d.description.charAt(0).toUpperCase() + d.description.slice(1);

        const secondh3 = document.createElement('h3')
        secondh3.innerHTML = 'INGRÉDIENTS'

        const section = document.createElement('section')
        d.ingredients.map(ingredient => {
            const div = document.createElement('div')
            const p = document.createElement('p')
            p.innerHTML = ingredient.ingredient.charAt(0).toUpperCase() + ingredient.ingredient.slice(1);
            div.append(p)

            const span = document.createElement('span')
            span.innerHTML = `${ingredient.quantity ? ingredient.quantity : ''} ${ingredient.unit ? ingredient.unit : ''}`
            div.append(span)
            section.append(div)
        })

        const cardContent = document.createElement('div')
        cardContent.setAttribute('class', 'card-content')

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