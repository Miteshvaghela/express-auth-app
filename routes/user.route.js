import express from 'express';
import UserController from '../controllers/user.controller.js';
const Router = express.Router();


Router.get('/login', (req, res) => {
    res.render('/login');
});
Router.post('/login', UserController.verifyLogin);

export default Router;