import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { isCPF, isDate } from 'brazilian-values';
import { validate } from 'email-validator';
import { bodyUser } from '../interfaces/users_interfaces';

export default function valideRegisterUser() {
  const valideCampos = (req: Request<{}, {}, bodyUser>, res: Response, next: NextFunction) => {
    const {
      senha, confirm_senha, email, cpf, data_nascimento,
    } = req.body;

    if (senha !== confirm_senha) {
      return res.status(422).json({
        erros: {
          message: 'Senhas invalidas',
        },
      });
    }

    if (!validate(email)) {
      return res.status(422).json({
        erros: {
          message: 'E-mail invalido',
        },
      });
    }

    if (!isCPF(cpf)) {
      return res.status(422).json({
        erros: {
          message: 'CPF invalido',
        },
      });
    }

    if (!isDate(data_nascimento)) {
      return res.status(422).json({
        erros: {
          message: 'Data de nascimento invalida',
          data_nascimento,
        },
      });
    }

    next();
  };

  const expressBody = () => [
    body('nome').isLength({ max: 12, min: 3 }).notEmpty(),
    body('sobrenome').isLength({ max: 13, min: 3 }).notEmpty(),
    body('email').isLength({ max: 110, min: 8 }).notEmpty(),
    body('data_nascimento').isLength({ max: 11, min: 10 }).notEmpty(),
    body('cpf').isLength({ max: 15, min: 14 }).notEmpty(),
    body('senha').isLength({ max: 16, min: 6 }).notEmpty(),
    body('confirm_senha').isLength({ max: 16, min: 6 }).notEmpty(),
    body('telefone').isLength({ max: 13, min: 10 }),
    body('whatsapp').isLength({ max: 13, min: 9 }),
  ];

  return { expressBody, valideCampos };
}
