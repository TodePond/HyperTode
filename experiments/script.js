import { State, Hook, sync } from "./libraries/state.js"

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
const doubled = new Hook(() => count * 2)

const key = new State("")
const keys = new State([])

sync(counter, "textContent", () => `Count: ${count}`)
sync(doubler, "textContent", () => `Doubled: ${doubled}`)
sync(history, "textContent", () => `Keyboard History: ${keys.value.join(", ")}`)
sync(last, "textContent", () => key == ""? "" : `Key Pressed: ${key}`)

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