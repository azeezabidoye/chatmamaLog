const socket = io()

// Save the original console.log() method
let log = console.log;
console.log = function() {
   // Invoke the original method with an additional parameter
   log.apply(console, [(new Date().toString())].concat([].slice.call(arguments)));
}; 

// FIRST EMITTED MESSAGE
socket.on('newMessage', (message) => {
    log(message);
    console.log(`The Monkey Patched ${message}`);
})


// SHARING LOCATION
document.getElementById('locationBtn').addEventListener('click', () => {
    log('button clicked')
    if(!navigator.geolocation) {
        return alert('Your browser does NOT support geolocation!')
    }

    navigator.geolocation.getCurrentPosition((position) => {
        log(position.coords.latitude, position.coords.longitude)
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    })
})



