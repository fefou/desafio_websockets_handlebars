console.log('hola, ws.js script!')
const socket = io()


// socket on de json de productos
socket.on("productos", productos => {
    console.log(productos)
    render(productos)
})


