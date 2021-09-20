async function loadMyComponent() {
  return await import('./MyComponent.jsx')
}

async function _console() {
  const MyComponent = await loadMyComponent()
  console.log(MyComponent)
}
_console()