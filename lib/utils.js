const fse = require('fs-extra')

module.exports = {
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
