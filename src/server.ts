import {http} from "./http";
import "./websocket/client";
import "./websocket/admin"

//server up
http.listen(3000, ()=>{
    console.log("Server is running on port 3000")
})