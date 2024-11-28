import { useState, useEffect } from "react";
import useMqttPublish from "./useMqttPublish";

export default function Send() {
  const [topics, setTopics] = useState([]); // Lista de tópicos disponíveis
  const [selectedTopic, setSelectedTopic] = useState(""); // Tópico selecionado
  const [message, setMessage] = useState(""); // Mensagem a ser enviada
  const [loading, setLoading] = useState(false);

  const { publishMessage, isConnected } = useMqttPublish();

  // Função para buscar os tópicos disponíveis
  const fetchTopics = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/topics");
      const data = await res.json();
      if (data.success) {
        setTopics(data.data); // Assume que o backend retorna uma lista de tópicos
        if (data.data.length > 0) {
          setSelectedTopic(data.data[0].name); // Seleciona o primeiro tópico por padrão
        }
      }
    } catch (error) {
      console.error("Erro ao buscar tópicos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Busca os tópicos na montagem do componente
  useEffect(() => {
    fetchTopics();
  }, []);

  // Lida com o envio da mensagem
  const handleSendMessage = () => {
    if (!selectedTopic) {
      alert("Por favor, selecione um tópico.");
      return;
    }
    if (!message.trim()) {
      alert("Por favor, digite uma mensagem.");
      return;
    }

    publishMessage(selectedTopic, message);
    setMessage(""); // Limpa a mensagem após o envio
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">Envie uma mensagem</h1>

      {/* Exibe um carregamento enquanto busca os tópicos */}
      {loading ? (
        <p>Carregando tópicos...</p>
      ) : (
        <>
          {/* Dropdown para selecionar o tópico */}
          {topics.length > 0 ? (
            <div className="mb-4">
              <label htmlFor="topic" className="block text-lg font-medium mb-2">
                Selecione um tópico:
              </label>
              <select
                id="topic"
                value={selectedTopic || ""} // Garante que "" é o valor inicial
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full"
              >
                {/* Opção inicial padrão */}
                <option value="" disabled>
                  Selecione um tópico
                </option>
                {topics.map((topic) => (
                  <option key={topic.name} value={topic.name}>
                    {topic.title}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <p>Nenhum tópico disponível.</p>
          )}

          {/* Input para a mensagem */}
          <div className="mb-4">
            <label htmlFor="message" className="block text-lg font-medium mb-2">
              Mensagem:
            </label>
            <input
              id="message"
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
              placeholder="Digite sua mensagem aqui"
            />
          </div>

          {/* Botão para enviar a mensagem */}
          <button
            onClick={handleSendMessage}
            disabled={!isConnected} // Desabilita se não estiver conectado
            className={`p-2 rounded w-full ${
              isConnected
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isConnected ? "Enviar Mensagem" : "Conectando..."}
          </button>
        </>
      )}
    </div>
  );
}
