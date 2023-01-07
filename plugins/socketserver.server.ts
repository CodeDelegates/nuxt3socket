import { Server } from "socket.io"
declare global {
  var io: Server
}

let io : Server

export default defineNuxtPlugin(async (nitroApp) => {

  const port = 3001

  if(!io)
  {
    io = new Server(port, { cors: { origin: "*" }})
    io.on("connection", (socket) => {
      
      socket.on("connect", (socket) =>{
        console.log("connected", socket.id)
      })
      
      socket.on("disconnect", () => {
        console.log("disconnected", socket.id)
      })
  
      socket.on("message", (data) => {
        socket.emit("message", `Hello from server ${data}`)
      })

      socket.on("connect_error", (err)=>{
        console.log("connect_error", err)
      })
    })

    
   
    globalThis.io = io
    if(io)
    console.log(`Socket ready at port ${port}`)
  }

})
