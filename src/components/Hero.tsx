import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-subtle" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 px-6 py-3 rounded-full mb-8">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-primary font-semibold">Lançamento Novembro 2025</span>
          </div>

          {/* Headline */}
          <h1 className="font-heading font-black text-5xl md:text-6xl lg:text-7xl text-foreground mb-6 leading-tight">
            Clube de Benefícios
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Pagaleve
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            Parcerias que potencializam seu e-commerce com condições exclusivas para quem é Pagaleve
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              onClick={() => scrollToSection("beneficios")}
              size="lg"
              className="bg-gradient-primary hover:opacity-90 text-primary-foreground font-bold rounded-full px-10 py-6 text-lg shadow-glow"
            >
              Explorar benefícios
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              onClick={() => scrollToSection("parceiro")}
              size="lg"
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary/10 font-bold rounded-full px-10 py-6 text-lg"
            >
              Sou parceiro e quero participar
            </Button>
          </div>

          {/* Visual Cards Preview */}
          <div className="relative max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { color: "bg-primary/20", label: "CRM", discount: "20% OFF" },
                { color: "bg-secondary/20", label: "Logística", discount: "15% OFF" },
                { color: "bg-accent/20", label: "Marketing", discount: "3 meses grátis" },
              ].map((card, index) => (
                <div
                  key={index}
                  className={`${card.color} backdrop-blur-sm rounded-2xl p-6 transform hover:scale-105 transition-transform`}
                >
                  <div className="w-16 h-16 bg-background rounded-xl mb-4" />
                  <p className="text-sm text-muted-foreground mb-2">{card.label}</p>
                  <p className="font-heading font-bold text-lg text-foreground">
                    {card.discount}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;