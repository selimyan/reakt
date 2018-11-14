function renderNode(vNode) {
  const { type, props, children } = vNode

  if (typeof (type) === 'function') {
    return renderNode(type(props))
  }

  if (typeof (type) === 'string') {
    const element = document.createElement(type)
  }

  //handle children
  children.forEach(child => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(children[0]));
    } else {
      element.appendChild(renderNode(child));
    }
  });
  //do things
  element.appendChild(document.createTextNode(children[0]))

  return element

}

export function render(vNode, node) {
  node.appendChild(renderNode(vNode))
}