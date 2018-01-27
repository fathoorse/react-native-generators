const {
    createHierarchy,
    createMainReducerJS,
    createActionsJS,
    createMainStoreJS
} = require('./creators')

const createReduxSkeleton = async () => {
    await createHierarchy()
    await createMainReducerJS()
    await createActionsJS()
    await createMainStoreJS()
}

createReduxSkeleton()
