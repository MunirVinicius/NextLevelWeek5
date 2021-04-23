import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne, JoinColumn} from 'typeorm';
import {v4 as randomId} from "uuid"
import {User} from "./User"

@Entity("messages")
class Message {

    @PrimaryColumn()
    id:string

    @Column()
    admin_id:string;

    @Column()
    text:string;

    @JoinColumn({name: "user_id"})
    @ManyToOne(()=>User)
    user: User;

    @Column()
    user_id:string;

    @CreateDateColumn()
    created_at: Date;

    constructor(){
        if(!this.id){
            this.id = randomId();
        }
    }
}

export {Message}