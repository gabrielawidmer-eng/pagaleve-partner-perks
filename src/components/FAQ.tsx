import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import faqsData from "@/data/faqs.json";

const FAQ = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section id="faq" className="py-20 bg-muted/10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-lg text-muted-foreground">
              Tire suas dúvidas sobre o Clube de Benefícios Pagaleve
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqsData.map((faq) => (
              <div
                key={faq.id}
                className="bg-card rounded-2xl shadow-md hover:shadow-lg transition-shadow"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span className="font-semibold text-foreground pr-4">
                    {faq.pergunta}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-primary flex-shrink-0 transition-transform ${
                      openItems.includes(faq.id) ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openItems.includes(faq.id) && (
                  <div className="px-6 pb-5">
                    <div className="pt-2 border-t border-border">
                      <p className="text-muted-foreground mt-4">
                        {faq.resposta}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;