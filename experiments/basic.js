import { State, hook } from "../../hypertode-import.js"

//==========//
// ELEMENTS //
//==========//
const counter = document.createElement("div")
const doubler = document.createElement("div")
const history = document.createElement("div")
const last = document.createElement("div")

//=======//
// STATE //
//=======//
const count = new State(0)
const doubled = hook(() => count * 2)

const key = new State("")
const keys = new State([])

hook(() => `Click Count: ${count}`).sync(counter, "textContent")
hook(() => `Doubled: ${doubled}`).sync(doubler, "textContent")
hook(() => `Keyboard History: ${keys.value.join("")}`).sync(history, "textContent")
hook(() => key == ""? "" : `Key Pressed: ${key}`).sync(last, "textContent")


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

//==========//
// DOCUMENT //
//==========//
document.body.appendChild(counter)
document.body.appendChild(doubler)
document.body.appendChild(history)
document.body.appendChild(last)
