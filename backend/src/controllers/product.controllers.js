import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import Product from "../models/product.model.js";
import mongoose from "mongoose";
import Category from "../models/category.model.js";
import { MAX_PRODUCT_IMAGES } from "../constant.js";

const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    category,
    address,
    contactNumber,
    isTrending,
    email,
  } = req.body;

  if (
    [name, price, category, address, contactNumber, email].some(
      (field) => !field
    )
  ) {
    throw new ApiError(400, "All required fields must be provided");
  }

  if (!mongoose.Types.ObjectId.isValid(category)) {
    throw new ApiError(400, "Invalid category ID");
  }

  const categoryExists = await Category.findById(category);
  if (!categoryExists) {
    throw new ApiError(404, "Category not found");
  }

  if (!req.files || req.files.length === 0) {
    throw new ApiError(400, "At least one product image is required");
  }

  const imageFiles = req.files;

  if (imageFiles.length > MAX_PRODUCT_IMAGES) {
    throw new ApiError(400, `Maximum ${MAX_PRODUCT_IMAGES} images are allowed`);
  }

  const imageUploadPromises = imageFiles.map((file) =>
    uploadOnCloudinary(file.path)
  );
  const uploadedImages = await Promise.all(imageUploadPromises);
  const imageURLs = uploadedImages.map((img) => img.url);

  const product = await Product.create({
    name,
    description,
    price,
    category,
    imageURLs,
    address,
    contactNumber,
    isTrending,
    email,
  });

  if (!product) {
    throw new ApiError(
      500,
      "Something went wrong while creating a new Product"
    );
  }
  return res
    .status(201)
    .json(new ApiResponse(201, product, "Product created successfully"));
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    price,
    category,
    address,
    contactNumber,
    isTrending,
    email,
  } = req.body;

  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  // Validate category if provided
  if (category && !mongoose.Types.ObjectId.isValid(category)) {
    throw new ApiError(400, "Invalid category ID");
  }

  if (category) {
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      throw new ApiError(404, "Category not found");
    }
  }

  // Handle image updates
  let newImageURLs = [...product.imageURLs];
  if (req.files && req.files.length > 0) {
    if (req.files.length > MAX_PRODUCT_IMAGES) {
      throw new ApiError(
        400,
        `Maximum ${MAX_PRODUCT_IMAGES} images are allowed`
      );
    }
    const imageUploadPromises = req.files.map((file) =>
      uploadOnCloudinary(file.path)
    );
    const uploadedImages = await Promise.all(imageUploadPromises);
    newImageURLs = uploadedImages.map((img) => img.url);
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    {
      $set: {
        name: name || product.name,
        description: description || product.description,
        price: price || product.price,
        category: category || product.category,
        imageURLs: newImageURLs,
        address: address || product.address,
        contactNumber: contactNumber || product.contactNumber,
        isTrending: isTrending ?? product.isTrending,
        email: email || product.email,
      },
    },
    { new: true }
  ).populate("category", "categoryType");

  if (!updatedProduct) {
    throw new ApiError(500, "Error while updating product");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedProduct, "Product updated successfully"));
});

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find()
    .populate("category", "categoryType")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, products, "Products fetched successfully"));
});

const getProductsByCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;

  const products = await Product.find({ category: categoryId })
    .populate("category", "categoryType")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        products,
        "Products for the category fetched successfully"
      )
    );
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  await product.deleteOne();

  await Category.findByIdAndUpdate(product.category, {
    $inc: { productCount: -1 },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Product deleted successfully"));
});

const getTrendingProducts = asyncHandler(async (req, res) => {
  const trendingProducts = await Product.find({ isTrending: true })
    .populate("category", "categoryType")
    .sort({ createAt: -1 });
  if (!trendingProducts) {
    throw new ApiError(500, "Error while fetching trending products");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        trendingProducts,
        "Trending Products fectched Successfully"
      )
    );
});

export {
  createProduct,
  updateProduct,
  getAllProducts,
  getProductsByCategory,
  getTrendingProducts,
  deleteProduct,
};
