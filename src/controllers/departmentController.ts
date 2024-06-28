import { Request, Response } from 'express';
import DepartmentRepository from '../repositories/DepartmentRepository';
import DepartmentService from '../services/departmentService';

// Initialize the repository and service
const departmentRepository = new DepartmentRepository();
const departmentService = new DepartmentService(departmentRepository);

export default class DepartmentController {
  public static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const departments = await departmentService.getAll();
      res.status(200).json(departments);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  public static async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const department = await departmentService.getById(Number(id));
      if (department) {
        res.status(200).json(department);
      } else {
        res.status(404).json({ message: 'Department not found' });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  public static async create(req: Request, res: Response): Promise<void> {
    try {
      const departmentData = req.body;
      const newDepartment = await departmentService.create(departmentData);
      res.status(201).json(newDepartment);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  public static async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const departmentData = req.body;
      const [updatedCount, updatedDepartments] = await departmentService.update(
        Number(id),
        departmentData,
      );
      if (updatedCount > 0) {
        res.status(200).json(updatedDepartments[0]);
      } else {
        res.status(404).json({ message: 'Department not found' });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  public static async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deletedCount = await departmentService.delete(Number(id));
      if (deletedCount > 0) {
        res.status(200).json({ message: 'Department deleted successfully' });
      } else {
        res.status(404).json({ message: 'Department not found' });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  public static async getEmployees(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const department = await departmentService.getEmployees(Number(id));
      if (department && department.departmentEmployees.length > 1) {
        res.status(200).json(department.departmentEmployees);
      } else {
        res.status(404).json({ message: 'Data not found' });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }
}
