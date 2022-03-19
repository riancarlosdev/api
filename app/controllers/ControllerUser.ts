import { hash, genSalt } from 'bcrypt';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { PrismaClient } from '@prisma/client';
import { Chance } from 'chance';
import { bodyUser } from '../interfaces/users_interfaces';
import { sendMail } from '../utils/send_mail';

export class ControllerUser {
  static async register(req: Request<{}, {}, bodyUser>, res: Response) {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(422).json({ erros: error.array() });
    }

    const {
      nome, sobrenome, senha, cpf, email, data_nascimento, telefone, whatsapp,
    } = req.body;

    const salt = await genSalt(8);
    const newSenha = await hash(senha, salt);

    const code = new Chance().integer({ min: 1000, max: 9999 }).toString();

    const newCpf = cpf.replace(/\./g, '').replace(/-/g, '');

    try {
      await sendMail(email, code, 'Confirmacao de conta!');
    } catch (error) {
      return res.status(501).json({
        message: 'Erro no servidor ao enviar o email.',
      });
    }

    try {
      const prisma = new PrismaClient();

      await prisma.usuarios.create({
        data: {
          nome,
          sobrenome,
          email,
          senha: newSenha,
          status: 'PEND',
          cpf: newCpf,
          nascimento: data_nascimento,
          telefone,
          whatsapp,
          codeConfirm: Number(code),
        },
      });
    } catch (error) {
      return res.status(501).json({
        message: 'Error no servidor ao cadastrar.',
        error,
      });
    }

    // CRIAR TOKEN

    return res.status(201).json({
      message: 'Conta cadastrada com sucesso.',
    });
  }
}
