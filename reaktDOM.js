function diff(vNode, node) {
  const hasNewChildren = vNode.children.length !== node.childNodes.length

  if (hasNewChildren) {
    node.appendChild(
      renderNode(vNode.chidlren[vNode.chidlren.length - 1])
    )
  }
  return node
}

function updater(component) {
  const oldBase = component.base
  const vNode = component.render()

  component.base = diff(vNode, oldBase)
}

// create DOM from virtual nodes
function renderNode(vNode) {
  const { nodeName, props, children } = vNode

  // class
  if (typeof (nodeName) === 'function' && /^class/.test(nodeName.toString())) {

    // component instance
    const component = new nodeName(props)
    Object.assign(component, { updater })

    const element = renderNode(component.render())
    component.base = element

    return element
  }

  // functional component
  if (typeof (type) === 'function') {
    return renderNode(nodeName(props))
  }

  // string
  if (typeof (nodeName) === 'string') {
    const element = document.createElement(nodeName)

    handleProps(props, element)
    handleChildren(children, element)

    return element
  }
}

function handleChildren(children, element) {
  (children || []).forEach(child => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child))
    }
    else {
      element.appendChild(renderNode(child))
    }
  })
}

function handleProps(props, element) {
  for (let prop in props) {

    // events
    if (/^on/.test(prop)) {
      const eventName = prop.substring(2).toLowerCase()
      element.addEventListener(eventName, props[prop])
      console.log('event')
    }

    // DOM properties
    else if (prop in element) {
      element[prop] = props[prop]
    }

    // custom attributes
    else {
      element.setAttribute(prop, props[prop])
    }
  }
}

let currentApp

function render(element, rootElement) {
  const app = renderNode(element)

  currentApp ?
    rootElement.replaceChild(app, currentApp) :
    rootElement.appendChild(app)

  currentApp = app
}

export default { render }