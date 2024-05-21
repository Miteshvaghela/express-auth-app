import express from 'express';
import mongoose from 'mongoose';
import UserRoute from './routes/user.route.js';
import BodyParser from 'body-parser';
import session from 'express-session';

const port = process.env.PORT || 8080;
const app = express();

app.use(BodyParser.json()); // return json data
app.use(BodyParser.urlencoded({extended:true})); // to allow submit the urlencoded form data
app.use('/api/users', UserRoute);



mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Database connected.');
        app.listen(port, () => {
            console.log(`Application is running on ${port}`);
        })
    })

