const {
    sourcePath,
    actionsPath,
    reducersPath,
    storePath,
    screensPath,
    folderSkeleton,
    mainReducerFile,
    mainActionsFile
} = require('./paths')

const { echo, cd, readFile } = require('./commands')

const { lowercasedFirstLetter } = require('./../helperFunctions')

exports.addReduxComponent = async (name) => {
    const reducerName = `${name}Reducer`
    const actionsName = `${name}Actions`
    await addReducer(reducerName, actionsName)
    await appendMainReducerWithNew(reducerName, name)

    await addActions(actionsName)
    await appendActionsWithNew(actionsName, name)
}

const appendWithNewDefaultImport = (content, object, source) => {
    const indexOfLastImportFromEnd = content.slice().reverse().findIndex(line =>
        line.startsWith("import")
    )

    // If import is the first - place it at the 0 line
    const indexOfLastImport = indexOfLastImportFromEnd === -1 ? 0 : content.length - indexOfLastImportFromEnd

    content.splice(indexOfLastImport, 0, `import ${object} from "./${source}"`)
}

const appendActionsWithNew = async (actionsName, name) => {
    const mainActionsFilePath = `./${sourcePath}/${actionsPath}/${mainActionsFile}`
    readFile(mainActionsFilePath)
    .then((value) => {
        const contentOfFile = value.toString().split('\n')
        const actionsObjectName = lowercasedFirstLetter(actionsName)

        appendWithNewDefaultImport(contentOfFile, actionsObjectName, actionsName)

        const indexOfExport = contentOfFile.findIndex(line => line.startsWith("Object.assign("))
        const indexOfClosingBreaket = contentOfFile.slice(indexOfExport).findIndex(line => line.includes(")"))
        const indexOfNewReducerLine = indexOfExport + indexOfClosingBreaket - 1
        contentOfFile.splice(indexOfNewReducerLine, 0, `   ${actionsObjectName}`)

        // Add ',' after the previous reducer
        contentOfFile[indexOfNewReducerLine - 1] = contentOfFile[indexOfNewReducerLine - 1] + ','

        const result = contentOfFile.join("\n")
        return echo(mainActionsFilePath, result)
    })
    .catch(console.log)
}

const appendMainReducerWithNew = async (reducerName, name) => {
    const mainReducerFilePath = `./${sourcePath}/${reducersPath}/${mainReducerFile}`
    readFile(mainReducerFilePath)
        .then((value) => {
            const contentOfFile = value.toString().split('\n')
            const reducerFuncName = lowercasedFirstLetter(reducerName)

            appendWithNewDefaultImport(contentOfFile, reducerFuncName, reducerName)

            const indexOfExport = contentOfFile.findIndex(line => line.startsWith("export default"))
            const indexOfClosingBreaket = contentOfFile.slice(indexOfExport).findIndex(line => line.includes("})"))
            const indexOfNewReducerLine = indexOfExport + indexOfClosingBreaket - 1
            contentOfFile.splice(indexOfNewReducerLine, 0, `   ${lowercasedFirstLetter(name)}: ${reducerFuncName}`)

            // Add ',' after the previous reducer
            const previousLine = contentOfFile[indexOfNewReducerLine - 1]
            if (previousLine.indexOf("({") === -1) {
                contentOfFile[indexOfNewReducerLine - 1] = previousLine + ','
            }

            const result = contentOfFile.join("\n")
            return echo(mainReducerFilePath, result)
        })
        .catch(console.log)
}

const addReducer = async (name, reducerActions) => {
    await echo(`./${sourcePath}/${reducersPath}/${name}.js`,
        `import ${lowercasedFirstLetter(reducerActions)} from "./../${actionsPath}/${reducerActions}"` +
        `\n\n` +
        `const defaultState = {\n` +
        `\n` +
        `}\n\n` +
        `export default ${lowercasedFirstLetter(name)} = (state = defaultState, action) => {\n` +
        `   switch (action.type) {\n` +
        `       default: break\n` +
        `   }\n` +
        `   return state\n` +
        `}`
    )
}

const addActions = async (name) => {
    await echo(`./${sourcePath}/${actionsPath}/${name}.js`,
        `\n\n` +
        `export default ${lowercasedFirstLetter(name)} = {}\n`
    )
}