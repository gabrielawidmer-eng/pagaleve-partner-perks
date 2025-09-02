import { useState } from "react";
import { Send, Mail, Building2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cnpj: "",
    mensagem: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would normally send the form data to a backend
    console.log("Form submitted:", formData);
    
    toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.");
    
    // Reset form
    setFormData({
      nome: "",
      email: "",
      cnpj: "",
      mensagem: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contato" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Column - Info */}
            <div>
              <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-6">
                Fale com a gente
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Tem dúvidas sobre o Clube de Benefícios? Quer se tornar um parceiro? 
                Entre em contato e nossa equipe responderá o mais breve possível.
              </p>

              {/* Contact Cards */}
              <div className="space-y-4">
                <div className="bg-gradient-card rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Para lojistas
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Dúvidas sobre benefícios e elegibilidade
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-card rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Para parceiros
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Interessado em oferecer benefícios
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="bg-card rounded-2xl p-8 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="nome" className="text-foreground font-medium">
                    Nome completo *
                  </Label>
                  <Input
                    id="nome"
                    name="nome"
                    type="text"
                    required
                    value={formData.nome}
                    onChange={handleChange}
                    className="mt-2 rounded-xl"
                    placeholder="Seu nome"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-foreground font-medium">
                    E-mail corporativo *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-2 rounded-xl"
                    placeholder="seu@email.com.br"
                  />
                </div>

                <div>
                  <Label htmlFor="cnpj" className="text-foreground font-medium">
                    CNPJ da empresa
                  </Label>
                  <Input
                    id="cnpj"
                    name="cnpj"
                    type="text"
                    value={formData.cnpj}
                    onChange={handleChange}
                    className="mt-2 rounded-xl"
                    placeholder="00.000.000/0000-00"
                  />
                </div>

                <div>
                  <Label htmlFor="mensagem" className="text-foreground font-medium">
                    Mensagem *
                  </Label>
                  <Textarea
                    id="mensagem"
                    name="mensagem"
                    required
                    value={formData.mensagem}
                    onChange={handleChange}
                    className="mt-2 rounded-xl min-h-[120px]"
                    placeholder="Como podemos ajudar?"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold rounded-full"
                >
                  Enviar mensagem
                  <Send className="ml-2 w-5 h-5" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;