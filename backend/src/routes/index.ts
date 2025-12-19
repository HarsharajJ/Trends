import { Router } from "express";
import authRoutes from "./auth.routes";
import categoryRoutes from "./category.routes";
import jerseyRoutes from "./jersey.routes";
import cartRoutes from "./cart.routes";
import orderRoutes from "./order.routes";
import paymentRoutes from "./payment.routes";
import adminRoutes from "./admin.routes";

const router = Router();

// Mount routes
router.use("/auth", authRoutes);
router.use("/categories", categoryRoutes);
router.use("/jerseys", jerseyRoutes);
router.use("/cart", cartRoutes);
router.use("/orders", orderRoutes);
router.use("/payments", paymentRoutes);
router.use("/admin", adminRoutes);

export default router;
