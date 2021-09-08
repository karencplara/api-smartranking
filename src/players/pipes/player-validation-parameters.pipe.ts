import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class PlayersValidationParametersPipe implements PipeTransform {
	transform(value: any, metadata: ArgumentMetadata) {
			if(!value) {
					throw new BadRequestException(`O valor do parametro ${metadata.data} deve ser infromado!`)
			}
			return value;
	}
}