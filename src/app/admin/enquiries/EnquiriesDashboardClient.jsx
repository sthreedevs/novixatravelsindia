"use client";
import React, { useState, useMemo } from "react";
import { format } from "date-fns";
import { Search, ArrowUpDown, Trash2, Mail, Phone, Calendar, User, FileText, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { deleteEnquiry } from "@/lib/actions/admin/enquiries.actions";
import { toast } from "react-toastify";

export default function EnquiriesDashboardClient({ contacts, bookings, services }) {
  const [activeTab, setActiveTab] = useState("contacts"); // "contacts", "bookings", "services"
  const [activeService, setActiveService] = useState("flights");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "createdAt", direction: "desc" });
  const [viewEnquiry, setViewEnquiry] = useState(null);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleServiceChange = (e) => {
    setActiveService(e.target.value);
    setSearchQuery("");
  };

  const handleDelete = async (id, type) => {
    if (!window.confirm("Are you sure you want to delete this enquiry?")) return;
    
    try {
      const res = await deleteEnquiry(id, type);
      if (res.success) {
        toast.success("Enquiry deleted successfully");
        // We'll rely on server action revalidatePath to refresh the data
      } else {
        toast.error(res.error || "Failed to delete enquiry");
      }
    } catch (err) {
      toast.error("An error occurred");
    }
  };

  // Helper to filter and sort arrays
  const processData = (dataArray, searchFields) => {
    let filtered = [...(dataArray || [])];
    
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        searchFields.some(field => item[field]?.toString().toLowerCase().includes(lowerQuery))
      );
    }

    filtered.sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];
      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  };

  const processedContacts = useMemo(() => processData(contacts, ["firstName", "lastName", "email", "enterYourMessage"]), [contacts, searchQuery, sortConfig]);
  const processedBookings = useMemo(() => processData(bookings, ["name", "email", "phone"]), [bookings, searchQuery, sortConfig]);
  
  const currentServiceData = services ? services[activeService] : [];
  const processedServices = useMemo(() => processData(currentServiceData, ["firstName", "lastName", "email", "mobileNumber", "departureCity", "arrivalCity"]), [currentServiceData, searchQuery, sortConfig]);

  // UI helpers
  const serviceOptions = [
    { value: "flights", label: "Flights", type: "flight" },
    { value: "trains", label: "Trains", type: "train" },
    { value: "visas", label: "Visas", type: "visa" },
    { value: "passports", label: "Passports", type: "passport" },
    { value: "insurances", label: "Insurances", type: "insurance" },
    { value: "euRailPasses", label: "Eurail Passes", type: "eurail_pass" },
    { value: "euRailTickets", label: "Eurail Tickets", type: "eurail_ticket" },
    { value: "cruises", label: "Cruises", type: "cruise" },
    { value: "hotels", label: "Hotels", type: "hotel" },
    { value: "transports", label: "Transports", type: "transport" },
    { value: "dayTrips", label: "Day Trips", type: "daytrip" },
    { value: "esims", label: "eSIMs", type: "esim" },
  ];

  const renderServiceDetails = (item, type) => {
    return (
      <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
        <div className="font-medium text-black dark:text-white capitalize mb-2">{item.firstName} {item.lastName}</div>
        <div className="flex items-center gap-2"><Mail className="w-3 h-3 text-gray-400" /> <a href={`mailto:${item.email}`} className="text-blue-600 hover:underline">{item.email}</a></div>
        {item.mobileNumber && <div className="flex items-center gap-2"><Phone className="w-3 h-3 text-gray-400" /> <a href={`tel:${item.mobileNumber}`} className="text-blue-600 hover:underline">{item.mobileNumber}</a></div>}
        
        <div className="mt-2 pt-2 border-t border-gray-100 dark:border-zinc-800">
          {item.departureCity && <div><span className="text-gray-500">From:</span> {item.departureCity}</div>}
          {item.arrivalCity && <div><span className="text-gray-500">To:</span> {item.arrivalCity}</div>}
          {item.travelDate && <div><span className="text-gray-500">Date:</span> {format(new Date(item.travelDate), "MMM d, yyyy")}</div>}
          {item.numberOfPassengers && <div><span className="text-gray-500">Pax:</span> {item.numberOfPassengers}</div>}
          
          {/* Specific fields based on type */}
          {type === "hotel" && (
            <>
              {item.destinationCity && <div><span className="text-gray-500">Destination:</span> {item.destinationCity}</div>}
              {item.checkInDate && <div><span className="text-gray-500">Check-in:</span> {format(new Date(item.checkInDate), "MMM d, yyyy")}</div>}
              {item.checkOutDate && <div><span className="text-gray-500">Check-out:</span> {format(new Date(item.checkOutDate), "MMM d, yyyy")}</div>}
              {item.numberOfRooms && <div><span className="text-gray-500">Rooms:</span> {item.numberOfRooms}</div>}
            </>
          )}
          
          {type === "visa" && item.visaCountry && <div><span className="text-gray-500">Visa Country:</span> {item.visaCountry}</div>}
          {type === "insurance" && item.destinationCountry && <div><span className="text-gray-500">Destination:</span> {item.destinationCountry}</div>}
          {type === "cruise" && item.cruiseDestination && <div><span className="text-gray-500">Destination:</span> {item.cruiseDestination}</div>}
          
          {item.message && (
            <div className="mt-2 text-xs italic bg-gray-50 dark:bg-zinc-800 p-2 rounded">
              &quot;{item.message}&quot;
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Tabs */}
      <div className="flex space-x-1 bg-white dark:bg-zinc-900 p-1 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-800 w-full sm:w-auto overflow-x-auto">
        <button
          onClick={() => { setActiveTab("contacts"); setSearchQuery(""); }}
          className={`flex-1 sm:flex-none px-6 py-2.5 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
            activeTab === "contacts" ? "bg-[#BFA181] text-black" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-zinc-800"
          }`}
        >
          General Contacts
        </button>
        <button
          onClick={() => { setActiveTab("bookings"); setSearchQuery(""); }}
          className={`flex-1 sm:flex-none px-6 py-2.5 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
            activeTab === "bookings" ? "bg-[#BFA181] text-black" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-zinc-800"
          }`}
        >
          Package Bookings
        </button>
        <button
          onClick={() => { setActiveTab("services"); setSearchQuery(""); }}
          className={`flex-1 sm:flex-none px-6 py-2.5 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
            activeTab === "services" ? "bg-[#BFA181] text-black" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-zinc-800"
          }`}
        >
          Service Enquiries
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-4 justify-between bg-white dark:bg-zinc-900 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-800">
        
        <div className="flex w-full sm:w-1/2 gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input 
              type="text"
              placeholder="Search by name, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full"
            />
          </div>

          {activeTab === "services" && (
            <div className="flex-1">
              <select 
                value={activeService}
                onChange={handleServiceChange}
                className="w-full text-sm border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#BFA181]"
              >
                {serviceOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label} ({services[opt.value]?.length || 0})</option>
                ))}
              </select>
            </div>
          )}
        </div>
        
        {/* Sort */}
        <div className="flex items-center space-x-2">
          <label className="text-sm text-gray-500 whitespace-nowrap">Sort:</label>
          <select 
            value={`${sortConfig.key}-${sortConfig.direction}`} 
            onChange={(e) => {
              const [key, direction] = e.target.value.split("-");
              setSortConfig({ key, direction });
            }}
            className="text-sm border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#BFA181]"
          >
            <option value="createdAt-desc">Newest First</option>
            <option value="createdAt-asc">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Tables */}
      <div className="bg-white dark:bg-zinc-900 shadow rounded-lg border border-gray-200 dark:border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          
          {/* Contacts Table */}
          {activeTab === "contacts" && (
            <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-800">
              <thead className="bg-gray-50 dark:bg-zinc-800/50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-zinc-900 divide-y divide-gray-200 dark:divide-zinc-800">
                {processedContacts.map((contact) => (
                  <tr key={contact._id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{format(new Date(contact.createdAt), "MMM d, yyyy h:mm a")}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium capitalize">{contact.firstName} {contact.lastName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <a href={`mailto:${contact.email}`} className="text-blue-600 block">{contact.email}</a>
                      {contact.mobileNumber && <a href={`tel:${contact.mobileNumber}`} className="text-blue-600 block">{contact.mobileNumber}</a>}
                    </td>
                    <td className="px-6 py-4 text-sm max-w-md">
                      <p className="truncate" title={contact.enterYourMessage}>{contact.enterYourMessage}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button onClick={() => setViewEnquiry(contact)} className="text-blue-600 hover:text-blue-900 inline-flex items-center mr-3">
                        <Info className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(contact._id, "contact")} className="text-red-600 hover:text-red-900 inline-flex items-center">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {processedContacts.length === 0 && (
                  <tr><td colSpan="5" className="px-6 py-8 text-center text-sm text-gray-500">No contact enquiries found.</td></tr>
                )}
              </tbody>
            </table>
          )}

          {/* Bookings Table */}
          {activeTab === "bookings" && (
            <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-800">
              <thead className="bg-gray-50 dark:bg-zinc-800/50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-zinc-900 divide-y divide-gray-200 dark:divide-zinc-800">
                {processedBookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{format(new Date(booking.createdAt), "MMM d, yyyy h:mm a")}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium capitalize">{booking.name}</div>
                      <div className="text-sm"><a href={`mailto:${booking.email}`} className="text-blue-600 hover:underline">{booking.email}</a></div>
                      <div className="text-sm"><a href={`tel:${booking.phone}`} className="text-blue-600 hover:underline">{booking.phone}</a></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-[#BFA181]">{booking.packageId ? booking.packageId.title : "Custom"}</div>
                    </td>
                    <td className="px-6 py-4 text-sm max-w-md">
                      <div>{booking.days}D / {booking.nights}N</div>
                      <p className="truncate text-gray-500 text-xs" title={booking.specialRequest}>{booking.specialRequest}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button onClick={() => setViewEnquiry({ ...booking, type: "Package Booking" })} className="text-blue-600 hover:text-blue-900 inline-flex items-center mr-3">
                        <Info className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(booking._id, "booking")} className="text-red-600 hover:text-red-900 inline-flex items-center">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {processedBookings.length === 0 && (
                  <tr><td colSpan="5" className="px-6 py-8 text-center text-sm text-gray-500">No package booking enquiries found.</td></tr>
                )}
              </tbody>
            </table>
          )}

          {/* Services Table */}
          {activeTab === "services" && (
            <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-800">
              <thead className="bg-gray-50 dark:bg-zinc-800/50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enquiry Details</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-zinc-900 divide-y divide-gray-200 dark:divide-zinc-800">
                {processedServices.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 align-top">
                      {format(new Date(item.createdAt), "MMM d, yyyy h:mm a")}
                    </td>
                    <td className="px-6 py-4">
                      {renderServiceDetails(item, serviceOptions.find(o => o.value === activeService).type)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm align-top">
                      <button 
                        onClick={() => setViewEnquiry({ ...item, type: activeService })} 
                        className="text-blue-600 hover:text-blue-900 inline-flex items-center mr-3"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(item._id, serviceOptions.find(o => o.value === activeService).type)} 
                        className="text-red-600 hover:text-red-900 inline-flex items-center"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {processedServices.length === 0 && (
                  <tr><td colSpan="3" className="px-6 py-8 text-center text-sm text-gray-500">No {activeService} enquiries found.</td></tr>
                )}
              </tbody>
            </table>
          )}

        </div>
      </div>

      {/* View Enquiry Modal */}
      {viewEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col my-8">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-800">
              <h3 className="text-lg font-semibold capitalize text-black dark:text-white">
                {viewEnquiry.type || "Enquiry"} Details
              </h3>
              <button 
                onClick={() => setViewEnquiry(null)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>
            <div className="p-4 sm:p-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(viewEnquiry).map(([key, value]) => {
                  if (["_id", "__v", "updatedAt", "type", "packageId"].includes(key)) return null;
                  
                  let displayValue = value;
                  if (key === "createdAt") {
                    displayValue = format(new Date(value), "MMM d, yyyy h:mm a");
                  } else if (typeof value === 'boolean') {
                    displayValue = value ? "Yes" : "No";
                  } else if (typeof value === 'object' && value !== null) {
                    displayValue = JSON.stringify(value);
                  }

                  return (
                    <div key={key} className={`flex flex-col ${key === "message" || key === "enterYourMessage" || key === "specialRequest" ? "sm:col-span-2" : ""}`}>
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="text-sm text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-zinc-800/50 p-2 rounded break-words">
                        {displayValue?.toString() || "-"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-zinc-800 flex justify-end">
              <button 
                onClick={() => setViewEnquiry(null)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-800 dark:text-gray-200 rounded-md text-sm font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
