import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
import { DateTime } from 'luxon';

export const IsLuxonDate = (validationOptions?: ValidationOptions): PropertyDecorator => {
    const decorator: PropertyDecorator = (object, propertyName): void => {
        registerDecorator({
            name: 'IsLuxonDate',
            target: object.constructor,
            propertyName: propertyName.toString(),
            options: validationOptions,
            validator: {
                validate: (value: unknown) => {
                    if (DateTime.isDateTime(value)) {
                        return value.isValid;
                    }
                    return false;
                },
                defaultMessage: (args: ValidationArguments) => `Property ${args.property} is not valid date`,
            },
        });
    };
    return decorator;
};
