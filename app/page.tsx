import { getPageContent } from "@/lib/translations/content";
import { getLanguage } from "@/lib/translations/language";

export default async function HomePage() {
  const lang = await getLanguage();

  const content = await getPageContent("home", lang);

  return (
    <div className="mt-20">
      <h1>{content.home_title}</h1>
      <p>{content.home_subtitle}</p>
    </div>
  );
}
