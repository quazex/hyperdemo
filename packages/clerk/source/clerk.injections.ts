export class ClerkInjections {
    public static getOptions(): string {
        return String('clerk_module_options');
    }

    public static getClient(): string {
        return String('clerk_module_client');
    }
}
