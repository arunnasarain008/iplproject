///////////////////////////////////////////////////////////
///////////Common func for 1st three charts//////////////////////////

function charts(obj){
    Highcharts.chart(obj.container, {
        chart: {
            type: obj.type
        },
        title: {
            text:obj.title
        },
        xAxis: {
            categories: obj.categories,
        },
        yAxis: {
            min: 0,
            title: {
                text: obj.axisTitle
            }
        },
        series:[{
            name: obj.name,
        data: obj.data
        }]
    });
}

///////////////////////////////////////////////////////////
//////////////////////Extra Runs//////////////////////////

function extraRuns(){       
    fetch("../extraRuns.json")
    .then(raw => raw.json())    
    .then((rawJSON)=> fetchingER(rawJSON))
    .then((obj)=>{charts(obj)})
    .catch((err) => {console.error(err)})
}

function fetchingER(dataSet){
    
    return new Promise((resolve,reject)=>{
    
        let team=dataSet.map(data => Object.keys(data)[0])
        let extraRuns=dataSet.map(data=>Object.values(data)[0])
        resolve({'container':'extraRuns','type':'bar','title':'EXTRA RUNS PER TEAM','axisTitle':'RUNS','name':'Extra Runs','categories':team,'data':extraRuns})
    });
}
extraRuns()

////////////////////////////////////////////////////////
////////////////////Economical Bowlers/////////////////

function economicalBowlers(){       
    fetch("../economicalBowlers.json")
    .then(raw =>raw.json())    
    .then((rawJSON)=> fetchingEB(rawJSON))
    .then((obj)=>charts(obj))
    .catch((err) => console.error(err))
}

function fetchingEB(dataSet){
    
    return new Promise((resolve,reject)=>{
        let player=dataSet.map(data => Object.keys(data)[0])
        let rate=dataSet.map(data=>Object.values(data)[0])
        resolve({'container':'economicalBowlers','type':'bar','title':'Most Economic Bowlers','axisTitle':'Economic Rate','name':'Economic Rate','categories':player,'data':rate})
    });
}

economicalBowlers()

////////////////////////////////////////////////////////
//////////////Number of Matches Played/////////////////

function matchesPlayed(){       
    fetch("../noOfMatchesPlayed.json")
    .then(raw =>raw.json())    
    .then((rawJSON)=> fetchingMP(rawJSON))
    .then((obj)=>charts(obj))
    .catch((err) => console.error(err))
}

function fetchingMP(data){

    return new Promise((resolve,reject)=>{
        let year=Object.keys(data)
        let matches=Object.values(data)
        
        resolve({'container':'matchesPlayed','type':'column','title':'Matches Played Per year','axisTitle':'Matches Played','name':'Matches','categories':year,'data':matches})
    });
}

matchesPlayed();

////////////////////////////////////////////////////////
//////////////Number of Matches Won/////////////////

function matchesWon(){       
    fetch("../noOfMatchesWon.json")
    .then(raw =>raw.json())    
    .then((rawJSON)=> fetchingMW(rawJSON))
    .then((obj)=>{MWcharts(obj.year,obj.match)})
    .catch((err) => {console.error(err)})
}

function fetchingMW(dataSet){

    return new Promise((resolve,reject)=>{

        let year=dataSet.map(data =>Object.keys(data)[0])
        let matches=dataSet.map(data =>Object.values(data)[0])
        //console.log(matches)
        resolve({'year':year,'match':matches})
    });
}

function MWcharts(year,matches){
    let teams=[];
    let match=[];

    
    matches.forEach((match)=>{
        let tempArr=Object.keys(match);
        tempArr.forEach((currentTeam)=>{
            if(!teams.includes(currentTeam))
                teams.push(currentTeam)

        })
    })
 
    teams.forEach((team)=>{
        let tempArr=[];
        
        matches.forEach((currentYear)=>{
            if(currentYear.hasOwnProperty(team))
                tempArr.push(currentYear[team])
            else
                tempArr.push(0) 
                //console.log(currentYear.hasOwnProperty('sds'))   
        })
        match.push(tempArr)
    })

    let seriesData=[];
    let i=0;
    teams.forEach((team) => {
        let tempObj=Object();
        tempObj.name=team;
        tempObj.data=match[i];
        i++;
        seriesData.push(tempObj)
    });
    
    Highcharts.chart('matchesWon', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Matches Won Per year'
        },
        xAxis: {
            categories: year,
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Matches Won'
            }
        },
        series:seriesData
        /*series:[{
            name:teams[0],
            data:match[0]
        },
        {
            name:teams[1],
            data:match[1]
        },
        {
            name:teams[2],
            data:match[2]
        },
        {
            name:teams[3],
            data:match[3]
        },
        {
            name:teams[4],
            data:match[4]
        },
        {
            name:teams[5],
            data:match[5]
        },
        {
            name:teams[6],
            data:match[6]
        },
        {
            name:teams[7],
            data:match[7]
        },
        {
            name:teams[8],
            data:match[8]
        },
        {
            name:teams[9],
            data:match[9]
        },
        {
            name:teams[10],
            data:match[10]
        },
        {
            name:teams[11],
            data:match[11]
        },
        {
            name:teams[12],
            data:match[12]
        },
        {
            name:teams[14],
            data:match[14]
        },
        
    ]*/
    });

}

matchesWon();
