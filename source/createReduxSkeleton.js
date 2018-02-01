const {
    createHierarchy,
    createMainReducerJS,
    createActionsJS,
    createMainStoreJS,
    updateAppJS,
    errorCodes
} = require('./creators')

const { cd } = require('./commands')

exports.errorCodes = errorCodes

exports.createReduxSkeleton = async (path) => {
    await createHierarchy(path)
    await createMainReducerJS()
    await createActionsJS()
    await createMainStoreJS()
    cd('..')
    await updateAppJS()
}