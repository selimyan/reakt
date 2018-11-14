function renderNode(vNode) {
  const { type, props, children } = vNode

  if (typeof (type) === 'function' && /^class/.test(type.toString())) {
    const instance = new type()
    return renderNode(instance.render())
  }

  if (typeof (type) === 'function') {
    return renderNode(type(props))
  }

  if (typeof (type) === 'string') {
    const element = document.createElement(type)
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