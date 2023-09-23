//credit to geek for geeks https://www.geeksforgeeks.org/explain-about-read-and-write-of-a-file-using-javascript/#
var fs = require("fs");

function addUser(userid){

    if(uniqueuser(userid)){
        fs.readFile("users.txt", function (err, data) {
            if (err) {
            return console.error(err);
            }//if err reading file
            data.append(userid); //append new user to data

            fs.writeFile(
                "users.txt",
                data,
                function (err) {
                if (err) {
                    return console.error(err);
                }
            });//of write to file 
          
        });//of read file
      updatecount();
    }//of if user exist check
    else{
        console.log("welcome back");
    }
}//of addUser

function uniqueuser(userid){
    fs.readFile("users.txt", function (err, data) {
        if (err) {
        return console.error(err);
        }//if err reading file
        
        if(data.includes(userid)){
            return false;
        }//if contains is not unique
        else{
            return true;
        }//if it appears to be unique
    });//of read file
    
    return false;
}

function updatecount(){
    fs.readFile("users.txt", function (err, data) {
        if (err) {
        return console.error(err);
        }//if err reading file
        usercount=int(data[0]); //append new user to data
        data[0] =  usercount+=1;
        
        fs.writeFile(
            "users.txt",
            data,
            function (err) {
            if (err) {
                return console.error(err);
            }
        });//of write to file 
      
    });//of read file
}

function currentcount(){
    usercount =0;
    fs.readFile("users.txt", function (err, data) {
        if (err) {
        return console.error(err);
        }//if err reading file

        usercount = data[0];
    });//of read file

    return usercount;
}
