const path = require('path')
const fs = require('fs')
const fse = require('fs-extra')

module.exports = {
  getAllFiles: async (dir) => {
    dir = dir || '.'
    let file = path.resolve(dir, '_post')
    let files = await new Promise((resolve, reject) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })

    files.forEach((v, i) => {
      v = v.split('.')
      v.pop()
      files[i] = v.join()
    })

    return files
  }

  parseData: (data) => {
    let split = '---\n'
    let i = data.indexOf(split)
    let info = {}
    if (i !== -1) {
      let j = data.indexOf(split, i + split.length)
      if (j !== -1) {
        let header = data.slice(i + split.length, j).trim()
        data = data.slice(j + split.length)
        header.split('\n').forEach((line) => {
          let i = line.indexOf(':')
          if (i !== -1) {
            let k = line.slice(0, i).trim()
            let v = line.slice(i + 1).trim()
            info[k] = v
          }
        })
      }
    }
    info.content = data
    return info
  }
}
