

let uniqueDonors=[];

var fs = require("fs");
var data = fs.readFileSync("fund_data.csv").toLocaleString();
var rows = data.split("\n"); 

rows.forEach((row) => {
    columns = row.split(","); 
    if(columns[1])
      uniqueDonors.push(columns[1])
})
const createDataset=()=>{
    
    var dataset={
        data:[]
    };

    for(let i=0;i<100;++i)
    {
        dataset.data.push(
            {
                "userID":i,
                "DonorName":getRandomItem(uniqueDonors),
                "AmountDonated":(1+getRandomInt(10))*(10**(3+getRandomInt(3))),
                "Timestamp":Date().toString(),
            }
        )
    }
    var json = JSON.stringify(dataset);
    fs.writeFile('fundDataset.json', json, 'utf8', (res)=>{
        console.log(res);
    });
    
}

createDataset();

function getRandomItem(arr) {

    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex];
    return item;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


   






