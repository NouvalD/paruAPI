require('dotenv').config();
const hapi = require("@hapi/hapi");
const routes = require('./user/routes/routes')

const init = async()=>{
    const server = hapi.server({
        port:8000,
        host:"localhost", //klo udh di deploy ganti value jadi 0.0.0.0
        routes: {
            cors: {
                origin:["*"]
            }
        }
    })

    server.route(routes)

    await server.start()
    console.log(`Running at ${server.info.uri}`);
}

init()