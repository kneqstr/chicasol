import { getPageContent } from "@/lib/content";
import { getLanguage } from "@/lib/language";

export default async function HomePage() {
  const lang = await getLanguage();

  const content = await getPageContent("home", lang);

  return (
    <div>
      <h1>{content.home_title}</h1>
      <p>{content.home_subtitle}</p>
    </div>
  );
}
