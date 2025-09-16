import { CheckCircle, Search, MousePointer, Clock } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: CheckCircle,
      title: "Verifique seu tier",
      description: "Acesse o dashboard Pagaleve e confirme seu tier de elegibilidade",
    },
    {
      icon: Search,
      title: "Encontre o benefício",
      description: "Navegue por segmento ou use a busca para achar a solução ideal",
    },
    {
      icon: MousePointer,
      title: "Acesse e resgate",
      description: "Clique em 'Acessar benefício' e siga as instruções de resgate",
    },
  ];

  return (
    <section id="como-funciona" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4">
              Como funciona
            </h2>
            <p className="text-lg text-muted-foreground">
              Em apenas 3 passos simples, aproveite condições exclusivas
            </p>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative">
                  {/* Step Number */}
                  <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-sm">
                      {index + 1}
                    </span>
                  </div>
                  
                  {/* Icon Container */}
                  <div className="w-20 h-20 mx-auto bg-card rounded-2xl shadow-lg flex items-center justify-center mb-4">
                    <step.icon className="w-10 h-10 text-primary" />
                  </div>
                </div>

              <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
                Encontre o benefício
              </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Notice */}
          <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 flex items-start gap-4">
            <Clock className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
            <div>
              <p className="font-semibold text-foreground mb-1">
                Lançamento em Novembro de 2025
              </p>
              <p className="text-sm text-muted-foreground">
                Todos os benefícios desta fase inaugural terão validade de 6 meses,
                permitindo que você teste e aproveite as melhores soluções para seu negócio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;