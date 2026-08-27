"use server";

import { connectDB } from "@/lib/db/index.js";
import { Blog } from "@/lib/models/blog.model.js";
import { BlogContent } from "@/lib/models/blogContent.model.js";
import { uploadOnCloudinary } from "@/lib/utils/cloudinary.js";
import { revalidatePath } from "next/cache";

export async function createBlog(formData) {
  try {
    await connectDB();

    // 1. Upload thumbnail
    const thumbnailFile = formData.get("thumbnail");
    let thumbnailUrl = "";
    if (thumbnailFile && thumbnailFile.size > 0) {
      const uploadRes = await uploadOnCloudinary(thumbnailFile);
      thumbnailUrl = uploadRes?.secure_url || "";
    }

    // 2. Extract arrays
    const tagsStr = formData.get("tags") || "";
    const tags = tagsStr ? tagsStr.split(",").map((s) => s.trim()).filter(Boolean) : [];

    // 3. Process Content Sections
    const contentData = JSON.parse(formData.get("contentData") || "[]");
    const contentIds = [];
    
    for (let i = 0; i < contentData.length; i++) {
      const sec = contentData[i];
      let imgUrl = sec.image || "";
      
      const file = formData.get(`content_${i}_image`);
      if (file && file.size > 0) {
        const up = await uploadOnCloudinary(file);
        imgUrl = up?.secure_url || "";
      }

      const newContent = await BlogContent.create({
        title: sec.title,
        description: sec.description,
        image: imgUrl,
      });
      contentIds.push(newContent._id);
    }

    // 4. Create Blog
    const newBlog = await Blog.create({
      title: formData.get("title"),
      author: formData.get("author"),
      readTime: formData.get("readTime"),
      thumbnail: thumbnailUrl,
      tags,
      content: contentIds,
    });

    revalidatePath("/admin/blogs");
    revalidatePath("/blogs");
    revalidatePath("/");

    return { success: true, blogId: newBlog._id.toString() };
  } catch (error) {
    console.error("Create Blog Error:", error);
    return { success: false, error: error.message };
  }
}

export async function updateBlog(id, formData) {
  try {
    await connectDB();
    const blog = await Blog.findById(id);
    if (!blog) return { success: false, error: "Blog not found" };

    // 1. Upload thumbnail
    const thumbnailFile = formData.get("thumbnail");
    let thumbnailUrl = blog.thumbnail;
    if (formData.get("removeThumbnail") === "true") {
      thumbnailUrl = "";
    }
    if (thumbnailFile && thumbnailFile.size > 0) {
      const uploadRes = await uploadOnCloudinary(thumbnailFile);
      thumbnailUrl = uploadRes?.secure_url || blog.thumbnail;
    }

    // 2. Extract arrays
    const tagsStr = formData.get("tags") || "";
    const tags = tagsStr ? tagsStr.split(",").map((s) => s.trim()).filter(Boolean) : [];

    // 3. Process Content Sections
    const contentData = JSON.parse(formData.get("contentData") || "[]");
    const contentIds = [];
    
    for (let i = 0; i < contentData.length; i++) {
      const sec = contentData[i];
      let imgUrl = sec.image || "";
      
      const file = formData.get(`content_${i}_image`);
      if (file && file.size > 0) {
        const up = await uploadOnCloudinary(file);
        imgUrl = up?.secure_url || imgUrl;
      }

      if (sec._id) {
        await BlogContent.findByIdAndUpdate(sec._id, {
          title: sec.title,
          description: sec.description,
          image: imgUrl,
        });
        contentIds.push(sec._id);
      } else {
        const newContent = await BlogContent.create({
          title: sec.title,
          description: sec.description,
          image: imgUrl,
        });
        contentIds.push(newContent._id);
      }
    }

    // Delete orphaned content sections
    const oldContentStr = blog.content.map(c => c.toString());
    const newContentStr = contentIds.map(c => c.toString());
    const contentToDelete = oldContentStr.filter(c => !newContentStr.includes(c));
    if (contentToDelete.length > 0) {
      await BlogContent.deleteMany({ _id: { $in: contentToDelete } });
    }

    // 5. Update Blog
    await Blog.findByIdAndUpdate(id, {
      title: formData.get("title"),
      author: formData.get("author"),
      readTime: formData.get("readTime"),
      thumbnail: thumbnailUrl,
      tags,
      content: contentIds,
    });

    revalidatePath("/admin/blogs");
    revalidatePath("/blogs");
    revalidatePath("/");
    revalidatePath(`/blogs/${blog.slug}`);

    return { success: true };
  } catch (error) {
    console.error("Update Blog Error:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteBlog(id) {
  try {
    await connectDB();
    const blog = await Blog.findById(id);
    if (!blog) return { success: false, error: "Blog not found" };

    if (blog.content && blog.content.length > 0) {
      await BlogContent.deleteMany({ _id: { $in: blog.content } });
    }

    await Blog.findByIdAndDelete(id);

    revalidatePath("/admin/blogs");
    revalidatePath("/blogs");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Delete Blog Error:", error);
    return { success: false, error: error.message };
  }
}
