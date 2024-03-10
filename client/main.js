
var socket = io.connect('http://192.168.1.16:6677', { 'forceNew': true });

socket.on('messages', function (data) {
    console.log(data);
    render(data);
});

//Función render para poder pintarlo en el html y el map para recorrer información y poder mostrarla tipo un bucle.
function render(data) {
    var html = data.map(function (message, index) {
        return (`
            <div class="message">
            <strong>${message.nickname}</strong> dice:
            <p>${message.text}</p>
            </div>
        `);
    }).join(' ');//Sirve para concatenar un espacio entre elementos.

    //Insertarlo en el html
    var div_msgs = document.getElementById('messages');
    div_msgs.innerHTML = html;
    div_msgs.scrollTop = div_msgs.scrollHeight; // Para poner los mensajes en el tope final.
}

//Función de recibir mensajes
function addMessage(e){
    var message = {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value
    };

    document.getElementById('nickname').style.display = 'none';
    socket.emit('add-message', message);

    return false;

}