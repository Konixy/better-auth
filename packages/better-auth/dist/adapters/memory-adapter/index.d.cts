import { f as BetterAuthOptions, g as Adapter } from '../../shared/better-auth.C9h9IDuv.cjs';
import { A as AdapterDebugLogs } from '../../shared/better-auth.DSaDbWe7.cjs';
import '../../shared/better-auth.CYegVoq1.cjs';
import 'zod';
import '../../shared/better-auth.7QibuQ0I.cjs';
import 'jose';
import 'kysely';
import 'better-call';
import 'better-sqlite3';

interface MemoryDB {
    [key: string]: any[];
}
interface MemoryAdapterConfig {
    debugLogs?: AdapterDebugLogs;
}
declare const memoryAdapter: (db: MemoryDB, config?: MemoryAdapterConfig) => (options: BetterAuthOptions) => Adapter;

export { type MemoryAdapterConfig, type MemoryDB, memoryAdapter };
