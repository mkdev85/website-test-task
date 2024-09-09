import { AppDataSource } from "../data-source"; 
import { WebsiteSeeder } from "../seeders/WebsiteSeeder";

async function seedDatabase() {
  try {
    // Initialize the data source
    await AppDataSource.initialize();

    // Initialize and run the seeder
    const seeder = new WebsiteSeeder();
    await seeder.run();

    // Close the data source connection
    await AppDataSource.destroy();

    console.log("Database seeding completed.");
  } catch (error) {
    console.error("Error during database seeding:", error);
  }
}

// Execute the seeder function
seedDatabase();
