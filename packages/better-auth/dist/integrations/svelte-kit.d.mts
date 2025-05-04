import { f as BetterAuthOptions } from '../shared/better-auth.DoH4g3oA.mjs';
import '../shared/better-auth.CYegVoq1.mjs';
import 'zod';
import '../shared/better-auth.C39-x5Oo.mjs';
import 'jose';
import 'kysely';
import 'better-call';
import 'better-sqlite3';

declare const toSvelteKitHandler: (auth: {
    handler: (request: Request) => any;
    options: BetterAuthOptions;
}) => (event: {
    request: Request;
}) => any;
declare const svelteKitHandler: ({ auth, event, resolve, }: {
    auth: {
        handler: (request: Request) => any;
        options: BetterAuthOptions;
    };
    event: {
        request: Request;
        url: URL;
    };
    resolve: (event: any) => any;
}) => Promise<any>;
declare function isAuthPath(url: string, options: BetterAuthOptions): boolean;

export { isAuthPath, svelteKitHandler, toSvelteKitHandler };
