import { AuthorSection } from "@/components/home/author";
import CourseBenefits from "@/components/home/course-benefits";
import { Hero } from "@/components/home/hero";
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
    </div>
  );
}
