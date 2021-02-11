const night = document.getElementById('night')
const color = document.getElementById('color')
const reset = document.getElementById('reset')


night.addEventListener('click' ,(e) => {
    const html = document.querySelector('html')
    if (html.classList.contains('dark')) {
        html.classList.remove('dark')
    } else {
        html.classList.add('dark')
    }
})

color.addEventListener('click' ,(e) => {
    setBackgroundColor()
    setTextColor()
})


reset.addEventListener('click', (e) => {
    const html = document.querySelector('html')
    if (html.classList.contains('dark')){
        html.classList.remove('dark')
    }
    removeStyle()
})

function setBackgroundColor() {
    document.body.style.backgroundColor = "#" + random()
}

function setTextColor() {
    document.body.style.color = "#" + random()
}

function random() {
    return Math.floor(Math.random() * 16777215).toString(16)
}

function removeStyle() {
    document.body.style.backgroundColor = ''
    document.body.style.color = ''
}