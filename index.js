// CONFIG
const path = require('path')
const http = require('http')
const express = require ('express')
const socketio = require('socket.io')


// EXPRESS ==> SERVER ==> SEOCKET
const app = express()
const server = http.createServer(app)
const io = socketio(server)


// PORT
const PORT = process.env.PORT || 3000

// PUBLIC DIRECTORY
const publicDir = path.join(__dirname, './public')
app.use(express.static(publicDir))



// WEB SOCKET CONNECTION
io.on('connection', (socket) => {
    console.log('New WS connection!')

    socket.emit('newMessage', 'Welcome!')
    

    socket.on('sendLocation', (locationCoords) => {
        socket.emit('currentLocation', `https://google.com/maps?q=${locationCoords.latitude},${locationCoords.longitude}`)
    })

})

// MARKUP PAGE
app.get('/', (req, res) => {
    res.render('index.html')
})


// SERVER ENDPOINT
server.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
})