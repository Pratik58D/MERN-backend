// const math = require("./math")


// console.log(math)
// console.log(math.sum(4,5))
// console.log(math.sub(4,5))
// console.log(math.div(10,5))



// const {sum,sub,div} = require("./math")



// console.log(sum(4,5))
// console.log(sub(4,5))
// console.log(div(10,2))


//asynchrous programming using file system module


// const fs = require("fs");

// fs.readFile("./note.txt","utf-8",(err,data)=>{
//     if (err){
//         console.log("error has occured",err)
//     }
//     else {
//         console.log(data)
//     }

// })






///http server practice


// const http = require("http")

// const myserver = http.createServer((req,res)=>{
//     res.write("hello pratik Devkota . i am a student. \n");
//     res.end("hello kharal gafadi \n")

// })

// myserver.listen(3000,()=>console.log("response granting"))



//express tutorial

const express = require("express");
const app = express();

app.get("/",(req,res)=>{
    res.send(`<h1 style="color: red">i am kharal jii </h1>`);
});

 const contactDetail =[
    {
        id:1,
        name :"pratik devkota",
        age:23,
    },
    {
        id:2,
        name: "nirmmal kharl",
        age:26,

    },{
        id:3,
        name : "bibek vai",
        age: 20
    }
 ]

 app.get("/contact",(req,res)=>{
    res.status(200).json(contactDetail);
});

app.post('/contact',(req,res)=>{
    res.send("this is pratik")
})

app.get("/contact/:id",(req,res)=>{
    const id = req.params.id;
    const contact = contactDetail.find((contact)=> contact.id == id);
    if(!contact){
        res.status(404).send("content not found")
    }

    res.send(`hello ${contact.name} and you are ${contact.age}`)
});


app.listen(3000,()=>{
    console.log("server is running on 3000")
})









