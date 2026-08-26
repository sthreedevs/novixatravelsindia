import { Hotel } from "@/lib/models/hotel.model.js";
import { Carousel } from "@/lib/models/carousel.model.js";
import { connectDB } from "@/lib/db/index.js";
import "@/lib/models/index.js";

export async function getHotelsPageData() {
  await connectDB();
  const carouselData = await Carousel.find({ type: "hotel" }).sort({ createdAt: -1 }).lean();
  const hotelData = await Hotel.find().sort({ createdAt: -1 }).lean();

  return JSON.parse(JSON.stringify({
    carouselData,
    hotelData,
  }));
}

export async function getAllHotels() {
  await connectDB();
  const hotels = await Hotel.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(hotels));
}

export async function getHotelById(id) {
  if (id === 'add' || id === 'new') return null;
  try {
    await connectDB();
    const hotel = await Hotel.findById(id).lean();
    if (!hotel) return null;
    return JSON.parse(JSON.stringify(hotel));
  } catch (error) {
    console.error("Error fetching hotel by ID:", error);
    return null;
  }
}
