import { IsString } from "class-validator";

export class CreateClinicDto {
    @IsString()
    name: string;
    @IsString()
    address: string;
}
