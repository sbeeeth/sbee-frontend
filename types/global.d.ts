export {}

declare global {
  interface Window {
    web3?: any // eslint-disable-line
  }
}

declare module '*.json' {
  const value: any // eslint-disable-line
  export default value
}
