import { AuthorSection } from "@/components/home/author";
import { CourseModules } from "@/components/home/course-module";
import { FAQ } from "@/components/home/faq";
import { FinalCTA } from "@/components/home/final-cta";
import { ForWhom } from "@/components/home/for-whom";
import { Hero } from "@/components/home/hero";
import { Pricing } from "@/components/home/pricing";
import { Testimonials } from "@/components/home/testimonials";
import { getPageContent } from "@/lib/translations/content";
import { getLanguage } from "@/lib/translations/language";
import { resolve } from "path";

export default async function HomePage() {
  const lang = await getLanguage();
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const content = await getPageContent("home", lang);

  return (
    <div className="pt-20">
      <Hero content={content.hero} lang={lang} />
      <CourseModules content={content.courseModules} />
      <AuthorSection content={content.aboutAuthor} />
      <ForWhom content={content.forWhom} />
      <Testimonials content={content.testimonials} />
      <Pricing content={content.pricing} lang={lang} />
      <FAQ content={content.faq} />
      <FinalCTA content={content.finalCta} />
    </div>
  );
}
