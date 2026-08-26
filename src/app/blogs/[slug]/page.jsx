"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";


const Blog = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [recentBlogs, setRecentBlogs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState({
    name: "",
    email: "",
    comment: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/blog/${slug}`);
      setBlog(res.data.data);

      const recentRes = await axios.get("/api/blog/");
      const recent = recentRes.data.data
        ?.filter((b) => b.slug !== slug)
        ?.slice(0, 4);
      setRecentBlogs(recent);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching blog:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [slug]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.name || !newComment.comment) return;

    try {
      setSubmitting(true);
      await axios.post(`/api/blog/comment/${blog._id}`, newComment);
      setNewComment({ name: "", email: "", comment: "" });
      fetchData();
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return <div className="p-10 text-center text-xl text-gray-200">Loading...</div>;
  if (!blog)
    return <div className="p-10 text-center text-xl text-gray-200">Blog not found 😕</div>;

  return (
    <article className="max-w-6xl mx-auto px-5 py-24 text-gray-100">
      {/* --- Header with Recent Blogs (Dark Theme + Responsive) --- */}
      <div className="flex flex-col md:flex-row md:items-start gap-6 mb-12">
        {/* Left: Main Blog Header */}
        <div className="relative w-full md:w-4/5 h-[18rem] md:h-[30rem] rounded-2xl overflow-hidden shadow-lg">
          <img
            src={blog?.thumbnail}
            alt={blog?.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

          {/* Blog Title */}
          <h1 className="absolute bottom-4 left-6 text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
            {blog?.title?.trim()}
          </h1>
        </div>

        {/* Right: Recent Blogs with Thumbnails (hidden on mobile) */}
        <div className="hidden md:block md:w-1/5 space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4 border-b border-gray-600 pb-2">
            Recent Blogs
          </h2>

          {recentBlogs?.map((recent) => (
            <Link
              key={recent?._id}
              href={`/blogs/${recent?.slug || recent?._id}`}
              className="flex items-center gap-3 bg-zinc-800 hover:bg-gray-700 p-3 rounded-lg shadow-md transition-all cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                <img
                  src={recent?.thumbnail}
                  alt={recent?.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title + Date */}
              <div className="flex flex-col">
                <p className="text-gray-200 font-semibold line-clamp-2 text-sm md:text-base">
                  {recent?.title}
                </p>
                <span className="text-xs text-gray-400 mt-1">
                  {new Date(recent?.createdAt).toLocaleDateString()}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* --- Meta Info --- */}
      <div className="text-sm text-gray-400 mb-6 border-b border-gray-700 pb-4 flex flex-wrap justify-between">
        <div>
          <span className="font-semibold text-orange-500">
            {blog?.author}
          </span>{" "}
          · {new Date(blog?.createdAt).toLocaleDateString()} ·{" "}
          {blog?.readTime} min read
        </div>

        <div className="flex gap-2 flex-wrap mt-2 md:mt-0">
          {blog?.tags?.map((tag, i) => (
            <span
              key={i}
              className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* --- Blog Content --- */}
      <div className="space-y-12 leading-relaxed text-gray-100">
        {blog?.content?.map((section) => (
          <div key={section?._id} className="space-y-4">
            {/* Section Heading */}
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {section?.title}
            </h2>

            {/* Section Description */}
            <p className="text-lg text-gray-300">{section?.description}</p>

            {/* Section Image */}
            {section?.image && (
              <div className="w-full md:w-4/6 h-72 md:h-80 rounded-lg overflow-hidden shadow-md">
                <img
                  src={section?.image}
                  alt={section?.title}
                  className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-300"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* --- Comments Section --- */}
      <section className="mt-16 border-t border-gray-700 pt-10">
        <h3 className="text-2xl font-bold mb-6 text-white">
          Comments ({blog?.comments?.length || 0})
        </h3>

        {blog?.comments?.length === 0 ? (
          <p className="text-gray-400 mb-6 italic">
            No comments yet. Be the first to share your thoughts!
          </p>
        ) : (
          <div className="space-y-6 mb-10">
            {blog?.comments?.map((c) => (
              <div
                key={c?._id}
                className="bg-zinc-800 p-4 rounded-lg shadow-md border border-gray-700 transition-transform hover:scale-[1.01]"
              >
                <h4 className="font-semibold text-orange-400">{c?.name}</h4>
                <p className="text-gray-200 mt-1">{c?.comment}</p>
                <span className="text-xs text-gray-500 mt-2 block">
                  {new Date(c?.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* --- Add Comment Form --- */}
        <form
          onSubmit={handleCommentSubmit}
          className="bg-orange-50 p-6 rounded-xl shadow-inner space-y-4 text-black"
        >
          <input
            type="text"
            placeholder="Your Name *"
            value={newComment.name}
            onChange={(e) =>
              setNewComment({ ...newComment, name: e.target.value })
            }
            className="w-full p-3 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="email"
            placeholder="Your Email (optional)"
            value={newComment.email}
            onChange={(e) =>
              setNewComment({ ...newComment, email: e.target.value })
            }
            className="w-full p-3 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <textarea
            placeholder="Write your comment *"
            value={newComment.comment}
            onChange={(e) =>
              setNewComment({ ...newComment, comment: e.target.value })
            }
            rows="4"
            className="w-full p-3 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          ></textarea>

          <button
            type="submit"
            disabled={submitting}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-60"
          >
            {submitting ? "Posting..." : "Post Comment"}
          </button>
        </form>
      </section>
    </article>
  );
};

export default Blog;