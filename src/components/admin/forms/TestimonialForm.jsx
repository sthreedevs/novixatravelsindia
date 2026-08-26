"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const TestimonialForm = ({
  data = {},
  setModal,
  handleAdd,
  handleUpdate,
  isUpdate,
}) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: data.name || "",
    designation: data.designation || "",
    review: data.review || "",
    image: data.image || "", // string (URL) or File
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (file) => {
    setForm((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("designation", form.designation);
    formData.append("review", form.review);

    if (form.image instanceof File) {
      formData.append("image", form.image);
    }

    try {
      if (isUpdate) {
        await handleUpdate(data._id, formData);
      } else {
        await handleAdd(formData);
      }
      setModal(null);
    } catch (err) {
      console.error("Form error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Label>Name</Label>
      <Input name="name" value={form.name} onChange={handleChange} required />

      <Label>Designation</Label>
      <Input
        name="designation"
        value={form.designation}
        onChange={handleChange}
        required
      />

      <Label>Review</Label>
      <Input
        name="review"
        value={form.review}
        onChange={handleChange}
        required
      />

      <Label>Image</Label>
      <Input
        type="file"
        accept="image/*"
        onChange={(e) => handleImageChange(e.target.files[0])}
        required={!isUpdate} // Only required on add
      />

      {(form.image instanceof File || typeof form.image === "string") &&
        form.image && (
          <img
            src={
              form.image instanceof File
                ? URL.createObjectURL(form.image)
                : form.image
            }
            alt="testimonial-img"
            className="mt-2 h-24 object-cover rounded"
          />
        )}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading
          ? "Submitting..."
          : isUpdate
          ? "Update Testimonial"
          : "Add Testimonial"}
      </Button>
    </form>
  );
};

export default TestimonialForm;
