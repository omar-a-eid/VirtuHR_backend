import { Request, Response } from 'express';
import { ValidationError } from 'sequelize';
import EmployeeRepository from '../repositories/EmployeeRepository';
import EmployeeService from '../services/employeeService';
import employeeSchema from './validationSchema';
import bcrypt from 'bcrypt';

// Create instances of EmployeeRepository and EmployeeService
const employeeRepository = new EmployeeRepository();
const employeeService = new EmployeeService(employeeRepository);

export default class EmployeeController {
  /*------------------------GetAllEmployee-----------------------*/
  public static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const employees = await employeeService.getAll();
      if (employees.length > 0) {
        res.json(employees);
      } else {
        res.status(404).json({ message: 'No Employees found' });
      }
    } catch (error) {
      console.error('Error fetching all employees:', error);
      res.status(500).json({ error: 'Internal Server Error!!' });
    }
  }

  /*------------------------GetEmployeeById-----------------------*/
  public static async getEmployeesById(
    req: Request,
    res: Response,
  ): Promise<void> {
    const EmployeeId = parseInt(req.params.id);
    if (isNaN(EmployeeId)) {
      res.status(400).json({ error: `ID entered is Not a Number` });
    }
    try {
      const employee = await employeeService.getById(EmployeeId);
      if (employee) {
        res.json(employee);
      } else {
        res
          .status(404)
          .json({ message: `Employee ${EmployeeId} is not Found` });
      }
    } catch (error) {
      console.error('Error fetching employee by ID:', error);
      res.status(500).json({ error: 'Internal Server Error!!' });
    }
  }

  /*----------------------------UpdateEmployee-------------------------*/
  public static async editEmployee(req: Request, res: Response): Promise<void> {
    const employeeId = parseInt(req.params.id, 10);
    if (isNaN(employeeId)) {
      res.status(400).json({ error: 'ID entered is not a number' });
    }

    const { error } = employeeSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const newEmployee = {
      ...req.body,
      password: hashedPassword,
    };

    try {
      await employeeService.update(employeeId, newEmployee);
      res.status(200).json({ message: 'Employee updated successfully' });
    } catch (err) {
      res
        .status(500)
        .json({ error: 'An error occurred while updating the employee' });
    }
  }

  /*----------------------------AddNewEmployee-------------------------*/
  public static async AddNewEmployee(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const { error } = employeeSchema.validate(req.body);
      if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
      }

      const newEmployee = {
        ...req.body,
      };

      try {
        const employee = await employeeService.create(newEmployee);

        if (employee) {
          res.status(201).json(employee); // Successfully created
        } else {
          res.status(500).json({ message: 'Failed to create employee' });
        }
      } catch (dbError: any) {
        if (dbError.code === '23505') {
          // PostgreSQL unique violation error code
          res.status(400).json({ error: 'Employee already exists' });
        } else {
          console.error('Database error:', dbError);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
    } catch (error: any) {
      console.error('Error adding new employee:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  /*----------------------------DeleteEmployee-------------------------*/
  public static async DeleteEmployee(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const employeeId = parseInt(req.params.id);
      if (isNaN(employeeId)) {
        res.status(400).json({ error: `ID entered is Not a Number` });
      }
      const deletedCount = await employeeService.delete(employeeId);
      if (deletedCount === 0) {
        res
          .status(404)
          .json({ message: `Employee with ID ${employeeId} not found` });
      }
      res.status(200).json({
        message: `Employee with ID ${employeeId} deleted successfully`,
      });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error!!' });
    }
  }

  /*----------------------------GetEmployeesByPosition-------------------------*/
  public static async getEmployeesByPosition(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const position = req.query.position as string | null;
      const fullName = req.query.name as string | null;
      const employees = await employeeRepository.getByPosition(
        position ?? '',
        fullName ?? '',
      );
      if (employees.count > 0) {
        res.status(200).json(employees);
      } else {
        res.status(404).json({
          message: `No employees found with name ${fullName ?? ''} position: ${position ?? 'All Employees'}`,
        });
      }
    } catch (error) {
      console.error('Error fetching employees by position:', error);
      res.status(500).json({ error: 'Internal Server Error!!' });
    }
  }

  public static async getLoggedInUser(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const employee = await employeeRepository.getLoggedIn(parseInt(id, 10));

      if (employee) {
        res.status(200).json(employee);
      } else {
        res.status(404).json({
          message: 'No employees found',
        });
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(500).json({ error: error.errors });
      } else {
        res.status(500).json({ error: error });
      }
    }
  }
}
