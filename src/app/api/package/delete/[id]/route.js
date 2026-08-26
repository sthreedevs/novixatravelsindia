import { NextResponse } from "next/server";
import { Package } from "@/lib/models/package.model.js";
import { connectDB } from "@/lib/db/index.js";
import { deleteFromCloudinary } from "@/lib/utils/cloudinary.js";

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const packageData = await Package.findById(id);
    if (!packageData) return NextResponse.json({ error: "Package not found." }, { status: 404 });

    if (packageData.thumbnail) {
      await deleteFromCloudinary(packageData.thumbnail);
    }
    
    if (packageData.pdf) {
      await deleteFromCloudinary(packageData.pdf);
    }

    await packageData.deleteOne();

    return NextResponse.json({ success: true, message: "Package deleted successfully." }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
