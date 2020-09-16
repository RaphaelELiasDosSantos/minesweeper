import moment from 'moment'

const toDecimal = (number, decimals = 2) => {
  return parseFloat(parseFloat(number).toFixed(decimals))
}

const formatPaymentDate = (date) => {
  if (!date) return
  if (!isNaN(date)) return date

  return moment(date.substr(0, 10)).valueOf()
}

const parseId = (custCode, date) => {
  custCode = custCode.replace(/\./g, '')
  date = `${date.substr(0, 4)}-${date.substr(4, 2)}`
  return `${date}-${custCode}`
}

module.exports = {
  toDecimal,
  formatPaymentDate,
  parseId
}
