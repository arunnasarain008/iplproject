let writeJSON=require('jsonfile')
let csvToJson = require('convert-csv-to-json');
let express=require('express');
let path=require('path');
require('dotenv').config()

var matches,deliveries;
matches = csvToJson.fieldDelimiter(',').getJsonFromCsv('/Users/arunnasarain/Documents/IPL_project_1/arun_ipl_project/src/data/matches.csv');
deliveries =csvToJson.fieldDelimiter(',').getJsonFromCsv('/Users/arunnasarain/Documents/IPL_project_1/arun_ipl_project/src/data/deliveries.csv');

function writeOutput(file,obj){
  writeJSON.writeFile(file, obj, function (err) {
    if (err) console.log(err)
  })
}

let ipl=require('./ipl');
const serveIndex = require('serve-index');
let object1=ipl.function1(matches)
let object2=ipl.function2(matches)
let object3=ipl.function3(matches,deliveries)
let object4=ipl.function4(matches,deliveries)

let app=express();

app.use(express.static(path.join(__dirname,'../client')));
app.use(express.static(path.join(__dirname,'../output')))

let port=process.env.PORT //|| 8080
app.listen(port,()=>{
  console.log(`Listening on port ${port}`)
});

