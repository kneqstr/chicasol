"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type PricingFeature = string;

type PricingContent = {
  title: string;
  subtitle?: string;
  priceLabel: string;
  priceValue: string;
  buttonLabel: string;
  benefitsTitle: string;
  benefits: PricingFeature[];
};

export function Pricing({ content }: { content: PricingContent }) {
  const { title, subtitle, priceLabel, priceValue, buttonLabel, benefitsTitle, benefits } = content;

  return (
    <section className="py-20" id="pricing">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold">{title}</h2>
        {subtitle && <p className="text-muted-foreground mt-2 text-sm md:text-base">{subtitle}</p>}

        <Card
          className="
            mt-10 mx-auto rounded-3xl overflow-hidden 
            flex flex-col md:flex-row 
            border bg-card/60 backdrop-blur shadow-lg
          "
        >
          <CardContent
            className="
              md:w-1/2 p-6 md:p-10 
              text-left
            "
          >
            <div className="font-semibold text-xl mb-4">{benefitsTitle}</div>

            <ul className="space-y-4">
              {benefits.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-sm md:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>

          <CardHeader
            className="
              md:w-1/2 p-6 md:p-10 
              flex flex-col justify-between text-center md:text-left
            "
          >
            <div className="text-center w-full">
              <CardTitle className="text-2xl font-bold">{priceLabel}</CardTitle>

              <div className="text-5xl font-extrabold mt-3 tracking-tight">{priceValue}</div>
            </div>

            <Link href="/pay" className="mt-8 w-full ">
              <Button size="lg" className="w-full text-lg py-6 cursor-pointer">
                {buttonLabel}
              </Button>
            </Link>
          </CardHeader>
        </Card>
      </div>
    </section>
  );
}
