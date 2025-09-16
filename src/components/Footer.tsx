import { Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-subtle border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-xl">P</span>
                </div>
                <span className="font-heading font-bold text-xl text-foreground">
                  Pagaleve
                </span>
              </div>
              <p className="text-muted-foreground mb-4">
                O Clube de Benefícios Pagaleve oferece condições exclusivas em ferramentas essenciais para acelerar seu e-commerce.
              </p>
              <p className="text-sm text-muted-foreground">
                © {currentYear} Pagaleve. Todos os direitos reservados.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#como-funciona" className="text-muted-foreground hover:text-primary transition-colors">
                    Como funciona
                  </a>
                </li>
                  <a href="#beneficios" className="text-muted-foreground hover:text-primary transition-colors">
                    Catálogo de benefícios
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-muted-foreground hover:text-primary transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Contato</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#contato" className="text-muted-foreground hover:text-primary transition-colors">
                    Fale conosco
                  </a>
                </li>
                <li>
                  <a href="#parceiro" className="text-muted-foreground hover:text-primary transition-colors">
                    Seja um parceiro
                  </a>
                </li>
                <li>
                  <a href="https://www.pagaleve.com.br" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    Site Pagaleve
                  </a>
                </li>
                <li>
                  <a href="https://dashboard.pagaleve.com.br" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    Dashboard
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Legal */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <a href="#" className="hover:text-primary transition-colors">
                  Termos de Uso
                </a>
                <span>•</span>
                <a href="#" className="hover:text-primary transition-colors">
                  Política de Privacidade
                </a>
                <span>•</span>
                <a href="#" className="hover:text-primary transition-colors">
                  Regulamento
                </a>
              </div>

              {/* Made with love */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Feito com</span>
                <Heart className="w-4 h-4 text-primary fill-primary" />
                <span>pela equipe Pagaleve</span>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 p-4 bg-muted/50 rounded-xl">
            <p className="text-xs text-muted-foreground text-center">
              Condições sujeitas a critérios de elegibilidade e aprovação da empresa parceira. 
              Os benefícios são válidos por tempo limitado e podem ser alterados sem aviso prévio.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;