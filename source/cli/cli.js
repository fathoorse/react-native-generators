const { createComponent, createPresenter } = require('../creators/creators')
const { addReduxComponent } = require('../creators/reduxCreator')
const { createReduxSkeleton, errorCodes } = require('../createReduxSkeleton')
const { logHelp } = require('./help')

const logLuckOfNameFor = (entity) => console.log(`Need a name for ${entity}`)

const tryCreatorForName = (name, command) => {
    return creator => {
        if (name === undefined) {
            logLuckOfNameFor(command)
            return
        }
        creator(name)
    }
}

exports.cli = (command, args) => {
    const nameArg = args[1]
    const creator = tryCreatorForName(nameArg, command)
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
            creator(createComponent)
            break
        case 'presenter':
            creator(createPresenter)
            break
        case 'redux':
            creator(addReduxComponent)
            break
        case 'help':
            logHelp()
            break
        case undefined:
            console.log("Usage: rngen help")
            break
        default:
            console.log("We can't do it yet")
    }
}
