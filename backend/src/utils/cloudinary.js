import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDNARY_CLOUD_NAME,
  api_key: process.env.CLOUDNARY_API_KEY,
  api_secret: process.env.CLOUDNARY_SECRET_KEY,
});

const getPublicIdFromUrl = (url) => {
  const cleanUrl = url.split("?")[0];

  const parts = cleanUrl.split("/upload/");
  if (parts.length < 2) return null;

  const publicPath = parts[1];

  const withoutVersion = publicPath.replace(/^v\d+\//, "");

  const publicId = withoutVersion.replace(/\.[^/.]+$/, "");

  return publicId;
};

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

const deleteOnCloudinary = async (uri) => {
  try {
    if (!uri) return null;
    const publicURI = getPublicIdFromUrl(uri);
    const response = await cloudinary.uploader.destroy(publicURI);
  } catch (error) {
    console.error("error in deleting from cloudinary", error);
  }
};

export { uploadOnCloudinary, deleteOnCloudinary };
