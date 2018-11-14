function diff(vNode, node) {
  const hasNewChildren = vNode.children.length > node.childNodes.length

  if (hasNewChildren) {
    node.parentNode.appendChild(
      renderNode(vNode.chidlren[vNode.chidlren.length - 1])
    )
    return node
  } else {
    return node
  }
}

function updater(component) {
  const vNode = component.render()
  const node = component.base

  component.base = diff(vNode, node)
}

function renderNode(vNode) {
  const { type, props, children } = vNode

  if (typeof (type) === 'function' && /^class/.test(type.toString())) {

    // component instance
    const instance = new type()
    Object.assign(instance, { updater })

    const element = renderNode(instance.render())
    instance.base = element

    return element
  }

  if (typeof (type) === 'function') {
    return renderNode(type(props))
  }

  if (typeof (type) === 'string') {
    const element = document.createElement(type)
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