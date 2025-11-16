"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBG from "@/components/AnimatedBG";
import { MessageCircle, Users, Clock, ArrowUp, MessageSquare, Plus, Search, Filter, X, Reply } from "lucide-react";
import { useState } from "react";

interface Discussion {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  replies: number;
  upvotes: number;
  createdAt: string;
  lastActivity: string;
  tags: string[];
}

export default function DiscussionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showNewDiscussionModal, setShowNewDiscussionModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [selectedDiscussion, setSelectedDiscussion] = useState<Discussion | null>(null);
  const [newDiscussion, setNewDiscussion] = useState({
    title: "",
    content: "",
    category: "General",
    tags: ""
  });
  const [newReply, setNewReply] = useState({
    content: ""
  });

  const discussions: Discussion[] = [
    {
      id: "1",
      title: "Best practices for Java security scanning",
      content: "What are the most effective ways to implement security scanning in Java applications? Looking for recommendations on tools and methodologies.",
      author: "DevSecOps_Pro",
      category: "Security",
      replies: 12,
      upvotes: 24,
      createdAt: "2024-01-15",
      lastActivity: "2 hours ago",
      tags: ["java", "security", "scanning"]
    },
    {
      id: "2",
      title: "Python vulnerability detection patterns",
      content: "Discussing common vulnerability patterns in Python code and how to detect them automatically.",
      author: "PythonGuru",
      category: "Development",
      replies: 8,
      upvotes: 18,
      createdAt: "2024-01-14",
      lastActivity: "4 hours ago",
      tags: ["python", "vulnerabilities", "patterns"]
    },
    {
      id: "3",
      title: "CrowmanCloud API integration guide",
      content: "Has anyone successfully integrated the CrowmanCloud API into their CI/CD pipeline? Would love to hear about your experience.",
      author: "CloudDev",
      category: "Integration",
      replies: 15,
      upvotes: 31,
      createdAt: "2024-01-13",
      lastActivity: "1 day ago",
      tags: ["api", "cicd", "integration"]
    },
    {
      id: "4",
      title: "Feature request: Support for Go language",
      content: "It would be great to have Go language support in the vulnerability scanner. Many of us are using Go for microservices.",
      author: "GoLang_Fan",
      category: "Feature Request",
      replies: 22,
      upvotes: 45,
      createdAt: "2024-01-12",
      lastActivity: "3 days ago",
      tags: ["golang", "feature-request", "support"]
    },
    {
      id: "5",
      title: "Troubleshooting authentication issues",
      content: "Getting 401 errors when trying to authenticate with the API. Has anyone encountered this before?",
      author: "NewUser123",
      category: "Support",
      replies: 6,
      upvotes: 9,
      createdAt: "2024-01-11",
      lastActivity: "5 days ago",
      tags: ["authentication", "troubleshooting", "api"]
    }
  ];

  const categories = ["all", "Security", "Development", "Integration", "Feature Request", "Support"];

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         discussion.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         discussion.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || discussion.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubmitDiscussion = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("New discussion:", newDiscussion);
    
    // Reset form and close modal
    setNewDiscussion({
      title: "",
      content: "",
      category: "General",
      tags: ""
    });
    setShowNewDiscussionModal(false);
  };

  const handleReplyClick = (discussion: Discussion) => {
    setSelectedDiscussion(discussion);
    setShowReplyModal(true);
  };

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the reply data to your backend
    console.log("New reply to discussion:", selectedDiscussion?.id, newReply);
    
    // Reset form and close modal
    setNewReply({
      content: ""
    });
    setShowReplyModal(false);
    setSelectedDiscussion(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="relative isolate flex-1 py-16 sm:py-24 overflow-hidden">
        <AnimatedBG />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/10 px-3 py-1 text-xs text-brand-300 mb-4"
            >
              <Users className="h-3 w-3" />
              Community Discussions
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl font-semibold tracking-tight"
            >
              Join the Conversation
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-4 text-neutral-300"
            >
              Connect with developers, share knowledge, and get help from the CrowmanCloud community.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6"
            >
              <button 
                onClick={() => setShowNewDiscussionModal(true)}
                className="inline-flex items-center gap-2 rounded-md bg-brand-500 hover:bg-brand-400 px-4 py-2 text-sm font-medium text-white transition"
              >
                <Plus className="h-4 w-4" />
                Start New Discussion
              </button>
            </motion.div>
          </div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mb-8 flex flex-col sm:flex-row gap-4"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search discussions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-md text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-2 bg-white/5 border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-brand-500 appearance-none"
              >
                {categories.map(category => (
                  <option key={category} value={category} className="bg-gray-800">
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>

          {/* Discussions List */}
          <div className="space-y-4">
            {filteredDiscussions.map((discussion, index) => (
              <motion.div
                key={discussion.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/[0.06] transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white hover:text-brand-300 transition-colors">
                        {discussion.title}
                      </h3>
                      <span className="px-2 py-1 text-xs rounded-full bg-brand-500/20 text-brand-300">
                        {discussion.category}
                      </span>
                    </div>
                    
                    <p className="text-neutral-300 text-sm mb-3 line-clamp-2">
                      {discussion.content}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {discussion.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 text-xs rounded bg-white/10 text-neutral-400">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-neutral-400">
                      <span>by {discussion.author}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {discussion.lastActivity}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2 ml-4">
                    <div className="flex items-center gap-4 text-sm text-neutral-400">
                      <div className="flex items-center gap-1">
                        <ArrowUp className="h-4 w-4" />
                        {discussion.upvotes}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        {discussion.replies}
                      </div>
                    </div>
                    <button 
                      onClick={() => handleReplyClick(discussion)}
                      className="flex items-center gap-1 px-3 py-1 text-xs bg-brand-500/20 text-brand-300 rounded-full hover:bg-brand-500/30 transition-colors"
                    >
                      <Reply className="h-3 w-3" />
                      Reply
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredDiscussions.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <MessageCircle className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-neutral-300 mb-2">No discussions found</h3>
              <p className="text-neutral-400">Try adjusting your search or filter criteria.</p>
            </motion.div>
          )}

          {/* Community Stats */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            <div className="text-center p-6 bg-white/5 border border-white/10 rounded-lg">
              <div className="text-2xl font-bold text-brand-300">1,234</div>
              <div className="text-sm text-neutral-400">Active Members</div>
            </div>
            <div className="text-center p-6 bg-white/5 border border-white/10 rounded-lg">
              <div className="text-2xl font-bold text-brand-300">567</div>
              <div className="text-sm text-neutral-400">Discussions</div>
            </div>
            <div className="text-center p-6 bg-white/5 border border-white/10 rounded-lg">
              <div className="text-2xl font-bold text-brand-300">2,890</div>
              <div className="text-sm text-neutral-400">Messages</div>
            </div>
          </motion.div>
        </div>

        {/* New Discussion Modal */}
        {showNewDiscussionModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={() => setShowNewDiscussionModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Start New Discussion</h2>
                  <button
                    onClick={() => setShowNewDiscussionModal(false)}
                    className="text-gray-400 hover:text-gray-200 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmitDiscussion} className="space-y-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-neutral-300 mb-2">
                      Discussion Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      required
                      value={newDiscussion.title}
                      onChange={(e) => setNewDiscussion({...newDiscussion, title: e.target.value})}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md shadow-sm text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                      placeholder="What's your question or topic?"
                    />
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-neutral-300 mb-2">
                      Category
                    </label>
                    <select
                      id="category"
                      value={newDiscussion.category}
                      onChange={(e) => setNewDiscussion({...newDiscussion, category: e.target.value})}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                    >
                      <option value="General" className="bg-gray-800">General</option>
                      <option value="Security" className="bg-gray-800">Security</option>
                      <option value="Development" className="bg-gray-800">Development</option>
                      <option value="Integration" className="bg-gray-800">Integration</option>
                      <option value="Feature Request" className="bg-gray-800">Feature Request</option>
                      <option value="Support" className="bg-gray-800">Support</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="content" className="block text-sm font-medium text-neutral-300 mb-2">
                      Description *
                    </label>
                    <textarea
                      id="content"
                      required
                      rows={6}
                      value={newDiscussion.content}
                      onChange={(e) => setNewDiscussion({...newDiscussion, content: e.target.value})}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md shadow-sm text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                      placeholder="Provide details about your question or topic. Include any relevant code, error messages, or context that might help others understand and respond to your discussion."
                    />
                  </div>

                  <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-neutral-300 mb-2">
                      Tags
                    </label>
                    <input
                      type="text"
                      id="tags"
                      value={newDiscussion.tags}
                      onChange={(e) => setNewDiscussion({...newDiscussion, tags: e.target.value})}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md shadow-sm text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                      placeholder="java, security, api, python (comma-separated)"
                    />
                    <p className="text-sm text-neutral-400 mt-1">Add relevant tags to help others find your discussion</p>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowNewDiscussionModal(false)}
                      className="px-4 py-2 text-neutral-300 bg-white/5 border border-white/10 rounded-md hover:bg-white/10 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-brand-500 text-white rounded-md hover:bg-brand-400 transition-colors"
                    >
                      Post Discussion
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Reply Modal */}
        {showReplyModal && selectedDiscussion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-2 sm:p-4"
            onClick={() => setShowReplyModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg shadow-xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto mx-2 sm:mx-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 sm:p-6">
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-white">Reply to Discussion</h2>
                  <button
                    onClick={() => setShowReplyModal(false)}
                    className="text-gray-400 hover:text-gray-200 transition-colors p-1"
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>

                {/* Original Discussion Preview */}
                <div className="mb-6 p-4 bg-white/5 border border-white/10 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-white text-sm">{selectedDiscussion.title}</h3>
                    <span className="px-2 py-1 text-xs rounded-full bg-brand-500/20 text-brand-300">
                      {selectedDiscussion.category}
                    </span>
                  </div>
                  <p className="text-neutral-300 text-sm line-clamp-2 mb-2">
                    {selectedDiscussion.content}
                  </p>
                  <div className="text-xs text-neutral-400">
                    by {selectedDiscussion.author} • {selectedDiscussion.lastActivity}
                  </div>
                </div>

                <form onSubmit={handleSubmitReply} className="space-y-4 sm:space-y-6">
                  <div>
                    <label htmlFor="reply-content" className="block text-sm font-medium text-neutral-300 mb-2">
                      Your Reply *
                    </label>
                    <textarea
                      id="reply-content"
                      required
                      rows={6}
                      value={newReply.content}
                      onChange={(e) => setNewReply({content: e.target.value})}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md shadow-sm text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                      placeholder="Share your thoughts, provide additional information, or ask follow-up questions..."
                    />
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowReplyModal(false)}
                      className="px-4 py-2 text-neutral-300 bg-white/5 border border-white/10 rounded-md hover:bg-white/10 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-brand-500 text-white rounded-md hover:bg-brand-400 transition-colors"
                    >
                      Post Reply
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </main>
      <Footer />
    </div>
  );
}
