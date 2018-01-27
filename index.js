const {
    sourcePath,
    actionsPath,
    reducersPath,
    storePath,
    screensPath,
    folderSkeleton
} = require('./paths')

const { mkdir, createFile, cd, pwd } = require('./commands')

const args = process.argv.slice(2);

const createHierarchy = async () => {
    await mkdir(sourcePath)
    await cd(sourcePath)
    for (const folder of folderSkeleton) {
        await mkdir(folder)
        await createFile(`${folder}/package.json`, `{\n\t"name": "@${folder}"\n}`)
    }
}

const createActionsJS = async (path) => {
    await createFile(`${path}/Actions.js`, `/*\n\tImport your actions here\n*/\n\n` + 
    `export default Actions = {}\n\nObject.assign(\n\t// Add your actions here\n)`)
}

const createMainReducerJS = async (path) => {
    await createFile(`${path}/MainReducer.js`, `import { combineReducers } from 'redux'\n` +
    `/*\n\tImport your reducers here\n*/\n\n` + 
    `export default combineReducers({\n\t// Add your sub-reducers here\n})`)
}

const createMainStoreJS = async (path) => {
    await createFile(`${path}/MainStore.js`, `import { createStore, applyMiddleware } from 'redux'\n` +
    `import mainReducer from '@reducers/MainReducer'\n\n` + 
    `export default store = createStore(mainReducer)`)
}

const createReduxSkeleton = async () => {
    await createHierarchy()
    await createMainReducerJS(reducersPath)
    await createActionsJS(actionsPath)
    await createMainStoreJS(storePath)
}

createReduxSkeleton()
