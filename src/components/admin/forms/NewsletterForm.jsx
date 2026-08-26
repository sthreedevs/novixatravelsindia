"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const NewsletterForm = ({
  data = {},
  setModal,
  handleAdd,
  handleUpdate,
  isUpdate,
}) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    subject: data.subject || "",
    link: data.link || "",
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
    formData.append("subject", form.subject);
    formData.append("link", form.link);

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
      console.error("Newsletter form error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Label>Subject</Label>
      <Input
        name="subject"
        value={form.subject}
        onChange={handleChange}
        required
      />

      <Label>Link</Label>
      <Input
        name="link"
        value={form.link}
        onChange={handleChange}
        required
        placeholder="https://..."
      />

      <Label>Image</Label>
      <Input
        type="file"
        accept="image/*"
        onChange={(e) => handleImageChange(e.target.files[0])}
        required={!isUpdate}
      />

      {(form.image instanceof File || typeof form.image === "string") &&
        form.image && (
          <img
            src={
              form.image instanceof File
                ? URL.createObjectURL(form.image)
                : form.image
            }
            alt="newsletter-preview"
            className="h-28 rounded object-cover mt-2"
          />
        )}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading
          ? "Submitting..."
          : isUpdate
          ? "Update Newsletter"
          : "Create Newsletter"}
      </Button>
    </form>
  );
};

export default NewsletterForm;
