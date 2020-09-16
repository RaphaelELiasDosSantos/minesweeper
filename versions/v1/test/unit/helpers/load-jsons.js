import fs from 'fs'
import path from 'path'

const loadJsons = async function (...file) {
  let promises = file.map((file) => loadJson(file))
  let result = await Promise.all(promises)

  return result.length === 1 ? result[0] : result
}

const loadJson = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, '/../' + file), (err, data) => {
      if (err) {
        return reject(err)
      }
      resolve(JSON.parse(data))
    })
  })
}

export default loadJsons
