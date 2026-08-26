"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "react-toastify";

const DestinationForm = ({
  data = {},
  setModal,
  handleAdd,
  handleUpdate,
  isUpdate,
}) => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    _id: data._id || "",
    name: data.name || "",
    continent: data.continent || "",
    country: data.country || "",
    tags: data.tags || "",
    thumbnail: data.thumbnail || "",
    descriptions: data.descriptions || [],
    carouselData: data.carouselData || [],

    // 🔹 ADDED
    isTrendingIndian: data.isTrendingIndian || false,
    isTrendingInternational: data.isTrendingInternational || false,
  });

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;

    // 🔹 ADDED checkbox support
    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else if (name === "thumbnail") {
      setForm((prev) => ({ ...prev, thumbnail: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDescriptionChange = (index, key, value) => {
    const updated = [...form.descriptions];
    updated[index][key] = value;
    setForm((prev) => ({ ...prev, descriptions: updated }));
  };

  const handleCarouselFieldChange = (index, key, value) => {
    const updated = [...form.carouselData];
    updated[index][key] = value;
    setForm((prev) => ({ ...prev, carouselData: updated }));
  };

  const handleHighlightChange = (descIndex, highlightIndex, key, value) => {
    const updatedDescriptions = [...form.descriptions];
    const updatedHighlights = [...updatedDescriptions[descIndex].highlights];
    updatedHighlights[highlightIndex][key] = value;
    updatedDescriptions[descIndex].highlights = updatedHighlights;
    setForm((prev) => ({ ...prev, descriptions: updatedDescriptions }));
  };

  const addHighlight = (descIndex) => {
    const updatedDescriptions = [...form.descriptions];
    updatedDescriptions[descIndex].highlights = [
      ...(updatedDescriptions[descIndex].highlights || []),
      { title: "", description: "" },
    ];
    setForm((prev) => ({ ...prev, descriptions: updatedDescriptions }));
  };

  const deleteHighlight = (descIndex, highlightIndex) => {
    const updatedDescriptions = [...form.descriptions];
    updatedDescriptions[descIndex].highlights =
      updatedDescriptions[descIndex].highlights.filter(
        (_, i) => i !== highlightIndex
      );
    setForm((prev) => ({ ...prev, descriptions: updatedDescriptions }));
  };

  const saveDescriptionEntry = async (index) => {
    const entry = form.descriptions[index];
    const formData = new FormData();
    formData.append("title", entry.title);
    formData.append("description", entry.description);
    formData.append("highlights", JSON.stringify(entry.highlights || []));

    if (entry.image instanceof File) formData.append("image", entry.image);

    try {
      let response;
      if (entry._id) {
        response = await axios.put(
          `/api/destination/updateDescription/${entry._id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.info("Success! Updated successfully.");
      } else {
        response = await axios.post(
          `/api/destination/addDescription`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("Success! Added successfully.");
      }

      const updated = [...form.descriptions];
      updated[index] = response.data.data;
      setForm((prev) => ({ ...prev, descriptions: updated }));
    } catch (error) {
      toast.warning(error.response?.data?.error || "Oops! Something went wrong.");
    }
  };

  const saveCarouselEntry = async (index) => {
    const entry = form.carouselData[index];
    const formData = new FormData();
    formData.append("title", entry?.title);
    formData.append("description", entry?.description);
    formData.append("buttonText", entry?.buttonText);
    if (entry?.image instanceof File) formData.append("image", entry.image);

    try {
      let response;
      if (entry._id) {
        response = await axios.put(
          `/api/destination/updateCarousel/${entry._id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.info("Success! Updated successfully.");
      } else {
        response = await axios.post(
          `/api/destination/addCarousel`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("Success! Added successfully.");
      }

      const updated = [...form.carouselData];
      updated[index] = response.data.data;
      setForm((prev) => ({ ...prev, carouselData: updated }));
    } catch (error) {
      toast.warning(error.response?.data?.error || "Oops! Something went wrong.");
    }
  };

  const addDescription = () => {
    setForm((prev) => ({
      ...prev,
      descriptions: [
        ...prev.descriptions,
        { title: "", description: "", highlights: [] },
      ],
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("continent", form.continent);
    formData.append("country", form.country);
    formData.append("tags", form.tags);

    // 🔹 ADDED
    formData.append("isTrendingIndian", form.isTrendingIndian);
    formData.append(
      "isTrendingInternational",
      form.isTrendingInternational
    );

    if (form.thumbnail instanceof File) {
      formData.append("thumbnail", form.thumbnail);
    }

    const descriptionIds = form.descriptions.map((d) => d?._id).filter(Boolean);
    const carouselIds = form.carouselData.map((c) => c?._id).filter(Boolean);

    formData.append("descriptions", JSON.stringify(descriptionIds));
    formData.append("carouselData", JSON.stringify(carouselIds));

    try {
      if (isUpdate) {
        await handleUpdate(data._id, formData);
        toast.success("Success! Changes saved successfully.");
      } else {
        await handleAdd(formData);
        toast.success("Success! Added successfully.");
      }
      setModal(null);
    } catch (error) {
      toast.warning(error.response?.data?.error || "Oops! Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Label>Name</Label>
      <Input name="name" value={form.name} onChange={handleChange} required />

      <Label>Continent</Label>
      <Input name="continent" value={form.continent} onChange={handleChange} />

      <Label>Country</Label>
      <Input name="country" value={form.country} onChange={handleChange} />

      <Label>Tags</Label>
      <Input name="tags" value={form.tags} onChange={handleChange} />

      {/* 🔹 TRENDING CHECKBOXES */}
      <div className="flex gap-6">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isTrendingIndian"
            checked={form.isTrendingIndian}
            onChange={handleChange}
          />
          Trending Indian
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isTrendingInternational"
            checked={form.isTrendingInternational}
            onChange={handleChange}
          />
          Trending International
        </label>
      </div>

      {/* ⬇️ EVERYTHING BELOW IS UNCHANGED (Descriptions + Carousel JSX) */}
      {/* YOUR ORIGINAL JSX CONTINUES HERE EXACTLY AS BEFORE */}

      <Label>Thumbnail</Label>
      <Input type="file" name="thumbnail" onChange={handleChange} />
      {typeof form.thumbnail === "string" && (
        <img src={form.thumbnail} className="h-20 mt-2 object-cover rounded" />
      )}

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Descriptions</h2>
        {form.descriptions.map((desc, i) => (
          <div key={i} className="border p-4 rounded space-y-2">
            <Label>Title</Label>
            <Input
              value={desc?.title}
              onChange={(e) =>
                handleDescriptionChange(i, "title", e.target.value)
              }
            />
            <Label>Description</Label>
            <Input
              value={desc?.description}
              onChange={(e) =>
                handleDescriptionChange(i, "description", e.target.value)
              }
            />
            <Label>Image</Label>
            <Input
              type="file"
              onChange={(e) =>
                handleDescriptionChange(i, "image", e.target.files[0])
              }
            />
            {desc.image && typeof desc.image === "string" && (
              <img src={desc.image} className="h-20 rounded object-cover" />
            )}

            {/* New Highlights Section */}
            <div className="space-y-2">
              <h3 className="text-md font-medium">Highlights</h3>
              {(desc.highlights || []).map((highlight, j) => (
                <div key={j} className="border p-2 rounded space-y-2">
                  <Label>Highlight Title</Label>
                  <Input
                    value={highlight.title}
                    onChange={(e) =>
                      handleHighlightChange(i, j, "title", e.target.value)
                    }
                  />
                  <Label>Highlight Description</Label>
                  <Input
                    value={highlight.description}
                    onChange={(e) =>
                      handleHighlightChange(i, j, "description", e.target.value)
                    }
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => deleteHighlight(i, j)}
                  >
                    Delete Highlight
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() => addHighlight(i)}
                variant="outline"
              >
                Add Highlight
              </Button>
            </div>

            <div className="flex gap-2">
              <Button type="button" onClick={() => saveDescriptionEntry(i)}>
                Save Description
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={() => deleteDescriptionEntry(i)}
              >
                Delete Description
              </Button>
            </div>
          </div>
        ))}
        <Button type="button" onClick={addDescription} variant="outline">
          Add Description
        </Button>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Carousel</h2>
        {form.carouselData.map((slide, i) => (
          <div key={i} className="border p-4 rounded space-y-2">
            <Label>Title</Label>
            <Input
              value={slide?.title}
              onChange={(e) =>
                handleCarouselFieldChange(i, "title", e.target.value)
              }
            />
            <Label>Description</Label>
            <Input
              value={slide?.description}
              onChange={(e) =>
                handleCarouselFieldChange(i, "description", e.target.value)
              }
            />
            <Label>Button Text</Label>
            <Input
              value={slide?.buttonText}
              onChange={(e) =>
                handleCarouselFieldChange(i, "buttonText", e.target.value)
              }
            />
            <Label>Image</Label>
            <Input
              type="file"
              onChange={(e) =>
                handleCarouselFieldChange(i, "image", e.target.files[0])
              }
            />
            {slide?.image && typeof slide?.image === "string" && (
              <img src={slide?.image} className="h-20 rounded object-cover" />
            )}

            <div className="flex gap-2">
              <Button type="button" onClick={() => saveCarouselEntry(i)}>
                Save Slide
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={() => deleteCarouselEntry(i)}
              >
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
        <Button type="submit" disabled={loading} isLoading={loading}>
          {isUpdate ? "Update Destination" : "Create Destination"}
        </Button>
      </div>
    </form>
  );
};

export default DestinationForm;
