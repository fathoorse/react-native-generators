const { createComponent } = require('./source/creators')
const { createReduxSkeleton, errorCodes } = require('./source/createReduxSkeleton')

const args = process.argv.slice(2)
const command = args[0]

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
            console.log("Need a name for component")
            return
        }
        createComponent('', args[1])
        break
    case undefined:
        console.log("Usage: react-native-generator command")
    default:
        console.log("We can't do it yet")
}
