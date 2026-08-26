"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Plus, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Loader from "@/components/common/Loader";

const Notifications = () => {
  const [modal, setModal] = useState(null);
  const [data, setData] = useState(null);

  const handleAdd = async (formData) => {
    try {
      const response = await axios.post(`/api/navbarTop/add`, formData);
      fetchData();
      toast.success(`Saved! added successfully.`);
      return response.data;
    } catch (error) {
      toast.warning(error.response.data.error || "Oops! Something went wrong.");
      console.error(error);
    }
  };

  const handleUpdate = async (id, formData) => {
    try {
      const response = await axios.put(`/api/navbarTop/update/${id}`, formData);
      fetchData();
      toast.info(`Updated! ${id} updated successfully.`);
      return response.data;
    } catch (error) {
      toast.warning(error.response.data.error || "Oops! Something went wrong.");
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirm = window.confirm("Are you sure?");
      if (!confirm) return;
      await axios.delete(`/api/navbarTop/delete/${id}`);
      fetchData();
      toast.warn(`Deleted! ${id} deleted successfully.`);
    } catch (error) {
      toast.warning(error.response.data.error || "Oops! Something went wrong.");
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/navbarTop`);
      setData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) {
    return <Loader />;
  }

  return (
    <div className="py-20 px-4 lg:px-10 min-h-screen">
      <div className="flex justify-between items-center w-full">
        <h1 className="my-4 text-xl md:text-3xl lg:text-4xl">
          Manage {`Notifications (${data.length})`}
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
      <div className="my-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {data.map((item) => (
          <div
            key={item._id}
            className="border p-2 md:p-4 max-w-sm h-50 flex flex-col justify-between rounded-sm bg-neutral-950 hover:bg-neutral-900"
          >
            <h1 className="text-base md:text-xl lg:text-2xl">
              {item.title || "Untitled"}
            </h1>
            <div className="flex gap-2 items-center justify-end">
              <Button
                onClick={() =>
                  setModal({
                    item,
                    action: "update",
                  })
                }
                variant="outline"
              >
                Update
              </Button>
              <Button onClick={() => handleDelete(item._id)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>
      {modal && (
        <Modal
          data={modal}
          setModal={setModal}
          handleAdd={handleAdd}
          handleUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

const Modal = ({ data, setModal, handleAdd, handleUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: data.item?.title || "",
    description: data.item?.description || "",
    url: data.item?.url || "",
    isActive: data.item?.isActive ?? true, // default true
    validTill: data.item?.validTill
      ? new Date(data.item.validTill).toISOString().slice(0, 10)
      : "", // yyyy-mm-dd
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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
      console.error("NavbarTop form error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 mx-4 bg-black/40 z-50 flex flex-col gap-2 items-center justify-center">
      <XCircle size={40} onClick={() => setModal(null)} />
      <div className="max-w-md h-[70vh] overflow-y-scroll no-scrollbar w-full bg-neutral-900 p-6 rounded-md shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label>Description</Label>
            <Input
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label>URL</Label>
            <Input
              name="url"
              value={form.url}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
            />
            <Label>Is Active?</Label>
          </div>

          <div>
            <Label>Valid Till</Label>
            <Input
              type="date"
              name="validTill"
              value={form.validTill}
              onChange={handleChange}
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

export default Notifications;
