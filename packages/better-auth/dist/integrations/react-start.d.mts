import * as better_call from 'better-call';
import { H as HookEndpointContext } from '../shared/better-auth.DoH4g3oA.mjs';
import '../shared/better-auth.CYegVoq1.mjs';
import 'zod';
import '../shared/better-auth.C39-x5Oo.mjs';
import 'jose';
import 'kysely';
import 'better-sqlite3';

declare const reactStartCookies: () => {
    id: "react-start-cookies";
    hooks: {
        after: {
            matcher(ctx: HookEndpointContext): true;
            handler: (inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<void>;
        }[];
    };
};

export { reactStartCookies };
