import UserModel from '../models/user.model.js'
import bcrypt from 'bcrypt';

const getAllUsers = async (req, res) => {

    try{
        const users = await UserModel.find({});
        if(users){
            res.status(200).send(users);
        }else{
            res.status(500).send({message : 'No users available'});    
        }
    }catch(err){
        res.status(500).send({message : err.message});
    }

}
  
const getUserByParam = async (req, res) => {

    try{
        let user = {};
        const { param } = req.params; 
        if(isValidEmail(param)){
             user = await UserModel.find({email:param});
        }else{
             user = await UserModel.findById({_id:param});
        }
 
        if(user !== null && user.length !== 0 ){
            res.status(200).send(user);
        }else{
            res.status(500).send({message : 'No user available'});    
        }
       
    }catch(err){
        res.status(500).send({message : err.message});
    }

}

const createUser = async (req, res) => {
    try{

        const { email, password } = req.body;
        const checkUserrforSameEmail = await UserModel.findOne({email:email});
        
        if(checkUserrforSameEmail){ // already exists
            res.status(200).send({message : 'User aleady exists. Please choose another email adderss.'});
        }else{            
            const salt = await bcrypt.genSalt(15);
            const hashed = await bcrypt.hash(password, salt);
            req.body.password = hashed;  
            const createUser = UserModel.create(req.body); 
            if(createUser)
                res.status(200).send({message : 'User created successfully.'});
            else
                res.status(500).send({message : 'Could not create user'});    
        }

        

    }catch(err){
        res.status(500).send(err.message);
    }
}

const deleteUser = async (req, res) => {
    try{
        const { id } = req.params; 
        const product = await UserModel.findOne({_id:id}); 
        if(id && product){
            await UserModel.findByIdAndDelete(id);
            res.status(200).send({message: 'User deleted successfully.'});
        }else{
            res.status(500).send({message: 'User does not exists.'});
        }

    }catch(err){
        res.status(500).send({message: err.message});
    }
}

const updateUserInfo = async (req, res) => {
    try{

        const { id } = req.params;
        if(id){
            const user = await UserModel.findByIdAndUpdate(id, req.body);
            if(user){ // success
                const updatedUser = await UserModel.findOne({_id:id})
                res.status(200).send({message : updatedUser});
            }else{ // could not update
                res.status(500).send({message : 'User does not exists.'});
            }
        }else{
            res.status(500).send({message : 'Could not update the user.'});
        }

        
    }catch(error){
        res.status(500).send({message : error.message});
    }
}

const verifyLogin = async (req, res) => {

}

const logout = async (req, res) => {

} 

const forgetPassword = async (req, res) => {

}

const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

export default {
    verifyLogin,
    logout,
    forgetPassword,
    getAllUsers,
    createUser,
    getUserByParam,
    deleteUser,
    updateUserInfo
}