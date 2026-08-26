"use client";
import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

const BlogForm = ({ data = {}, setModal, isUpdate }) => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: data?.title || "",
    author: data?.author || "",
    tags: data?.tags?.join(", ") || "",
    thumbnail: data?.thumbnail || "",
    readTime: data?.readTime || "",
    content:
      data?.content?.map((item) => ({
        _id: item?._id || null,
        title: item?.title || "",
        description: item?.description || "",
        image: item?.image || "",
      })) || [],
    comments: data?.comments || [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (index, field, value) => {
    const updated = [...form.content];
    updated[index][field] = value;
    setForm((prev) => ({ ...prev, content: updated }));
  };

  const handleThumbnailChange = (file) => {
    setForm((prev) => ({ ...prev, thumbnail: file }));
  };

  const handleContentImageChange = (index, file) => {
    const updated = [...form.content];
    updated[index].image = file;
    setForm((prev) => ({ ...prev, content: updated }));
  };

  const addContentSection = () => {
    setForm((prev) => ({
      ...prev,
      content: [...prev.content, { title: "", description: "", image: "" }],
    }));
  };

  const removeContentSection = (index) => {
    const updated = form.content.filter((_, i) => i !== index);
    setForm((prev) => ({ ...prev, content: updated }));
  };

  const handleDeleteCommentClick = async (commentId) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;

    try {
      await axios.delete(`/api/blog/comment/${data._id}/${commentId}`);
      setForm((prev) => ({
        ...prev,
        comments: prev.comments.filter((c) => c._id !== commentId),
      }));
      toast.success("Comment deleted successfully!");
    } catch {
      toast.error("Failed to delete comment.");
    }
  };

  const handleAdd = async () => {
    try {
      const contentIds = [];

      for (const section of form.content) {
        const sectionData = new FormData();
        sectionData.append("title", section.title);
        sectionData.append("description", section.description);
        if (section.image && section.image instanceof File) {
          sectionData.append("image", section.image);
        }

        const contentRes = await axios.post(
          "/api/blog/addBlogContent",
          sectionData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        contentIds.push(contentRes.data?.data?._id);
      }

      const blogData = new FormData();
      blogData.append("title", form.title);
      blogData.append("author", form.author);
      blogData.append("readTime", form.readTime);
      blogData.append(
        "tags",
        JSON.stringify(form.tags?.split(",").map((t) => t.trim()))
      );
      blogData.append("content", JSON.stringify(contentIds));

      if (form.thumbnail instanceof File) {
        blogData.append("thumbnail", form.thumbnail);
      }

      await axios.post("/api/blog/add", blogData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Blog created successfully!");
      setModal(null);
    } catch {
      toast.error("Blog creation failed.");
    }
  };

  const handleUpdate = async (id) => {
    try {
      const contentIds = [];

      for (const section of form.content) {
        if (section._id) {
          const updateData = new FormData();
          updateData.append("title", section.title);
          updateData.append("description", section.description);
          if (section.image instanceof File)
            updateData.append("image", section.image);

          const res = await axios.post(
            `/api/blog/updateBlogContent/${section._id}`,
            updateData,
            { headers: { "Content-Type": "multipart/form-data" } }
          );

          contentIds.push(res.data?.data?._id);
        } else {
          const newData = new FormData();
          newData.append("title", section.title);
          newData.append("description", section.description);
          if (section.image instanceof File)
            newData.append("image", section.image);

          const res = await axios.post("/api/blog/addBlogContent", newData, {
            headers: { "Content-Type": "multipart/form-data" },
          });

          contentIds.push(res.data?.data?._id);
        }
      }

      const blogData = new FormData();
      blogData.append("title", form.title);
      blogData.append("author", form.author);
      blogData.append("readTime", form.readTime);
      blogData.append(
        "tags",
        JSON.stringify(form.tags?.split(",").map((t) => t.trim()))
      );
      blogData.append("content", JSON.stringify(contentIds));

      if (form.thumbnail instanceof File) {
        blogData.append("thumbnail", form.thumbnail);
      }

      await axios.put(`/api/blog/update/${id}`, blogData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Blog updated successfully!");
      setModal(null);
    } catch {
      toast.error("Failed to update blog.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isUpdate) {
        await handleUpdate(data?._id);
      } else {
        await handleAdd();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Basic Info */}
      <div>
        <Label>Title</Label>
        <Input name="title" value={form.title} onChange={handleChange} required />
      </div>

      <div>
        <Label>Author</Label>
        <Input name="author" value={form.author} onChange={handleChange} required />
      </div>

      <div>
        <Label>Read Time (e.g. “5 min read”)</Label>
        <Input name="readTime" value={form.readTime} onChange={handleChange} required />
      </div>

      <div>
        <Label>Tags (comma separated)</Label>
        <Input name="tags" value={form.tags} onChange={handleChange} />
      </div>

      {/* Thumbnail */}
      <div>
        <Label>Thumbnail</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => handleThumbnailChange(e.target.files?.[0])}
          required={!isUpdate}
        />
        {form.thumbnail && (
          <img
            src={form.thumbnail instanceof File ? URL.createObjectURL(form.thumbnail) : form.thumbnail}
            alt="thumbnail"
            className="h-28 rounded object-cover mt-2"
          />
        )}
      </div>

      {/* Content Sections */}
      <div>
        <Label>Blog Content Sections</Label>
        <div className="space-y-6">
          {form.content?.map((section, index) => (
            <div key={index} className="p-4 border rounded-lg bg-zinc-900/30 space-y-3">
              <Label>Section Title</Label>
              <Input
                value={section?.title || ""}
                onChange={(e) => handleContentChange(index, "title", e.target.value)}
                required
              />
              <Label>Description</Label>
              <textarea
                value={section?.description || ""}
                onChange={(e) => handleContentChange(index, "description", e.target.value)}
                placeholder="Write section description..."
                className="w-full p-2 border border-gray-700 rounded-md bg-transparent text-gray-100 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
              <Label>Section Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleContentImageChange(index, e.target.files?.[0])}
              />
              {section?.image && (
                <img
                  src={section.image instanceof File ? URL.createObjectURL(section.image) : section.image}
                  alt={`content-${index}`}
                  className="h-24 rounded object-cover mt-2"
                />
              )}
              {form.content?.length > 1 && (
                <Button type="button" variant="destructive" className="w-full" onClick={() => removeContentSection(index)}>
                  Remove Section
                </Button>
              )}
            </div>
          ))}
          <Button type="button" onClick={addContentSection}>Add New Section</Button>
        </div>
      </div>

      {/* Comments */}
      {isUpdate && form.comments?.length > 0 && (
        <div className="mt-6 border-t pt-4">
          <Label>Comments ({form.comments?.length})</Label>
          <div className="space-y-3 mt-2">
            {form.comments?.map((comment) => (
              <div key={comment?._id} className="p-3 bg-zinc-800 rounded flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-200 font-semibold">{comment?.name}</p>
                  <p className="text-xs text-gray-400 italic">{comment?.email}</p>
                  <p className="text-sm mt-1">{comment?.comment}</p>
                </div>
                <Button type="button" variant="destructive" onClick={() => handleDeleteCommentClick(comment?._id)}>
                  Delete
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Submit */}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Submitting..." : isUpdate ? "Update Blog" : "Create Blog"}
      </Button>
    </form>
  );
};

export default BlogForm;