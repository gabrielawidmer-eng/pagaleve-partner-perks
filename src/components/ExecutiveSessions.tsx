import { useState } from "react";
import { Calendar } from "lucide-react";
import sessionsData from "@/data/sessions.json";
import ExecutiveSessionModal from "./ExecutiveSessionModal";

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

const ExecutiveSessions = () => {
  const [selectedSession, setSelectedSession] = useState<ExecutiveSession | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSessionClick = (session: ExecutiveSession) => {
    setSelectedSession(session);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedSession(null), 300);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">Sessões Executivas Pagaleve</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto mb-6 leading-relaxed">
            Os nossos <b>embaixadores</b> agora têm acesso a um benefício inédito: uma hora de mentoria com diretores da
            Pagaleve. Cada sessão é uma oportunidade para discutir seu negócio com especialistas que vivem a
            transformação do varejo e da tecnologia todos os dias.
          </p>
          <p className="text-lg text-foreground font-semibold flex items-center justify-center gap-2">
            Escolha o tema mais estratégico para o seu momento e acelere o crescimento da sua loja com quem entende do
            assunto.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessionsData.map((session) => (
            <div
              key={session.id}
              className="group bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              onClick={() => handleSessionClick(session as ExecutiveSession)}
            >
              {/* Photo */}
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20 group-hover:border-primary/40 transition-colors">
                  <img src={session.foto} alt={session.nome} className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-heading font-bold text-primary mb-2 text-center">{session.tema}</h3>

              {/* Name and Position */}
              <div className="text-center mb-4">
                <p className="font-semibold text-foreground">{session.nome}</p>
                <p className="text-sm text-muted-foreground">{session.cargo}</p>
              </div>

              {/* Pitch */}
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-6">{session.pitch}</p>

              {/* CTA Button */}
              <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-4 rounded-full transition-colors flex items-center justify-center gap-2 group-hover:shadow-lg">
                <Calendar className="w-4 h-4" />
                Agende seu horário
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <ExecutiveSessionModal session={selectedSession} isOpen={isModalOpen} onClose={handleCloseModal} />
    </section>
  );
};

export default ExecutiveSessions;
