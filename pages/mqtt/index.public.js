import { useState, useEffect } from "react";

import TableMqtt from "./Table";
import Send from "./Send";

export default function Mqtt() {
  const [topics, setTopics] = useState([]);
  const [selectedTopicIds, setSelectedTopicIds] = useState([]); // IDs dos tópicos selecionados
  const [loading, setLoading] = useState(false);

  // Função para buscar os tópicos disponíveis
  const fetchTopics = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/topics");
      const data = await res.json();
      if (data.success) {
        setTopics(data.data); // Assume que o backend retorna uma lista de tópicos
      }
    } catch (error) {
      console.error("Erro ao buscar tópicos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Função para lidar com a mudança dos checkboxes
  const handleCheckboxChange = (topicId) => {
    setSelectedTopicIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(topicId)) {
        // Se o ID já está selecionado, remove-o
        return prevSelectedIds.filter((id) => id !== topicId);
      } else {
        // Caso contrário, adiciona o ID ao estado
        return [...prevSelectedIds, topicId];
      }
    });
  };

  // Filtra os tópicos selecionados para obter os nomes dos tópicos
  const selectedTopicNames = topics
    .filter((topic) => selectedTopicIds.includes(topic.id))
    .map((topic) => topic.title); // Assume que o campo `name` contém o nome do tópico

  // Inscrição nos tópicos selecionados

  // Carrega os tópicos quando o componente é montado
  useEffect(() => {
    fetchTopics();
  }, []);

  // Derivar informações dos tópicos selecionados
  const selectedTopics = topics.filter((topic) =>
    selectedTopicIds.includes(topic.id)
  );

  return (
    <main className="container mx-auto min-h-screen flex flex-col items-center justify-center p-4">
      <div className="grid xl:grid-cols-3 grid-cols-1 gap-10">
        <div className="topicos">
          <h1 className="text-2xl font-bold mb-4">Tópicos para se inscrever</h1>

          {/* Exibe um carregamento enquanto busca os tópicos */}
          {loading ? (
            <p>Carregando tópicos...</p>
          ) : (
            <>
              {topics.length > 0 ? (
                <>
                  <div className="mb-4">
                    {topics.map((topic) => (
                      <div key={topic.id} className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          id={`topic-${topic.id}`}
                          value={topic.id}
                          checked={selectedTopicIds.includes(topic.id)} // Verifica se o tópico está selecionado
                          onChange={() => handleCheckboxChange(topic.id)} // Atualiza o estado
                          className="mr-2"
                        />
                        <label htmlFor={`topic-${topic.id}`}>
                          {topic.title}
                        </label>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p>Nenhum tópico disponível.</p>
              )}
            </>
          )}
        </div>
        <TableMqtt topics={selectedTopicNames}></TableMqtt>
        <Send></Send>
      </div>
    </main>
  );
}
