const { createComponent, createPresenter } = require('./creators')
const { createReduxSkeleton, errorCodes } = require('./createReduxSkeleton')

const logLuckOfNameFor = (entity) => console.log(`Need a name for ${entity}`)

exports.cli = (command, args) => {
    const nameArg = args[1]
    switch (command) {
        case 'skeleton':
            createReduxSkeleton(args[1]).catch(err => {
                switch (err.code) {
                    case errorCodes.cantCreateRootFolder:
                        console.log(`Folder '${err.info.path}' probably existed. Specify unique name`)
                }
            })
            break
        case 'component':
            if (nameArg === undefined) {
                logLuckOfNameFor(command)
                return
            }
            createComponent('', nameArg)
            break
        case 'presenter':
            if (nameArg === undefined) {
                logLuckOfNameFor(command)
                return
            }
            createPresenter('', nameArg)
            break
        case 'help':
            console.log(
                `Usage: rngen <command>\n` +
                `\n` +
                `where <command> is one off:\n` +
                `   skeleton <root folder name>("source" by default)\n` +
                `   component <name>\n`
            )
            break
        case undefined:
            console.log("Usage: rngen help")
            break
        default:
            console.log("We can't do it yet")
    }
}
