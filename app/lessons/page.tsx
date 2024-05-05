import { posts } from "#site/content";
import { LessonItem } from "@/components/lesson-item";
import { QueryPagination } from "@/components/query-pagination";
import { Tag } from "@/components/tag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllTags, sortPosts, sortTagsByCount } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lecciones",
  description: "Aprende algo nuevo hoy",
};

const LESSONS_PER_PAGE = 5;

interface LessonPageProps {
  searchParams: {
    page?: string;
  };
}

export default async function LessonPage({ searchParams }: LessonPageProps) {
  const currentPage = Number(searchParams?.page) || 1;
  const sortedPosts = sortPosts(posts.filter((post) => post.published));
  const totalPages = Math.ceil(sortedPosts.length / LESSONS_PER_PAGE);

  const displayLessons = sortedPosts.slice(
    LESSONS_PER_PAGE * (currentPage - 1),
    LESSONS_PER_PAGE * currentPage
  );

  const tags = getAllTags(posts);
  const sortedTags = sortTagsByCount(tags);

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-black text-4xl lg:text-5xl">Lecciones Recomendadas </h1>
          <p className="text-xl text-muted-foreground">
            Aprende algo nuevo hoy
          </p>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-3 mt-8">
        <div className="col-span-12">
          <hr />
          {displayLessons?.length > 0 ? (
            <ul className="grid gap-4 py-4 grid-cols-2">
              {displayLessons.map((post) => {
                const { slug, time, title, description } = post;
                return (
                  <li key={slug}>
                    <LessonItem
                      slug={slug}
                      time={time}
                      title={title}
                      description={description}
                    />
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>Nada por aquí...</p>
          )}
          <QueryPagination
            totalPages={totalPages}
            className="justify-end mt-4"
          />
        </div>
      </div>
    </div>
  );
}
