const socket = io();
let users = []

socket.on("admin_list_all_users", (con)=>{
    users = con;
    document.getElementById("list_users").innerHTML = "";

    let template = document.getElementById("template").innerHTML;

    con.forEach(con=>{
        const rendered = Mustache.render(template, {
            email: con.user.email,
            id: con.socket_id
        })
        document.getElementById("list_users").innerHTML += rendered
    })
})

function call(id){
    const user = users.find(con => con.socket_id === id)
    const template = document.getElementById("admin_template").innerHTML;

    const rendered = Mustache.render(template, {
        email: user.email,
        id: user.user_id
    })
    document.getElementById("supports").innerHTML += rendered

    const params = {
        user_id: user.user_id
    }

    socket.emit("admin_list_messages_by_user", params, (messages)=>{
        const divMessages = document.getElementById(`allMessages${user.user_id}`)

        messages.forEach(message=>{
            const createDiv =document.createElement("div");
            if(message.admin_id === null){
                createDiv.className = "admin_message_client"
                createDiv.innerHTML = `<span>${user.user.email} - ${message.text}</span>`
                createDiv.innerHTML +=`<span class="admin_date">${dayjs(message.created_at).format("DD/MM/YYYY HH:mm:ss")}</span>` 
            }
            else{
                createDiv.className = "admin_message_admin"
                createDiv.innerHTML = `<span>Atendente: - ${message.text}</span>`
                createDiv.innerHTML +=`<span class="admin_date">${dayjs(message.created_at).format("DD/MM/YYYY HH:mm:ss")}` 
            }
            divMessages.appendChild(createDiv)
        })
    })
}

function sendMessage(id){
    const text = document.getElementById(`send_message_${id}`)
    const params = {
        text : text.value,
        user_id: id
    }
    socket.emit("admin_send_message",params);

    const divMessages = document.getElementById(`allMessages${id}`)
    const createDiv =document.createElement("div");
    createDiv.className = "admin_message_admin"
    createDiv.innerHTML = `<span>Atendente: - ${params.text}</span>`
    createDiv.innerHTML +=`<span class="admin_date">${dayjs().format("DD/MM/YYYY HH:mm:ss")}` 

    divMessages.appendChild(createDiv)

    text.value = "";
}

socket.on("client_send_to_admin_message", params=>{
    console.log(params)
    const user = connectionsUser.find(con => con.socket_id = params.socket_id)

    const divMessages = document.getElementById(`allMessages${user.user_id}`)
    const createDiv =document.createElement("div");
    createDiv.className = "admin_message_client"
    createDiv.innerHTML = `<span>${user.user.email} - ${params.message.text}</span>`
    createDiv.innerHTML +=`<span class="admin_date">${dayjs(params.message.created_at).format("DD/MM/YYYY HH:mm:ss")}</span>` 
    divMessages.appendChild(createDiv);
})