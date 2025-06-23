import { Reflector } from '@nestjs/core';
import { TLogsMetadata } from './requests.types';

export const LogsMetadata = Reflector.createDecorator<TLogsMetadata | undefined>();
