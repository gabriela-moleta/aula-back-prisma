import PersonagemModel from "../models/personagemModel.js";

class PersonagemController {
  // GET /api/personagens
  async getAllPersonagem(req, res) {
    try {
      const personagens = await PersonagemModel.findAll();
      res.json(personagens);
    } catch (error) {
      console.error("Erro ao buscar personagens:", error);
      res.status(500).json({ error: "Erro ao buscar personagens" });
    }
  }

  // GET /api/personagens/:id
  async getPersonagemById(req, res) {
    try {
      const { id } = req.params;

      const personagens = await PersonagemModel.findById(id);

      if (!personagens) {
        return res.status(404).json({ error: "Personagem não encontrado" });
      }

      res.json(personagens);
    } catch (error) {
      console.error("Erro ao buscar personagens:", error);
      res.status(500).json({ error: "Erro ao buscar personagens" });
    }
  }

  // POST /api/personagens
  async createPersonagem(req, res) {
    console.log("Requisição recebida:", req.body); // Log da requisição recebida
    
    try {
      // Validação básica
      const {
        name,
        description,
        age,
        power,
        anime
      } = req.body;

      

      // Verifica se o título do personagens foi fornecido

      if (
        !name ||
        !description ||
        !age ||
        !power ||
        !anime 
      ) {
        return res
          .status(400)
          .json({ error: "Todos os campos são obrigatórios" });
      }

      // Criar o novo personagens
      const newPersonagem = await PersonagemModel.create(
        name,
        description,
        age,
        power,
        anime
      );

      if (!newPersonagem) {
        return res.status(400).json({ error: "Erro ao criar personagens" });
      }

      res.status(201).json(newPersonagem);
    } catch (error) {
      console.error("Erro ao criar personagens:", error);
      res.status(500).json({ error: "Erro ao criar personagens" });
    }
  }

  // PUT /api/personagens/:id
  async updatePersonagem(req, res) {
    try {
      const { id } = req.params;
      const {
        name,
        description,
        age,
        power,
        anime
      } = req.body;

      // Atualizar o personagens
      const updatedPersonagem = await PersonagemModel.update(
        id,
        name,
        description,
        age,
        power,
        anime
      );

      if (!updatedPersonagem) {
        return res.status(404).json({ error: "Personagem não encontrado" });
      }

      res.json(updatedPersonagem);
    } catch (error) {
      console.error("Erro ao atualizar personagens:", error);
      res.status(500).json({ error: "Erro ao atualizar personagens" });
    }
  }

  // DELETE /api/personagens/:id
  async deletePersonagem(req, res) {
    try {
      const { id } = req.params;

      // Remover o personagens
      const result = await PersonagemModel.delete(id);

      if (!result) {
        return res.status(404).json({ error: "Personagem não encontrado" });
      }

      res.status(204).end(); // Resposta sem conteúdo
    } catch (error) {
      console.error("Erro ao remover personagens:", error);
      res.status(500).json({ error: "Erro ao remover personagens" });
    }
  }
}

export default new PersonagemController();