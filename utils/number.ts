import numeral from 'numeral'
import BigNumber from 'bignumber.js'

export const convertAmount = (amount?: string) => {
  const convertAmount = amount
    ? BigNumber(amount)
        .div(10 ** 18)
        .toFixed(2)
    : 0

  return numeral(convertAmount).format('0,0.00')
}
