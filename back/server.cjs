const express = require('express')
const http = require('http')
const path = require('path')
const WebSocket = require('ws')
const fs = require('fs')

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

const to_root_path = file => path.join('./', file)
app.use('', express.static(to_root_path('front')))
wss.on('connection', ws => console.log('client connected'))

// watch GLB for changes and notify connected clients
fs.watch(to_root_path('front/out.glb'), (eventType) => {
    if (eventType === 'change') {
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send('update')
            }
        })
    }
})

const PORT = process.env.PORT || 3425
server.listen(PORT, () => console.log(`view @ http://localhost:${PORT}/`))
