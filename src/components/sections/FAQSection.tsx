import { FAQ_ITEMS } from "@/lib/constants";
import {
  AnimatedSection,
  SectionHeading,
} from "@/components/animations/AnimatedSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQSection() {
  return (
    <AnimatedSection className="section-padding bg-white" id="faq">
      <div className="container-narrow max-w-3xl">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions You May Have"
          description="Find answers to common questions about our counselling and coaching services."
        />

        <Accordion type="single" collapsible className="w-full">
          {FAQ_ITEMS.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-hope-900">
                {item.question}
              </AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </AnimatedSection>
  );
}
