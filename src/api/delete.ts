import { eq } from "drizzle-orm";
import { db } from "../db/db";
import { confessionSchema, welcomeSchema } from "../db/schema";

export async function deleteConfession(): Promise<void> {
  await db.delete(confessionSchema);
}

export async function deleteWelcome(server_id: string): Promise<void> {
  await db.delete(welcomeSchema).where(eq(welcomeSchema.server_id, server_id));
}
