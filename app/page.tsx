import { AuthorSection } from "@/components/home/author";
import CourseBenefits from "@/components/home/course-benefits";
import { CourseModules } from "@/components/home/course-module";
import { FAQ } from "@/components/home/faq";
import { FinalCTA } from "@/components/home/final-cta";
import { Footer } from "@/components/home/footer";
import { ForWhom } from "@/components/home/for-whom";
import { Hero } from "@/components/home/hero";
import { Pricing } from "@/components/home/pricing";
import { Testimonials } from "@/components/home/testimonials";
import { getPageContent } from "@/lib/translations/content";
import { getLanguage } from "@/lib/translations/language";

export default async function HomePage() {
  const lang = await getLanguage();

  const content = await getPageContent("home", lang);

  return (
    <div className="pt-20">
      <Hero content={content.hero} />
      <CourseBenefits content={content.benefits} />
      <AuthorSection content={content.aboutAuthor} />
      <CourseModules content={content.courseModules} />
      <ForWhom content={content.forWhom} />
      <Testimonials content={content.testimonials} />
      <Pricing content={content.pricing} />
      <FAQ content={content.faq} />
      <FinalCTA content={content.finalCta} />
      <Footer content={content.footer} />
    </div>
  );
}
