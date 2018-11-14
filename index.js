import Reakt, { Component } from './reakt.js'
import ReaktDOM from './reaktDom.js'

class List extends Component {

  constructor() {
    super()
    this.state = { items: [] }

    setInterval(() => {
      this.setState({
        items: [...this.state.items, 'Hii']
      })
    }, 2000)
  }

  render() {
    return Reakt.createElement(
      'ul',
      null,
      ...this.state.items.map(
        item => createElement('li', null, item)
      )
    )
  }
}

const App = () => (
  Reakt.createElement(
    'div',
    null,
    Reakt.createElement('h1', null, 'Hello'),
    Reakt.createElement(List)
  )
)

ReaktDOM.render(
  Reakt.createElement(App, null),
  document.getElementById('app')
)