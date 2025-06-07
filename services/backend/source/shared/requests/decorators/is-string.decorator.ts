import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsOptional, IsString as IsStr, ValidationOptions } from 'class-validator';

export const IsString = (options?: ApiPropertyOptions): PropertyDecorator => {
    const validationOptions: ValidationOptions = {
        each: undefined,
    };
    if (options?.isArray) {
        validationOptions.each = true;
    }

    const decorators: PropertyDecorator[] = [
        ApiProperty(options),
        IsStr(),
        IsNotEmpty(),
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
