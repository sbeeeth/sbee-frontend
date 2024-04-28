export const tokenABI = [
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address'
      }
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: 'balance',
        type: 'uint256'
      }
    ],
    payable: false,
    type: 'function'
  }
]

export const tokenAddresses = {
  SBEE: '0x7Ae0f19D2aE2f490e710579284A58000d4E8C85f'
}
