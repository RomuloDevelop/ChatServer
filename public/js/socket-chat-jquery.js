/* eslint-disable */
var params = new URLSearchParams( window.location.search );

// jQuery References
var divUsers = $('#divUsuarios');
var sendForm = $('#sendForm');
var textForm = $('#textForm');
var divChatbox = $('#divChatbox');

// Render user functions
function userRender(persons) {
  console.log(persons);
  var html = '';
  html += '<li>';
  html += '    <a href="javascript:void(0)" class="active"> Chat de <span>' + params.get('room') +'</span></a>';
  html += '</li>';

  for( var i = 0; i < persons.length; i ++) {
    html += '<li>';
    html += '   <a data-id="'+persons[i].id+'" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + persons[i].name +'<small class="text-success">online</small></span></a>';
    html += '</li>';
  }
  divUsers.html(html);
}

function renderMessage(message, yo) {
    var date = new Date(message.date);
    var hour = date.getHours() + ':' + date.getMinutes();
    var html = '';
    if(yo){
        html += '<li class="reverse">';
        html += '    <div class="chat-content">';
        html += '        <h5>'+message.name+'</h5>';
        html += '        <div class="box bg-light-inverse">'+message.message+'</div>';
        html += '    </div>';
        html += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += '    <div class="chat-time">'+hour+'</div>';
        html += '</li>';
    } else {
        html += '<li class="animated fadeIn">';
        html += '    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        html += '    <div class="chat-content">';
        html += '        <h5>'+message.name+'</h5>';
        html += '        <div class="box bg-light-info">'+message.message+'</div>';
        html += '    </div>';
        html += '    <div class="chat-time">'+hour+'</div>';
        html += '</li>';
    }

    divChatbox.append(html);
}

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

// Listeners
divUsers.on('click', 'a', function(){

    var id = $(this).data('id');

    if(id){
        console.log(id);
    }

});

sendForm.on('submit', function(e){
    e.preventDefault();
    var text = textForm.val();
    if(text.trim().length === 0)
        return;
    console.log(text);
    
    socket.emit('createMessage',{
        name: params.get('name'),
        message: text
    }, function(message) {
        console.log('Servidor: ',message);
        renderMessage(message, true);
        textForm.val('').focus();
        scrollBottom();
    });
});

// textForm.on('', function(e){

// });