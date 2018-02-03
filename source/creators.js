const {
    sourcePath,
    actionsPath,
    reducersPath,
    storePath,
    screensPath,
    folderSkeleton
} = require('./paths')

const { mkdir, echo, cd, pwd } = require('./commands')
const { CustomError } = require('./customError')

const errorCodes = {
    cantCreateRootFolder: 3
}

exports.errorCodes = errorCodes

exports.createHierarchy = async (path = sourcePath) => {
    await mkdir(path).catch(err => {
        throw new CustomError(err.message, errorCodes.cantCreateRootFolder, { path })
    })
    await cd(path)
    for (const folder of folderSkeleton) {
        await mkdir(folder)

        // Do not create package.json for screens
        if (folder === screensPath) { continue }

        await echo(`${folder}/package.json`,
            `{\n` +
            `   "name": "@${folder}"\n` +
            `}`
        )
    }
}

exports.createActionsJS = async () => {
    await echo(`${actionsPath}/Actions.js`,
        `/*\n` +
        `   Import your actions here\n` +
        `*/\n\n` +
        `export default Actions = {}\n\n` +
        `Object.assign(\n` +
        `   // Add your actions here\n` +
        `)`
    )
}

exports.createMainReducerJS = async () => {
    await echo(`${reducersPath}/MainReducer.js`,
        `import { combineReducers } from "redux"\n` +
        `/*\n` +
        `   Import your reducers here\n` +
        `*/\n\n` +
        `export default combineReducers({\n` +
        `   // Add your sub-reducers here\n` +
        `})`
    )
}

exports.createMainStoreJS = async () => {
    await echo(`${storePath}/MainStore.js`,
        `import { createStore, applyMiddleware } from "redux"\n` +
        `import mainReducer from "@reducers/MainReducer"\n\n` +
        `export default store = createStore(mainReducer)`
    )
}

exports.createComponent = async (path, name) => {
    const dirName = name.charAt(0).toLowerCase() + name.slice(1)
    await mkdir(dirName)
    cd(dirName)
    createContainer(name)
    createPresenter(name)
}

const createPresenter = async (name) => {
    await echo(`${name}.js`,
        `import React, { Component } from "react"\n` +
        `import { StyleSheet, View } from "react-native"\n\n` +
        `export default DayPlanScreen = (props) => <View>\n\n` +
        `</View>\n\n` +
        `const styles = StyleSheet.create({\n\n` +
        `})`
    )
}

exports.createPresenter = createPresenter

const createContainer = async (name) => {
    const containerName = `${name}Container`
    await echo(`${containerName}.js`,
        `import React, { Component } from "react"\n` +
        `import { connect } from "react-redux"\n\n` +
        `import ${name} from "./${name}"\n\n` +
        `class ${containerName} extends Component {\n\n` +
        `   render() {\n` +
        `       return (\n` +
        `           <${name} \n\n` +
        `           />\n` +
        `       )\n` +
        `   }\n` +
        `}\n\n` +
        `export default connect(\n` +
        `   store => {\n` +
        `       return {\n\n` +
        `       }\n` +
        `   },\n` +
        `   {\n\n` +
        `   }\n` +
        `)(${containerName})\n`
    )
}

exports.updateAppJS = async () => {
    await echo(`App.js`,
        `import React, { Component } from "react"\n` +
        `import { Provider } from "react-redux"\n\n` +
        `import store from "@store/MainStore"\n\n` +
        `export default class App extends Component {\n` +
        `    render() {\n` +
        `        return (\n` +
        `            <Provider store={store}>\n` +
        `                {/* Your root here */}\n` +
        `            </Provider>\n` +
        `        );\n` +
        `    }\n` +
        `}`
    )
}
