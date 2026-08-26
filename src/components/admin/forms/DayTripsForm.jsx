"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const DayTripsForm = ({
  data = {},
  setModal,
  handleAdd,
  handleUpdate,
  isUpdate,
}) => {
  const [form, setForm] = useState({
    title: data.title || "",
    description: data.description || "",
    descriptionList: data.descriptionList?.join("\n") || "",
    inclusionList: data.inclusionList?.join("\n") || "",
    exclusionList: data.exclusionList?.join("\n") || "",
    info: data.info?.join("\n") || "",
    domesticPrice: data.domesticPrice || "",
    internationalPrice: data.internationalPrice || "",
    thumbnail: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = new FormData();
    payload.append("title", form.title);
    payload.append("description", form.description);
    payload.append(
      "descriptionList",
      JSON.stringify(
        form.descriptionList
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean)
      )
    );
    payload.append(
      "inclusionList",
      JSON.stringify(
        form.inclusionList
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean)
      )
    );
    payload.append(
      "exclusionList",
      JSON.stringify(
        form.exclusionList
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean)
      )
    );
    payload.append(
      "info",
      JSON.stringify(
        form.info
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean)
      )
    );
    payload.append("domesticPrice", form.domesticPrice);
    payload.append("internationalPrice", form.internationalPrice);
    if (form.thumbnail) {
      payload.append("thumbnail", form.thumbnail);
    }

    try {
      if (isUpdate) {
        await handleUpdate(data._id, payload);
      } else {
        await handleAdd(payload);
      }
      setModal(null);
    } catch (err) {
      console.error("Submission failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
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
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </div>
      <div>
        <Label htmlFor="descriptionList">Bullet Points (one per line)</Label>
        <textarea
          id="descriptionList"
          name="descriptionList"
          className="w-full p-2 bg-neutral-800 rounded text-sm"
          rows={4}
          value={form.descriptionList}
          onChange={handleChange}
          disabled={loading}
        />
      </div>
      <div>
        <Label htmlFor="inclusionList">Inclusions (one per line)</Label>
        <textarea
          id="inclusionList"
          name="inclusionList"
          className="w-full p-2 bg-neutral-800 rounded text-sm"
          rows={4}
          value={form.inclusionList}
          onChange={handleChange}
          disabled={loading}
        />
      </div>
      <div>
        <Label htmlFor="exclusionList">Exclusions (one per line)</Label>
        <textarea
          id="exclusionList"
          name="exclusionList"
          className="w-full p-2 bg-neutral-800 rounded text-sm"
          rows={4}
          value={form.exclusionList}
          onChange={handleChange}
          disabled={loading}
        />
      </div>
      <div>
        <Label htmlFor="info">Additional Info (one per line)</Label>
        <textarea
          id="info"
          name="info"
          className="w-full p-2 bg-neutral-800 rounded text-sm"
          rows={4}
          value={form.info}
          onChange={handleChange}
          disabled={loading}
        />
      </div>

      <div>
        <Label htmlFor="domesticPrice">Domestic Price</Label>
        <Input
          id="domesticPrice"
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
          name="internationalPrice"
          value={form.internationalPrice}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </div>
      <div>
        <Label htmlFor="thumbnail">Thumbnail</Label>
        <Input
          id="thumbnail"
          name="thumbnail"
          type="file"
          accept="image/*"
          onChange={handleChange}
          disabled={loading}
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="animate-spin w-4 h-4" />
            Submitting...
          </span>
        ) : isUpdate ? (
          "Update"
        ) : (
          "Add"
        )}
      </Button>
    </form>
  );
};

export default DayTripsForm;
