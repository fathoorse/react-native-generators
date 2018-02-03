const { createComponent, createPresenter } = require('./creators')
const { createReduxSkeleton, errorCodes } = require('./createReduxSkeleton')

const luckOfNameFor = (entity) => `Need a name for ${entity}`

exports.cli = (command, args) => {
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
            if (args[1] === undefined) {
                console.log(luckOfNameFor("component"))
                return
            }
            createComponent('', args[1])
            break
        case 'presenter':
            if (args[1] === undefined) {
                console.log(luckOfNameFor("presenter"))
                return
            }
            createPresenter('', args[1])
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
