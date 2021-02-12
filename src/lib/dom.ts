export function attr(element, attributes) {
  Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
}

export function append(element, tagName, attributes) {
  const tag = element.ownerDocument.createElement(tagName);
  attr(tag, attributes);
  element.appendChild(tag);
}
