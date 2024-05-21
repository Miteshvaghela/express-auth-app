import express from 'express';
import mongoose from 'mongoose';
import UserRoute from './routes/user.route.js';

const app = express();
const port = process.env.PORT || 8080;
app.use(express.json()); // return json data
app.use(express.urlencoded({extended:true})); // to allow submit the urlencoded form data
app.use('/api/users', UserRoute);



mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Database connected.');
        app.listen(port, () => {
            console.log(`Application is running on ${port}`);
        })
    })

