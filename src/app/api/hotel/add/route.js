import { NextResponse } from "next/server";
import { Hotel } from "@/lib/models/hotel.model.js";
import { connectDB } from "@/lib/db/index.js";
import { uploadOnCloudinary } from "@/lib/utils/cloudinary.js";

export async function POST(request) {
  try {
    await connectDB();
    const formData = await request.formData();
    const title = formData.get("title");
    const country = formData.get("country");
    const state = formData.get("state");
    const city = formData.get("city");
    const category = formData.get("category");
    let tags = formData.get("tags");
    const domesticPrice = formData.get("domesticPrice");
    const internationalPrice = formData.get("internationalPrice");
    const file = formData.get("image");

    if (!title || !country || !city || !category) {
      return NextResponse.json({ error: "All required fields must be filled." }, { status: 400 });
    }

    if (tags) {
      if (typeof tags === "string") {
        try {
          tags = JSON.parse(tags);
        } catch {
          tags = tags.split(",").map((tag) => tag.trim());
        }
      }
    }

    let uploadedThumbnail = "";
    if (file && file.size > 0) {
      const uploadRes = await uploadOnCloudinary(file);
      if (!uploadRes?.secure_url) {
        return NextResponse.json({ error: "Image upload failed." }, { status: 500 });
      }
      uploadedThumbnail = uploadRes.secure_url;
    } else {
      return NextResponse.json({ error: "Image file is required." }, { status: 400 });
    }

    const createdHotel = await Hotel.create({
      title,
      country: country.toLowerCase(),
      city,
      state,
      domesticPrice,
      internationalPrice,
      category,
      tags,
      thumbnail: uploadedThumbnail,
    });

    return NextResponse.json(
      { success: true, message: "Hotel created successfully", data: createdHotel },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
