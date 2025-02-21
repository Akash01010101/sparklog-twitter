import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

// SEO metadata for the categories page
export const metadata: Metadata = {
  title: "Journal Categories - Find Your Perfect Journaling Style",
  description:
    "Explore different journaling styles from gratitude journals to bullet journals. Find the perfect journaling style to enhance your personal growth and well-being.",
};

// Helper function to read and parse all Markdown files from /content/journals
async function getCategories() {
  const journalsDir = path.join(process.cwd(), "content", "blogs");
  const files = await fs.readdir(journalsDir);

  const categories = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(journalsDir, file);
      const fileContent = await fs.readFile(filePath, "utf8");
      const { data } = matter(fileContent);

      return {
        id: file.replace(/\.md$/, ""), // Use the filename (without extension) as the slug
        title: data.title || "Untitled",
        description: data.description || "",
        image: data.image || "/placeholder.svg",
      };
    })
  );

  return categories;
}

export default async function JournalCategories() {
  // Fetch categories dynamically from Markdown files
  const categories = await getCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          Journal Categories
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover different journaling styles and find the perfect format to express yourself, track your growth, and achieve your goals.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/blogs/${category.id}`}
            className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            aria-label={`Read more about ${category.title}`}
          >
            <div className="relative w-full h-56">
              <Image
                src={category.image}
                alt={category.title}
                fill
                style={{ objectFit: "cover" }}
                className="group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-200">
                {category.title}
              </h2>
              <p className="text-gray-600">{category.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}