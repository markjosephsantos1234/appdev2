const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const EventEmitter = require('events');

const hostname = 'localhost';
const port = 3000;

class FileEventEmitter extends EventEmitter {}
const fileEvents = new FileEventEmitter();

// Event Listeners
fileEvents.on('fileCreated', (filename) => console.log(`File created: ${filename}`));
fileEvents.on('fileUpdated', (filename) => console.log(`File updated: ${filename}`));
fileEvents.on('fileDeleted', (filename) => console.log(`File deleted: ${filename}`));

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const { pathname, query } = parsedUrl;
    const filename = query.filename;
    const content = query.content || '';
    const filePath = path.join(__dirname, filename || '');

    if (!filename) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Filename is required.');
    } else if (pathname === '/create') {
        fs.writeFile(filePath, content, (err) => {
            if (err) {
                res.writeHead(500);
                res.end(`Error creating file: ${err.message}`);
            } else {
                fileEvents.emit('fileCreated', filename);
                res.writeHead(200);
                res.end(`File '${filename}' created successfully.`);
            }
        });
    } else if (pathname === '/read') {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end(`Error reading file: ${err.message}`);
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(data);
            }
        });
    } else if (pathname === '/update') {
        fs.appendFile(filePath, content, (err) => {
            if (err) {
                res.writeHead(500);
                res.end(`Error updating file: ${err.message}`);
            } else {
                fileEvents.emit('fileUpdated', filename);
                res.writeHead(200);
                res.end(`File '${filename}' updated successfully.`);
            }
        });
    } else if (pathname === '/delete') {
        fs.unlink(filePath, (err) => {
            if (err) {
                res.writeHead(404);
                res.end(`Error deleting file: ${err.message}`);
            } else {
                fileEvents.emit('fileDeleted', filename);
                res.writeHead(200);
                res.end(`File '${filename}' deleted successfully.`);
            }
        });
    } else {
        res.writeHead(404);
        res.end('Invalid route.');
    }
});

server.listen(port, hostname, () => console.log(`Server running at http://${hostname}:${port}`));
