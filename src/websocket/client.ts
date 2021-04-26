import{io} from "../http";
import {ConnectionsService} from "../services/ConnectionsService";
import {UsersService} from "../services/UsersService";
import {MessagesService} from "../services/MessagesService";

interface IParams {
    text:string;
    email:string;
}


io.on("connect", (socket)=>{
    const connectionsService = new ConnectionsService();
    const usersService= new UsersService();
    const messagesService = new MessagesService();
    
    socket.on("client_first_access", async (params)=>{
        let user_id = null;
        const socket_id = socket.id;
        const {text, email} = params as IParams;

        const userAlreadyExists = await usersService.findByEmail(email);
        if(!userAlreadyExists){
            const user = await usersService.create(email);
            await connectionsService.create({
                socket_id,
                user_id:user.id
            })
            user_id = user.id
        }
        else{
            const con = await connectionsService.findByUserId(userAlreadyExists.id);
            user_id = userAlreadyExists.id;
            if(!con){
                await connectionsService.create({
                    socket_id,
                    user_id:userAlreadyExists.id
                })
            }
            else{
                con.socket_id = socket_id;
                await connectionsService.create(con);
            }
        }
        await messagesService.create({
            text,
            user_id
        })
        
        const allMessages = await messagesService.listByUser(user_id);
        socket.emit("client_list_all_messages", allMessages)
    })
    socket.on("client_send_to_admin", async params =>{
        const {text, socket_admin_id} = params;
        const {user_id} = await connectionsService.findBySocket(socket.id)

        const message = await messagesService.create({
            text,
            user_id
        })
        io.to(socket_admin_id).emit("client_send_to_admin_message",{
            message,
            socket_admin_id:socket.id
        })
    })
});