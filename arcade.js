const character = document.getElementById('character')
const ttc = document.getElementById('ttc')

document.addEventListener('click', moveCharacter)
document.addEventListener('hover', ttcPopUp)

//GAMES
function ttcPopUp(e) {
    const x = e.clientX
    const Y = e.clientY
    console.log(`x: ${x} y: ${y}`)
}

function moveCharacter(e) {
    const x = e.clientX
    const y = e.clientY
    character.style.transform = `translate(${x-22}px, ${y-15}px)`
}

//BELT GRADING