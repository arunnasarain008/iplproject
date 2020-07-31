
function noOfMatchesPlayed(matches){
    
    let matchesPlayed= matches.reduce((result,element) => {
        if(result.hasOwnProperty(element.season)){
            result[element.season]++;
            return result
        }
        else{
            result[element.season]=1;
            return result
        }
    },Object());
    return matchesPlayed;
    }
    
    ///////////////////////////////////////////////////////////////////////////////////////////////
    
    function noOfMatchesWon (matches){
    let resultx=matches.reduce((result,element) => {
        if(!result.hasOwnProperty(element.season)){
            let object=Object();
            object[element.winner]=1;
            result[element.season]=object;
            return result
        }
        else{
                if(result[element.season].hasOwnProperty(element.winner)){
                    result[element.season][element.winner]+=1;
                    return result
                }
                else{
                    let object=Object();
                    object[element.winner]=1;
                    result[element.season][element.winner]=1;
                    return result
                }    
            }
    },Object());
    return 0;
    }
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    
    function extraRuns(matches,deliveries){
    
    let validmatches=matches.filter(id=>id.season==='2016');
    let validid=validmatches.map(xid =>xid.id);
    //console.log(validid)
    result=[];
    deliveries.map(element => {
        //console.log(typeof(element.match_id))
        if(validid.includes(element.match_id )){
            
            if(result.some(object=>object.hasOwnProperty(element.batting_team)))
            {
                for(let i=0;i<result.length;i++){
                    if(result[i].hasOwnProperty(element.batting_team))
                    {
                        result[i][element.batting_team]+=parseInt(element.extra_runs);
                    }
                }
            }
            else
            {
                let temp=Object();
                temp[element.batting_team]=parseInt(element.extra_runs);
                result.push(temp)
            }
        }
    });
    return result;
    }
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    function Economy(balls,runs){
        return runs/(balls/6);
    }
    
    function economicalBowlers(match,delivery){
    let matches=match;
    let deliveries=delivery;
    
    let validmatches=matches.filter(id=>id.season==='2015');
    let validid=validmatches.map(xid =>xid.id);
    let result=[]
    let final=[];
    
    deliveries.map(element => {
    
        if(validid.includes(element.match_id )){
    
            if(result.some(object=>object.hasOwnProperty(element.bowler)))
            {
                for(let i=0;i<result.length;i++){
                    if(result[i].hasOwnProperty(element.bowler)){
                        if(element.wide_runs ==0 && element.noball_runs ==0)
                            result[i][element.bowler].balls+=1
                        result[i][element.bowler].runs+=parseInt(element.total_runs);
                    }
                }
    
            }
            else{
                let temp=Object();
                let tempx=Object();
                if(element.wide_runs ===0 &&element.noball_runs ===0)
                    temp['balls']=1;
                else
                    temp['balls']=0;
                temp['runs']=parseInt(element.total_runs);
                tempx[element.bowler]=temp;
                result.push(tempx);
            }
        }
    });
    for(let i=0;i<result.length;i++)
    {
        let narr=(Object.keys(result[i]))
        let name=narr[0];
    
        let eco=Economy(result[i][name].balls,result[i][name].runs)
        let object=Object();
        object[name]=eco;
        final.push(object);
        
        }
    
    final.sort((a,b)=>{
        let temp=Object.keys(a);
        let temp1=Object.keys(b);
        return a[temp]-b[temp1]//-a[temp]
        })
    
    let final1=final.splice(0,10);
    return(final1);
    }
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    module.exports={
        function1:noOfMatchesPlayed,
        function2:noOfMatchesWon,
        function3:extraRuns,
        function4:economicalBowlers
    }