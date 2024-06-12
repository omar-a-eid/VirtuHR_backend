import { Request, Response } from 'express';
import EmployeeRepository from '../repositories/EmployeeRepository';

export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const employee = await EmployeeRepository.getAll();
    // if there are employees get them if not message no employees are found
    if (employee.length > 0) {
      console.log(employee);
      return res.json(employee);
    } else {
      return res.status(404).json({ message: 'No Employees found' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error!!' });
  }
};

export const getEmployeesById = async (req: Request, res: Response) => {
  try {
    const employeeId = parseInt(req.params.id);
    if (isNaN(employeeId)) {
      return res.status(400).json({ error: `ID entered is Not a Number` });
    }
    const employee = await EmployeeRepository.getById(employeeId);
    if (employee) {
      return res.json(employee);
    } else {
      return res
        .status(404)
        .json({ message: `Employee ${employeeId} is not Found` });
    }
  } catch (error) {
    console.error('Error fetching employee by ID:', error);
    return res.status(500).json({ error: 'Internal Server Error!!' });
  }
};

export const AddEmployee = async (req: Request, res: Response) => {
  console.log(`Logic Here ${res} & ${req}`);
};

export const EditEmployee = async (req: Request, res: Response) => {
  console.log(`Logic Here ${res} & ${req}`);
};

export const DeleteEmployee = async (req: Request, res: Response) => {
  try {
    const employeeId = parseInt(req.params.id);
    if (isNaN(employeeId)) {
      return res.status(400).json({ error: `ID entered is Not a Number` });
    }
    const softDelete = req.query.hard !== 'true';
    const deletedCount = await EmployeeRepository.delete(
      employeeId,
      softDelete,
    );
    if (deletedCount === 0) {
      return res
        .status(404)
        .json({ message: `Employee with ID ${employeeId} not found` });
    }
    //the default behaviour of the delete function is the soft delete
    //but if you want to make hard delete send query string hard=true
    //we will handle this in front end isa
    const deleteType = softDelete ? 'soft' : 'hard';
    return res.status(200).json({
      message: `Employee with ID ${employeeId} ${deleteType} deleted successfully`,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error!!' });
  }
};

// to get -> Employee by Position with query parameter position=(Manager)
export const getEmployeesByPosition = async (req: Request, res: Response) => {
  try {
    const position = req.query.position as string;
    if (!position) {
      return res.status(400).json({ error: 'Position parameter is required' });
    }
    const employees = await EmployeeRepository.getByPosition(position);
    if (employees.length > 0) {
      return res.status(200).json(employees);
    } else {
      return res
        .status(404)
        .json({ message: `No employees found with position: ${position}` });
    }
  } catch (error) {
    console.error('Error fetching employees by position:', error);
    return res.status(500).json({ error: 'Internal Server Error!!' });
  }
};
