"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

const HotelForm = ({
  data = {},
  setModal,
  handleAdd,
  handleUpdate,
  isUpdate,
}) => {
  const [form, setForm] = useState({
    _id: data._id || "",
    title: data.title || "",
    country: data.country || "",
    city: data.city || "",
    state: data.state || "", // Added to match schema
    category: data.category || "",
    thumbnail: data.thumbnail || "",
    domesticPrice: data.domesticPrice || "",
    internationalPrice: data.internationalPrice || "",
    tags: Array.isArray(data.tags) ? data.tags : [], // Ensure tags is an array
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "thumbnail" && files?.[0]) {
      setForm((prev) => ({ ...prev, thumbnail: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleTagsChange = (e) => {
    const tagsArray = e.target.value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag); // Remove empty tags
    setForm((prev) => ({ ...prev, tags: tagsArray }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = new FormData();
      payload.append("_id", form._id);
      payload.append("title", form.title);
      payload.append("country", form.country);
      payload.append("city", form.city);
      payload.append("state", form.state); // Added state
      payload.append("category", form.category);
      payload.append("domesticPrice", form.domesticPrice);
      payload.append("internationalPrice", form.internationalPrice);
      if (form.thumbnail instanceof File) {
        payload.append("thumbnail", form.thumbnail);
      } else if (typeof form.thumbnail === "string" && form.thumbnail) {
        payload.append("thumbnail", form.thumbnail); // Preserve existing URL
      }
      payload.append("tags", JSON.stringify(form.tags)); // Send tags as JSON string

      if (isUpdate) {
        await handleUpdate(form._id, payload);
        toast.success("Hotel updated successfully.");
      } else {
        if (!form.thumbnail) {
          throw new Error("Thumbnail is required for new hotels.");
        }
        await handleAdd(payload);
        toast.success("Hotel added successfully.");
      }

      setModal(null);
    } catch (err) {
      toast.error(`Submission failed: ${err.message || "Unknown error"}`);
      console.error("Submission failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Hotel Title</Label>
        <Input
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </div>
      <div>
        <Label htmlFor="country">Country</Label>
        <Input
          id="country"
          name="country"
          value={form.country}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </div>
      <div>
        <Label htmlFor="city">City</Label>
        <Input
          id="city"
          name="city"
          value={form.city}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </div>
      <div>
        <Label htmlFor="state">State (Optional)</Label>
        <Input
          id="state"
          name="state"
          value={form.state}
          onChange={handleChange}
          disabled={loading}
        />
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          name="category"
          value={form.category}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </div>
      <div>
        <Label htmlFor="domesticPrice">Domestic Price</Label>
        <Input
          id="domesticPrice"
          type="text"
          name="domesticPrice"
          value={form.domesticPrice}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </div>
      <div>
        <Label htmlFor="internationalPrice">International Price</Label>
        <Input
          id="internationalPrice"
          type="text"
          name="internationalPrice"
          value={form.internationalPrice}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </div>
      <div>
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input
          id="tags"
          name="tags"
          value={form.tags.join(", ")}
          onChange={handleTagsChange}
          placeholder="e.g., luxury, beachfront"
          disabled={loading}
        />
      </div>
      <div>
        <Label htmlFor="thumbnail">Thumbnail</Label>
        <Input
          id="thumbnail"
          name="thumbnail"
          type="file"
          onChange={handleChange}
          accept="image/*"
          required={!isUpdate && !form.thumbnail} // Required for new hotels
          disabled={loading}
        />
        {form.thumbnail && (
          <img
            src={
              typeof form.thumbnail === "string"
                ? form.thumbnail
                : URL.createObjectURL(form.thumbnail)
            }
            alt="Thumbnail Preview"
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
          "Update Hotel"
        ) : (
          "Add Hotel"
        )}
      </Button>
    </form>
  );
};

export default HotelForm;
