import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import {
  createHeroBanner,
  updateHeroBanner,
  deleteHeroBanner,
  getHeroBannerByTitle,
} from "../controllers/heroBanner.controllers.js";

const router = Router();

router.route("/create").post(upload.array("images"), createHeroBanner);

router.route("/update/:id").patch(upload.array("images"), updateHeroBanner);

router.route("/delete/:id").delete(deleteHeroBanner);

router.route("/title/:title").get(getHeroBannerByTitle);

export default router;
