import { State, hook } from "../../hypertode-import.js"

//=======//
// SETUP //
//=======//
const counter = document.createElement("div")
document.body.appendChild(counter)

const doubler = document.createElement("div")
document.body.appendChild(doubler)

const history = document.createElement("div")
document.body.appendChild(history)

const last = document.createElement("div")
document.body.appendChild(last)

//=========//
// CONTENT //
//=========//
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