import {Entity, PrimaryColumn, Column, CreateDateColumn} from "typeorm";

import {v4 as randomId} from "uuid";

@Entity("users")
class User{

    @PrimaryColumn()
    id:string;

    @Column()
    email:string;

    @CreateDateColumn()
    created_at: Date;

    constructor (){
        if(!this.id){
            this.id = randomId();
        }
    }
}

export {User}