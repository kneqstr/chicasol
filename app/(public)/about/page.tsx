import { AuthorHero } from "@/components/about/author-hero";
import { AuthorStats } from "@/components/about/author-stats";
import { AuthorStory } from "@/components/about/author-story";
import { AuthorVideoMessage } from "@/components/about/author-video";
import { CertificatesGrid } from "@/components/about/certificates-grid";
import { PracticeGallery } from "@/components/about/practice-gallery";
import { SocialProof } from "@/components/about/social-proof";
import { TeachingPhilosophy } from "@/components/about/teaching-philosophy";

import { getPageContent } from "@/lib/translations/content";
import { getLanguage } from "@/lib/translations/language";

export default async function AboutPage() {
  const lang = await getLanguage();
  const content = await getPageContent("about", lang);

  return (
    <div className="pt-20">
      <AuthorHero content={content.author.hero} />
      <AuthorStory content={content.authorStory} />
      <AuthorStats content={content.author.stats} />
      <TeachingPhilosophy content={content.teachingPhilosophy} />
      <CertificatesGrid content={content.certificates} />
      <PracticeGallery content={content.practiceGallery} />
      <AuthorVideoMessage content={content.videoMessage} />
      <SocialProof content={content.author.socials} />
    </div>
  );
}
