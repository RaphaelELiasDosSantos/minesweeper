const errorNotFound = (error) => {
  if (error.status === 404 || error.message === 'ERROR:NOT_FOUND') throw new Error('ERROR:NOT_FOUND')
  throw new Error('ERROR:INTERNAL_ERROR')
}
module.exports = {
  errorNotFound
}
