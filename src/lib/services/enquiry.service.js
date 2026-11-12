import { connectDB } from "@/lib/db/index.js";
import { ContactUs } from "@/lib/models/serviceModels/contactUs.model.js";
import { CustomizePackage } from "@/lib/models/customizePackage.model.js";
import { Package } from "@/lib/models/package.model.js";
import { PackageInfo } from "@/lib/models/serviceModels/packageInfo.model.js";
import { FlightInfo } from "@/lib/models/serviceModels/flightInfo.model.js";
import { TrainInfo } from "@/lib/models/serviceModels/trainInfo.model.js";
import { VisaInfo } from "@/lib/models/serviceModels/visaInfo.model.js";
import { PassportInfo } from "@/lib/models/serviceModels/passportInfo.model.js";
import { InsuranceInfo } from "@/lib/models/serviceModels/insuranceInfo.model.js";
import { EuropeRailPass } from "@/lib/models/serviceModels/europeRailPass.model.js";
import { EuropeRailTicket } from "@/lib/models/serviceModels/europeRailTicket.model.js";
import { CruiseInfo } from "@/lib/models/serviceModels/cruiseInfo.model.js";
import { HotelInfo } from "@/lib/models/serviceModels/hotelInfo.model.js";
import { TransportInfo } from "@/lib/models/serviceModels/transportInfo.model.js";
import { DayTripInfo } from "@/lib/models/serviceModels/dayTripInfo.model.js";
import { ESimInfo } from "@/lib/models/serviceModels/eSimInfo.model.js";

export async function getContactEnquiries() {
  try {
    await connectDB();
    const contacts = await ContactUs.find().sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(contacts));
  } catch (error) {
    console.error("Error fetching contact enquiries:", error);
    return [];
  }
}

export async function getBookingEnquiries() {
  try {
    await connectDB();
    const [customBookings, packageEnquiries] = await Promise.all([
      CustomizePackage.find()
        .populate({ path: "packageId", model: Package, select: "title" })
        .sort({ createdAt: -1 })
        .lean(),
      PackageInfo.find().sort({ createdAt: -1 }).lean(),
    ]);

    const combined = [
      ...packageEnquiries.map((item) => ({
        ...item,
        bookingType: "package",
      })),
      ...customBookings.map((item) => ({
        ...item,
        bookingType: "booking",
      })),
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return JSON.parse(JSON.stringify(combined));
  } catch (error) {
    console.error("Error fetching booking enquiries:", error);
    return [];
  }
}

function formatRouteDetail(from, to) {
  if (from && to) return `${from} → ${to}`;
  return from || to || "";
}

const SERVICE_ENQUIRY_SOURCES = [
  { key: "packages", label: "Package Enquiry", model: PackageInfo, detail: (i) => i.to || "Custom Package" },
  { key: "flights", label: "Flight Enquiry", model: FlightInfo, detail: (i) => formatRouteDetail(i.departureCity || i.from, i.arrivalCity || i.to) },
  { key: "trains", label: "Train Enquiry", model: TrainInfo, detail: (i) => formatRouteDetail(i.departureCity || i.from, i.arrivalCity || i.to) },
  { key: "visas", label: "Visa Enquiry", model: VisaInfo, detail: (i) => i.destinationCountry || i.visaCountry || i.country || "" },
  { key: "passports", label: "Passport Enquiry", model: PassportInfo, detail: (i) => i.serviceType || i.applicationType || "" },
  { key: "insurances", label: "Insurance Enquiry", model: InsuranceInfo, detail: (i) => i.destinationCountry || i.destination || "" },
  { key: "euRailPasses", label: "Eurail Pass Enquiry", model: EuropeRailPass, detail: (i) => i.passType || i.country || "" },
  { key: "euRailTickets", label: "Eurail Ticket Enquiry", model: EuropeRailTicket, detail: (i) => formatRouteDetail(i.departureCity || i.from, i.arrivalCity || i.to) },
  { key: "cruises", label: "Cruise Enquiry", model: CruiseInfo, detail: (i) => i.preferredCruiseDestination || i.cruiseDestination || "" },
  { key: "hotels", label: "Hotel Enquiry", model: HotelInfo, detail: (i) => i.destinationCity || i.destination || "" },
  { key: "transports", label: "Transport Enquiry", model: TransportInfo, detail: (i) => formatRouteDetail(i.fromLocation || i.departureCity || i.from, i.toLocation || i.arrivalCity || i.to) },
  { key: "dayTrips", label: "Day Trip Enquiry", model: DayTripInfo, detail: (i) => i.tripTitle || i.pickupLocation || "" },
  { key: "esims", label: "eSIM Enquiry", model: ESimInfo, detail: (i) => i.countryOfTravel || i.destination || "" },
];

export async function getAllServiceEnquiries() {
  try {
    await connectDB();
    const lists = await Promise.all(
      SERVICE_ENQUIRY_SOURCES.map(({ model }) => model.find().sort({ createdAt: -1 }).lean())
    );

    const grouped = {};
    SERVICE_ENQUIRY_SOURCES.forEach(({ key }, idx) => {
      grouped[key] = lists[idx];
    });

    return JSON.parse(JSON.stringify(grouped));
  } catch (error) {
    console.error("Error fetching service enquiries:", error);
    return null;
  }
}

export async function getServiceEnquiryDashboardData(limitPerModel = 10) {
  try {
    await connectDB();
    const results = await Promise.all(
      SERVICE_ENQUIRY_SOURCES.map(async ({ key, label, model, detail }) => {
        const [count, items] = await Promise.all([
          model.countDocuments(),
          model.find().sort({ createdAt: -1 }).limit(limitPerModel).lean(),
        ]);
        return { key, label, detail, count, items };
      })
    );

    let totalCount = 0;
    const recentActivities = [];

    for (const { key, label, detail, count, items } of results) {
      totalCount += count;
      for (const item of items) {
        const name = item.fullName || `${item.firstName || ""} ${item.lastName || ""}`.trim() || "Valued Traveler";
        const realEmail = item.email && !item.email.endsWith("@novixatravels.in") ? item.email : "";
        const contact = realEmail || item.mobileNumber || item.phone || "";
        const contactSuffix = contact ? ` (${contact})` : "";
        const summary = detail(item);
        const detailSuffix = summary ? ` — ${summary}` : "";
        recentActivities.push({
          id: item._id.toString(),
          type: `service_${key}`,
          title: `New ${label}`,
          description: `${name}${contactSuffix} submitted ${label}${detailSuffix}.`,
          date: item.createdAt,
        });
      }
    }

    recentActivities.sort((a, b) => new Date(b.date) - new Date(a.date));
    return {
      totalCount,
      recentActivities: JSON.parse(JSON.stringify(recentActivities)),
    };
  } catch (error) {
    console.error("Error fetching service enquiry dashboard data:", error);
    return { totalCount: 0, recentActivities: [] };
  }
}
