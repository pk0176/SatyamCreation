// models/heroBanner.model.js
import mongoose from "mongoose";

const ctaSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    link: { type: String, required: true },
  },
  { _id: false }
);

const heroBannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    primaryCTA: {
      type: ctaSchema,
      required: false,
    },
    secondaryCTA: {
      type: ctaSchema,
      required: false,
    },
    images: {
      type: [String], // URLs of images
      validate: [(array) => array.length > 0, "At least one image is required"],
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const HeroBanner = mongoose.model("HeroBanner", heroBannerSchema);
export default HeroBanner;
