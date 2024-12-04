const { AtherSocketClient } = require('./ather/')

const atherClient = new AtherSocketClient({
    ws_config: {
        url: "ws://10.2.0.35:8378/"
    },
    http_config: {
        url: "http://10.2.0.35:8368/"
    }
})

atherClient.login("hpoZWXPi7N3uEfZN8gF3a")


atherClient.on('ready', async ()=>{
    const user = await atherClient.ather1.users.get('675227360965951498')
    if (user.data.permissions.admin) {
        try {
            const pulled = await atherClient.archive.users.get('675227360965951498')
            console.log(pulled)
        } catch (e) {
            console.log(e)
        }
    }
})

process.on('uncaughtException', console.log)