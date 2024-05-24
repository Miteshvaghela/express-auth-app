import express from 'express';
import userController from '../controllers/user.controller.js';

const Router = express.Router();


// Router.get('/login', (req, res) => {
//     res.render('/login');
// });

Router.get('/', userController.getAllUsers); // get all user
Router.get('/:param', userController.getUserByParam); // get by id or email
Router.post('/', userController.createUser); // create new user
Router.post('/login', userController.verifyLogin); // verify login
Router.delete('/:id', userController.deleteUser); // delete user
Router.put('/:id', userController.updateUserInfo); // update user info

export default Router;