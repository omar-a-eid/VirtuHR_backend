import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ValidationError } from 'sequelize';
import CompanyRepository from '../repositories/CompanyRepository';
import CompanyService from '../services/companyService';

// Initialize the repository and service
const companyRepository = new CompanyRepository();
const companyService = new CompanyService(companyRepository);

export default class CompanyController {
  public static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const companies = await companyService.getAll();
      res.status(200).json(companies);
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(500).json({ error: error.errors });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  public static async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const company = await companyService.getById(Number(id));
      if (company) {
        res.status(200).json(company);
      } else {
        res.status(404).json({ message: 'Company not found' });
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(500).json({ error: error.errors });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

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

  public static async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const companyData = req.body;
      const [updatedCount, updatedCompanies] = await companyService.update(
        Number(id),
        companyData,
      );
      if (updatedCount > 0) {
        res.status(200).json(updatedCompanies[0]);
      } else {
        res.status(404).json({ message: 'Company not found' });
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(500).json({ error: error.errors });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  public static async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deletedCount = await companyService.delete(Number(id));
      if (deletedCount > 0) {
        res.status(200).json({ message: 'Company deleted successfully' });
      } else {
        res.status(404).json({ message: 'Company not found' });
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(500).json({ error: error.errors });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }
}
