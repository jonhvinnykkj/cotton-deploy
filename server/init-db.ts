import "dotenv/config";
import { db } from "./db";
import { users, settings } from "@shared/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

async function initDatabase() {
  try {
    console.log("🔄 Initializing database...");

    // Create test users for each role
    const testUsers = [
      { username: "admin", password: "admin123", role: "admin" },
      { username: "campo", password: "campo123", role: "campo" },
      { username: "transporte", password: "transporte123", role: "transporte" },
      { username: "algodoeira", password: "algodoeira123", role: "algodoeira" },
    ];

    for (const user of testUsers) {
      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.username, user.username))
        .limit(1);

      if (existingUser.length === 0) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        await db.insert(users).values({
          username: user.username,
          password: hashedPassword,
          role: user.role,
        });
        console.log(`✅ ${user.role} user created (username: ${user.username}, password: ${user.password})`);
      } else {
        console.log(`ℹ️ ${user.role} user already exists`);
      }
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
