"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { updateBlog } from "@/lib/actions/admin/blogs.actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

export default function EditBlogClient({ blog }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: blog.title || "", 
    author: blog.author || "", 
    readTime: blog.readTime || "", 
    tags: blog.tags ? blog.tags.join(", ") : ""
  });
  const [thumbnail, setThumbnail] = useState(null);
  
  const [content, setContent] = useState(blog.content?.map(c => ({
    _id: c._id,
    title: c.title,
    description: c.description,
    image: c.image,
    file: null
  })) || []);

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (index, field, value) => {
    const updated = [...content];
    updated[index][field] = value;
    setContent(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, formData[key]));
      
      if (thumbnail) data.append("thumbnail", thumbnail);

      // Content
      const contentData = content.map(c => ({
        _id: c._id, title: c.title, description: c.description
      }));
      data.append("contentData", JSON.stringify(contentData));
      
      content.forEach((c, i) => {
        if (c.file) data.append(`content_${i}_image`, c.file);
      });

      const res = await updateBlog(blog._id, data);
      
      if (res.success) {
        toast.success("Blog updated successfully!");
        router.push("/admin/blogs");
      } else {
        toast.error(res.error || "Failed to update blog");
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/admin/blogs" className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Blog</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Basic Info */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800 space-y-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Blog Title *</label>
              <Input required name="title" value={formData.title} onChange={handleTextChange} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Author *</label>
              <Input required name="author" value={formData.author} onChange={handleTextChange} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Read Time *</label>
              <Input required name="readTime" value={formData.readTime} onChange={handleTextChange} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
              <Input name="tags" value={formData.tags} onChange={handleTextChange} />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Thumbnail Image (Upload to replace)</label>
            {blog.thumbnail && (
              <img src={blog.thumbnail} alt="" className="h-24 w-40 object-cover rounded mb-2 border border-gray-200" />
            )}
            <Input type="file" onChange={(e) => setThumbnail(e.target.files[0])} accept="image/*" />
          </div>
        </div>

        {/* Content Blocks */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800 space-y-6">
          <div className="flex items-center justify-between border-b pb-2">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Blog Content Blocks</h2>
            <Button type="button" variant="outline" size="sm" onClick={() => setContent([...content, { title: "", description: "", file: null }])}>
              <Plus className="w-4 h-4 mr-1" /> Add Content Block
            </Button>
          </div>

          {content.map((sec, index) => (
            <div key={index} className="p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-lg space-y-4 relative border border-gray-200 dark:border-zinc-700">
              <button type="button" onClick={() => setContent(content.filter((_, i) => i !== index))} className="absolute top-4 right-4 text-red-500 hover:text-red-700">
                <Trash2 className="w-4 h-4" />
              </button>
              
              <h3 className="font-medium text-[#BFA181]">Content Block {index + 1}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Section Title *</label>
                  <Input required value={sec.title} onChange={(e) => handleContentChange(index, 'title', e.target.value)} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Text Content *</label>
                  <textarea required value={sec.description} onChange={(e) => handleContentChange(index, 'description', e.target.value)} className="w-full p-3 rounded-md border border-gray-300 dark:border-zinc-700 bg-transparent text-sm h-32" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Section Image (optional)</label>
                  {sec.image && <img src={sec.image} alt="" className="h-16 w-16 object-cover rounded mb-2 border border-gray-200" />}
                  <Input type="file" onChange={(e) => handleContentChange(index, 'file', e.target.files[0])} accept="image/*" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-4 pb-12">
          <Button type="submit" disabled={loading} className="bg-[#BFA181] hover:bg-[#a68c70] text-black px-8">
            {loading ? "Updating..." : "Update Blog"}
          </Button>
        </div>
      </form>
    </div>
  );
}
