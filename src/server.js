const app = require("./index")
const connect = require("./config/db")

const PORT = 4005

app.listen(PORT,async()=>{
    await connect()
    console.log("Srver running on port" + PORT)
})