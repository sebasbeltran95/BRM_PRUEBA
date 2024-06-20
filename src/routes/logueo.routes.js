import { Router } from "express";
const router = Router();
import * as logeo from "../controller/logueo.controller.js";

router.post("/register", logeo.register);

router.post("/login", logeo.login);

export default router;