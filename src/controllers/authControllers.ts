import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ValidationError } from 'sequelize';
import CompanyRepository from '../repositories/CompanyRepository';
import CompanyService from '../services/companyService';

// Initialize the repository and service
const companyRepository = new CompanyRepository();
const companyService = new CompanyService(companyRepository);

export default class AuthController {
  public static async signup(req: Request, res: Response): Promise<void> {
    try {
      const companyData = req.body;
      const { password } = req.body;

      if (!password) {
        throw new Error('Password is required');
      }

      const saltRounds = parseInt(process.env.SALT_ROUND || '10', 10);

      const hashedPassword = await bcrypt.hash(password, saltRounds);

      req.body.password = hashedPassword;
      console.log(companyData);
      const newCompany = await companyService.create(companyData);

      const token = jwt.sign(
        {
          data: newCompany,
        },
        'secret',
        { expiresIn: '8h' },
      );

      res.status(201).json(token);
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(500).json({ error: error.errors });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }
}
