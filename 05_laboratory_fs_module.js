const fs = require('fs');

// Read the content of sample.txt 
fs.readFile('1_expectations_this_semester.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err.message);
    } else {
        console.log('File content:', data);
    }
});

// Create or overwrite newfile.txt 
fs.writeFile('newfile.txt', 'This is a new file created by Node.js!', (err) => {
    if (err) {
        console.error('Error writing file:', err.message);
    } else {
        console.log('File created successfully: newfile.txt');
    }
});

// Append content to sample.txt
fs.appendFile('sample.txt', '\nAppended content.', (err) => {
    if (err) {
        console.error('Error appending to file:', err.message);
    } else {
        console.log('Content appended successfully to sample.txt');
    }
});

// Delete newfile.txt
fs.unlink('newfile.txt', (err) => {
    if (err) {
        console.error('Error deleting file:', err.message);
    } else {
        console.log('File deleted successfully: newfile.txt');
    }
});