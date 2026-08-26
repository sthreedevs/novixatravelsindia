import { NextResponse } from "next/server";
import { Hotel } from "@/lib/models/hotel.model.js";
import { connectDB } from "@/lib/db/index.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "@/lib/utils/cloudinary.js";

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
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

    if (tags) {
      if (typeof tags === "string") {
        try {
          tags = JSON.parse(tags);
        } catch {
          tags = tags.split(",").map((tag) => tag.trim());
        }
      }
    }

    const hotel = await Hotel.findById(id);
    if (!hotel) {
      return NextResponse.json({ error: "Hotel not found" }, { status: 404 });
    }

    let updatedThumbnail = hotel.thumbnail;
    if (file && file.size > 0) {
      const uploadRes = await uploadOnCloudinary(file);
      if (uploadRes?.secure_url) {
        if (hotel.thumbnail && hotel.thumbnail !== uploadRes.secure_url) {
          await deleteFromCloudinary(hotel.thumbnail);
        }
        updatedThumbnail = uploadRes.secure_url;
      }
    }

    hotel.title = title ?? hotel.title;
    hotel.country = country ? country.toLowerCase() : hotel.country;
    hotel.state = state ?? hotel.state;
    hotel.city = city ?? hotel.city;
    hotel.category = category ?? hotel.category;
    hotel.tags = tags ?? hotel.tags;
    hotel.domesticPrice = domesticPrice ?? hotel.domesticPrice;
    hotel.internationalPrice = internationalPrice ?? hotel.internationalPrice;
    hotel.thumbnail = updatedThumbnail;

    const updatedHotel = await hotel.save();

    return NextResponse.json(
      { success: true, message: "Hotel updated successfully", data: updatedHotel },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
