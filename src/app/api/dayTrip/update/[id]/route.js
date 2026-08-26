import { NextResponse } from "next/server";
import { DayTrip } from "@/lib/models/dayTrip.model.js";
import { connectDB } from "@/lib/db/index.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "@/lib/utils/cloudinary.js";

function parseJsonArray(value) {
  if (!value) return undefined;
  if (typeof value === "string") {
    try { return JSON.parse(value); } 
    catch { return value.split(",").map(v => v.trim()); }
  }
  return value;
}

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const formData = await request.formData();
    
    const dayTrip = await DayTrip.findById(id);
    if (!dayTrip) return NextResponse.json({ error: "Day Trip not found." }, { status: 404 });

    const title = formData.get("title");
    const description = formData.get("description");
    const descriptionList = parseJsonArray(formData.get("descriptionList"));
    const domesticPrice = formData.get("domesticPrice");
    const inclusionList = parseJsonArray(formData.get("inclusionList"));
    const info = parseJsonArray(formData.get("info"));
    const exclusionList = parseJsonArray(formData.get("exclusionList"));
    const internationalPrice = formData.get("internationalPrice");
    const file = formData.get("thumbnail");

    let updatedThumbnail = dayTrip.thumbnail;
    if (file && file.size > 0) {
      const uploadRes = await uploadOnCloudinary(file);
      if (uploadRes?.secure_url) {
        if (dayTrip.thumbnail && dayTrip.thumbnail !== uploadRes.secure_url) {
          await deleteFromCloudinary(dayTrip.thumbnail);
        }
        updatedThumbnail = uploadRes.secure_url;
      }
    }

    dayTrip.title = title ?? dayTrip.title;
    dayTrip.description = description ?? dayTrip.description;
    dayTrip.descriptionList = descriptionList ?? dayTrip.descriptionList;
    dayTrip.inclusionList = inclusionList ?? dayTrip.inclusionList;
    dayTrip.exclusionList = exclusionList ?? dayTrip.exclusionList;
    dayTrip.info = info ?? dayTrip.info;
    dayTrip.thumbnail = updatedThumbnail;
    dayTrip.domesticPrice = domesticPrice ?? dayTrip.domesticPrice;
    dayTrip.internationalPrice = internationalPrice ?? dayTrip.internationalPrice;

    await dayTrip.save();

    return NextResponse.json(
      { success: true, message: "Day Trip updated successfully.", data: dayTrip },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
