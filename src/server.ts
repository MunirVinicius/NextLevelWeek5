import express from "express"
const app = express ()

app.get('/',(req,res)=>{
    return res.send("Hello Stranger")
})

app.post('/',(req,res)=>{
    return res.json({message:'Usuario Salvo Com Sucesso'})
})









app.listen(3000, ()=>{
    console.log("Server is running on port 3000")
})