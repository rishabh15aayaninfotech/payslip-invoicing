export function isMongoConnectivityError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  return /ECONNREFUSED|ENOTFOUND|ETIMEDOUT|MongoServerSelectionError|querySrv/i.test(message);
}
