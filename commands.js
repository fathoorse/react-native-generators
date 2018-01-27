const util = require('util')
const exec = util.promisify(require('child_process').exec)

exports.mkdir = (dir) => {
    return exec(`mkdir ${dir}`)
}

exports.pwd = () => {
    return exec(`pwd`)
}

exports.echo = (fileName, content) => {
    return exec(`echo "${content}" >${fileName}`)
}

exports.cd = (dir) => {
    process.chdir(dir);
}