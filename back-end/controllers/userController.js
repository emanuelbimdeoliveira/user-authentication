import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { getJwtConfig } from "../config/jwt.js";

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

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
};

const getUserById = (req, res) => {
  const id = Number(req.params.id);

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
};

const loginByEmail = (req, res) => {
  const { email, password } = req.body;

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

    const { secret, expiresIn } = getJwtConfig();

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      secret,
      {
        expiresIn: expiresIn,
      },
    );

    return res.json({
      mensagem: "Login realizado com sucesso",
      token,
    });
  });
};

const getProfile = (req, res) => {
  const id = req.user.id;

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
};

export { createUser, getUserById, loginByEmail, getProfile };
