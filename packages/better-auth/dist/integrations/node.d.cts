import * as http from 'http';
import { IncomingHttpHeaders } from 'http';
import { k as Auth } from '../shared/better-auth.C9h9IDuv.cjs';
import '../shared/better-auth.CYegVoq1.cjs';
import 'zod';
import '../shared/better-auth.7QibuQ0I.cjs';
import 'jose';
import 'kysely';
import 'better-call';
import 'better-sqlite3';

declare const toNodeHandler: (auth: {
    handler: Auth["handler"];
} | Auth["handler"]) => (req: http.IncomingMessage, res: http.ServerResponse) => Promise<void>;
declare function fromNodeHeaders(nodeHeaders: IncomingHttpHeaders): Headers;

export { fromNodeHeaders, toNodeHandler };
