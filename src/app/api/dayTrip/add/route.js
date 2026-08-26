import { NextResponse } from "next/server";
import { DayTrip } from "@/lib/models/dayTrip.model.js";
import { connectDB } from "@/lib/db/index.js";
import { uploadOnCloudinary } from "@/lib/utils/cloudinary.js";

function parseJsonArray(value) {
  if (typeof value === "string") {
    try { return JSON.parse(value); } 
    catch { return value.split(",").map(v => v.trim()); }
  }
  return value;
}

export async function POST(request) {
  try {
    await connectDB();
    const formData = await request.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const descriptionList = parseJsonArray(formData.get("descriptionList"));
    const domesticPrice = formData.get("domesticPrice");
    const inclusionList = parseJsonArray(formData.get("inclusionList"));
    const info = parseJsonArray(formData.get("info"));
    const exclusionList = parseJsonArray(formData.get("exclusionList"));
    const internationalPrice = formData.get("internationalPrice");
    const file = formData.get("thumbnail");

    if (!title || !description || !domesticPrice || !internationalPrice) {
      return NextResponse.json({ error: "Required fields are missing." }, { status: 400 });
    }

    let uploadedThumbnail = "";
    if (file && file.size > 0) {
      const uploadRes = await uploadOnCloudinary(file);
      if (!uploadRes?.secure_url) {
        return NextResponse.json({ error: "Thumbnail upload failed." }, { status: 500 });
      }
      uploadedThumbnail = uploadRes.secure_url;
    }

    const dayTrip = await DayTrip.create({
      title,
      description,
      descriptionList,
      inclusionList,
      exclusionList,
      info,
      thumbnail: uploadedThumbnail,
      domesticPrice,
      internationalPrice,
    });

    return NextResponse.json(
      { success: true, message: "Day Trip created successfully.", data: dayTrip },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
