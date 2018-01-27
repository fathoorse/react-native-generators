const {
    sourcePath,
    actionsPath,
    reducersPath,
    storePath,
    screensPath,
    folderSkeleton
} = require('./paths')

const { mkdir, createFile, cd, pwd } = require('./commands')

exports.createHierarchy = async () => {
    await mkdir(sourcePath)
    await cd(sourcePath)
    for (const folder of folderSkeleton) {
        await mkdir(folder)
        await createFile(`${folder}/package.json`, `{\n\t"name": "@${folder}"\n}`)
    }
}

exports.createActionsJS = async () => {
    await createFile(`${actionsPath}/Actions.js`, `/*\n\tImport your actions here\n*/\n\n` + 
    `export default Actions = {}\n\nObject.assign(\n\t// Add your actions here\n)`)
}

exports.createMainReducerJS = async () => {
    await createFile(`${reducersPath}/MainReducer.js`, `import { combineReducers } from 'redux'\n` +
    `/*\n\tImport your reducers here\n*/\n\n` + 
    `export default combineReducers({\n\t// Add your sub-reducers here\n})`)
}

exports.createMainStoreJS = async () => {
    await createFile(`${storePath}/MainStore.js`, `import { createStore, applyMiddleware } from 'redux'\n` +
    `import mainReducer from '@reducers/MainReducer'\n\n` + 
    `export default store = createStore(mainReducer)`)
}