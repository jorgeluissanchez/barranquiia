import { cn, sortPosts } from "@/lib/utils";
import { posts } from "#site/content";
import { LessonItem } from "@/components/lesson-item";

export default function Home() {
  const latestPosts = sortPosts(posts).slice(0, 5);
  return (
    <>
      <section className="container max-w-4xl py-6 lg:py-10 flex flex-col space-y-6 mt-60">
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center">
          Lecciones
        </h2>
        <ul className="grid gap-4 py-4 grid-cols-2">
          {latestPosts.map((post) => (
            <li key={post.slug}>
              <LessonItem
                slug={post.slug}
                title={post.title}
                description={post.description}
                time={post.time}
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
