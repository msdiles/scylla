export default (classes: { [key: string]: boolean }) => {
  return Object.keys(classes).reduce((prev, cur) => {
    return prev + (classes[cur] ? ` ${cur}` : "")
  }, "")
}
