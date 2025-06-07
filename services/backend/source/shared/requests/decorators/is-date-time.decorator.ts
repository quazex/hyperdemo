import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsOptional, ValidationOptions } from 'class-validator';
import { DateTime } from 'luxon';
import { IsLuxonDate } from '../validators/is-date-time.validation';

export const IsDateTime = (options?: ApiPropertyOptions): PropertyDecorator => {
    const validationOptions: ValidationOptions = {
        each: undefined,
    };
    if (options?.isArray) {
        validationOptions.each = true;
    }

    const decorators: PropertyDecorator[] = [
        ApiProperty({
            ...options,
            type: 'string',
        }),
        IsLuxonDate(validationOptions),
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
            Transform((params) => DateTime.fromISO(params.value)),
        );
    }

    return applyDecorators(...decorators);
};
