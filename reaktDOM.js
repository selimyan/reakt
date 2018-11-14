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

  if (typeof (type) === 'function') {
    return renderNode(type(props))
  }

  if (typeof (type) === 'string') {
    const element = document.createElement(nodeName)
    return element
  }

  //handle children
  children.forEach(child => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child))
    } else {
      element.appendChild(renderNode(child));
    }
  })

  //handle props
  for (let prop in props) {

    if (/^on/.test(prop)) {
      const eventName = prop.slice(2).toLowerCase()
      element.addEventListener(eventName, props[prop])
      console.log('event')
    }

    else if (prop in element) {
      element[prop] = props[prop]
    }

    else {
      element.setAttribute(prop, props[prop])
    }
  }

  element.appendChild(document.createTextNode(children[0]))

  return element

}

export function render(vNode, node) {
  node.appendChild(renderNode(vNode))
}