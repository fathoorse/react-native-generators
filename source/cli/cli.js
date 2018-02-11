const { createComponent, createPresenter } = require('../creators/creators')
const { addReduxComponent } = require('../creators/reduxCreator')
const { createReduxSkeleton, errorCodes } = require('../createReduxSkeleton')
const { logHelp } = require('./help')

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
            createPresenter(nameArg)
            break
        case 'help':
            logHelp()
            break
        case 'redux':
            addReduxComponent(args[1])
            break
        case undefined:
            console.log("Usage: rngen help")
            break
        default:
            console.log("We can't do it yet")
    }
}
