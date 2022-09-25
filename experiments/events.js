import { State, hook } from "../../hypertode-import.js"

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

hook(() => `Keys Pressed: ${count}`).sync(display, "textContent")
hook(() => visible.value? "Hide" : "Show").sync(button, "textContent")
hook(() => visible.value? "block" : "none").sync(display.style, "display")

//==========//
// DOCUMENT //
//==========//
document.body.appendChild(button)
document.body.appendChild(display)