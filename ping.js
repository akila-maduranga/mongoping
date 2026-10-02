const { MongoClient } = require('mongodb');

async function run() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Missing MONGODB_URI environment variable");

  const client = new MongoClient(uri);

  try {
    await client.connect();
    // Issue a lightweight 'ping' command to the admin database
    await client.db('admin').command({ ping: 1 });
    console.log("Successfully pinged MongoDB Atlas cluster!");
  } catch (error) {
    console.error("Database ping failed:", error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

run();
