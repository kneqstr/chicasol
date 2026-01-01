"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileDown, BookOpen } from "lucide-react";

export interface BookItem {
  slug: string;
  title: string;
  annotation: string;
  author: string;
  button: string;
  language: string;
  pages: number;
  format: string;
  fileSizeKb: number;
}

interface BooksListProps {
  content: BookItem[];
}

export function BooksList({ content }: BooksListProps) {
  return (
    <section className="container mx-auto py-16">
      <div className="grid gap-8 ">
        {content.map((book) => {
          const filePath = `/books/${book.slug}.${book.format}`;
          const imagePath = `/books/${book.slug}.jpg`;
          return (
            <Card
              key={book.slug}
              className="bg-muted/0 border-0 overflow-hidden transition-shadow hover:shadow-lg"
            >
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6">
                  <div className="relative w-full h-[300px] md:h-full">
                    <Image src={imagePath} alt={book.title} fill className="object-contain" />
                  </div>

                  <div className="flex flex-col justify-between p-6">
                    <div className="space-y-4">
                      <CardHeader className="p-0">
                        <CardTitle className="text-xl md:text-2xl leading-snug">
                          {book.title}
                        </CardTitle>
                      </CardHeader>

                      <p className="text-sm text-muted-foreground">{book.annotation}</p>

                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                        <span className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-muted-foreground" />
                          {book.pages} стр.
                        </span>
                        <span className="text-muted-foreground">{book.author}</span>
                        <span className="uppercase text-muted-foreground">{book.format}</span>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-4">
                      <Button asChild>
                        <a href={filePath} download>
                          <FileDown className="mr-2 h-4 w-4" />
                          {book.button}
                        </a>
                      </Button>
                      <span className="text-xs text-muted-foreground self-center">
                        {(book.fileSizeKb / 1024).toFixed(1)} MB
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
