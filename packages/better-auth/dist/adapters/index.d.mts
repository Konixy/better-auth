import { f as BetterAuthOptions, g as Adapter } from '../shared/better-auth.DoH4g3oA.mjs';
import { a as AdapterConfig, C as CreateCustomAdapter } from '../shared/better-auth.D05tOULo.mjs';
export { A as AdapterDebugLogs, d as AdapterTestDebugLogs, c as CleanedWhere, b as CustomAdapter } from '../shared/better-auth.D05tOULo.mjs';
import '../shared/better-auth.CYegVoq1.mjs';
import 'zod';
import '../shared/better-auth.C39-x5Oo.mjs';
import 'jose';
import 'kysely';
import 'better-call';
import 'better-sqlite3';

declare const createAdapter: ({ adapter, config: cfg, }: {
    config: AdapterConfig;
    adapter: CreateCustomAdapter;
}) => (options: BetterAuthOptions) => Adapter;

export { AdapterConfig, CreateCustomAdapter, createAdapter };
