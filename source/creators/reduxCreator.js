const {
    sourcePath,
    actionsPath,
    reducersPath,
    storePath,
    screensPath,
    folderSkeleton,
    mainReducerFile
} = require('./paths')

const { echo, cd, readFile } = require('./commands')

const { lowercasedFirstLetter } = require('./../helperFunctions')

exports.addReduxComponent = async (name) => {
    const reducerName = `${name}Reducer`
    await addReducer(reducerName)
    await addActions(name)
    await appendMainReducerWithNew(reducerName, name)
}

const appendMainReducerWithNew = async (reducerName, name) => {
    const mainReducerFilePath = `./${sourcePath}/${reducersPath}/${mainReducerFile}`
    readFile(mainReducerFilePath)
        .then((value) => {
            const contentOfFile = value.toString().split('\n')
            const numberOfLines = contentOfFile.length
            const reducerFuncName = lowercasedFirstLetter(reducerName)

            // index is in reversed order array, so we have to substract it from number of lines
            const indexOfLastImport = numberOfLines - contentOfFile.slice().reverse().findIndex(line =>
                line.startsWith("import")
            )

            contentOfFile.splice(indexOfLastImport, 0, `import ${reducerFuncName} from "./${reducerName}"`)

            const indexOfExport = contentOfFile.findIndex(line => line.startsWith("export default"))
            const indexOfClosingBreaket = contentOfFile.slice(indexOfExport).findIndex(line => line.includes("})"))
            const indexOfNewReducerLine = indexOfExport + indexOfClosingBreaket - 1
            contentOfFile.splice(indexOfNewReducerLine, 0, `    ${lowercasedFirstLetter(name)}: ${reducerFuncName}`)

            // Add ',' after the previous reducer
            contentOfFile[indexOfNewReducerLine - 1] = contentOfFile[indexOfNewReducerLine - 1] + ','

            const result = contentOfFile.join("\n")
            return echo(mainReducerFilePath, result)
        })
        .catch(err => console.log(err))
}

const addReducer = async (name) => {
    await echo(`./${sourcePath}/${reducersPath}/${name}.js`,
        `\n\n` +
        `const defaultState = {\n` +
        `\n` +
        `}\n\n` +
        `export default ${name} = (state = defaultState, action) => {\n` +
        `   switch (action.type) {\n` +
        `       \n` +
        `   }\n` +
        `   return state\n` +
        `}`
    )
}

const addActions = async (name) => {
    const actions = `${name}Actions`
    await echo(`./${sourcePath}/${actionsPath}/${actions}.js`,
        `\n\n` +
        `export default ${actions} = {}\n`
    )
}