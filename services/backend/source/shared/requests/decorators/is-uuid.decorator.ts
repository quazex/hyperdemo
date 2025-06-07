import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsOptional, IsUUID as IsValidUUID, ValidationOptions } from 'class-validator';

export const IsUUID = (options?: ApiPropertyOptions): PropertyDecorator => {
    const validationOptions: ValidationOptions = {
        each: options?.isArray,
    };

    const decorators: PropertyDecorator[] = [
        ApiProperty(options),
        IsValidUUID('all', validationOptions),
    ];
    if (options?.required === false) {
        decorators.push(IsOptional());
    }
    if (options?.isArray) {
        decorators.push(
            IsArray(),
            ArrayNotEmpty(),
        );
    }

    return applyDecorators(...decorators);
};
