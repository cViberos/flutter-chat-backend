const {io} = require('../index');


// MENSAJE DE SOCKETS
  // client: es el dispositivo que se conecta a nuestro socket server
  io.on('connection', client => {

    // Cuando el client se conecta
    console.log('Cliente conectado');
  
    // Cuando el client se desconecta del servidor
    client.on('disconnect', () => { console.log('Cliente desconectado')});
  
    // Cuando el client envia(emit) un mensaje al servidor
    client.on('mensaje', (payload)=> {
      
      // Contenido del mensaje recibido del dispositivo
      console.log('Mensaje!!!',payload);
    
      // Va a emitir un mensaje a todos los clientes conectados
      io.emit('mensaje', { admin: 'nuevo mensaje'});
      
    })
  });
