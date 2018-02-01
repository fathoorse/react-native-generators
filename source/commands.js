const util = require('util')
const exec = util.promisify(require('child_process').exec)

exports.mkdir = (dir) => {
    return exec(`mkdir ${dir}`)/* .catch(_ => { 
        let error = new Error("Some error")
        error.code = 1
        throw error
    }) */
}

exports.pwd = () => {
    return exec(`pwd`)
}

exports.echo = (fileName, content) => {
    return exec(`echo '${content}' >${fileName}`)
}

exports.cd = (dir) => {
    process.chdir(dir);
}