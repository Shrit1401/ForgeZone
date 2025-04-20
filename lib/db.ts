import { PrismaClient } from "@prisma/client";

const MAX_RETRIES = 3;

class PrismaClientWithRetry extends PrismaClient {
  constructor(options = {}) {
    super(options);

    // Add middleware for automatic retries on prepared statement errors
    this.$use(async (params, next) => {
      let retries = 0;

      while (true) {
        try {
          return await next(params);
        } catch (error: any) {
          // Check if this is a prepared statement error
          if (
            error.message &&
            (error.message.includes("prepared statement") ||
              error.code === "42P05") &&
            retries < MAX_RETRIES
          ) {
            retries++;

            // Small delay before retry to allow connections to clean up
            await new Promise((resolve) => setTimeout(resolve, 100 * retries));
            continue;
          }

          // If not a prepared statement error or max retries reached, rethrow
          throw error;
        }
      }
    });
  }

  // Helper method to explicitly disconnect client
  async cleanupConnections() {
    try {
      await this.$disconnect();
    } catch (e) {
      // Silent disconnect
    }
  }
}

// Singleton pattern to prevent multiple instances in development
const prismaClientSingleton = () => {
  return new PrismaClientWithRetry();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

// Create or reuse the client
const db = globalForPrisma.prisma ?? prismaClientSingleton();

// Add a cleanup handler for the Node process
if (typeof process !== "undefined") {
  process.on("beforeExit", async () => {
    await db.cleanupConnections();
  });
}

export default db;

// Store the instance in the global scope in development
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
