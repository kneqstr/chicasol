import { BooksList } from "@/components/resources/books-list";
import { ResourcesHero } from "@/components/resources/hero";
import { getPageContent } from "@/lib/translations/content";
import { getLanguage } from "@/lib/translations/language";

export default async function ResoursesPage() {
  const lang = await getLanguage();
  const content = await getPageContent("resources", lang);

  return (
    <div className="pt-20">
      <ResourcesHero content={content.resHero} />
      <BooksList content={content.books} />
    </div>
  );
}
