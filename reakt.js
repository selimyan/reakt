export class Component {

  constructor() {
    this.state = {}
  }

  setState(partialState) {
    Object.assign(this.state, partialState)
  }
}

export function createElement(type, props, ...children) {
  return { type, props, children }
}