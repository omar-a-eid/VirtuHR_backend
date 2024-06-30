import { Request, Response } from 'express';
import DepartmentService from '../services/departmentService';

class DepartmentController {
  async getAll(req: Request, res: Response) {
    try {
      const departments = await DepartmentService.getAllDepartments();
      return res.json(departments);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const department = await DepartmentService.getDepartmentById(
        parseInt(id, 10),
      );
      if (!department) {
        res.status(404).json({ message: 'Department not found' });
      } else {
        return res.json(department);
      }
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const departmentData = req.body;
      let newDepartments;

      if (Array.isArray(departmentData)) {
        newDepartments =
          await DepartmentService.createDepartments(departmentData);
      } else {
        newDepartments =
          await DepartmentService.createDepartment(departmentData);
      }

      res.status(201).json(newDepartments);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedDepartment = await DepartmentService.updateDepartment(
        parseInt(id, 10),
        updateData,
      );
      return res.json(updatedDepartment);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await DepartmentService.deleteDepartment(parseInt(id, 10));
      return res.status(204).send();
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getEmployeesOfDepartment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const employees = await DepartmentService.getEmployeesOfDepartment(
        parseInt(id, 10),
      );
      return res.status(200).send(employees?.departmentEmployees);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default new DepartmentController();
