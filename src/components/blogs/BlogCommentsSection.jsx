"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MessageSquare, Send, User, Calendar } from "lucide-react";

export default function BlogCommentsSection({ blogId, initialComments = [] }) {
  const [comments, setComments] = useState(initialComments);
  const [form, setForm] = useState({ name: "", email: "", comment: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.comment.trim()) {
      toast.warning("Please provide your name and a comment.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await axios.post(`/api/blog/comment/${blogId}`, form);
      const createdComment = res.data?.comment || {
        ...form,
        _id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };

      setComments((prev) => [createdComment, ...prev]);
      setForm({ name: "", email: "", comment: "" });
      toast.success("Thank you! Your comment has been posted.");
    } catch (error) {
      console.error("Error submitting comment:", error);
      toast.error(error.response?.data?.error || "Failed to post comment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mt-16 sm:mt-20 pt-12 border-t border-zinc-800">
      <div className="flex items-center gap-2.5 mb-8">
        <MessageSquare className="w-5 h-5 text-[#deb06c]" />
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
          Community Discussions ({comments.length})
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Left: Comments List */}
        <div className="lg:col-span-7 space-y-4">
          {comments.length === 0 ? (
            <div className="bg-[#11131a] rounded-2xl border border-zinc-800/90 p-8 text-center space-y-2">
              <MessageSquare className="w-8 h-8 text-zinc-600 mx-auto" />
              <p className="text-sm text-zinc-400 font-medium">
                No comments yet.
              </p>
              <p className="text-xs text-zinc-500">
                Be the first to share your travel thoughts or tips for this destination!
              </p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[560px] overflow-y-auto pr-2 scrollbar-none">
              {comments.map((c, i) => {
                let commentDate = "Just now";
                if (c.createdAt) {
                  try {
                    commentDate = new Date(c.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  } catch (_) {}
                }

                const initial = (c.name || "T").charAt(0).toUpperCase();

                return (
                  <div
                    key={c._id || i}
                    className="bg-[#11131a] rounded-2xl border border-zinc-800/90 p-5 space-y-2.5 shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 text-[#deb06c] font-bold text-xs flex items-center justify-center">
                          {initial}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white tracking-wide">
                            {c.name}
                          </h4>
                          <span className="text-[11px] text-zinc-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-zinc-500" />
                            {commentDate}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-zinc-300 leading-relaxed pl-11">
                      {c.comment}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Leave a Comment Form */}
        <div className="lg:col-span-5">
          <div className="bg-[#11131a] rounded-2xl border border-zinc-800 p-6 sm:p-7 shadow-xl space-y-5 sticky top-28">
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Leave a Thought
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Your email address will remain confidential.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Your Name <span className="text-[#deb06c]">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-[#07080c] border border-zinc-800 focus:border-[#deb06c] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Email Address <span className="text-zinc-500 font-normal">(Optional)</span>
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="rahul@example.com"
                  className="w-full bg-[#07080c] border border-zinc-800 focus:border-[#deb06c] rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Your Comment <span className="text-[#deb06c]">*</span>
                </label>
                <textarea
                  rows="4"
                  required
                  value={form.comment}
                  onChange={(e) => setForm({ ...form, comment: e.target.value })}
                  placeholder="Share your experience or questions regarding this destination..."
                  className="w-full bg-[#07080c] border border-zinc-800 focus:border-[#deb06c] rounded-xl p-3.5 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#deb06c] hover:bg-[#c99f5e] text-black font-semibold text-sm py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-60 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? "Posting Thought..." : "Submit Comment"}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

