"use client";
// File: components/admin/Guides.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Plus, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Loader from "@/components/common/Loader";

const Guides = () => {
  const [modal, setModal] = useState(null);
  const [data, setData] = useState(null);

  const handleAdd = async (formData) => {
    try {
      // Trim language manually before sending (important for querying later)
      formData.language = formData.language.trim();
      const response = await axios.post(`/api/guide/add`, formData);
      fetchData();
      toast.success(`Guide added successfully.`);
      return response.data;
    } catch (error) {
      toast.warning(error.response?.data?.error || "Oops! Something went wrong.");
      console.error(error);
    }
  };

  const handleUpdate = async (id, formData) => {
    try {
      formData.language = formData.language.trim();
      const response = await axios.put(`/api/guide/update/${id}`, formData);
      fetchData();
      toast.info(`Guide updated successfully.`);
      return response.data;
    } catch (error) {
      toast.warning(error.response?.data?.error || "Oops! Something went wrong.");
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirm = window.confirm("Are you sure?");
      if (!confirm) return;
      await axios.delete(`/api/guide/delete/${id}`);
      fetchData();
      toast.warn(`Guide deleted successfully.`);
    } catch (error) {
      toast.warning(error.response?.data?.error || "Oops! Something went wrong.");
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/guide`);
      setData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) return <Loader />;

  return (
    <div className="py-20 px-4 lg:px-10 min-h-screen">
      <div className="flex justify-between items-center w-full">
        <h1 className="my-4 text-xl md:text-3xl lg:text-4xl">
          Manage Guides ({data.length})
        </h1>
        <div
          onClick={() =>
            setModal({
              item: {},
              action: "add",
            })
          }
          className="p-1 rounded-md hover:bg-neutral-50/20 cursor-pointer"
        >
          <Plus size={20} />
        </div>
      </div>

      <div className="my-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data.map((item) => (
          <div
            key={item._id}
            className="border p-4 rounded-sm bg-neutral-950 hover:bg-neutral-900"
          >
            <h1 className="text-xl font-semibold">{item.language}</h1>
            <p className="mt-2 text-sm text-neutral-400">
              Domestic Price: ₹{item.domesticPrice}
            </p>
            <p className="text-sm text-neutral-400">
              International Price: ${item.internationalPrice}
            </p>
            <div className="flex gap-2 mt-4 justify-end">
              <Button
                variant="outline"
                onClick={() => setModal({ item, action: "update" })}
              >
                Update
              </Button>
              <Button onClick={() => handleDelete(item._id)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <GuideModal
          data={modal}
          setModal={setModal}
          handleAdd={handleAdd}
          handleUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

const GuideModal = ({ data, setModal, handleAdd, handleUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    language: data.item?.language || "",
    domesticPrice: data.item?.domesticPrice || "",
    internationalPrice: data.item?.internationalPrice || "",
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
      console.error("Guide form error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 mx-4 bg-black/40 z-50 flex flex-col gap-2 items-center justify-center">
      <XCircle size={40} onClick={() => setModal(null)} />
      <div className="max-w-md w-full bg-neutral-900 p-6 rounded-md shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Language</Label>
            <Input
              name="language"
              value={form.language}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label>Domestic Price</Label>
            <Input
              name="domesticPrice"
              type="number"
              value={form.domesticPrice}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label>International Price</Label>
            <Input
              name="internationalPrice"
              type="number"
              value={form.internationalPrice}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading
              ? "Submitting..."
              : data.action === "update"
              ? "Update"
              : "Create"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Guides;