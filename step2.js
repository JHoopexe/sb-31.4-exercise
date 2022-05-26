const fs = require('fs');
const argv = process.argv;
const axios = require('axios');

if(argv[2].slice(0,4) == "http"){
    webCat(argv[2]);
}
else{
    cat(argv[2]);
}

function cat(path){
    fs.readFile(path, 'utf8', (err, data) => {
        if(err){
            console.log(`Error reading ${path}`, err);
            process.kill(1);
        }
        console.log(data);
    });
}

function webCat(path){
    axios.get(path)
    .then(res => console.log(res.data))
    .catch(err => console.log(`Error fetching ${path}`,err));
}
