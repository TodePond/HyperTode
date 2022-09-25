
const name = "world"

const Greeting = () => {
	return <div>Hello {name}!</div>
}

//=====================

const Greeting = (name) => {
	return <div>Hello {name}!</div>
}

//=====================

const Counter = () => {

	const count = new State(0)
	
	addEventListener("click", () => count.value++)
	
	return <div>Clicks: {count}</div>
	
}

//=====================

const Counter = () => {

	const count = new State(0)
	
	addEventListener("click", () => count.value++)
	
	return <div>
		<div>Clicks: {count}</div>
		<div>Doubled: {count * 2}</div>
	</div>

}

//=====================

const Measurement = () => {

	const width = new State(window.innerWidth)
	const height = new State(window.innerHeight)
	
	addEventListener("resize", () => {
		width.value = window.innerWidth
		height.value = window.innerHeight
	})
	
	return <div>
		<div>Width: {width}</div>
		<div>Height: {height}</div>
	</div>
	
}

//=====================

const Toggle = () => {
	
	const isExpanded = new State(false)
	const handleClick = () => isExpanded.value = !isExpanded
	
	return (
		<div>
			<button onclick={handleClick}>{isExpanded? "Hide" : "Show"</button>
			{isExpanded? <div>Hello world!</div> : ""}
		</div>
	)
	
}

//=========================

const App = () => {
	
	const count = new State(0)
	const name = new State("world")
	
	const handleClick = () => count.value++
	const handleInput = (event) => name.value = event.target.value
	
	return <div class="app">
		<h1>Hello {name}!</h1>
		<input value={name} oninput={handleInput}></input>
		<button onclick={handleClick}>Clicks: {count}</button>
	</div>
	
}

//=========================

const App = () => {
	
	const count = new State(0)
	const name = new State("world")
	
	return <div class="app">
		<h1>Hello {name}!</h1>
		<input value={name} oninput={(e) => name.value = e.target.value}></input>
		<button onclick={() => count.value++}>
			Clicks: {count}
		</button>
	</div>
	
}
