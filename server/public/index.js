// connect socket 
const socket = io('http://localhost:9000');

socket.on('connection', () => {
    console.log('Connected');
    // open new tab, id is different
});

socket.on('dataFromServer', (dataFromServer) => {
    console.log(dataFromServer);
    const renderUI = new RenderUI(dataFromServer);
    renderUI.render();
    // socket.emit('dataToServer', { data: 'Iam come from FE' });
});
// socket.on('messageFromServer1', (dataFromServer) => {
//     console.log(dataFromServer);
//     // socket.emit('dataToServer', { data: 'Iam come from FE' });
// });

class RenderUI {
    constructor(data) {
        this.data = data;
    }

    render() {
        console.log('data', this.data)
        const { data, time, type } = this.data;
        const { car, name, position } = data;
        console.log(this.data);
        // const { plate, carType } = car;  
        const plateTye = document.querySelector('.plate-header');
        plateTye.textContent = type;
        const plateTimeIn = document.querySelector('.plate-time-in');
        plateTimeIn.textContent = ` Check in at ${moment((parseInt(time))).format("DD MM YYYY hh:mm:ss")} by ${name}`;
    }
}

