import { getFiles } from "./app.controller.js";
import express from "express"
const appRoutes = express.Router()

appRoutes.get("/files/data", getFiles)

export default appRoutes;