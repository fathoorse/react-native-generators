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

createReduxSkeleton()
