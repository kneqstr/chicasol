"use client";

import Link from "next/link";

type FooterProps = {
  about: string;
  contacts: string;
  privacy: string;
  socials: string;
  links: {
    about: string;
    contacts: string;
    privacy: string;
    socials: string;
  };
};

export function Footer({ content }: { content: FooterProps }) {
  const { about, contacts, privacy, socials, links } = content;

  return (
    <footer className="border-t py-12 mt-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 text-sm">
          <div>
            <h4 className="font-medium mb-3">{about}</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href={links.about} className="hover:text-primary transition-colors">
                  {about}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-3">{contacts}</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href={links.contacts} className="hover:text-primary transition-colors">
                  {contacts}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-3">{privacy}</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href={links.privacy} className="hover:text-primary transition-colors">
                  {privacy}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-3">{socials}</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href={links.socials} className="hover:text-primary transition-colors">
                  {socials}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-10">
          © {new Date().getFullYear()} Все права защищены.
        </p>
      </div>
    </footer>
  );
}
