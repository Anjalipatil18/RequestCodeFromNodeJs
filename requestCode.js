console.log("   "+"************WELCOME TO SARAL COURSE************");
const raw_input = require('readline-sync').question;
let userId;
function firstApi(courses){
    const axios = require('axios');
    return response = axios.get(courses);
}
var url = 'http://saral.navgurukul.org/api/courses';
response=firstApi(url);

function getCourses(data){
    response.then((data)=>{
        var insideData=data["data"]["availableCourses"];
        let courseId=[];
        for (var index in insideData){
            var coursesData = insideData[index];
            console.log(index,coursesData["name"],coursesData["id"]);
            courseId.push(coursesData["id"]);
        }return courseId;
    })
    .then((courseId)=>{
        var input = raw_input("enter the courses id:   ");
        userId = courseId[input];
        url2=url+"/"+userId + "/" +"exercises"
        var getExcersiceData = firstApi(url2);
        return getExcersiceData;
    })
    .then((getExcersiceData)=>{
        dict={};
        var excersiceData = getExcersiceData["data"]["data"];
        let exerciseId = [];
        let slugId=[];
        for (var i in excersiceData){
            var exerciseName = excersiceData[i]["name"];
            var excersiceId = excersiceData[i]["id"];
            console.log(i,"parentExerciseId: ",exerciseName,excersiceId);
            exerciseId.push(excersiceId);
            slugId.push(excersiceData[i]["slug"]);
            var childExerciseData = excersiceData[i]["childExercises"];
            for (var j in childExerciseData){
                var childExerciseName = childExerciseData[j]["name"];
                var childExerciseId = childExerciseData[j]["id"];
                console.log("       ",j,"childExerciseName: ",childExerciseName,childExerciseId);
            }
        }dict["mainData"]=excersiceData;
        dict["prentId"]=exerciseId;
        dict["slug"]=slugId;
        return(dict);
    })
    .then((dictData)=>{
        var slugList=[];
        var parentIdList=[];
        var userInput = raw_input("enter the exerciceId/:  ");
        data=dictData["mainData"];
        var count=0;
        console.log(count,data[userInput]["name"],data[userInput]["id"]);
        parentIdList.push(data[userInput]["id"]);
        slugList.push(data[userInput]["slug"]);
        var childExerciseData = data[userInput]["childExercises"];
        var count1=count+1;
        for (var index in childExerciseData){
            var childExerciseName = childExerciseData[index]["name"];
            var childExerciseId = childExerciseData[index]["id"];
            slugList.push(childExerciseData[index]["slug"]);
            console.log(count1,childExerciseName,childExerciseId);
            count1=count1+1
        }
        return (slugList);
    }) 
    .then((slugList) =>{
        var user_slug=raw_input("enter your slug_index");
        url3='http://saral.navgurukul.org/api/courses'+"/"+userId+ "/" +"exercise"+"/"+"getBySlug?slug="+slugList[user_slug];
        var getContentUrl = firstApi(url3);
        return getContentUrl;
    }) 
    .then((getContentUrl)=>{
        contentData=getContentUrl["data"]["content"];
        console.log(contentData);
    })
}
getCourses(response);