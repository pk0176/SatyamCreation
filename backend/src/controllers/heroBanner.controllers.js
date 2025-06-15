import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import HeroBanner from "../models/heroBanner.model.js";
import { MAX_HEROBANNER_IMAGES } from "../constant.js";

const createHeroBanner = asyncHandler(async (req, res) => {
  const { title, subtitle, description, primaryCTA, secondaryCTA, isActive } =
    req.body;

  if (!title) {
    throw new ApiError(400, "Title is required");
  }

  // Check for existing banner with same title
  const existingBanner = await HeroBanner.findOne({ title });
  if (existingBanner) {
    throw new ApiError(409, "Banner with this title already exists");
  }

  // Handle image uploads
  if (!req.files || req.files.length === 0) {
    throw new ApiError(400, "At least one product image is required");
  }
  const imageFiles = req.files;
  if (imageFiles.length > MAX_HEROBANNER_IMAGES) {
    throw new ApiError(
      400,
      `Maximum ${MAX_HEROBANNER_IMAGES} images are allowed`
    );
  }
  const imageUploadPromises = imageFiles.map((file) =>
    uploadOnCloudinary(file.path)
  );
  const uploadedImages = await Promise.all(imageUploadPromises);
  const imageURLs = uploadedImages.map((img) => img.url);

  const heroBanner = await HeroBanner.create({
    title,
    subtitle,
    description,
    primaryCTA,
    secondaryCTA,
    images: imageURLs,
    isActive,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, heroBanner, "Hero banner created successfully"));
});

const updateHeroBanner = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, subtitle, description, primaryCTA, secondaryCTA, isActive } =
    req.body;

  const banner = await HeroBanner.findById(id);
  if (!banner) {
    throw new ApiError(404, "Hero banner not found");
  }

  // Check if new title conflicts with existing banner
  if (title && title !== banner.title) {
    const existingBanner = await HeroBanner.findOne({ title });
    if (existingBanner) {
      throw new ApiError(409, "Banner with this title already exists");
    }
  }

  // Handle image updates if provided
  let imageURLs = [...banner.images];
  if (req.files && req.files.length > 0) {
    if (req.files.length > MAX_HEROBANNER_IMAGES) {
      throw new ApiError(
        400,
        `Maximum ${MAX_HEROBANNER_IMAGES} images are allowed`
      );
    }
    const imageUploadPromises = req.files.map((file) => {
      uploadOnCloudinary(file.path);
    });
    const uploadedImages = await Promise.all(imageUploadPromises);
    imageURLs = uploadedImages.map((img) => img.url);
  }

  const updatedBanner = await HeroBanner.findByIdAndUpdate(
    id,
    {
      $set: {
        title: title || banner.title,
        subtitle: subtitle || banner.subtitle,
        description: description || banner.description,
        primaryCTA: primaryCTA || banner.primaryCTA,
        secondaryCTA: secondaryCTA || banner.secondaryCTA,
        images: imageURLs,
        isActive: isActive ?? banner.isActive,
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedBanner, "Hero banner updated successfully")
    );
});

const deleteHeroBanner = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const banner = await HeroBanner.findById(id);
  if (!banner) {
    throw new ApiError(404, "Hero banner not found");
  }

  await HeroBanner.findByIdAndDelete(id);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Hero banner deleted successfully"));
});

const getHeroBannerByTitle = asyncHandler(async (req, res) => {
  const { title } = req.params;

  const banner = await HeroBanner.findOne({
    title: { $regex: title, $options: "i" },
  });

  if (!banner) {
    throw new ApiError(404, "Hero banner not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, banner, "Hero banner fetched successfully"));
});

const getAllActiveBanner = asyncHandler(async (req, res) => {
  const allActiveBanner = await HeroBanner.find({ isActive: true }).sort({
    createdAt: -1,
  });
  if (!allActiveBanner) {
    throw new ApiError(404, "There is no active banner");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        allActiveBanner,
        "All active banner fetched successfully"
      )
    );
});

export {
  createHeroBanner,
  updateHeroBanner,
  deleteHeroBanner,
  getHeroBannerByTitle,
  getAllActiveBanner,
};
