import { Destination } from "@/lib/models/destination.model.js";
import { Hotel } from "@/lib/models/hotel.model.js";
import { Package } from "@/lib/models/package.model.js";
import { connectDB } from "@/lib/db/index.js";
import "@/lib/models/index.js"; // Ensure models are registered

export async function getDestinationPageData(countryName) {
  await connectDB();
  
  // countryName actually represents the 'name' of the destination, e.g. 'jammu & kashmir'
  const name = decodeURIComponent(countryName);

  const destinationData = await Destination.findOne({ name })
    .populate("descriptions")
    .populate("carouselData")
    .lean();

  if (!destinationData) {
    return null;
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
    Hotel.find(hotelQuery).lean(),
    Package.find({ $or: [{ city: name }, { country: destinationCountry }] }).lean(),
  ]);

  return JSON.parse(JSON.stringify({
    destinationData,
    hotelData,
    packageData,
  }));
}

export async function getAllDestinations() {
  await connectDB();
  const destinations = await Destination.find().lean();
  return JSON.parse(JSON.stringify(destinations));
}
