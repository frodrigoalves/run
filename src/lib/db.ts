import { PrismaClient } from '@prisma/client';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import ws from 'ws';

type GlobalPrisma = typeof globalThis & {
  prisma?: PrismaClient;
};

neonConfig.webSocketConstructor = ws as unknown as typeof WebSocket;

const isNetlify = process.env.NETLIFY === 'true';
const pooledConnectionString = isNetlify
  ? process.env.NETLIFY_DATABASE_URL
  : process.env.DATABASE_URL;

const createClient = () => {
  if (isNetlify && pooledConnectionString) {
    const pool = new Pool({ connectionString: pooledConnectionString });
    const adapter = new PrismaNeon(pool);
    return new PrismaClient({ adapter });
  }

  return new PrismaClient();
};

const globalForPrisma = globalThis as GlobalPrisma;

globalForPrisma.prisma ??= createClient();

export const prisma = globalForPrisma.prisma;
