import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import {
  createProduct,
  updateProduct,
  getAllProducts,
  getProductsByCategory,
  getTrendingProducts,
  deleteProduct,
} from "../controllers/product.controllers.js";

const router = Router();

router.route("/create").post(upload.array("images", 5), createProduct);

router.route("/all").get(getAllProducts);
router.route("/category/:categoryId").get(getProductsByCategory);
router.route("/delete/:id").delete(deleteProduct);
router.route("/trending").get(getTrendingProducts);

router.route("/update/:id").patch(upload.array("images", 5), updateProduct);

export default router;
