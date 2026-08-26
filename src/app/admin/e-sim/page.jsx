"use client";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { debounce } from "lodash";
import { Plus, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Loader from "@/components/common/Loader";

const EsimPlansAdmin = () => {
  const [modal, setModal] = useState(null);
  const [data, setData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total pages
  const itemsPerPage = 9; // Items per page

  const fetchData = useCallback(
    debounce(async (page, search) => {
      try {
        const params = new URLSearchParams();
        params.append("page", page);
        params.append("limit", itemsPerPage);
        if (search) params.append("search", search);

        const res = await axios.get(`/api/esim?${params.toString()}`);
        setData(res.data.data);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error(err);
      }
    }, 300),
    [itemsPerPage]
  );

  const handleAdd = async (formData) => {
    try {
      await axios.post("/api/esim/add", formData);
      toast.success("Plan added!");
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.error || "Add failed.");
    }
  };

  const handleUpdate = async (id, formData) => {
    try {
      await axios.put(`/api/esim/update/${id}`, formData);
      toast.success("Plan updated!");
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.error || "Update failed.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this plan?")) return;
    try {
      await axios.delete(`/api/esim/delete/${id}`);
      toast.warn("Plan deleted.");
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.error || "Delete failed.");
    }
  };

  const filteredData = data?.filter((item) => {
    if (!searchQuery.trim()) return true; // Show all if input is empty

    const query = searchQuery.toLowerCase();
    return (
      item._id?.toLowerCase().includes(query) ||
      item.planName?.toLowerCase().includes(query) ||
      item.country?.toLowerCase().includes(query) ||
      item.operatorName?.toLowerCase().includes(query)
    );
  });

  useEffect(() => {
    fetchData(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  if (!data) return <Loader />;

  return (
    <div className="py-24 px-4 lg:px-10 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl">Manage E-SIM Plans ({data.length})</h1>
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search by ID, Plan Name, Country, or Operator"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
          <Button onClick={() => setModal({ item: {}, action: "add" })}>
            <Plus className="mr-2" size={16} /> Add New Plan
          </Button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-6">
        {filteredData?.map((item) => (
          <div key={item._id} className="border p-4 rounded bg-neutral-900">
            <h2 className="text-xl font-bold">{item.planName}</h2>
            <p className="text-sm text-muted">
              Data: {item.dataMB} MB / {item.dataGB} GB
            </p>
            <p className="text-sm text-muted">Operator: {item.operatorName}</p>
            <p className="text-sm text-muted line-clamp-3">
              Country: {item.country}
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setModal({ item, action: "update" })}
              >
                Update
              </Button>
              <Button
                onClick={() => handleDelete(item._id)}
                variant="destructive"
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center my-4">
        <Button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </Button>
        <span className="mx-4">{`Page ${currentPage} of ${totalPages}`}</span>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </Button>
      </div>

      {modal && (
        <EsimPlanModal
          data={modal}
          setModal={setModal}
          handleAdd={handleAdd}
          handleUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

const EsimPlanModal = ({ data, setModal, handleAdd, handleUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    planName: data.item?.planName || "",
    dataMB: data.item?.dataMB || "",
    dataGB: data.item?.dataGB || "",
    validityDays: data.item?.validityDays || "",
    dataSpeed: data.item?.dataSpeed || "",
    operatorName: data.item?.operatorName || "",
    fupLimit: data.item?.fupLimit || "",
    country: data.item?.country || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (data.action === "update") {
        await handleUpdate(data.item._id, form);
      } else {
        await handleAdd(form);
      }
      setModal(null);
    } catch (err) {
      console.error("Submission failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-neutral-900 p-6 rounded-md w-full max-w-md h-[70vh] overflow-y-scroll no-scrollbar relative">
        <XCircle
          className="absolute top-4 right-4 cursor-pointer"
          size={24}
          onClick={() => setModal(null)}
        />
        <h2 className="text-xl mb-4">
          {data.action === "update" ? "Update" : "Add"} E-SIM Plan
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { name: "planName", label: "Plan Name" },
            { name: "dataMB", label: "Data (MB)" },
            { name: "dataGB", label: "Data (GB)" },
            { name: "validityDays", label: "Validity (Days)" },
            { name: "dataSpeed", label: "Data Speed" },
            { name: "operatorName", label: "Operator Name" },
            { name: "fupLimit", label: "FUP Limit" },
            { name: "country", label: "Country" },
          ].map(({ name, label }) => (
            <div key={name}>
              <Label htmlFor={name}>{label}</Label>
              <Input
                id={name}
                name={name}
                value={form[name]}
                onChange={handleChange}
                required={[
                  "planName",
                  "dataMB",
                  "validityDays",
                  "dataSpeed",
                  "country",
                ].includes(name)}
                disabled={loading}
              />
            </div>
          ))}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading
              ? "Submitting..."
              : data.action === "update"
              ? "Update Plan"
              : "Add Plan"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EsimPlansAdmin;
