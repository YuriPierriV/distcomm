import useMqttSubscribe from "./useMqttSubscribe";
import useMqttMessages from "./useMqttMessages";
import { useState } from "react";

export default function TableMqtt({ topics }) {
  const [messages, setMessages] = useState([]); //historico das mensagens do gps

  useMqttSubscribe(topics);

  useMqttMessages((topic, message) => {
    // Atualiza o histórico de mensagens
    setMessages((prevMessages) => {
      const updatedMessages = [
        { topic, message: message.toString(), timestamp: new Date() },
        ...prevMessages,
      ];
      return updatedMessages.slice(0, 10); // Mantém apenas as 10 mais recentes
    });
  });

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">Mensagens Recebidas</h1>

      {messages.length === 0 ? (
        <p>Nenhuma mensagem recebida ainda.</p>
      ) : (
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Tópico</th>
              <th className="border border-gray-300 p-2">Mensagem</th>
              <th className="border border-gray-300 p-2">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{msg.topic}</td>
                <td className="border border-gray-300 p-2">{msg.message}</td>
                <td className="border border-gray-300 p-2">
                  {msg.timestamp.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
