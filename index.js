const {
    createHierarchy,
    createMainReducerJS,
    createActionsJS,
    createMainStoreJS,
    updateAppJS
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
        createReduxSkeleton()
        break
    default:
        console.log("We can't do it yet")
}
