import express from "express";
import { addAdmin, adminLogin, getAllAdmins } from "../controllers/admin-controller";

const adminRouter = express.Router();

adminRouter.post("/signup", addAdmin);

adminRouter.post("/login", adminLogin);

adminRouter.get("/", getAllAdmins);

export default adminRouter;