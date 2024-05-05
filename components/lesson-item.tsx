"use client"
import { Clock } from "lucide-react";
import Link from "next/link";

interface LessonItemProps {
  slug: string;
  title: string;
  description?: string;
  time: string;
}

export function LessonItem({
  slug,
  title,
  description,
  time,
}: LessonItemProps) {
  return (

    <div className="flex flex-col gap-2 border-border border p-4 rounded py-3">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          <Link href={'/' + slug}>{title}</Link>
        </h2>
        <div className="text-sm hidden md:flex sm:text-base font-medium  items-center gap-1">
          <Clock className="h-4 w-4" />
          <span><Link href={'/' + slug}>{time}</Link></span>
        </div>
      </div>
      <div className="max-w-none text-muted-foreground">
        <Link href={'/' + slug}>{description}</Link>
      </div>
    </div>


  );
}
