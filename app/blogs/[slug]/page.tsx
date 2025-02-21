import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

// Define the props type explicitly
interface JournalPageProps {
  params: Promise<{
    slug: string;
  }>;
}


// Helper function to load and parse a Markdown file from /content/blogs
async function getJournalContent(slug: string) {
  const filePath = path.join(process.cwd(), "content", "blogs", `${slug}.md`);
  try {
    const fileContent = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(fileContent);
    return { metadata: data, content };
  } catch {
    return null;
  }
}

// Dynamically generate SEO metadata based on the Markdown frontmatter
export async function generateMetadata({ params }: JournalPageProps): Promise<Metadata> {
  const { slug } = await params;
  const journal = await getJournalContent(slug);
  if (!journal) {
    return {
      title: "Journal Not Found",
      description: "The requested journal could not be found.",
    };
  }
  return {
    title: journal.metadata.title,
    description: journal.metadata.description,
    openGraph: {
      title: journal.metadata.title,
      description: journal.metadata.description,
      images: [
        {
          url: journal.metadata.image || "/default-image.webp",
          width: 1200,
          height: 630,
          alt: journal.metadata.title,
        },
      ],
    },
  };
}

// The main component that renders the Markdown content
export default async function JournalPage({ params }: JournalPageProps) {
  const { slug } = await params;
  const journal = await getJournalContent(slug);
  if (!journal) {
    notFound();
  }
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">{journal.metadata.title}</h1>
      {journal.metadata.image && (
        <Image
          src={journal.metadata.image}
          alt={journal.metadata.title}
          width={1200}
          height={630}
          className="rounded-lg mb-6"
        />
      )}
      <div className="prose prose-lg">
  <ReactMarkdown>{journal.content}</ReactMarkdown>
</div>
    </article>
  );
}