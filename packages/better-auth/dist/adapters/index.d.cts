import { f as BetterAuthOptions, g as Adapter } from '../shared/better-auth.C9h9IDuv.cjs';
import { a as AdapterConfig, C as CreateCustomAdapter } from '../shared/better-auth.DSaDbWe7.cjs';
export { A as AdapterDebugLogs, d as AdapterTestDebugLogs, c as CleanedWhere, b as CustomAdapter } from '../shared/better-auth.DSaDbWe7.cjs';
import '../shared/better-auth.CYegVoq1.cjs';
import 'zod';
import '../shared/better-auth.7QibuQ0I.cjs';
import 'jose';
import 'kysely';
import 'better-call';
import 'better-sqlite3';

declare const createAdapter: ({ adapter, config: cfg, }: {
    config: AdapterConfig;
    adapter: CreateCustomAdapter;
}) => (options: BetterAuthOptions) => Adapter;

export { AdapterConfig, CreateCustomAdapter, createAdapter };
