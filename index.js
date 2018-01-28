const { createComponent } = require('./source/creators')
const { createReduxSkeleton } = require('./source/createReduxSkeleton')

const args = process.argv.slice(2)
const command = args[0]

switch (command) {
    case 'skeleton':
        createReduxSkeleton()
        break
    case 'component':
        if (args[1] === undefined) {
            console.log("Need a name for component")
            return
        }
        createComponent('', args[1])
        break
    default:
        console.log("We can't do it yet")
}
