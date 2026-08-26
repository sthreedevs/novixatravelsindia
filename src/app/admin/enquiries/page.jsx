"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import DownloadPreview from "@/components/admin/DownloadPreview";
import { Download, LogOut } from "lucide-react";
import { formatDateAndTime } from "@/lib/utils";
import Loader from "@/components/common/Loader";

const Enquiries = () => {
  const [open, setOpen] = useState(null);
  const [data, setData] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");

  const toggleOpen = (item) => {
    setOpen((prev) => (prev?._id === item?._id ? null : item));
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/service/getAllEnquiries");
      const keys = Object.keys(response.data.data);
      const allData = keys.reduce((data, key) => {
        return [
          ...data,
          ...response.data.data[key].map((item) => {
            return { type: key, ...item };
          }),
        ];
      }, []);

      // Sort by date (assuming field is called createdAt)
      allData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setData(allData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownloadCSV = () => {
    if (!filteredData || filteredData.length === 0) return;

    // 1. Collect all unique headers across all data
    const headersSet = new Set();
    filteredData.forEach((row) => {
      Object.keys(row).forEach((key) => headersSet.add(key));
    });

    const headers = Array.from(headersSet);
    const csvRows = [
      headers.join(","), // header row
      ...filteredData.map((row) =>
        headers.map((field) => `"${row[field]}"`).join(",")
      ),
    ];

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const searchData = () => {
    if (!search) {
      setFilteredData(data); // If search is empty, show all
      return;
    }

    const searchableFields = ["_id", "email", "type"]; // add more fields if needed

    const response = data?.filter((item) =>
      searchableFields.some((field) =>
        item[field]?.toString().toLowerCase().includes(search.toLowerCase())
      )
    );

    setFilteredData(response);
  };

  useEffect(() => {
    searchData();
  }, [data, search]);

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) {
    return <Loader />;
  }

  return (
    <div className="py-20 px-4 lg:px-10 min-h-screen">
      <div className="flex justify-between items-center w-full">
        <h1 className="my-4 text-xl md:text-3xl lg:text-4xl">Enquiries</h1>
        <div className="flex gap-2 items-center">
          <Input
            placeholder={"_id, email or type"}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div
            onClick={handleDownloadCSV}
            className="p-1 rounded-md hover:bg-neutral-50/20"
          >
            <Download size={20} />
          </div>
          <div className="p-1 rounded-md hover:bg-neutral-50/20">
            <LogOut size={20} />
          </div>
        </div>
      </div>
      <div className="my-4 space-y-2">
        {filteredData?.map((item) => (
          <div
            onClick={() => toggleOpen(item)}
            key={item?._id}
            className="rounded-sm px-2 py-1 flex flex-wrap space-y-2 divide-x divide-neutral-50 gap-1 items-center text-center bg-neutral-950 hover:bg-neutral-900 cursor-pointer"
          >
            <p className="flex-1 pr-2">{item?.type}</p>
            <p className="flex-1 pr-2">{formatDateAndTime(item?.updatedAt)}</p>
            <p className="flex-1 pr-2">
              {(item?.firstname || item?.firstName) +
                " " +
                (item?.lastname || item?.lastName)}
            </p>
            <p className="flex-1 pr-2">{item?.email}</p>
          </div>
        ))}
        {open && <DownloadPreview data={[open]} setOpen={setOpen} />}
      </div>
    </div>
  );
};

export default Enquiries;
