import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import SEO from "../components/SEO";

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const categories = [
  "All",
  "Hajj Tips",
  "Umrah Tips",
  "Travel Guide",
  "News",
  "Other",
];

function BlogCard({ blog, delay }) {
  return (
    <Reveal delay={delay}>
      <Link
        to={`/blog/${blog.slug}`}
        className="group block bg-white rounded-2xl border border-stone-200 hover:border-[#D4A017] hover:shadow-lg transition-all duration-300 overflow-hidden"
      >
        {/* Image */}
        <div className="h-48 overflow-hidden bg-stone-100">
          {blog.image ? (
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#1a6b3c]/5">
              <span className="text-4xl">📖</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold bg-[#1a6b3c]/10 text-[#1a6b3c] px-2.5 py-1 rounded-full">
              {blog.category}
            </span>
            <span className="text-xs text-stone-400">
              {new Date(blog.publishedAt).toLocaleDateString("en-PK", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
          <h3 className="font-bold text-stone-900 text-lg mb-2 leading-snug group-hover:text-[#1a6b3c] transition-colors line-clamp-2">
            {blog.title}
          </h3>
          <p className="text-stone-500 text-sm leading-relaxed line-clamp-3">
            {blog.excerpt}
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#1a6b3c] group-hover:text-[#D4A017] transition-colors">
            Read More{" "}
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden animate-pulse">
      <div className="h-48 bg-stone-100" />
      <div className="p-6 space-y-3">
        <div className="h-4 bg-stone-100 rounded w-24" />
        <div className="h-5 bg-stone-100 rounded w-full" />
        <div className="h-5 bg-stone-100 rounded w-3/4" />
        <div className="h-4 bg-stone-100 rounded w-full" />
        <div className="h-4 bg-stone-100 rounded w-2/3" />
      </div>
    </div>
  );
}

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 9;

  useEffect(() => {
    setLoading(true);
    const params = { limit, page };
    if (category !== "All") params.category = category;

    API.get("/blogs", { params })
      .then((res) => {
        setBlogs(res.data.blogs);
        setTotal(res.data.total);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [category, page]);

  // Reset page on category change
  useEffect(() => {
    setPage(1);
  }, [category]);

  const filtered = search
    ? blogs.filter(
        (b) =>
          b.title.toLowerCase().includes(search.toLowerCase()) ||
          b.excerpt.toLowerCase().includes(search.toLowerCase()),
      )
    : blogs;

  const totalPages = Math.ceil(total / limit);

  return (
    <>
      <SEO
        title="Blog & Guides"
        description="Hajj tips, Umrah guides, travel advice and news from RG Tour & Travels. Everything pilgrims need to know before their sacred journey."
        keywords="Hajj tips, Umrah guide, pilgrimage tips, Hajj preparation"
        url="/blog"
      />
      <main className="overflow-x-hidden">
        {/* ── HERO ── */}
        <section
          className="relative py-24 text-white text-center"
          style={{
            background:
              "linear-gradient(135deg, #0f4d2a 0%, #1a6b3c 50%, #155c33 100%)",
          }}
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#D4A017]/10 blur-3xl" />
            <div className="absolute bottom-0 -left-10 w-60 h-60 rounded-full bg-[#e8b820]/5 blur-2xl" />
          </div>
          <div className="relative max-w-3xl mx-auto px-6">
            <p className="text-[#D4A017] text-sm font-semibold uppercase tracking-widest mb-3">
              Knowledge & Guidance
            </p>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Blog & Guides
            </h1>
            <p className="text-stone-300 text-lg max-w-xl mx-auto leading-relaxed">
              Hajj tips, Umrah guides, travel advice and updates from the RG
              Travels team.
            </p>

            {/* Search */}
            <div className="mt-8 max-w-lg mx-auto relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/10 border border-white/20 text-white placeholder-stone-400 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:border-[#D4A017] transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400">
                🔍
              </span>
            </div>
          </div>
        </section>

        {/* ── CATEGORY FILTER ── */}
        <section className="bg-white border-b border-stone-100 sticky top-16 z-40">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    category === cat
                      ? "bg-[#1a6b3c] text-white"
                      : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── BLOG GRID ── */}
        <section className="py-20 bg-[#FDFAF5]">
          <div className="max-w-6xl mx-auto px-6">
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-5xl mb-4">📭</p>
                <p className="text-stone-500 font-semibold text-lg mb-2">
                  No articles found
                </p>
                <p className="text-stone-400 text-sm mb-6">
                  Try a different category or search term
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setCategory("All");
                  }}
                  className="text-sm font-semibold text-[#1a6b3c] hover:text-[#D4A017] transition-colors"
                >
                  Clear filters →
                </button>
              </div>
            ) : (
              <>
                <p className="text-stone-400 text-sm mb-8">
                  Showing{" "}
                  <span className="font-semibold text-stone-700">
                    {filtered.length}
                  </span>{" "}
                  articles
                  {category !== "All" && (
                    <span>
                      {" "}
                      in{" "}
                      <span className="font-semibold text-stone-700">
                        {category}
                      </span>
                    </span>
                  )}
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map((blog, i) => (
                    <BlogCard key={blog._id} blog={blog} delay={i * 60} />
                  ))}
                </div>

                {/* Pagination */}
                {!search && totalPages > 1 && (
                  <div className="flex items-center justify-center gap-3 mt-14">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="px-4 py-2 rounded-lg border border-stone-200 text-stone-500 text-sm font-semibold hover:border-[#1a6b3c] hover:text-[#1a6b3c] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                      ← Prev
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`w-9 h-9 rounded-lg text-sm font-bold transition-all ${
                          page === i + 1
                            ? "bg-[#1a6b3c] text-white"
                            : "border border-stone-200 text-stone-500 hover:border-[#1a6b3c] hover:text-[#1a6b3c]"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() =>
                        setPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={page === totalPages}
                      className="px-4 py-2 rounded-lg border border-stone-200 text-stone-500 text-sm font-semibold hover:border-[#1a6b3c] hover:text-[#1a6b3c] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                      Next →
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-14 bg-[#1a6b3c] text-center">
          <Reveal className="px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-stone-300 mb-7 text-sm md:text-base">
              Explore our Hajj and Umrah packages today.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-xs sm:max-w-none mx-auto">
              <Link
                to="/hajj/packages"
                className="w-full sm:w-auto bg-[#D4A017] hover:bg-[#e8b820] text-[#1a6b3c] font-bold px-8 py-3.5 sm:py-4 rounded-xl transition-all hover:scale-105 active:scale-95 text-sm sm:text-base"
              >
                Hajj Packages
              </Link>
              <Link
                to="/umrah/packages"
                className="w-full sm:w-auto border-2 border-white/30 hover:border-white text-white font-semibold px-8 py-3.5 sm:py-4 rounded-xl transition-all hover:scale-105 active:scale-95 text-sm sm:text-base"
              >
                Umrah Packages
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
    </>
  );
}
