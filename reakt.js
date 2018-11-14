import { createElement } from './index.js'
import { render } from './reaktDom.js'

const Title = (props) => {
  return createElement(
    'h1',
    null,
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

const Title = createElement('h1', {}, 'Hello Reakt')

render(Title, document.body)