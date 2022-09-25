//=============//
// FROGASAURUS //
//=============//
const HyperTodeFrogasaurus = {}

//========//
// SOURCE //
//========//
{
	//====== ./state.js ======
	{
		HyperTodeFrogasaurus["./state.js"] = {}
		const State = class {
		
			static hook = null
		
			constructor(value) {
				this.hooks = new Set()
				this.syncs = new Set()
				this._value = value
			}
		
			set value(value) {
				this._value = value
				this.update()
			}
		
			get value() {
				if (State.hook !== null) {
					this.hooks.add(State.hook)
				}
				return this._value
			}
		
			update() {
				for (const hook of this.hooks.values()) {
					hook.update()
				}
		
				for (const sync of this.syncs.values()) {
					const [object, propertyName] = sync
					object[propertyName] = this._value
				}
			}
		
			valueOf() {
				return this.value
			}
		
			toString() {
				return `${this.value}`
			}
		
			sync(object, propertyName) {
				const sync = [object, propertyName]
				this.syncs.add(sync)
				object[propertyName] = this._value
				return this
			}
		
		}
		
		const Hook = class extends State {
			constructor(get) {
				super()
				if (typeof get !== "function") {
					const value = get
					get = () => value
				}
				this.get = get
				this.update()
			}
		
			update() {
				const oldHook = State.hook
				State.hook = this
				this._value = this.get()
				State.hook = oldHook
		
				State.prototype.update.apply(this, [])
			}
		}
		
		const hook = (get) => new Hook(get)

		HyperTodeFrogasaurus["./state.js"].State = State
		HyperTodeFrogasaurus["./state.js"].hook = hook
	}



}

//=========//
// EXPORTS //
//=========//
export const { State, hook } = HyperTodeFrogasaurus["./state.js"]

export const HyperTode = {
	State: HyperTodeFrogasaurus["./state.js"].State,
	hook: HyperTodeFrogasaurus["./state.js"].hook,
}