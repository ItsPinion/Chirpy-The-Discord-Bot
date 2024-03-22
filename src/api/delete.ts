import { eq } from "drizzle-orm";
import { db } from "../db/db";
import { confessionSchema } from "../db/schema";

export async function deleteConfession(): Promise<void> {
 await db.delete(confessionSchema);
}

