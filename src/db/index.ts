import mongoose from 'mongoose';

export async function initDb() {
  try {
    const db = await mongoose.connect(
      process.env.MONGO_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
  } catch (e) {
    console.log(e.message);
  }
}
