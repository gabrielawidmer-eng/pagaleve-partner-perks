import { ArrowRight, Sparkles, Target, Zap, TrendingUp, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import html2canvas from "html2canvas";
import { useToast } from "@/hooks/use-toast";

// Import logos
import logoYampi from '@/assets/logo-yampi.svg';
import logoAlura from '@/assets/logo-alura.png';
import logoBonifiq from '@/assets/logo-bonifiq.png';
import logoLinxCommerce from '@/assets/logo-linx-commerce.png';
import logoPluggto from '@/assets/logo-pluggto.png';
import logoV10x from '@/assets/logo-v10x.png';

const logoMap: Record<string, string> = {
  'Yampi': logoYampi,
  'Alura': logoAlura,
  'Bonifiq': logoBonifiq,
  'Linx Commerce': logoLinxCommerce,
  'PluggTo': logoPluggto,
  'V10X': logoV10x,
};

const topBenefits = [
  { empresa: "Yampi", beneficio: "90 dias grátis + migração gratuita", tier: "T1" },
  { empresa: "Alura", beneficio: "20 dias grátis + desconto em licenças", tier: "T1" },
  { empresa: "V10X", beneficio: "Diagnóstico grátis + 30% desconto", tier: "T1" },
  { empresa: "PluggTo", beneficio: "R$ 500 em créditos + setup grátis", tier: "T2" },
  { empresa: "Linx Commerce", beneficio: "25% desconto em setup e mensalidade", tier: "T1" },
  { empresa: "Bonifiq", beneficio: "Migração grátis + 3 meses grátis", tier: "T2" },
];

const tierColors: Record<string, string> = {
  T1: "bg-tier-1 text-white",
  T2: "bg-tier-2 text-white",
  T3: "bg-tier-3 text-white",
};

const Presentation = () => {
  const { toast } = useToast();

  const handleDownloadPNG = async () => {
    const element = document.getElementById('presentation-container');
    if (!element) return;

    toast({
      title: "Gerando imagem...",
      description: "Aguarde enquanto criamos seu PNG em alta qualidade.",
    });

    try {
      const canvas = await html2canvas(element, {
        scale: 2, // Alta qualidade (2x resolução)
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const link = document.createElement('a');
      link.download = 'clube-beneficios-pagaleve.png';
      link.href = canvas.toDataURL('image/png');
      link.click();

      toast({
        title: "Download concluído!",
        description: "Sua imagem foi baixada com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao gerar imagem",
        description: "Tente novamente ou use um screenshot manual.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background overflow-x-auto relative">
      {/* Download Button - Fixed position */}
      <Button
        onClick={handleDownloadPNG}
        className="fixed top-4 right-4 z-50 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
        size="lg"
      >
        <Download className="w-5 h-5 mr-2" />
        Baixar PNG
      </Button>

      <div id="presentation-container" className="flex flex-row h-screen w-max">
        {/* SEÇÃO 1 - HERO */}
        <section className="w-[28vw] min-w-[400px] h-screen flex flex-col justify-center items-center p-12 relative overflow-hidden border-r border-border/30">
          {/* Decorative blurs */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
          
          <div className="relative z-10 text-center">
            <div className="mb-8 flex justify-center">
              <div className="w-24 h-24 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-12 h-12 text-primary" />
              </div>
            </div>
            
            <h1 className="font-heading font-bold text-5xl text-foreground mb-6 leading-tight">
              Clube de<br />Benefícios<br />Pagaleve
            </h1>
            
            <div className="bg-primary/10 rounded-2xl p-6 mb-8 backdrop-blur-sm">
              <p className="text-2xl font-bold text-primary mb-2">
                Economize milhares
              </p>
              <p className="text-lg text-muted-foreground">
                de reais por ano
              </p>
            </div>
            
            <p className="text-lg text-muted-foreground">
              Benefícios exclusivos para<br />acelerar seu e-commerce
            </p>
          </div>
        </section>

        {/* SEÇÃO 2 - PROPOSTA DE VALOR */}
        <section className="w-[28vw] min-w-[400px] h-screen flex flex-col justify-center p-12 border-r border-border/30">
          <h2 className="font-heading font-bold text-3xl text-foreground mb-8 text-center">
            Por que participar?
          </h2>
          
          <div className="space-y-4">
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-1">
                    Economia Real
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Milhares de reais em descontos e benefícios exclusivos
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-1">
                    Parceiros Premium
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    30+ empresas líderes de mercado
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-1">
                    Acesso Exclusivo
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Benefícios não disponíveis ao público
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-1">
                    Zero Custo
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Sem mensalidade, sem taxas de adesão
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* SEÇÃO 3 - BENEFÍCIOS EM DESTAQUE */}
        <section className="w-[35vw] min-w-[500px] h-screen flex flex-col justify-center p-12 border-r border-border/30">
          <h2 className="font-heading font-bold text-3xl text-foreground mb-8 text-center">
            Benefícios em Destaque
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            {topBenefits.map((benefit, index) => (
              <Card 
                key={index} 
                className="p-5 hover:shadow-lg transition-shadow bg-card border-border"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                    {logoMap[benefit.empresa] ? (
                      <img 
                        src={logoMap[benefit.empresa]} 
                        alt={benefit.empresa}
                        className="w-full h-full object-contain p-1.5"
                      />
                    ) : (
                      <span className="text-lg font-bold text-primary">
                        {benefit.empresa.charAt(0)}
                      </span>
                    )}
                  </div>
                  <Badge className={`${tierColors[benefit.tier]} text-xs px-2 py-0.5`}>
                    {benefit.tier}
                  </Badge>
                </div>
                
                <h3 className="font-semibold text-sm text-foreground mb-2">
                  {benefit.empresa}
                </h3>
                
                <p className="text-xs text-primary font-medium leading-relaxed">
                  {benefit.beneficio}
                </p>
              </Card>
            ))}
          </div>
          
          <p className="text-center text-sm text-muted-foreground mt-6">
            + muitos outros benefícios exclusivos
          </p>
        </section>

        {/* SEÇÃO 4 - CTA + ESTATÍSTICAS */}
        <section className="w-[25vw] min-w-[350px] h-screen flex flex-col justify-center items-center p-12 relative overflow-hidden">
          {/* Decorative blur */}
          <div className="absolute top-1/3 left-1/2 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
          
          <div className="relative z-10 text-center w-full">
            <div className="mb-10">
              <div className="grid grid-cols-1 gap-6 mb-8">
                <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                  <div className="text-4xl font-bold text-primary mb-2">30+</div>
                  <div className="text-sm text-muted-foreground">Parceiros Premium</div>
                </div>
                
                <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                  <div className="text-4xl font-bold text-primary mb-2">8</div>
                  <div className="text-sm text-muted-foreground">Categorias de Benefícios</div>
                </div>
                
                <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                  <div className="text-4xl font-bold text-primary mb-2">R$ 10k+</div>
                  <div className="text-sm text-muted-foreground">Economia potencial/ano</div>
                </div>
              </div>
            </div>
            
            <Button 
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all group"
              onClick={() => window.location.href = '/#contato'}
            >
              Quero fazer parte
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button
              variant="ghost"
              className="mt-4 text-muted-foreground hover:text-foreground"
              onClick={() => window.location.href = '/'}
            >
              Ver site completo
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Presentation;
