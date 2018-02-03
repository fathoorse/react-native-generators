const { cli } = require("./source/cli")

const rngen = () => {
    const args = process.argv.slice(2)
    const command = args[0]

    cli(command, args)
}

rngen()
