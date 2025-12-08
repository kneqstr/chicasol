"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

type CertificateItem = {
  title: string;
  image: string;
};

type CertificatesGridContent = {
  title: string;
  certificates: CertificateItem[];
};

export function CertificatesGrid({ content }: { content: CertificatesGridContent }) {
  const { title, certificates } = content;
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{title}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificates.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.12 }}
            >
              <Card className="overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="relative w-full h-40 bg-muted">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>

                <div className="p-4 text-center">
                  <p className="text-sm font-medium">{item.title}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
