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

const ingredientSelect = document.getElementById('ingredientSelect')
const appareilSelect = document.getElementById('appareilSelect')
const ustensilsSelect = document.getElementById('ustensilSelect')

ingredientSelect.children[0].addEventListener('click', showOptions)
ingredientSelect.children[1].children[0].children[0].addEventListener('input', searchOptions)
appareilSelect.children[0].addEventListener('click', showOptions)
appareilSelect.children[1].children[0].children[0].addEventListener('input', searchOptions)
ustensilsSelect.children[0].addEventListener('click', showOptions)
ustensilsSelect.children[1].children[0].children[0].addEventListener('input', searchOptions)


function showOptions(event) {
    if (event.currentTarget.parentElement.children[1].style.display === 'flex') {
        event.currentTarget.parentElement.style.borderBottomLeftRadius = null
        event.currentTarget.parentElement.style.borderBottomRightRadius = null
        event.currentTarget.parentElement.children[1].style.display = null
        event.currentTarget.parentElement.children[0].children[1].style.transform = null
        if (event.currentTarget.parentElement.id === 'ingredientSelect') {
            resetElementSearch(ingredientSearch, 'ingredientInput', displayIngredients, 'ingredientOptions')
        }
        else if (event.currentTarget.parentElement.id === 'ustensilSelect') {
            resetElementSearch(ustensilSearch, 'ustensilInput', displayUstensils, 'ustensilOptions')
        }
        else {
            resetElementSearch(appareilSearch, 'appareilInput', displayAppareils, 'appareilOptions')
        }
    }
    else {
        event.currentTarget.parentElement.style.borderBottomLeftRadius = '0px'
        event.currentTarget.parentElement.style.borderBottomRightRadius = '0px'
        event.currentTarget.parentElement.children[1].style.display = 'flex'
        event.currentTarget.parentElement.children[0].children[1].style.transform = 'rotate(-180deg)'
    }
}

async function init() {
    results = await fetch('./recipes.json').then((response) => response.json());

    displayData(results)
    initSelect(results)
}


function initElementSelect(data, optionId, elements, initElement, initElement2, selectedElement) {
    const selectElement = document.getElementById(optionId)
    if (selectElement.children[2] !== undefined) {
        selectElement.children[2].remove()
    }

    const div = document.createElement('div')
    div.setAttribute('class', 'flex flex-col')
    selectElement.append(div);

    elements = []

    data.map(d => {
        if (Array.isArray(d[initElement])) {
            d[initElement].map(element => {
                element = element[initElement2] ? element[initElement2] : element
                if (!elements.includes(element.toLowerCase())) {
                    elements.push(element.toLowerCase());
                    if (!selectedElement.includes(element.toLowerCase())) {
                        const option = document.createElement('span');
                        option.setAttribute('class', 'w-full pr-3 pl-8 pt-2 pb-2')
                        option.innerHTML = element.charAt(0).toUpperCase() + element.slice(1);
                        selectElement.children[2].append(option);
                        option.addEventListener('click', () => select(option))
                    }
                }
            });
        } else {
            if (!elements.includes(d[initElement].toLowerCase())) {
                elements.push(d[initElement].toLowerCase());
                if (!selectedElement.includes(d[initElement].toLowerCase())) {
                    const option = document.createElement('span');
                    option.setAttribute('class', 'w-full pr-3 pl-8 pt-2 pb-2')
                    option.innerHTML = d[initElement].charAt(0).toUpperCase() + d[initElement].slice(1);
                    selectElement.children[2].append(option);
                    option.addEventListener('click', () => select(option))
                }
            }
        }
    })

    const displayElements = elements.filter(element => {
        return !selectedApparails.includes(element)
    })

    return displayElements
}

function initSelect(data) {
    displayAppareils = initElementSelect(data, 'appareilOptions', appareils, 'appliance', '', selectedApparails)
    displayIngredients = initElementSelect(data, 'ingredientOptions', ingredients, 'ingredients', 'ingredient', selectedIngredients)
    displayUstensils = initElementSelect(data, 'ustensilOptions', ustensils, 'ustensils', '', selectedUstensils )
}

init()

let ingredientSearch = ''
let appareilSearch = ''
let ustensilSearch = ''

function resetElementSearch(elementSearch, inputId, displayElements, optionId) {
    elementSearch = ''
    const input = document.getElementById(inputId)
    input.value = ''
    input.parentElement.children[1].className === 'fa-solid fa-xmark flex items-center text-gray-400' && input.parentElement.children[1].remove()
    searchElement(elementSearch, displayElements, optionId)
}

function searchOptionsElement(elementSearch, displayElements, optionId, target, inputId) {
    elementSearch = target.value
    searchElement(elementSearch, displayElements, optionId)
    if (elementSearch.length === 1 && target.parentElement.children[1].className !== 'fa-solid fa-xmark flex items-center text-gray-400') {
        const close = document.createElement('i')
        close.setAttribute('class', 'fa-solid fa-xmark flex items-center text-gray-400')
        close.addEventListener('click', () => resetElementSearch(elementSearch, inputId, displayElements, optionId))
        target.parentElement.insertBefore(close, target.parentElement.children[1])
    }
    else if (elementSearch.length === 0 && target.parentElement.children[1].className === 'fa-solid fa-xmark flex items-center text-gray-400') {
        target.parentElement.children[1].remove()
    }
}

