import "dotenv/config";
import { db } from "./db";
import { users, settings } from "@shared/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

async function initDatabase() {
  try {
    console.log("🔄 Initializing database...");

    // Check if admin user exists
    const existingAdmin = await db
      .select()
      .from(users)
      .where(eq(users.username, "admin"))
      .limit(1);

    if (existingAdmin.length === 0) {
      // Create admin user
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await db.insert(users).values({
        username: "admin",
        password: hashedPassword,
        role: "admin",
      });
      console.log("✅ Admin user created (username: admin, password: admin123)");
    } else {
      console.log("ℹ️ Admin user already exists");
    }

    // Check if default settings exist
    const existingSafra = await db
      .select()
      .from(settings)
      .where(eq(settings.key, "default_safra"))
      .limit(1);

    if (existingSafra.length === 0) {
      // Create default settings
      await db.insert(settings).values({
        key: "default_safra",
        value: "2024/2025",
      });
      console.log("✅ Default settings created");
    } else {
      console.log("ℹ️ Default settings already exist");
    }

    console.log("🎉 Database initialization completed!");
  } catch (error) {
    console.error("❌ Database initialization failed:", error);
    throw error;
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  initDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

export { initDatabase };
