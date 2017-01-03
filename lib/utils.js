const fs = require('fs')
const fse = require('fs-extra')

module.exports = {
  getAllFiles: async (dir) => {
    let files = await new Promise((resolve, reject) => {
      fs.readdir(dir, (err, files) => {
        if (err) {
          reject(err)
        } else {
          resolve(files)
        }
      })
    })

    return files
  },

  getFileData: async (dir) => {
    let data = await new Promise((resolve, reject) => {
      fs.readFile(dir, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })

    return data
  },

  writeFile: async (dir, data) => {
    await new Promise((resolve, reject) => {
      fse.outputFile(dir, data, (err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
      })
    })
  },

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
