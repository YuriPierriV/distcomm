import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const router = useRouter();

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent("");
  };

  const navigateToApiRest = () => {
    router.push("/apirest");
  };

  return (
    <main className="container mx-auto min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-lg shadow-lg transition-shadow p-6 flex flex-col">
        <p className="text-gray-600 leading-relaxed">
          Este site é um guia prático para explorar dois tipos de comunicação em
          sistemas distribuídos:
        </p>
        <div className="grid grid-cols-1 justify-center xl:grid-cols-2 py-4 gap-2">
          <div className="border border-solid border-gray-200 rounded-2xl transition-all duration-500">
            <div className="p-4 justify-center align-middle self-center">
              <h4 className="text-base font-semibold text-gray-900 mb-2 capitalize transition-all duration-500">
                Cliente-Servidor
              </h4>
              <p className="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 mb-5">
                Base para um sistema distribuído
              </p>
              <button
                className="bg-blue-500 shadow-sm rounded-full py-2 px-5 text-xs text-white font-semibold"
                onClick={() => openModal("Cliente-Servidor")}
              >
                Saiba Mais
              </button>
            </div>
          </div>
          <div className="border border-solid border-gray-200 rounded-2xl transition-all duration-500">
            <div className="p-4">
              <h4 className="text-base font-semibold text-gray-900 mb-2 capitalize transition-all duration-500">
                Filas de Mensagens
              </h4>
              <p className="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 mb-5">
                Forma mais primitiva e comum, próxima à rede
              </p>
              <button
                className="bg-blue-500 shadow-sm rounded-full py-2 px-5 text-xs text-white font-semibold"
                onClick={() => openModal("Filas de Mensagens")}
              >
                Saiba Mais
              </button>
            </div>
          </div>
        </div>

        {/* Botão Principal */}
        <button
          className="px-6 py-3 bg-blue-500 text-white font-medium rounded-sm hover:bg-blue-600 transition-colors self-center"
          onClick={navigateToApiRest}
        >
          Começar Agora
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
            <h3 className="text-xl font-semibold mb-4">{modalContent}</h3>
            <h4 className="text-lg font-medium text-gray-700 mb-3">
              {modalContent === "Cliente-Servidor"
                ? "Utilizaremos API Rest"
                : "Utilizaremos o MQTT Broker"}
            </h4>
            <p className="text-gray-600">
              {modalContent === "Cliente-Servidor"
                ? "No nível mais básico, uma API é um mecanismo que permite que uma aplicação ou serviço acesse um recurso dentro de outra aplicação ou serviço. A aplicação ou o serviço que acessa os recursos é o cliente e a aplicação ou serviço que contém o recurso é o servidor. Algumas APIs, como SOAP ou XML-RPC, impõem uma estrutura rígida aos desenvolvedores. Mas os desenvolvedores podem criar APIs REST utilizando praticamente qualquer linguagem de programação e aceitar uma variedade de formatos de dados. O único requisito é que sigam os seis princípios de design REST, também conhecidos como restrições de arquitetura."
                : "O MQTT Broker é um componente central na arquitetura do protocolo MQTT (Message Queuing Telemetry Transport), que é amplamente utilizado para comunicação em redes de dispositivos conectados, especialmente na Internet das Coisas (IoT). O broker atua como um intermediário que recebe mensagens de um ou mais clientes e as encaminha para outros clientes que estão inscritos em tópicos específicos. Essa estrutura permite uma comunicação eficiente e escalável entre dispositivos, facilitando a troca de informações em tempo real."}
            </p>
            <button
              className="mt-4 gap-2 text-black font-medium rounded-sm flex items-center transition-colors"
              onClick={closeModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
              Fechar
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
