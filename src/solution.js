let dogImageContainer = document.querySelector('#dog-image-container')
let dogBreedList = document.querySelector('#dog-breeds')
let dropDown = document.querySelector('#breed-dropdown')
let breeds;
let highlightEvent = (e) => {
   e.target.style['color'] = 'red'
}

let renderDogImages = (images) => {
    images.forEach((image) => {
        let img = document.createElement('img')
        img.src = image
        dogImageContainer.append(img)
    }) 
}

let renderBreeds = (breeds) => {
    breeds.forEach((breed) => {
        let li = document.createElement('li')
        li.textContent = breed
        li.addEventListener('click', highlightEvent)
        dogBreedList.append(li)
    })
}

let renderDogs = (results) => {
    let images = results[0].message
    breeds = Object.keys(results[1].message)
    renderDogImages(images)
    renderBreeds(breeds)
}

let fetchDogs = async () => {
    try {
        let imgURL = fetch('https://dog.ceo/api/breeds/image/random/4')
        let breedURL = fetch('https://dog.ceo/api/breeds/list/all')
        let response = await Promise.all([imgURL, breedURL])
        let data = response.map((res) => res.json())
        let results = await Promise.all(data)
        return results
    } catch (error) {
        console.error(error)
    }
}

let removeDogs = (dogBreeds) => {
    while (dogBreeds.lastChild) {
        dogBreeds.lastChild.remove()
    }
}

dropDown.addEventListener('click', (e) => {
    let filteredBreeds = breeds.filter(breed => breed[0].toLowerCase() === e.target.value)
    removeDogs(dogBreedList)
    renderBreeds(filteredBreeds)
})

document.addEventListener('DOMContentLoaded', () => {
    fetchDogs().then(data => renderDogs(data))
})
