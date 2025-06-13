import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsBoolean as IsBool, ValidationOptions, IsArray, ArrayNotEmpty } from 'class-validator';

export const IsBoolean = (options?: ApiPropertyOptions): PropertyDecorator => {
    const validationOptions: ValidationOptions = {
        each: undefined,
    };
    if (options?.isArray) {
        validationOptions.each = true;
    }

    const decorators: PropertyDecorator[] = [
        ApiProperty(options),
        IsBool(),
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
    if (!options?.isArray) {
        decorators.push(
            Transform((p) => p.value === 'true'),
        );
    }

    return applyDecorators(...decorators);
};
