"use client";

import { Card } from "@/components/ui/card";

type Stat = {
  icon: string;
  label: string;
  value: string;
};

type AuthorStatsProps = {
  stats: Stat[];
};

export function AuthorStats({ content }: { content: AuthorStatsProps }) {
  const { stats } = content;

  return (
    <section className="py-14">
      <div className="mx-auto max-w-5xl px-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((item, i) => (
            <Card key={i} className="p-4 flex flex-col items-center text-center shadow-sm">
              <div className="text-3xl">{item.icon}</div>
              <div className="mt-2 text-2xl font-semibold">{item.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{item.label}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
