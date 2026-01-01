"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { LiaInstagram, LiaTelegram } from "react-icons/lia";

type Social = {
  platform: string;
  url: string;
};

type SocialProofProps = {
  socials: Social[];
  title?: string;
};

export function SocialProof({ content }: { content: SocialProofProps }) {
  const { title = "Соцсети автора" } = content;

  return (
    <section className="py-14">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-2xl font-bold mb-6">{title}</h2>

        <div className="flex gap-4">
          <Card className="p-4 hover:bg-muted transition">
            <Link
              href="https://www.instagram.com/yoga_with_chicasol/"
              target="_blank"
              className="flex items-center gap-2"
            >
              <LiaInstagram className="w-7 h-7" />
              <span className="capitalize">Instagram</span>
            </Link>
          </Card>
          <Card className="p-4 hover:bg-muted transition">
            <Link href="https://t.me/chicasol" target="_blank" className="flex items-center gap-2">
              <LiaTelegram className="w-7 h-7" />
              <span className="capitalize">Telegram</span>
            </Link>
          </Card>
        </div>
      </div>
    </section>
  );
}
