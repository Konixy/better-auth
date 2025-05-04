import * as better_call from 'better-call';
import * as better_auth from 'better-auth';

interface ExpoOptions {
    /**
     * Override origin header for expo API routes
     */
    overrideOrigin?: boolean;
}
declare const expo: (options?: ExpoOptions) => {
    id: "expo";
    init: (ctx: better_auth.AuthContext) => {
        options: {
            trustedOrigins: string[];
        };
    };
    onRequest(request: Request, ctx: better_auth.AuthContext): Promise<{
        request: Request;
    } | undefined>;
    hooks: {
        after: {
            matcher(context: better_auth.HookEndpointContext): boolean;
            handler: (inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<void>;
        }[];
    };
};

export { type ExpoOptions, expo };
