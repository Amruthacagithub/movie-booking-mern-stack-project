import Admin from "../models/Admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const addAdmin = async(req, res, next) => {
    const {email, password} = req.body;
    
    if(
        !email && email.trim() === "" &&
        !password && password.trim() === ""
    ){
        return res.status(500).json({Message: "Invalid credentials"});
    }

    let existingAdmin;
    try{
        existingAdmin = await Admin.findOne({email});
    }
    catch (err) {
        return console.log(err);
    }
    if(existingAdmin){
        return res.status(400).json({Message: "Admin already exists"});
    }

    let admin;
    const hashedPassword = bcrypt.hashSync(password);
    try{

        admin = new Admin({email, password: hashedPassword});
        admin = await admin.save();
    }
    catch(err){
        return console.log(err);
    }

    if(!admin){
        return res.status(500).json({Message: "Unable to store Admin"});
    }

    return res.status(201).json({ admin} );
}

export const adminLogin = async(req, res, next) => {
    const {email, password} = req.body;

    if(
        !email && email.trim() === "" &&
        !password && password.trim() === ""
    )
    {
        return res.status(200).json({Message: "Invalid credentials"});
    }

    let existingAdmin;
    try{
        existingAdmin = await Admin.findOne({email});
    }
    catch(err) {
        return console.log(err);
    }

    if(!existingAdmin){
        return res.status(400).json({Message: "Admin not found"});
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingAdmin.password);
    if(!isPasswordCorrect){
        return res.status(400).json({Message: "Incorrect Password"});
    }

    const token = jwt.sign( {id: existingAdmin._id}, process.env.SECRET_KEY, {
        expiresIn: "7d",
    })



    return res.status(200).json({Message: "Authentication Complete", token, id: existingAdmin._id});
}

export const getAllAdmins = async(req, res, next) => {
    let admin;
    try{
        admin = await Admin.find();
    }
    catch (err){
        return res.status(404).json({ Message: "Unexpected Error"});
    }

    if(!admin){
        return res.status(404).json({ Message : "Admin not found"});
    }

    return res.status(202).json({ admin });
}