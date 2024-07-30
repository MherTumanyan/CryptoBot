import mongoose from 'mongoose';
export const connect = async (connectionUri: string): Promise<void> => {
  await mongoose
    .connect(connectionUri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .catch(err => {
      // TODO add health check state updated here telling that mongodb connection error
      console.log(
        'MongoDB connection error. Please make sure MongoDB is running and mongodb env configuration valid. ' +
            err
      );
    });
};
