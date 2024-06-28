import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ValidationError } from 'sequelize';
import CompanyRepository from '../repositories/CompanyRepository';
import EmployeeRepository from '../repositories/EmployeeRepository';
import CompanyService from '../services/companyService';
import EmployeeService from '../services/employeeService';

// Initialize the repository and service
const companyRepository = new CompanyRepository();
const companyService = new CompanyService(companyRepository);

const employeeRepository = new EmployeeRepository();
const employeeService = new EmployeeService(employeeRepository);

export default class AuthController {
  public static async signup(req: Request, res: Response): Promise<any> {
    try {
      const {
        password,
        companySize,
        domainName,
        firstName,
        lastName,
        email,
        companyName,
        role,
      } = req.body;

      if (
        !password ||
        !companySize ||
        !domainName ||
        !firstName ||
        !lastName ||
        !companyName ||
        !email
      ) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const existingEmployee = await employeeService.findByEmail(email);

      if (existingEmployee) {
        return res.status(400).json({ error: 'Email is already in use' });
      }

      const saltRounds = parseInt(process.env.SALT_ROUND || '10', 10);
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const companyData = {
        companySize,
        domainName,
        companyName,
      };

      const newCompany = await companyService.create(companyData);

      const employeeData = {
        companyId: newCompany.id,
        firstName,
        lastName,
        password: hashedPassword,
        email,
        role: role ? role : 'employee',
      };

      const newEmployee = await employeeService.create(employeeData);

      const token = jwt.sign(
        {
          userId: newEmployee.id,
          companyId: newCompany.id,
          userRole: newEmployee.role,
        },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '8h' },
      );

      res.status(201).json({ token });
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).json({ error: error.errors });
      } else {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }
}
