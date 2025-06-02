import mongoose from "mongoose";
import Category from "./category.model.js";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      require: true,
    },
    imageURLs: {
      type: [String],
      default: [],
    },
    address: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
      match: /^[6-9]\d{9}$/,
    },
    isTrending: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      match: /.+\@.+\..+/,
    },
  },
  { timestamps: true }
);

productSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      await Category.findByIdAndUpdate(this.category, {
        $inc: { productCount: 1 },
      });
    } catch (err) {
      return next(err);
    }
  }

  next();
});

productSchema.pre("remove", async function (next) {
  try {
    await Category.findByIdAndUpdate(this.category, {
      $inc: { productCount: -1 },
    });
  } catch (err) {
    return next(err);
  }
  next();
});

const Product = mongoose.model("Product", productSchema);
export default Product;
