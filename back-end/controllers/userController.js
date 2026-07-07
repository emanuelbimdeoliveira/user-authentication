import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import {
  idValidator,
  validateRequiredFields,
} from "../validators/userValidators.js";

import { generateToken } from "../utils/tokenGenerator.js";

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    validateRequiredFields({name, email, password});

    const hashPassword = await bcrypt.hash(password, 10);
    const creation_date = new Date().toISOString();

    userModel.create(name, email, hashPassword, creation_date, (err, id) => {
      if (err) {
        return res.status(500).json({
          erro: err.message,
        });
      }

      res.status(201).json({
        mensagem: "Usuário criado com sucesso",
        id,
      });
    });
  } catch (error) {
    return res.status(400).json({
      mensagem: error.message,
    });
  }
};

const getUserById = (req, res) => {
  try {
    const id = Number(req.params.id);
    idValidator(id);

    userModel.findById(id, (err, user) => {
      if (err) {
        return res.status(500).json({
          erro: err.message,
        });
      }

      if (!user) {
        return res.status(404).json({
          mensagem: "Usuário não encontrado",
        });
      }
      res.json(user);
    });
  } catch (error) {
    return res.status(400).json({
      mensagem: error.message,
    });
  }
};

const loginByEmail = (req, res) => {
  try {
    const { email, password } = req.body;
    validateRequiredFields({email, password});

    userModel.findByEmail(email, (err, user) => {
      if (err) {
        return res.status(500).json({
          erro: err.message,
        });
      }
      if (!user) {
        return res.status(404).json({
          mensagem: "Usuário não encontrado",
        });
      }

      const passwordMatch = bcrypt.compareSync(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({
          mensagem: "Senha incorreta",
        });
      }

      const token = generateToken(user);

      return res.json({
        mensagem: "Login realizado com sucesso",
        token,
      });
    });
  } catch (error) {
    return res.status(400).json({
      mensagem: error.message,
    });
  }
};

const getProfile = (req, res) => {
  try {
    const id = Number(req.user.id);
    idValidator(id);

    userModel.findById(id, (err, user) => {
      if (err) {
        return res.status(500).json({
          erro: err.message,
        });
      }

      if (!user) {
        return res.status(404).json({
          mensagem: "Usuário não encontrado",
        });
      }

      res.json(user);
    });
  } catch (error) {
    return res.status(400).json({
      mensagem: error.message,
    });
  }
};

export { createUser, getUserById, loginByEmail, getProfile };
