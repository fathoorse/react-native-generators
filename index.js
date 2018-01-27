const {
    createHierarchy,
    createMainReducerJS,
    createActionsJS,
    createMainStoreJS,
    updateAppJSm,
    createComponent
} = require('./creators')

const { cd } = require('./commands')

const createReduxSkeleton = async () => {
    await createHierarchy()
    await createMainReducerJS()
    await createActionsJS()
    await createMainStoreJS()
    cd('..')
    await updateAppJS()
}

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
