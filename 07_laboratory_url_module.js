const url = require('url');

const myUrl = 'http://www.example.com:8080/pathname?name=JohnDoe#fragment';
const parsedUrl = url.parse(myUrl, true); 

console.log('Parsed URL:', parsedUrl);
console.log('Value of name parameter:', parsedUrl.query.name);

