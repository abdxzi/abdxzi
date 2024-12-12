declare global {
  interface Window {
    test_global: string | object;  // Define the type of your custom property
  }
}

export { };