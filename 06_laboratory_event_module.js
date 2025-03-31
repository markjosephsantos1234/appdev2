const EventEmitter = require('events');

// Create an instance of EventEmitter
const eventEmitter = new EventEmitter();

eventEmitter.on('start', () => {
    console.log('Application Started!');
});

eventEmitter.on('data', (data) => {
    console.log('Data received:', data);
});

eventEmitter.on('error', (error) => {
    console.error('Error occurred:', error);
});

eventEmitter.emit('start');
eventEmitter.emit('data', { name: 'Mj Santos', age: 21 });

eventEmitter.emit('error', 'Sample error message');

