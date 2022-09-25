import { State, Hook, sync } from "../libraries/state.js"

//=======//
// SETUP //
//=======//
const counter = document.createElement("div")
document.body.appendChild(counter)

const doubler = document.createElement("div")
document.body.appendChild(doubler)

//=========//
// CONTENT //
//=========//
const count = new State(0)
const doubled = new Hook(() => count * 2)

sync(counter, "textContent", () => `Count: ${count}`)
sync(doubler, "textContent", () => `Doubled: ${doubled}`)

//=============//
// INTERACTION //
//=============//
window.addEventListener("click", () => count.value++)
