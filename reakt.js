import { createElement } from './index.js'
import { render } from './reaktDom.js'


class List {

  constructor() {
    this.state = { items: ['Gayane'] }

    setInterval(() => {
      this.state.items.push('New Name')
    }, 2000)
  }

  render() {
    return createElement(
      'ul',
      null,
      ...this.state.items.map(
        item => createElement('li', null, item)
      )
    )
  }
}

const Title = (props) => {
  return createElement(
    'h1',
    {
      style: 'color: red',
      onClick: () => alert('A Title'),
      innerHTML: props.title
    },
    props.title
  )
}

const App = createElement(
  'div',
  null,
  createElement(
    Title,
    { title: 'Hello Reakt' }
  )
)

// const Title = createElement('h1', {}, 'Hello Reakt')

render(App, document.body)