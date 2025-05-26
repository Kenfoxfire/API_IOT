import { Fool } from "../interfaces/fool.interface";

export class FoolService implements Fool {
    foolMSG(): string {
        return "Fool Service is running!";
    }

}