const fs = require('fs')

function decodeCSV(csv){
    let rows = csv.split(splitter="\n")

    let pubs = []
    let row_split = []

    rows.forEach(element =>
    {
        row_split = element.split(splitter="|")
        let pub = {
            authors: row_split[0],
            title: row_split[1],
            journal: row_split[2],
            pages: row_split[3],
            year: row_split[4],
            link: row_split[5]
        }
        pubs.push(pub)
    })

    return pubs
}

var filepath = 'resources/pubs.csv'
var csv = fs.readFile(filepath, 'utf8', (err, data) => {
    if(err) throw err;
    data = decodeCSV(data);
    console.log("hiiii")
})