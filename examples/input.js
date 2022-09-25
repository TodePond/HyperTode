import { State, Hook, sync } from "../../hypertode-import.js"

//==========//
// ELEMENTS //
//==========//
const input = document.createElement("input")
const display = document.createElement("div")

//=======//
// STATE //
//=======//
const name = new State("world")
const greeting = new Hook(() => name == ""? "Hello!" : `Hello ${name}!`)

input.addEventListener("input", (event) => name.value = event.target.value)

sync(input, "value", name)
sync(display, "textContent", greeting)

//==========//
// DOCUMENT //
//==========//
document.body.appendChild(document.createElement("br"))
document.body.appendChild(display)
document.body.appendChild(input)