fetchImages()
fetchBreeds()

function fetchImages() {
    fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(res => res.json())
    .then(data => {data.message.forEach(dog => {renderImages(dog)})
    })
}

function fetchBreeds() {
    fetch("https://dog.ceo/api/breeds/list/all")
    .then(res => res.json())
    .then(data => {
        Object.keys(data.message).forEach(dog => {renderBreed(dog)})
        document.getElementById('breed-dropdown').addEventListener('change', (e) => filterBreeds(e, Object.keys(data.message)))
    })
}

function renderImages(dog) {
    const container = document.getElementById('dog-image-container')
    const img = document.createElement('img')
    img.src = dog
    container.append(img)
}

function renderBreed(dog) {
    const container = document.getElementById('dog-breeds')
    const li = document.createElement('li')
    li.textContent = dog
    li.addEventListener('click', () => {li.style.color = li.style.color === "red" ? "black" : "red"})
    container.append(li)
}

function filterBreeds(e, breeds) {
    const filteredBreeds = breeds.filter(breed => breed[0].toLowerCase() === e.target.value)
    clearBreeds()
    filteredBreeds.forEach(dog => renderBreed(dog))
}   

function clearBreeds() {
    const container = document.getElementById('dog-breeds')
    while (container.firstChild) {
        container.removeChild(container.firstChild)
    }
}