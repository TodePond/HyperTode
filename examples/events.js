import { State, Hook, sync } from "../../hypertode-import.js"

//==========//
// ELEMENTS //
//==========//
const display = document.createElement("div")
const button = document.createElement("button")

//=======//
// STATE //
//=======//
const count = new State(0)
const visible = new State(true)

window.addEventListener("keydown", () => count.value++)
button.addEventListener("click", () => visible.value = !visible.value)

sync(display, "textContent", new Hook(() => `Keys Pressed: ${count}`))
sync(button, "textContent", new Hook(() => visible.value? "Hide" : "Show"))
sync(display.style, "display", new Hook(() => visible.value? "block" : "none"))

//==========//
// DOCUMENT //
//==========//
document.body.appendChild(document.createElement("br"))
document.body.appendChild(button)
document.body.appendChild(display)