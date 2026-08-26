"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Pencil, Search, ArrowUpDown } from "lucide-react";
import DeleteBlogButton from "./DeleteBlogButton";
import { Input } from "@/components/ui/input";

export default function BlogsTableClient({ initialBlogs }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "createdAt", direction: "desc" });

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const filteredAndSortedBlogs = useMemo(() => {
    let filtered = [...(initialBlogs || [])];
    
    // Search
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        b => 
          b.title?.toLowerCase().includes(lowerQuery) || 
          b.author?.toLowerCase().includes(lowerQuery)
      );
    }

    // Sort
    filtered.sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];
      
      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();

      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [initialBlogs, searchQuery, sortConfig]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center gap-4 justify-between bg-white dark:bg-zinc-900 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-800">
        
        {/* Search */}
        <div className="relative w-full sm:w-1/3">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input 
            type="text"
            placeholder="Search by title or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full"
          />
        </div>

        {/* Sorting Controls */}
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-500 whitespace-nowrap">Sort:</label>
            <select 
              value={`${sortConfig.key}-${sortConfig.direction}`} 
              onChange={(e) => {
                const [key, direction] = e.target.value.split("-");
                setSortConfig({ key, direction });
              }}
              className="text-sm border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#BFA181]"
            >
              <option value="createdAt-desc">Newest First</option>
              <option value="createdAt-asc">Oldest First</option>
              <option value="title-asc">Title: A to Z</option>
              <option value="title-desc">Title: Z to A</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 shadow rounded-lg border border-gray-200 dark:border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-800">
            <thead className="bg-gray-50 dark:bg-zinc-800/50">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors group"
                  onClick={() => handleSort("title")}
                >
                  <div className="flex items-center space-x-1">
                    <span>Blog Title</span>
                    <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Author
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Read Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Tags
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-zinc-900 divide-y divide-gray-200 dark:divide-zinc-800">
              {filteredAndSortedBlogs.map((blog) => (
                <tr key={blog._id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 relative rounded overflow-hidden bg-gray-100">
                        <img 
                          src={blog.thumbnail || "/placeholder.jpg"} 
                          alt="" 
                          className="h-10 w-10 object-cover"
                        />
                      </div>
                      <div className="ml-4 max-w-[250px]">
                        <div className="text-sm font-medium text-gray-900 dark:text-white truncate" title={blog.title}>
                          {blog.title}
                        </div>
                        <div className="text-sm text-gray-500 truncate" title={blog.slug}>
                          {blog.slug}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {blog.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {blog.readTime}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                      {blog.tags?.slice(0, 3).map((tag, i) => (
                        <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-zinc-800 dark:text-gray-300">
                          {tag}
                        </span>
                      ))}
                      {blog.tags?.length > 3 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-zinc-800 dark:text-gray-300">
                          +{blog.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                    <Link href={`/admin/blogs/${blog._id}`} className="text-[#BFA181] hover:text-[#a68c70] inline-flex items-center">
                      <Pencil className="w-4 h-4 mr-1" />
                      Edit
                    </Link>
                    <DeleteBlogButton id={blog._id.toString()} title={blog.title} />
                  </td>
                </tr>
              ))}
              {filteredAndSortedBlogs.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                    No blogs found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
