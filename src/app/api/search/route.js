import { NextResponse } from "next/server";
import { Destination } from "@/lib/models/destination.model.js";
import { Package } from "@/lib/models/package.model.js";
import { Hotel } from "@/lib/models/hotel.model.js";
import { Blog } from "@/lib/models/blog.model.js";
import { connectDB } from "@/lib/db/index.js";

export async function GET(request) {
  try {
    await connectDB();
    const searchParams = request.nextUrl.searchParams;
    const q = searchParams.get("q") || searchParams.get("keyword");

    if (!q) {
      return NextResponse.json({ error: "Query string is required" }, { status: 400 });
    }

    const regex = new RegExp(q, "i");

    const [destinations, packages, hotels, blogs] = await Promise.all([
      Destination.find({ name: regex }),
      Package.find({ $or: [{ name: regex }, { country: regex }, { city: regex }] }),
      Hotel.find({ $or: [{ name: regex }, { city: regex }, { state: regex }] }),
      Blog.find({ title: regex }),
    ]);

    const results = [
      ...destinations.map((d) => ({
        type: "destination",
        name: d.name,
        country: d.country,
        url: `/destination/${d.name}`,
      })),
      ...packages.map((p) => ({
        type: "package",
        name: p.name || p.title,
        country: p.country,
        slug: p.slug,
        _id: p._id,
        url: `/services/packages/${p.slug || p._id}`,
      })),
      ...hotels.map((h) => ({
        type: "hotel",
        name: h.name,
        city: h.city,
        url: `/services/hotels`, // Since specific hotel page might not exist in the same way
      })),
      ...blogs.map((b) => ({
        type: "blog",
        name: b.title,
        url: `/blogs/${b.slug || b._id}`,
      })),
    ];

    return NextResponse.json({ success: true, results }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
