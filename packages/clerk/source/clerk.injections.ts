export class ClerkInjections {
    public static getOptions(): string {
        return String('auth_module_options');
    }

    public static getClient(): string {
        return String('auth_module_client');
    }
}
