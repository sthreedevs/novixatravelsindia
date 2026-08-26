"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "react-toastify";

const PackageForm = ({
  data = {},
  setModal,
  handleAdd,
  handleUpdate,
  isUpdate,
}) => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    _id: data._id || "",
    title: data.title || "",
    country: data.country || "",
    city: data.city || "",
    description: data.description || "",
    destinations: data.destinations || "",
    days: data.days || "",
    nights: data.nights || "",
    category: Array.isArray(data.category)
      ? data.category.join(", ")
      : data.category || "",
    tag: Array.isArray(data.tags) ? data.tags.join(", ") : data.tag || "",
    domesticPrice: data.domesticPrice || "",
    internationalPrice: data.internationalPrice || "",
    thumbnail: data.thumbnail || "",
    timeline: data.timeline || [],
    carouselData: data.carouselData || [],
    inclusions: Array.isArray(data.inclusions)
      ? data.inclusions.join(", ")
      : data.inclusions || "",
    exclusions: Array.isArray(data.exclusions)
      ? data.exclusions.join(", ")
      : data.exclusions || "",
    showOnHome: data.showOnHome || false,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "thumbnail" && files?.[0]) {
      setForm((prev) => ({ ...prev, thumbnail: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleTimelineFieldChange = (index, key, value) => {
    const updated = [...form.timeline];
    updated[index][key] = value;
    setForm((prev) => ({ ...prev, timeline: updated }));
  };

  const handleCarouselFieldChange = (index, key, value) => {
    const updated = [...form.carouselData];
    updated[index][key] = value;
    setForm((prev) => ({ ...prev, carouselData: updated }));
  };

  const saveTimelineEntry = async (index) => {
    const entry = form.timeline[index];
    const fd = new FormData();
    fd.append("dayTitle", entry.dayTitle || "");
    fd.append("description", entry.description || "");
    if (entry.image1 instanceof File) fd.append("image1", entry.image1);
    if (entry.image2 instanceof File) fd.append("image2", entry.image2);

    try {
      let response;
      if (entry._id) {
        // ❌ do not set Content-Type manually
        response = await axios.put(`/api/package/updateTimeline/${entry._id}`, fd);
        toast.info("Timeline updated successfully.");
      } else {
        response = await axios.post(`/api/package/addTimeline`, fd);
        toast.success("Timeline added successfully.");
      }

      if (response.data?.data) {
        const updated = [...form.timeline];
        updated[index] = response.data.data; // replace with server-saved doc (has _id, urls)
        setForm((prev) => ({ ...prev, timeline: updated }));
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (error) {
      toast.error("Failed to save timeline entry.");
      console.error("Timeline save error:", error);
    }
  };

  const saveCarouselEntry = async (index) => {
    const entry = form.carouselData[index];
    const fd = new FormData();
    fd.append("title", entry.title || "");
    fd.append("description", entry.description || "");
    fd.append("buttonText", entry.buttonText || "");
    if (entry.image instanceof File) fd.append("image", entry.image);

    try {
      let response;
      if (entry._id) {
        // ❌ do not set Content-Type manually
        response = await axios.put(`/api/package/updateCarousel/${entry._id}`, fd);
        toast.info("Carousel updated successfully.");
      } else {
        response = await axios.post(`/api/package/addCarousel`, fd);
        toast.success("Carousel added successfully.");
      }

      if (response.data?.data) {
        const updated = [...form.carouselData];
        updated[index] = response.data.data;
        setForm((prev) => ({ ...prev, carouselData: updated }));
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (error) {
      toast.error("Failed to save carousel entry.");
      console.error("Carousel save error:", error);
    }
  };

  const addDay = () => {
    setForm((prev) => ({
      ...prev,
      timeline: [...prev.timeline, { dayTitle: "", description: "" }],
    }));
  };

  const addSlide = () => {
    setForm((prev) => ({
      ...prev,
      carouselData: [
        ...prev.carouselData,
        { title: "", description: "", buttonText: "", image: "" },
      ],
    }));
  };

  const deleteTimelineEntry = async (index) => {
    const entry = form.timeline[index];
    if (entry._id && form._id) {
      try {
        await axios.delete(`/api/package/deleteTimeline/${form._id}/${entry._id}`);
        toast.success("Timeline entry deleted successfully.");
      } catch (error) {
        toast.error("Failed to delete timeline entry.");
        console.error("Timeline delete error:", error);
      }
    }
    const updated = form.timeline.filter((_, i) => i !== index);
    setForm((prev) => ({ ...prev, timeline: updated }));
  };

  const deleteCarouselEntry = async (index) => {
    const entry = form.carouselData[index];
    if (entry._id && form._id) {
      try {
        await axios.delete(`/api/package/deleteCarousel/${form._id}/${entry._id}`);
        toast.success("Carousel entry deleted successfully.");
      } catch (error) {
        toast.error("Failed to delete carousel entry.");
        console.error("Carousel delete error:", error);
      }
    }
    const updated = form.carouselData.filter((_, i) => i !== index);
    setForm((prev) => ({ ...prev, carouselData: updated }));
  };

  const splitCsv = (str) =>
    (str || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("country", form.country);
    fd.append("city", form.city);
    fd.append("description", form.description);
    fd.append("destinations", form.destinations);
    fd.append("days", form.days);
    fd.append("nights", form.nights);
    fd.append("tags", JSON.stringify(splitCsv(form.tag)));
    fd.append("category", JSON.stringify(splitCsv(form.category)));
    fd.append("domesticPrice", form.domesticPrice);
    fd.append("internationalPrice", form.internationalPrice);
    fd.append("inclusions", JSON.stringify(splitCsv(form.inclusions)));
    fd.append("exclusions", JSON.stringify(splitCsv(form.exclusions)));

    if (form.thumbnail instanceof File) {
      fd.append("thumbnail", form.thumbnail);
    }
    // If it's an existing URL, skip appending; server expects file field

    const timelineIds = form.timeline.map((t) => t._id).filter(Boolean);
    const carouselIds = form.carouselData.map((c) => c._id).filter(Boolean);
    fd.append("timeline", JSON.stringify(timelineIds));
    fd.append("carouselData", JSON.stringify(carouselIds));
    fd.append("showOnHome", form.showOnHome);

    try {
      if (isUpdate) {
        await handleUpdate(form._id, fd);
      } else {
        await handleAdd(fd);
      }
      setModal(null);
    } catch (error) {
      toast.error("Failed to submit package.");
      console.error("Submit error:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderImagePreview = (val) => {
    if (!val) return null;
    const src = typeof val === "string" ? val : URL.createObjectURL(val);
    return <img src={src} className="h-20 rounded object-cover mt-2" alt="Preview" />;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Title</Label>
        <Input name="title" value={form.title} onChange={handleChange} required />
      </div>

      <div>
        <Label>Country</Label>
        <Input name="country" value={form.country} onChange={handleChange} required />
      </div>

      <div>
        <Label>City</Label>
        <Input name="city" value={form.city} onChange={handleChange} required />
      </div>

      <div>
        <Label>Description</Label>
        <Input name="description" value={form.description} onChange={handleChange} required />
      </div>

      <div>
        <Label>Destinations</Label>
        <Input name="destinations" value={form.destinations} onChange={handleChange} required />
      </div>

      <div>
        <Label>Days</Label>
        <Input type="number" name="days" value={form.days} onChange={handleChange} required />
      </div>

      <div>
        <Label>Nights</Label>
        <Input type="number" name="nights" value={form.nights} onChange={handleChange} required />
      </div>

      <div>
        <Label>Domestic Price</Label>
        <Input
          type="text"
          name="domesticPrice"
          value={form.domesticPrice}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label>International Price</Label>
        <Input
          type="text"
          name="internationalPrice"
          value={form.internationalPrice}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label>Category (comma-separated)</Label>
        <Input type="text" name="category" value={form.category} onChange={handleChange} required />
      </div>

      <div>
        <Label>Tags (comma-separated)</Label>
        <Input name="tag" value={form.tag} onChange={handleChange} required />
      </div>

      <div>
        <Label>Inclusions (comma-separated)</Label>
        <Input
          name="inclusions"
          value={form.inclusions}
          onChange={handleChange}
          placeholder="Breakfast, Airport pickup, Sightseeing..."
        />
      </div>

      <div>
        <Label>Exclusions (comma-separated)</Label>
        <Input
          name="exclusions"
          value={form.exclusions}
          onChange={handleChange}
          placeholder="Flights, Personal expenses, Insurance..."
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="showOnHome"
          checked={form.showOnHome}
          onChange={(e) => setForm((prev) => ({ ...prev, showOnHome: e.target.checked }))}
          className="h-4 w-4"
        />
        <Label>Show on Home</Label>
      </div>

      <div>
        <Label>Thumbnail</Label>
        <Input type="file" name="thumbnail" onChange={handleChange} accept="image/*" />
        {typeof form.thumbnail === "string" && form.thumbnail && (
          <img src={form.thumbnail} className="h-20 mt-2 object-cover rounded" alt="Thumbnail" />
        )}
        {form.thumbnail instanceof File && renderImagePreview(form.thumbnail)}
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Timeline</h2>
        {form.timeline.map((day, i) => (
          <div key={i} className="border p-4 rounded space-y-2">
            <Label>Day Title</Label>
            <Input
              value={day.dayTitle || ""}
              onChange={(e) => handleTimelineFieldChange(i, "dayTitle", e.target.value)}
            />
            <Label>Description</Label>
            <Input
              value={day.description || ""}
              onChange={(e) => handleTimelineFieldChange(i, "description", e.target.value)}
            />
            <Label>Image 1</Label>
            <Input
              type="file"
              onChange={(e) => handleTimelineFieldChange(i, "image1", e.target.files?.[0])}
              accept="image/*"
            />
            {/* Preview for string URL or File */}
            {renderImagePreview(day.image1)}

            <Label>Image 2</Label>
            <Input
              type="file"
              onChange={(e) => handleTimelineFieldChange(i, "image2", e.target.files?.[0])}
              accept="image/*"
            />
            {renderImagePreview(day.image2)}

            <div className="flex gap-2">
              <Button type="button" onClick={() => saveTimelineEntry(i)}>
                Save Day
              </Button>
              <Button type="button" variant="destructive" onClick={() => deleteTimelineEntry(i)}>
                Delete Day
              </Button>
            </div>
          </div>
        ))}
        <Button type="button" onClick={addDay} variant="outline">
          Add Day
        </Button>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Carousel</h2>
        {form.carouselData.map((slide, i) => (
          <div key={i} className="border p-4 rounded space-y-2">
            <Label>Title</Label>
            <Input
              value={slide.title || ""}
              onChange={(e) => handleCarouselFieldChange(i, "title", e.target.value)}
            />
            <Label>Description</Label>
            <Input
              value={slide.description || ""}
              onChange={(e) => handleCarouselFieldChange(i, "description", e.target.value)}
            />
            <Label>Button Text</Label>
            <Input
              value={slide.buttonText || ""}
              onChange={(e) => handleCarouselFieldChange(i, "buttonText", e.target.value)}
            />
            <Label>Image</Label>
            <Input
              type="file"
              onChange={(e) => handleCarouselFieldChange(i, "image", e.target.files?.[0])}
              accept="image/*"
            />
            {/* Preview for string URL or File */}
            {renderImagePreview(slide.image)}

            <div className="flex gap-2">
              <Button type="button" onClick={() => saveCarouselEntry(i)}>
                Save Slide
              </Button>
              <Button type="button" variant="destructive" onClick={() => deleteCarouselEntry(i)}>
                Delete Slide
              </Button>
            </div>
          </div>
        ))}
        <Button type="button" onClick={addSlide} variant="outline">
          Add Slide
        </Button>
      </div>

      <div className="flex gap-4">
        <Button type="button" onClick={() => setModal(null)} variant="outline">
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Processing..." : isUpdate ? "Update Package" : "Create Package"}
        </Button>
      </div>
    </form>
  );
};

export default PackageForm;