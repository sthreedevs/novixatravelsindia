"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const CarouselForm = ({
  data = {},
  setModal,
  handleAdd,
  handleUpdate,
  isUpdate,
}) => {
  const [form, setForm] = useState({
    title: data.title || "",
    description: data.description || "",
    buttonText: data.buttonText || "",
    type: data.type || "home",
    image: data.image || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files?.[0]) {
      setForm((prev) => ({ ...prev, image: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        payload.append(key, value);
      });

      if (isUpdate) {
        await handleUpdate(data._id, payload);
      } else {
        await handleAdd(payload);
      }

      setModal(null);
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setLoading(false);
    }
  };

  const showPreview = typeof form.image === "string" ? form.image : data.image;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          disabled={loading}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          disabled={loading}
        />
      </div>
      <div>
        <Label htmlFor="buttonText">Button Text</Label>
        <Input
          id="buttonText"
          name="buttonText"
          value={form.buttonText}
          onChange={handleChange}
          disabled={loading}
        />
      </div>
      <div>
        <Label htmlFor="type">Type</Label>
        <select
          id="type"
          name="type"
          value={form.type}
          onChange={handleChange}
          disabled={loading}
          className="w-full rounded-md bg-zinc-900 text-white p-2"
          required
        >
          <option value="home">Home</option>
          <option value="hotel">Hotel</option>
          <option value="package">Package</option>
          <option value="flight">Flight</option>
          <option value="visa">Visa</option>
        </select>
      </div>
      <div>
        <Label htmlFor="image">Image</Label>
        <Input
          id="image"
          name="image"
          type="file"
          onChange={handleChange}
          accept="image/*"
          disabled={loading}
        />
        {showPreview && (
          <img
            src={
              typeof form.image === "string"
                ? form.image
                : URL.createObjectURL(form.image)
            }
            alt="Preview"
            className="mt-2 h-24 rounded-md object-cover"
          />
        )}
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="animate-spin w-4 h-4" />
            Submitting...
          </span>
        ) : isUpdate ? (
          "Update Carousel"
        ) : (
          "Add Carousel"
        )}
      </Button>
    </form>
  );
};

export default CarouselForm;
