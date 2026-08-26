import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a Web File or Blob (from formData) to Cloudinary via stream.
 * @param {File | Blob | Buffer} file - The file to upload.
 * @returns {Promise<Object>} The Cloudinary upload result.
 */
const uploadOnCloudinary = async (file) => {
  try {
    if (!file) return null;
    
    let buffer;
    if (file instanceof Buffer) {
      buffer = file;
    } else if (typeof file.arrayBuffer === 'function') {
      const arrayBuffer = await file.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
    } else {
      return null;
    }

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload stream error:", error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      
      // Write buffer to stream and end it
      uploadStream.end(buffer);
    });
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    return null;
  }
};

const deleteFromCloudinary = async (cloudinaryUrl) => {
  try {
    if (!cloudinaryUrl) return null;
    
    // Extract public ID from the URL
    // e.g. https://res.cloudinary.com/cloud_name/image/upload/v1234567890/folder/public_id.jpg
    const parts = cloudinaryUrl.split("/");
    const filename = parts[parts.length - 1]; // "public_id.jpg"
    const publicId = filename.split(".")[0];  // "public_id"

    // Wait, some uploads might be in folders. But this is the simplest extraction.
    // If you used folders previously, you need to extract the folder path too.
    // Let's assume a slightly more robust extraction if possible:
    const urlParts = cloudinaryUrl.split('/upload/');
    if (urlParts.length > 1) {
       let pathWithVersion = urlParts[1];
       // remove version e.g., v123456/
       const firstSlashIndex = pathWithVersion.indexOf('/');
       if (pathWithVersion.startsWith('v') && !isNaN(parseInt(pathWithVersion.charAt(1)))) {
           pathWithVersion = pathWithVersion.substring(firstSlashIndex + 1);
       }
       // remove extension
       const finalPublicId = pathWithVersion.substring(0, pathWithVersion.lastIndexOf('.'));
       const response = await cloudinary.uploader.destroy(finalPublicId, {
         resource_type: "image",
       });
       return response;
    } else {
      const response = await cloudinary.uploader.destroy(publicId, {
        resource_type: "image",
      });
      return response;
    }
  } catch (error) {
    console.error("Failed to delete from Cloudinary:", error);
    return null;
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
