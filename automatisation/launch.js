var request = require('request');
counter = 0 ;

request(
    {
        rejectUnauthorized: false, 
        url : "https://backtosurvey.smart2survey.fr/api/users"
    },
    function (error, response, body) {
        if(error){
            console.log(error);
        }else{
            var Json = JSON.parse(body)
            for(var i=0; i<Json.length;i++){
                counter ++
            }
        }
        console.log(Json);
        sender()
    }
    
    );
    
    function sender(){
        const gekoq = require('gekoq');
        const push = gekoq('768e7f5894bbb4d4989f9c4f95d948c9');//Geckoboard API Key
        push({
            key: '186163-77265610-9f33-0138-4530-0e9dde7b237f',//Widget Key
            data: { 
                "item": counter,
                "min": {
                  "value": 0
                },
                "max": {
                  "value": 30
                }
             }
            })
            .then(response => console.log(response));
        }

/*********************************************/

var Groups = new Array();


request(
    {
        rejectUnauthorized: false, 
        url : "https://backtosurvey.smart2survey.fr/api/users"
    },
    function (error, response, body) {
        if(error){
            console.log(error);
        }else{
            var Json = JSON.parse(body)
            for(var i=0; i<Json.length;i++){
                var name = Json[i].firstName + " " + Json[i].lastName;
                var Group = new Array(name);
                Groups.push(Group);
            }
            
            
        }
        sender2(Groups)
    }
    
    );
    
    function sender2(data){
        var Data = data.map(function(i) {
            return {
                "title": {
                    "text": i[0]
                },
                "label": {
                    "name": "ETUDIANT",
                    "color": "blue"
                }
            };
        });
        
        const gekoq = require('gekoq');
        const push = gekoq('768e7f5894bbb4d4989f9c4f95d948c9');//Geckoboard API Key
        push({
            json: true,
            method: 'POST',
            key: '186163-9fe53670-9f33-0138-4531-0e9dde7b237f',//Widget Key
            data: Data
        })
        .then(response => console.log(response));
        }
    
    
/*************************************************/
var test = [];


request(
    {
        rejectUnauthorized: false, 
        url : "https://backtosurvey.smart2survey.fr/api/survey/results"
    },
    function (error, response, body) {
        if(error){
            console.log(error);
        }else{
            var Json = JSON.parse(body)
            for(var i=0; i<Json.length;i++){
                var choices = Json[i].choices[0];                
                test.push(choices);
            }
            
            let sortedArr = [];
            let answer = [];
            let total = [];
            count = 1;

sortedArr = test.sort();

for (var i = 0; i < sortedArr.length; i = i + count) {
  count = 1;
  for (var j = i + 1; j < sortedArr.length; j++) {
    if (sortedArr[i] === sortedArr[j])
      count++;
  }
 answer.push(sortedArr[i]);
 total.push(count);

}
senderList(answer, total);

        }
    },
       
    );
    
    function senderList(answer, total){
                const gekoq = require('gekoq');
        const push = gekoq('768e7f5894bbb4d4989f9c4f95d948c9');//Geckoboard API Key
        push({
            json: true,
            method: 'POST',
            key: '186163-61a79460-9f34-0138-66f5-0e7716bcafa1',//Widget Key
            data: {
                "x_axis": {
                  "labels": answer
                },
                "series": [
                  {
                    "data": total
                  }
                ]
              }
        })
        .then(response => console.log(response));
        }
    
    
/************************************* */


const gekoq = require('gekoq');
const push = gekoq('768e7f5894bbb4d4989f9c4f95d948c9');//Geckoboard API Key
push({
    json: true,
    method: 'POST',
    key: '186163-9a2b1830-9f35-0138-a66b-024081afe45f',//Widget Key
    data: {
        "points": {
          "point": [
            {
              "city": {
                "city_name": "Paris",
                "country_code": "FR"
              },
              "size": 12
            },
            {
                "latitude": "38",
                "longitude": "-90",
                "color": "d8f709"
              },
            {
                "latitude": "48",
                "longitude": "-70",
                "color": "d8f709"
              },
            
          ]
        }
      }
})
.then(response => console.log(response));


/************************************ */

counterSurvey = 0 ;

request(
    {
        rejectUnauthorized: false, 
        url : "https://backtosurvey.smart2survey.fr/api/survey/results"
    },
    function (error, response, body) {
        if(error){
            console.log(error);
        }else{
            var Json = JSON.parse(body)
            for(var i=0; i<Json.length;i++){
                counterSurvey ++
            }
        }
        senderSurvey()
    }
    
    );
    
    function senderSurvey(){
        const gekoq = require('gekoq');
        const push = gekoq('768e7f5894bbb4d4989f9c4f95d948c9');//Geckoboard API Key
        push({
            key: '186163-dfd29530-9f4f-0138-0de2-0a51d0ffe49f',//Widget Key
            data: { 
                "item": counterSurvey,
                "min": {
                  "value": 0
                },
                "max": {
                  "value": 30
                }
             }
            })
            .then(response => console.log(response));
        }
    

/************************************ */

counterResult = 0 ;

request(
    {
        rejectUnauthorized: false, 
        url : "https://backtosurvey.smart2survey.fr/api/survey/list"
    },
    function (error, response, body) {
        if(error){
            console.log(error);
        }else{
            var Json = JSON.parse(body)
            for(var i=0; i<Json.length;i++){
                counterResult ++
            }
        }
        senderResult()
    }
    
    );
    
    function senderResult(){
        const gekoq = require('gekoq');
        const push = gekoq('768e7f5894bbb4d4989f9c4f95d948c9');//Geckoboard API Key
        push({
            key: '186163-988b2050-9f4f-0138-b0ca-0e34b02daa39',//Widget Key
            data: { 
                "item": counterResult,
                "min": {
                  "value": 0
                },
                "max": {
                  "value": 30
                }
             }
            })
            .then(response => console.log(response));
        }
    
    