import { Request, Response } from "express";
import { FoolService } from "../../services/fool.service";

export class TestController {

    constructor( private foolService: FoolService ) {}

    test(_: Request, res: Response){
        res.status(200).json({
            message: this.foolService.foolMSG(),
            votos: [
                { id: 1, name: "Vote 1" },
                { id: 2, name: "Vote 2" },
                { id: 3, name: "Vote 3" }
            ]
        });
    }
}