import { HeroSection } from "@/components/sections/HeroSection";
import { FounderSection } from "@/components/sections/FounderSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { JourneySection } from "@/components/sections/JourneySection";
import { StatsSection } from "@/components/sections/StatsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { ContactCTASection } from "@/components/sections/ContactCTASection";
import { faqSchema } from "@/lib/seo";
import { FAQ_ITEMS } from "@/lib/constants";

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema(FAQ_ITEMS)),
        }}
      />
      <HeroSection />
      <FounderSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <JourneySection />
      <StatsSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactCTASection />
    </>
  );
}
