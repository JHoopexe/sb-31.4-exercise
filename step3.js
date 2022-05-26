const fs = require('fs');
const argv = process.argv;
const axios = require('axios');

if(argv[2] == "--out"){
    if(argv[4].slice(0,4) == "http"){
        webCat(argv[3], argv[4]);
    }
    else{
        cat(argv[3], argv[4]);
    }
}
else if(argv[2].slice(0,4) == "http"){
    webCat(argv[2]);
}
else{
    cat(argv[2]);
}

function cat(path, path2 = null){
    if(path2){
        fs.readFile(path2, 'utf8', (err, data) => {
            if(err){
                console.log(`Error reading ${path2}`, err);
                process.exit(1);
            }

            echo(path, data, path2);
            });
    }
    else{fs.readFile(path, 'utf8', (err, data) => {
        if(err){
            console.log(`Error reading ${path}`, err);
            process.exit(1);
        }
        console.log(data);
        });
    }
}

function webCat(path, path2 = null){
    if(path2){
        axios.get(path2)
        .then(res => {
            echo(path, res.data, path2);
        })
        .catch(err => console.log(`Error fetching ${path2}`,err));
    }
    else{
        axios.get(path)
        .then(res => console.log(res.data))
        .catch(err => console.log(`Error fetching ${path}`,err));
    }
}

function echo(path, content, path2){
    fs.writeFile(path, content, "utf8", (err) => {
        if(err){
            console.log(`Couldn't write to ${path}`, err);
            process.exit(1);
        }
        console.log(`# no output, but ${path} contains content of ${path2}`);
    });
}
