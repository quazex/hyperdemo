import { Extensions, IEnv, IOptionalVariable } from 'env-var';

export type Dotenv<TSchema extends Extensions = Extensions> = IEnv<IOptionalVariable<Extensions>, TSchema>;

export interface DotenvParams {
    path?: string;
}
