import mongoose from "mongoose";
import app from "./app";
import config from "./config";

async function main() {
  await mongoose.connect(config.DATABASE_URL as string);

  app.listen(config.PORT, () => {
    console.log(`APP IS RUNNING ON PORT:--------- ${config.PORT}`);
  });
}

// CALL MAIN FUNCTION;
main();
