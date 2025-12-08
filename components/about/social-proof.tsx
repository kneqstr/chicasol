"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Send } from "lucide-react";

type Social = {
  platform: string;
  url: string;
};

type SocialProofProps = {
  socials: Social[];
  title?: string;
};

export function SocialProof({ content }: { content: SocialProofProps }) {
  const { socials, title = "Соцсети автора" } = content;

  return (
    <section className="py-14">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-2xl font-bold mb-6">{title}</h2>

        <div className="flex gap-4">
          {socials.map((s, i) => {
            return (
              <Card key={i} className="p-4 hover:bg-muted transition">
                <Link href={s.url} target="_blank" className="flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  <span className="capitalize">{s.platform}</span>
                </Link>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
