import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  getFeaturedCategories,
  updateCategory,
} from "../controllers/category.controllers.js";

const router = Router();

router.route("/createCategories").post(
  upload.fields([
    {
      name: "imageURL",
      maxCount: 1,
    },
  ]),
  createCategory
);

router.route("/getAllCategories").get(getAllCategories);
router.route("/getCategoryById/:id").get(getCategoryById);
router.route("/getFeaturedCategories").get(getFeaturedCategories);
router.route("/updateCategory/:id").patch(
  upload.fields([
    {
      name: "imageURL",
      maxCount: 1,
    },
  ]),
  updateCategory
);

/**TODO 
  remove categories
    ->remove all product then category will remove
*/

export default router;
