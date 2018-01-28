const {
    createHierarchy,
    createMainReducerJS,
    createActionsJS,
    createMainStoreJS,
    updateAppJS
} = require('./creators')

const { cd } = require('./commands')

exports.createReduxSkeleton = async () => {
    await createHierarchy()
    await createMainReducerJS()
    await createActionsJS()
    await createMainStoreJS()
    cd('..')
    await updateAppJS()
}