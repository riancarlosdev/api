import { Request, Response } from "express";
import { validationResult } from "express-validator";


export class ControllerUser {

  static async register(req: Request, res: Response) {
    const error = validationResult(req)
    
    if(!error.isEmpty()) {
      return res.status(422).json({erros: error.array()})
    }

    return res.status(201).json({message: 'Cadastrado com sucesso.'})
  }
}