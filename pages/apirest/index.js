import { useState, useEffect } from "react";
import ApiDocumentation from "./ApiDocumentation";
import { useRouter } from "next/router";

export default function ApiRestViewer() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEndpoint, setSelectedEndpoint] = useState(null);
  const [formData, setFormData] = useState({}); // Dados do formulário
  const [apiResponse, setApiResponse] = useState(null);

  const router = useRouter();

  // Fetch all topics from API
  const fetchTopics = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/topics");
      const data = await res.json();
      if (data.success) {
        setTopics(data.data);
      }
    } catch (error) {
      console.error("Erro ao buscar tópicos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Envia o formulário
  const handleFormSubmit = async () => {
    if (!selectedEndpoint) return;
    const { method, route } = selectedEndpoint;

    try {
      const res = await fetch(route, {
        method,
        headers: { "Content-Type": "application/json" },
        body: method !== "GET" ? JSON.stringify(formData) : undefined,
      });
      const data = await res.json();
      setApiResponse({ status: res.status, data }); // Armazena a resposta da API
      setSelectedEndpoint(null);
      if (data.success) {
        fetchTopics();

        setFormData({});
      }
    } catch (error) {
      setApiResponse({ status: "Erro", data: { error: error.message } });
      console.error("Erro ao enviar requisição:", error);
    }
  };

  // Endpoints da API
  const apiEndpoints = [
    {
      method: "GET",
      route: "/api/topics",
      description: "Obter a lista de todos os tópicos.",
    },
    {
      method: "POST",
      route: "/api/topics",
      description: "Criar um novo tópico com título e descrição.",
    },
    {
      method: "PUT",
      route: "/api/topics",
      description: "Atualizar um tópico existente.",
    },
    {
      method: "DELETE",
      route: "/api/topics",
      description: "Excluir um tópico existente.",
    },
  ];

  // Atualiza o estado do formData inicial quando um endpoint é selecionado
  useEffect(() => {
    if (selectedEndpoint) {
      setApiResponse(null);
      const { method } = selectedEndpoint;

      switch (method) {
        case "POST":
          setFormData({ title: "", description: "" });
          break;
        case "PUT":
          setFormData({ id: "", updatedTitle: "", updatedDescription: "" });
          break;
        case "DELETE":
          setFormData({ deleteId: "" });
          break;
        default:
          setFormData({});
      }
    }
  }, [selectedEndpoint]);

  const navigateToMqtt = () => {
    router.push("/mqtt");
  };

  // Renderiza os campos do formulário dinamicamente
  const renderFormFields = () => {
    if (!selectedEndpoint) return null;

    const { method } = selectedEndpoint;

    switch (method) {
      case "POST":
        return (
          <>
            <label className="block mb-2 font-medium text-gray-700">
              Dados da Requisição (JSON):
            </label>
            <textarea
              className="w-full p-2 border rounded mb-4 font-mono text-sm"
              rows="8"
              value={JSON.stringify(formData, null, 2)} // Exibe o JSON formatado
              onChange={(e) => {
                try {
                  const parsedData = JSON.parse(e.target.value); // Tenta converter o valor para objeto
                  setFormData(parsedData); // Atualiza o estado com o objeto válido
                } catch (err) {
                  console.error("JSON inválido:", err); // Exibe erro no console se o JSON for inválido
                }
              }}
            />
            <p className="text-sm text-gray-500">
              Edite o JSON diretamente no campo acima. Certifique-se de que o
              JSON seja válido.
            </p>
          </>
        );

      case "PUT":
        return (
          <>
            <label className="block mb-2 font-medium text-gray-700">
              Dados da Requisição (JSON):
            </label>
            <textarea
              className="w-full p-2 border rounded mb-4 font-mono text-sm"
              rows="8"
              value={JSON.stringify(formData, null, 2)} // Exibe o JSON formatado
              onChange={(e) => {
                try {
                  const parsedData = JSON.parse(e.target.value); // Tenta converter o valor para objeto
                  setFormData(parsedData); // Atualiza o estado com o objeto válido
                } catch (err) {
                  console.error("JSON inválido:", err); // Exibe erro no console se o JSON for inválido
                }
              }}
            />
            <p className="text-sm text-gray-500">
              Edite o JSON diretamente no campo acima. Certifique-se de que o
              JSON seja válido.
            </p>
          </>
        );

      case "DELETE":
        return (
          <>
            <label className="block mb-2 font-medium text-gray-700">
              Dados da Requisição (JSON):
            </label>
            <textarea
              className="w-full p-2 border rounded mb-4 font-mono text-sm"
              rows="8"
              value={JSON.stringify(formData, null, 2)} // Exibe o JSON formatado
              onChange={(e) => {
                try {
                  const parsedData = JSON.parse(e.target.value); // Tenta converter o valor para objeto
                  setFormData(parsedData); // Atualiza o estado com o objeto válido
                } catch (err) {
                  console.error("JSON inválido:", err); // Exibe erro no console se o JSON for inválido
                }
              }}
            />
            <p className="text-sm text-gray-500">
              Edite o JSON diretamente no campo acima. Certifique-se de que o
              JSON seja válido.
            </p>
          </>
        );

      default:
        return <p className="text-gray-600">Este endpoint não requer dados.</p>;
    }
  };

  return (
    <main className="container mx-auto min-h-screen p-6 ">
      <h1 className="text-2xl font-bold text-gray-700 text-center mb-6">
        Visualização da API REST
      </h1>

      {/* Documentação da API */}
      <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
        <h2 className="text-lg font-semibold text-gray-600 mb-4">
          Endpoints da API
        </h2>
        {apiEndpoints.map((endpoint, index) => (
          <button
            key={index}
            className="block w-full text-left mb-2 p-2  rounded"
            onClick={() => setSelectedEndpoint(endpoint)}
          >
            <ApiDocumentation
              method={endpoint.method}
              description={endpoint.description}
            />
          </button>
        ))}
      </div>

      {/* Formulário dinâmico */}
      {selectedEndpoint && (
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-600 mb-4">
            Requisição: {selectedEndpoint.method} - {selectedEndpoint.route}
          </h3>
          {renderFormFields()}
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleFormSubmit}
          >
            Enviar Requisição
          </button>
          <button
            className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={() => {
              setSelectedEndpoint(null);
              setFormData({});
            }}
          >
            Cancelar
          </button>
        </div>
      )}

      {apiResponse && (
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-600 mb-4">
            Resposta da API
          </h3>
          <p className="mb-2">
            <strong>Status:</strong> {apiResponse.status}
          </p>
          <pre className="bg-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
            {JSON.stringify(apiResponse.data, null, 2)}
          </pre>
        </div>
      )}

      {topics.length > 1 && (
        <div className="max-w-md w-full bg-white border border-gray-200 rounded-lg shadow-lg transition-shadow p-6 flex flex-col mt-2 gap-2">
          <p className="text-gray-600 leading-relaxed ">
            Agora vamos ver as diferenças com a comunicação de filas de
            mensagens
          </p>

          {/* Botão Principal */}
          <button
            className="px-3 py-2 w-full bg-blue-500 text-white font-medium rounded-sm hover:bg-blue-600 transition-colors self-end"
            onClick={navigateToMqtt}
          >
            Continuar
          </button>
        </div>
      )}
    </main>
  );
}
