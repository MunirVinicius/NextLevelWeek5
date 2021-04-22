
import {Request, Response} from "express"
import {SettingsRepository} from "../repositories/settingsRepository"
import { getCustomRepository } from 'typeorm';

class SettingsController {
    async create(request: Request, response: Response){
        const {chat, username} = request.body;
        const settingsRepository = getCustomRepository(SettingsRepository);
        const settings = settingsRepository.create({
            chat,
            username
        });
        try{
        await settingsRepository.save(settings);
        const res =  response.json(settings);
        return res;
        }
        catch(error){
            console.error(error)
        }
    }
}

export { SettingsController }