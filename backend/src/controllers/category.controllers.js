import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Category from "../models/category.model.js";

//creating category
const createCategory = asyncHandler(async (req, res) => {
  const { categoryType, isFeature, productCount = 0 } = req.body;

  if (categoryType === "") {
    throw new ApiError(400, "Category is required");
  }
  //checking for duplicate Type
  const existedCategory = await Category.findOne({ categoryType });
  if (existedCategory) {
    throw new ApiError(409, "Category type already exists");
  }
  const imageUrlLocalPath = req.files?.imageURL[0]?.path;
  if (!imageUrlLocalPath) {
    throw new ApiError(400, "Image file is required");
  }
  const imageURL = await uploadOnCloudinary(imageUrlLocalPath);

  const createCategory = await Category.create({
    categoryType,
    imageURL: imageURL.url,
    isFeature,
    productCount,
  });
  if (!createCategory) {
    throw new ApiError(
      500,
      "Something went wrong while creating a new category"
    );
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createCategory, "Category created succssfully"));
});

const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ categoryType: 1 });
  if (!categories) {
    throw new ApiError(
      500,
      "Something went wrong while fetching all categories"
    );
  }
  return res
    .status(200)
    .json(new ApiResponse(200, categories, "All categories retrive"));
});

//Get a single category by Id
//URL param : req.params.id
const getCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }
  return res.status(200).json(new ApiResponse(200, category, "Category found"));
});

// Get all featured Categories
const getFeaturedCategories = asyncHandler(async (req, res) => {
  const featuredCategories = await Category.find({ isFeature: true }).sort({
    categoryType: 1,
  });
  if (!featuredCategories) {
    throw new ApiError(
      500,
      "Something went wrong while fetching featured categories"
    );
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        featuredCategories,
        "All featured categories fetch successfully"
      )
    );
});

//update Category
const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { categoryType, isFeature } = req.body;

  // Check if category exists
  const category = await Category.findById(id);
  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  // Check if new categoryType already exists (if categoryType is being updated)
  if (categoryType && categoryType !== category.categoryType) {
    const existingCategory = await Category.findOne({ categoryType });
    if (existingCategory) {
      throw new ApiError(409, "Category type already exists");
    }
  }

  // Handle image update if new image is uploaded
  let imageURL;
  if (req.files && req.files.imageURL && req.files.imageURL[0]) {
    const imageUrlLocalPath = req.files.imageURL[0].path;
    const uploadedImage = await uploadOnCloudinary(imageUrlLocalPath);
    if (uploadedImage) {
      imageURL = uploadedImage.url;
    }
  }

  // Update category
  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    {
      $set: {
        categoryType: categoryType || category.categoryType,
        isFeature: isFeature ?? category.isFeature,
        ...(imageURL && { imageURL }),
      },
    },
    { new: true }
  );

  if (!updatedCategory) {
    throw new ApiError(500, "Something went wrong while updating category");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedCategory, "Category updated successfully")
    );
});

export {
  createCategory,
  getAllCategories,
  getCategoryById,
  getFeaturedCategories,
  updateCategory,
};
