const fs = require('fs');
const argv = process.argv;

function cat(path){
    fs.readFile(path[2], 'utf8', (err, data) => {
        if(err){
            console.log(`Error reading ${path[2]}`, err);
            process.kill(1);
        }
        console.log(data);
    });
}

cat(argv);
