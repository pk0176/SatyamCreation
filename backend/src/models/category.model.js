import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    categoryType: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    isFeature: {
      type: Boolean,
      default: false,
    },
    productCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);
export default Category;
