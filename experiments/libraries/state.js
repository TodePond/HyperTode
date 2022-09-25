export const State = class {

	static hook = null

	constructor(value) {
		this.hooks = new Set()
		this.value = value
	}

	set value(value) {
		this._value = value
		for (const hook of this.hooks.values()) {
			if (hook === null) continue
			hook.update()
		}
	}

	get value() {
		if (State.hook !== null) {
			this.hooks.add(State.hook)
		}
		return this._value
	}

	valueOf() {
		return this.value
	}

	toString() {
		return `${this.value}`
	}

}

export const Hook = class extends State {
	constructor(get, {object, propertyName} = {}) {
		super()
		if (typeof get !== "function") {
			const value = get
			get = () => value
		}
		this.get = get
		this.object = object
		this.propertyName = propertyName
		this.update()
	}

	update() {
		const oldHook = State.hook
		State.hook = this

		const value = this.get()
		if (this.object !== undefined) {
			this.object[this.propertyName] = value
		}
		this.value = value

		State.hook = oldHook
	}
}

export const sync = (object, propertyName, get) => {
	const hook = new Hook(get, {object, propertyName})
	return hook
}
