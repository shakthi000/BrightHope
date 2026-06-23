import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, ArrowLeft } from "lucide-react";
import { BLOG_POSTS, SITE } from "@/lib/constants";
import { createMetadata, breadcrumbSchema } from "@/lib/seo";
import { AnimatedSection } from "@/components/animations/AnimatedSection";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return createMetadata({ title: "Post Not Found", noIndex: true });

  return createMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

const blogContent: Record<string, string[]> = {
  "finding-hope-after-adversity": [
    "Life's greatest challenges often become the catalyst for our most profound transformations. Whether facing illness, loss or overwhelming change, the path from struggle to hope is one that countless individuals walk every day — and it is a path you do not have to walk alone.",
    "Resilience is not about denying pain or pretending everything is fine. It is about acknowledging your feelings, seeking support and taking small, intentional steps toward healing. Research consistently shows that individuals who engage in counselling during difficult periods report higher levels of emotional clarity and life satisfaction.",
    "At Bright Hope, we believe that every person carries an innate capacity for growth and renewal. Our role is to help you uncover that strength, provide practical tools for coping and create a safe space where healing can unfold naturally.",
    "If you are navigating a difficult season, remember: reaching out is not a sign of weakness — it is an act of courage. Your journey toward hope begins with a single step.",
  ],
  "supporting-your-child-emotionally": [
    "Children experience emotions just as intensely as adults, but they often lack the vocabulary and tools to express what they feel. As parents, recognizing the signs of emotional distress early can make a significant difference in your child's well-being.",
    "Common signs include changes in sleep patterns, withdrawal from activities they once enjoyed, increased irritability, declining academic performance or physical complaints without medical cause. These signals are your child's way of communicating that something needs attention.",
    "Creating a nurturing home environment starts with active listening. When your child shares their feelings, resist the urge to immediately fix or minimize their experience. Instead, validate their emotions and let them know it is okay to feel what they feel.",
    "Professional student counselling can provide additional support when home strategies alone are not enough. At Bright Hope, we work collaboratively with parents to ensure children receive the holistic support they need to thrive emotionally and academically.",
  ],
  "managing-academic-stress": [
    "Academic pressure is one of the most common sources of stress among students today. The constant push for grades, competition and future uncertainty can take a significant toll on mental health and overall well-being.",
    "The first step in managing academic stress is recognizing that your worth is not defined by your grades. While academic achievement is important, it should never come at the cost of your mental health.",
    "Practical strategies include breaking large tasks into manageable chunks, using the Pomodoro technique for focused study sessions, maintaining a consistent sleep schedule and scheduling regular breaks for physical activity and social connection.",
    "Mindfulness and breathing exercises can also help manage anxiety during exams and deadlines. Even five minutes of deep breathing before a test can significantly reduce stress hormones and improve focus.",
    "If academic stress feels overwhelming, seeking professional support through academic coaching or student counselling can provide personalized strategies and emotional support tailored to your unique situation.",
  ],
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) notFound();

  const content = blogContent[slug] || [];
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: SITE.url },
    { name: "Blog", url: `${SITE.url}/blog` },
    { name: post.title, url: `${SITE.url}/blog/${post.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <article>
        <section className="pt-32 pb-12 hero-gradient">
          <div className="container-narrow max-w-3xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to Blog
            </Link>
            <span className="rounded-full bg-hope-100 px-3 py-1 text-xs font-medium text-hope-700">
              {post.category}
            </span>
            <h1 className="mt-4 font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-hope-950 text-balance">
              {post.title}
            </h1>
            <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                {new Date(post.date).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </section>

        <AnimatedSection className="section-padding bg-white">
          <div className="container-narrow max-w-3xl">
            <div className="prose prose-lg max-w-none">
              {content.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-muted-foreground leading-relaxed mb-6 text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </article>
    </>
  );
}
