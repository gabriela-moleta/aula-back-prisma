import express from "express";
import PersonagemController from "../controllers/personagemController.js";

const personagemRouter = express.Router();

personagensRouter.get("/", PersonagemController.getAllPersonagems);

personagensRouter.get("/:id", PersonagemController.getPersonagemById);

personagensRouter.post("/", PersonagemController.createPersonagem);

personagensRouter.put("/:id", PersonagemController.updatePersonagem);

personagensRouter.delete("/:id", PersonagemController.deletePersonagem);

export default personagensRouter;