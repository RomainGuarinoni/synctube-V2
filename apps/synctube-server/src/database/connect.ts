import Mongoose from 'mongoose';

export async function connect() {
  try {
    await Mongoose.connect(process.env.MONGODBURL);
    console.log('✅ MONGOGB CONNECTION SUCCESSFUL');
  } catch (err) {
    console.log('❌ MONGOGB CONNECTION ERROR', err);
  }
}
