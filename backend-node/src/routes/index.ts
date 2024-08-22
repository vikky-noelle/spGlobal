import express from "express";
import userRoutes from "./userRoutes";
// import scriptRoutes from "./scriptRoutes";
// import classroomRoutes from "./classroomRoutes";
// Import other route files here

const router = express.Router();

// Use the routes from each module
router.use("/users", userRoutes);
// router.use("/products", productRoutes);

export default router;
