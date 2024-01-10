import { createServer } from 'http'
import SocketService from './services/socket'

async function init() {
    const socketServer = new SocketService()
    const httpServer = createServer()
    const PORT = process.env.PORT ? process.env.PORT : 8000

    httpServer.listen(PORT, () => console.log(`HTTP server started at PORT:${PORT}`))

    socketServer.initListeners()
}

init()