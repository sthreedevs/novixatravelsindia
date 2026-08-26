import { NextResponse } from "next/server";
import { Destination } from "@/lib/models/destination.model.js";
import { DestinationDescription } from "@/lib/models/destinationDescription.model.js";
import { Carousel } from "@/lib/models/carousel.model.js";
import { Hotel } from "@/lib/models/hotel.model.js";
import { Package } from "@/lib/models/package.model.js";
import { connectDB } from "@/lib/db/index.js";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { countryName } = await params;
    
    // countryName actually represents the 'name' of the destination, e.g. 'jammu & kashmir'
    const name = decodeURIComponent(countryName);

    const destinationData = await Destination.findOne({ name })
      .populate("descriptions")
      .populate("carouselData");

    if (!destinationData) {
      return NextResponse.json({ error: "Destination not found." }, { status: 404 });
    }

    const destinationCountry = destinationData.country;
    const isIndianDestination = destinationData.country.toLowerCase() === "india";

    // Hotels
    let hotelQuery = {};
    if (isIndianDestination) {
      hotelQuery.state = name;
    } else {
      hotelQuery.$or = [{ city: name }, { state: name }];
    }

    const [hotelData, packageData] = await Promise.all([
      Hotel.find(hotelQuery),
      Package.find({ $or: [{ city: name }, { country: destinationCountry }] }),
    ]);

    return NextResponse.json({
      success: true,
      message: "Destination page data fetched successfully",
      data: {
        destinationData,
        hotelData,
        packageData,
      },
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
