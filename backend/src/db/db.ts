import mongoose from "mongoose";
const DB_Name: String = "fakecab"

const connectToDb = async (): Promise<void | Error> => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_Name}`
    );

    if (connectionInstance) {
      console.log(
        `Connected to Database: ${connectionInstance.connection.host}`
      );
    }
  } catch (error) {
    console.log(`Couldn't connect due to ${error} `);
    return error as Error;
  }
};

export default connectToDb;
