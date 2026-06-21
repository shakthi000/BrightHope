import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { BLOG_POSTS, SITE } from "@/lib/constants";
import { createMetadata, breadcrumbSchema } from "@/lib/seo";
import {
  AnimatedSection,
  SectionHeading,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/AnimatedSection";

export const metadata: Metadata = createMetadata({
  title: "Blog",
  description:
    "Insights on emotional wellness, academic success, parenting, and personal growth from Bright Hope Counselling & Coaching Centre.",
  path: "/blog",
});

export default function BlogPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: SITE.url },
    { name: "Blog", url: `${SITE.url}/blog` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <section className="pt-32 pb-16 hero-gradient">
        <div className="container-narrow text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
            Blog & Insights
          </span>
          <h1 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-hope-950 text-balance">
            Wisdom for Your Journey
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Articles on emotional wellness, academic success, and personal growth
            to support your transformation.
          </p>
        </div>
      </section>

      <AnimatedSection className="section-padding bg-white">
        <div className="container-narrow">
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
              <StaggerItem key={post.slug}>
                <article className="group rounded-2xl border border-border/60 overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  <div className="aspect-[16/10] bg-gradient-to-br from-hope-100 to-gold-100 flex items-center justify-center">
                    <span className="font-display text-4xl text-hope-300/50">
                      {post.category.charAt(0)}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                      <span className="rounded-full bg-hope-100 px-2.5 py-0.5 font-medium text-hope-700">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" aria-hidden="true" />
                        {new Date(post.date).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <h2 className="font-display text-xl font-semibold text-hope-900 group-hover:text-hope-600 transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-hope-600 hover:text-hope-700 transition-colors"
                    >
                      Read More
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </AnimatedSection>
    </>
  );
}
