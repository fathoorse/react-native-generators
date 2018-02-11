const {
    createHierarchy,
    createMainReducerJS,
    createActionsJS,
    createMainStoreJS,
    updateAppJS,
    errorCodes
} = require('./creators/creators')

const { cd } = require('./creators/commands')

exports.errorCodes = errorCodes

exports.createReduxSkeleton = async (path) => {
    try {
        await createHierarchy(path)
        await createMainReducerJS()
        await createActionsJS()
        await createMainStoreJS()
        cd('..')
        await updateAppJS()
    } catch (err) {
        console.log(err)
    }
}