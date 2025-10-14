import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, ExternalLink } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

interface ExecutiveSession {
  id: string;
  nome: string;
  cargo: string;
  foto: string;
  tema: string;
  pitch: string;
  valores: string[];
  exemplo: string;
}

interface ExecutiveSessionModalProps {
  session: ExecutiveSession | null;
  isOpen: boolean;
  onClose: () => void;
}

const formSchema = z.object({
  fullName: z.string().min(2, "Nome completo é obrigatório").max(100, "Nome muito longo"),
  company: z.string().min(2, "Nome da empresa é obrigatório").max(100, "Nome muito longo"),
  phone: z.string().min(10, "Telefone inválido").max(20, "Telefone inválido"),
  email: z.string().email("Email inválido").max(255, "Email muito longo"),
  availableDates: z.string().min(10, "Informe pelo menos uma opção de data e horário").max(500, "Texto muito longo"),
});

type FormData = z.infer<typeof formSchema>;

const ExecutiveSessionModal = ({ session, isOpen, onClose }: ExecutiveSessionModalProps) => {
  const [showForm, setShowForm] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  if (!session) return null;

  const onSubmit = (data: FormData) => {
    console.log("Session request data:", data);
    toast.success("Agendamento solicitado com sucesso! Em breve entraremos em contato.");
    
    setTimeout(() => {
      reset();
      setShowForm(false);
      onClose();
    }, 1500);
  };

  const handleSchedule = () => {
    setShowForm(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        setShowForm(false);
        reset();
      }
      onClose();
    }}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {!showForm ? (
          <>
            <DialogHeader>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src={session.foto} 
                    alt={session.nome}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <DialogTitle className="text-2xl font-heading font-bold text-foreground mb-1">
                    {session.tema}
                  </DialogTitle>
                  <p className="text-lg font-semibold text-muted-foreground">{session.nome}</p>
                  <p className="text-sm text-muted-foreground">{session.cargo}</p>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-6">
              {/* Pitch */}
              <div className="bg-muted/50 rounded-xl p-6">
                <p className="text-foreground leading-relaxed">
                  {session.pitch}
                </p>
              </div>

              {/* Valores */}
              <div>
                <h4 className="font-semibold text-foreground mb-4">
                  Valor para o lojista:
                </h4>
                <ul className="space-y-3">
                  {session.valores.map((valor, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-primary text-xl mt-0.5">•</span>
                      <span className="text-muted-foreground flex-1">{valor}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exemplo de entrega */}
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Exemplo de entrega
                </h4>
                <p className="text-sm text-muted-foreground">
                  {session.exemplo}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleSchedule}
                  size="lg"
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full"
                >
                  Agende seu horário
                  <Calendar className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  onClick={onClose}
                  variant="outline"
                  size="lg"
                  className="rounded-full"
                >
                  Fechar
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-heading font-bold text-foreground mb-2">
                Agendar Sessão Executiva
              </DialogTitle>
              <DialogDescription>
                Preencha os dados abaixo para solicitar uma sessão de "{session.tema}" com {session.nome}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Nome Completo</Label>
                  <Input
                    id="fullName"
                    {...register("fullName")}
                    placeholder="Seu nome completo"
                    className="mt-2"
                  />
                  {errors.fullName && (
                    <p className="text-sm text-destructive mt-1">{errors.fullName.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="company">Nome da sua empresa</Label>
                  <Input
                    id="company"
                    {...register("company")}
                    placeholder="Nome da empresa"
                    className="mt-2"
                  />
                  {errors.company && (
                    <p className="text-sm text-destructive mt-1">{errors.company.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Seu telefone</Label>
                  <Input
                    id="phone"
                    {...register("phone")}
                    placeholder="(00) 00000-0000"
                    className="mt-2"
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Seu email corporativo</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="seu.email@empresa.com"
                    className="mt-2"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="availableDates">
                    Três opções de data e horário disponíveis
                  </Label>
                  <Textarea
                    id="availableDates"
                    {...register("availableDates")}
                    placeholder="Exemplo:&#10;1. Segunda-feira, 20/01 às 14h&#10;2. Quarta-feira, 22/01 às 10h&#10;3. Sexta-feira, 24/01 às 16h"
                    className="mt-2 min-h-[120px]"
                  />
                  {errors.availableDates && (
                    <p className="text-sm text-destructive mt-1">{errors.availableDates.message}</p>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  type="submit"
                  size="lg"
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full"
                >
                  Solicitar agendamento
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowForm(false)}
                  variant="outline"
                  size="lg"
                  className="rounded-full"
                >
                  Voltar
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ExecutiveSessionModal;
