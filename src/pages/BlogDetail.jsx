import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import SEO from "../components/SEO";

function SkeletonDetail() {
  return (
    <div className="animate-pulse max-w-4xl mx-auto px-6 py-14">
      <div className="h-72 bg-stone-100 rounded-2xl mb-8" />
      <div className="h-8 bg-stone-100 rounded w-3/4 mb-4" />
      <div className="h-4 bg-stone-100 rounded w-1/2 mb-8" />
      <div className="space-y-3">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`h-4 bg-stone-100 rounded ${i % 3 === 2 ? "w-2/3" : "w-full"}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    API.get(`/blogs/${slug}`)
      .then((res) => {
        setBlog(res.data);
        // Fetch related blogs from same category
        return API.get("/blogs", {
          params: { category: res.data.category, limit: 3 },
        });
      })
      .then((res) => {
        setRelated(res.data.blogs.filter((b) => b.slug !== slug));
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <SkeletonDetail />;

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-5xl">📭</p>
        <p className="text-stone-500 font-semibold">Article not found</p>
        <Link
          to="/blog"
          className="text-sm font-semibold text-[#1a6b3c] hover:text-[#D4A017] transition-colors"
        >
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={blog.title}
        description={blog.excerpt}
        url={`/blog/${blog.slug}`}
        image={blog.image}
      />
      <main className="overflow-x-hidden bg-[#FDFAF5]">
        {/* ── HERO IMAGE ── */}
        <div className="relative h-72 md:h-[420px] overflow-hidden bg-stone-200">
          {blog.image ? (
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#1a6b3c]/10">
              <span className="text-6xl">📖</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-6 left-6 flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-xl border border-white/20 transition-all"
          >
            ← Back
          </button>

          {/* Category badge */}
          <div className="absolute top-6 right-6">
            <span className="bg-[#D4A017] text-[#1a6b3c] text-xs font-bold px-3 py-1.5 rounded-lg">
              {blog.category}
            </span>
          </div>
        </div>

        {/* ── CONTENT ── */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* ── MAIN CONTENT ── */}
            <div className="lg:col-span-2">
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-3 mb-5 text-sm text-stone-400">
                <span className="font-semibold text-[#1a6b3c]">
                  {blog.category}
                </span>
                <span>•</span>
                <span>
                  {new Date(blog.publishedAt).toLocaleDateString("en-PK", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <span>•</span>
                <span>By {blog.author}</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-stone-900 leading-snug mb-6">
                {blog.title}
              </h1>

              {/* Excerpt */}
              <p className="text-stone-500 text-lg leading-relaxed mb-8 pb-8 border-b border-stone-200 italic">
                {blog.excerpt}
              </p>

              {/* Content */}
              <div
                className="prose prose-stone prose-lg max-w-none
                prose-headings:text-stone-900 prose-headings:font-bold
                prose-p:text-stone-600 prose-p:leading-relaxed
                prose-a:text-[#1a6b3c] prose-a:no-underline hover:prose-a:text-[#D4A017]
                prose-strong:text-stone-800
                prose-ul:text-stone-600 prose-ol:text-stone-600
                prose-li:marker:text-[#D4A017]
                prose-blockquote:border-[#D4A017] prose-blockquote:text-stone-500
                prose-img:rounded-2xl"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* Tags */}
              {blog.tags?.length > 0 && (
                <div className="mt-10 pt-8 border-t border-stone-200">
                  <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-3">
                    Tags
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-stone-100 text-stone-600 px-3 py-1.5 rounded-full font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Share */}
              <div className="mt-8 pt-8 border-t border-stone-200">
                <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-3">
                  Share
                </p>
                <div className="flex gap-3">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(blog.title + " - " + window.location.href)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all"
                  >
                    Facebook
                  </a>
                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(window.location.href)
                    }
                    className="flex items-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-sm font-semibold px-4 py-2 rounded-xl transition-all"
                  >
                    Copy Link
                  </button>
                </div>
              </div>
            </div>

            {/* ── SIDEBAR ── */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Author card */}
                <div className="bg-white rounded-2xl border border-stone-200 p-6">
                  <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-3">
                    Author
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#1a6b3c] flex items-center justify-center text-[#D4A017] font-bold">
                      {blog.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-stone-900 text-sm">
                        {blog.author}
                      </p>
                      <p className="text-stone-400 text-xs">
                        RG Tour & Travels
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA card */}
                <div className="bg-[#1a6b3c] rounded-2xl p-6 text-white">
                  <p className="font-bold text-lg mb-2">Plan Your Journey</p>
                  <p className="text-stone-300 text-sm mb-5 leading-relaxed">
                    Ready to perform Hajj or Umrah? Explore our packages today.
                  </p>
                  <Link
                    to="/hajj/packages"
                    className="block text-center bg-[#D4A017] hover:bg-[#e8b820] text-[#1a6b3c] font-bold py-3 rounded-xl transition-all mb-3"
                  >
                    Hajj Packages
                  </Link>
                  <Link
                    to="/umrah/packages"
                    className="block text-center border border-white/20 hover:bg-white/10 text-white font-semibold py-3 rounded-xl transition-all"
                  >
                    Umrah Packages
                  </Link>
                </div>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/923218485159"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 bg-green-500 hover:bg-green-400 text-white font-semibold px-5 py-4 rounded-2xl transition-all hover:scale-[1.02]"
                >
                  <svg
                    className="w-5 h-5 flex-shrink-0"
                    fill="white"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.845L.057 23.571a.75.75 0 00.921.921l5.726-1.471A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.5-5.2-1.373l-.374-.217-3.876.995.995-3.876-.217-.374A9.953 9.953 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                  </svg>
                  Ask Us on WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* ── RELATED POSTS ── */}
          {related.length > 0 && (
            <div className="mt-16 pt-10 border-t border-stone-200">
              <h2 className="text-2xl font-bold text-stone-900 mb-8">
                Related Articles
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {related.map((b) => (
                  <Link
                    key={b._id}
                    to={`/blog/${b.slug}`}
                    className="group bg-white rounded-2xl border border-stone-200 hover:border-[#D4A017] hover:shadow-md transition-all overflow-hidden"
                  >
                    <div className="h-36 overflow-hidden bg-stone-100">
                      {b.image ? (
                        <img
                          src={b.image}
                          alt={b.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-3xl">📖</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <span className="text-xs font-bold text-[#1a6b3c] bg-[#1a6b3c]/10 px-2 py-0.5 rounded-full">
                        {b.category}
                      </span>
                      <p className="font-bold text-stone-900 text-sm mt-2 leading-snug group-hover:text-[#1a6b3c] transition-colors line-clamp-2">
                        {b.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
