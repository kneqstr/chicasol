"use client";
import { LiaTelegram, LiaInstagram } from "react-icons/lia";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

type FooterProps = {
  brand: string;
  description: string;
  links: {
    title: string;
    items: { label: string; href: string }[];
  }[];
  socials?: { icon: string; href: string }[];
  copyright: string;
};

export function Footer({ content }: { content: FooterProps }) {
  const { brand, description, links, socials, copyright } = content;

  return (
    <footer className="border-t bg-muted/30 ">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <h3 className="text-xl font-semibold">{brand}</h3>
            <p className="text-sm text-muted-foreground mt-3 max-w-xs">{description}</p>
          </div>

          {links.map((group, idx) => (
            <div key={idx}>
              <h4 className="text-sm font-semibold mb-4">{group.title}</h4>
              <ul className="space-y-2 text-sm">
                {group.items.map((item, i) => (
                  <li key={i}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {socials && socials.length > 0 && (
          <div className="flex gap-4 mt-10">
            <Link href="https://t.me/chicasol" className="text-2xl hover:text-primary transition">
              <LiaTelegram />
            </Link>
            <Link
              href="https://www.instagram.com/yoga_with_chicasol/"
              className="text-2xl hover:text-primary transition"
            >
              <LiaInstagram />
            </Link>
          </div>
        )}

        <Separator className="my-8" />

        <div className="text-xs text-muted-foreground">{copyright}</div>
      </div>
    </footer>
  );
}
