let dogImageContainer = document.querySelector('#dog-image-container')
let dogBreedList = document.querySelector('#dog-breeds')
let renderDogs = (results) => {
    let images = results[0].message
    let breeds = Object.keys(results[1].message)

    images.forEach((image) => {
        let img = document.createElement('img')
        img.src = image
        dogImageContainer.append(img)
    })

    breeds.forEach((breed) => {
        let li = document.createElement('li')
        li.textContent = breed
        dogBreedList.append(li)
    })
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

document.addEventListener('DOMContentLoaded', () => {
    fetchDogs().then(data => renderDogs(data))
})
