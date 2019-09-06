/* eslint-disable */
var socket = io();

var params = new URLSearchParams( window.location.search );

if( !params.has('name') || !params.has('room') ) {
    window.location = 'index.html';
    throw new Error('The name or room are mandatory');
}

var user = {
    name: params.get('name'),
    room: params.get('room')
}

socket.on('connect', function() {
    
    socket.emit('enterChat', user, function(resp) {

        //console.log(resp);
        userRender(resp);

    });
    console.log('Connected to chat');
});

socket.on('disconnect', function() {

    console.log('You lost connection with the server');

});

socket.on('createMessage', function(message) {
    renderMessage(message, false);
    console.log('Servidor: ',message);
});

socket.on('personList', function(persons) {
    userRender(persons);    
});

socket.on('privateMessage', function(message) {
    console.log('Private message ', message);
});
