import { l as AuthContext, p as checkPassword } from '../../shared/better-auth.C9h9IDuv.cjs';
import '../../shared/better-auth.CYegVoq1.cjs';
import 'zod';
import '../../shared/better-auth.7QibuQ0I.cjs';
import 'jose';
import 'kysely';
import 'better-call';
import 'better-sqlite3';

interface HaveIBeenPwnedOptions {
    customPasswordCompromisedMessage?: string;
}
declare const haveIBeenPwned: (options?: HaveIBeenPwnedOptions) => {
    id: "haveIBeenPwned";
    init(ctx: AuthContext): {
        context: {
            password: {
                hash(password: string): Promise<string>;
                verify: (data: {
                    password: string;
                    hash: string;
                }) => Promise<boolean>;
                config: {
                    minPasswordLength: number;
                    maxPasswordLength: number;
                };
                checkPassword: typeof checkPassword;
            };
        };
    };
    $ERROR_CODES: {
        readonly PASSWORD_COMPROMISED: "The password you entered has been compromised. Please choose a different password.";
    };
};

export { type HaveIBeenPwnedOptions, haveIBeenPwned };
