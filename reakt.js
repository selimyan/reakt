export class Component {

  constructor(updater) {
    this.state = {}
    this.updater = updater
  }

  setState(partialState) {
    Object.assign(this.state, partialState)
    this.updater(this)
  }
}

export function createElement(type, props, ...children) {
  return { type, props, children }
}