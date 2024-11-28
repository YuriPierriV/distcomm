// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

let topics = [
  {
    id: 1,
    title: "teste",
    description: "Esse é um teste",
  },
];
const MAX_TOPICS = 10; // Limite de tópicos

export default function handler(req, res) {
  const { method } = req;
  res.setHeader("Set-Cookie", [
    `__vercel_live_token=seu_token_aqui; HttpOnly; Secure; SameSite=None; Path=/`,
  ]);

  switch (method) {
    case "GET":
      // Retorna todos os tópicos
      res.status(200).json({ success: true, data: topics });
      break;

    case "POST":
      // Cria um novo tópico
      const { title, description } = req.body;

      if (!title || !description) {
        return res.status(400).json({
          success: false,
          message: "Título e descrição são obrigatórios.",
        });
      }

      if (topics.length >= MAX_TOPICS) {
        return res.status(400).json({
          success: false,
          message:
            "Limite máximo de tópicos atingido. Exclua um tópico antes de adicionar outro.",
        });
      }

      const newTopic = {
        id: topics.length + 1,
        title,
        description,
      };

      topics.push(newTopic);
      res.status(201).json({ success: true, data: newTopic });
      break;

    case "PUT":
      // Atualiza um tópico existente
      const { id, updatedTitle, updatedDescription } = req.body;

      if (!id || !updatedTitle || !updatedDescription) {
        return res.status(400).json({
          success: false,
          message: "ID, título e descrição são obrigatórios.",
        });
      }

      const topicIndex = topics.findIndex(
        (topic) => topic.id === parseInt(id, 10)
      );

      if (topicIndex === -1) {
        return res
          .status(404)
          .json({ success: false, message: "Tópico não encontrado." });
      }

      topics[topicIndex] = {
        id: topicIndex + 1,
        title: updatedTitle,
        description: updatedDescription,
      };

      res.status(200).json({ success: true, data: topics[topicIndex] });
      break;

    case "DELETE":
      // Exclui um tópico existente
      const { deleteId } = req.body;

      if (!deleteId) {
        return res
          .status(400)
          .json({ success: false, message: "O ID do tópico é obrigatório." });
      }

      const deleteIndex = topics.findIndex(
        (topic) => topic.id === parseInt(deleteId, 10)
      );

      if (deleteIndex === -1) {
        return res
          .status(404)
          .json({ success: false, message: "Tópico não encontrado." });
      }

      const deletedTopic = topics.splice(deleteIndex, 1);

      res.status(200).json({ success: true, data: deletedTopic });
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Método ${method} não permitido`);
  }
}