function searchOptions(event) {
    if (event.target.parentElement.parentElement.id === 'ingredientOptions') {
        searchOptionsElement(ingredientSearch, displayIngredients, 'ingredientOptions', event.target, 'ingredientInput')
    }
    if (event.target.parentElement.parentElement.id === 'ustensilOptions') {
        searchOptionsElement(ustensilSearch, displayUstensils, 'ustensilOptions', event.target, 'ustensilInput')
    }
    if (event.target.parentElement.parentElement.id === 'appareilOptions') {
        searchOptionsElement(appareilSearch, displayAppareils, 'appareilOptions', event.target, 'appareilInput')
    }
}

function searchElement(selectSearch, displayElements, optionId) {
    console.log(displayIngredients)
    const searchedElements = displayElements.filter(element => {
        return element.toLowerCase().includes(selectSearch.toLowerCase())
    })

    const selectElement = document.getElementById(optionId)

    if (selectElement.children[2] !== undefined) {
        selectElement.children[2].remove()
    }

    const div = document.createElement('div')
    div.setAttribute('class', 'options flex flex-col')
    selectElement.append(div);

    searchedElements.map(element => {
        const option = document.createElement('span');
        option.setAttribute('class', 'w-full pr-3 pl-8 pt-2 pb-2')
        option.innerHTML = element.charAt(0).toUpperCase() + element.slice(1);
        div.append(option);
        option.addEventListener('click', () => select(option))
    });
}

function deselectOption(option, event) {
    let isSelect = false;
    let options;

    isSelect = ustensils.concat(selectedUstensils).some(ustensil => ustensil.toLowerCase() === option.toLowerCase())
    if (isSelect === true) {
        selectedUstensils = selectedUstensils.filter(selectedUstensil => selectedUstensil.toLowerCase() !== option.toLowerCase())
        options = document.getElementById('ustensilOptions')
    }
    isSelect = appareils.concat(selectedApparails).some(appareil => appareil.toLowerCase() === option.toLowerCase())
    if (isSelect === true) {
        selectedApparails = selectedApparails.filter(selectedApparail => selectedApparail.toLowerCase() !== option.toLowerCase())
        options = document.getElementById('appareilOptions')
    }
    isSelect = ingredients.concat(selectedIngredients).some(ingredient => ingredient.toLowerCase() === option.toLowerCase())
    if (isSelect === true) {
        selectedIngredients = selectedIngredients.filter(selectedIngredient => selectedIngredient.toLowerCase() !== option.toLowerCase())
        options = document.getElementById('ingredientOptions')
    }

    Array.from(options.children[1].children).map(optionSelect => { optionSelect.innerHTML === option && optionSelect.remove() })

    event.srcElement.parentElement.remove()

    search()
}

function select(option) {
    const parentElement = option.parentElement.parentElement

    let divOptions;
    let divOptionsSelected;

    if (parentElement.id === 'ustensilOptions') {
        divOptions = document.getElementsByClassName('ustensilOptions')[0]
        divOptionsSelected = document.getElementById('ustensilOptions')
        selectedUstensils.push(option.innerHTML.toLowerCase())
        document.getElementById('ustensilInput').value = ''
        ustensilsSelect.children[1].children[0].children[1].className === 'fa-solid fa-xmark flex items-center text-gray-400' && ustensilsSelect.children[1].children[0].children[1].remove()
    }
    else if (parentElement.id === 'ingredientOptions') {
        divOptions = document.getElementsByClassName('ingredientOptions')[0]
        divOptionsSelected = document.getElementById('ingredientOptions')
        selectedIngredients.push(option.innerHTML.toLowerCase())
        document.getElementById('ingredientInput').value = ''
        ingredientSelect.children[1].children[0].children[1].className === 'fa-solid fa-xmark flex items-center text-gray-400' && ingredientSelect.children[1].children[0].children[1].remove()
    }
    else if (parentElement.id === 'appareilOptions') {
        divOptions = document.getElementsByClassName('appareilOptions')[0]
        divOptionsSelected = document.getElementById('appareilOptions')
        selectedApparails.push(option.innerHTML.toLowerCase())
        document.getElementById('appareilInput').value = ''
        appareilSelect.children[1].children[0].children[1].className === 'fa-solid fa-xmark flex items-center text-gray-400' && appareilSelect.children[1].children[0].children[1].remove()
    }

    const span = document.createElement('span')
    span.setAttribute('class', 'w-full bg-yellow-300 h-14 flex items-center rounded-xl mt-2 relative')
    const label = document.createElement('label')
    label.setAttribute('class', 'pl-4')
    label.innerHTML = option.innerHTML.charAt(0).toUpperCase() + option.innerHTML.slice(1);
    const i = document.createElement('i')
    i.setAttribute('class', 'fa-solid fa-xmark fa-lg float-right absolute right-6')
    i.addEventListener('click', (event) => deselectOption(option.innerHTML, event))

    span.append(label)
    span.append(i)
    divOptions.append(span)
    option.remove()

    const span2 = document.createElement('span')
    span2.setAttribute('class', 'flex w-full pr-3 pl-8 pt-2 pb-2 bg-yellow-300')
    span2.innerHTML = option.innerHTML.charAt(0).toUpperCase() + option.innerHTML.slice(1);
    console.log(divOptionsSelected)
    divOptionsSelected.children[1].append(span2)

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