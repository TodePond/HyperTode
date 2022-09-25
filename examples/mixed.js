import { State, Hook, sync } from "../../hypertode-import.js"

//==========//
// ELEMENTS //
//==========//
const counter = document.createElement("div")
const doubler = document.createElement("div")
const history = document.createElement("div")
const last = document.createElement("div")
const button = document.createElement("button")

button.textContent = "Reset History"
history.style["overflow"] = "hidden"

//=======//
// STATE //
//=======//
const count = new State(0)
const doubled = new Hook(() => count * 2)

const key = new State("")
const keys = new State([])

sync(counter, "textContent", new Hook(() => `Click Count: ${count}`))
sync(doubler, "textContent", new Hook(() => `Doubled: ${doubled}`))
sync(history, "textContent", new Hook(() => `Keyboard History: ${keys.value.join("")}`))
sync(last, "textContent", new Hook(() => key == ""? "Waiting for key press..." : `Key Pressed: ${key}`))

//=============//
// INTERACTION //
//=============//
window.addEventListener("click", () => count.value++)
window.addEventListener("keydown", (e) => {

	clearTimeout(key.timeout)
	key.value = e.key
	key.timeout = setTimeout(() => key.value = "", 1000)

	keys.value.push(e.key)
	keys.update()

})

button.addEventListener("click", () => {
	keys.value.length = 0
	keys.update()
})

//==========//
// DOCUMENT //
//==========//
document.body.appendChild(document.createElement("br"))
document.body.appendChild(counter)
document.body.appendChild(doubler)
document.body.appendChild(history)
document.body.appendChild(button)
document.body.appendChild(last)
