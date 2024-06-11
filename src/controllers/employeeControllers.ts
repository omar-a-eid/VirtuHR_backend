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
      return res.status(400).json({ error: `${employeeId} is Not a Number` });
    }
    const deletedemployee = await EmployeeRepository.delete(employeeId);
    if (!deletedemployee.success) {
      return res
        .status(404)
        .json({ message: `Employee with ID ${employeeId} not found` });
    }
    getAllEmployees;
    return res
      .status(200)
      .json({ message: `Employee with ID ${employeeId} deleted successfully` });
    // const employee = await Employee.findByPk(req.params.id);
    // if (employee) {
    //   await employee.destroy();
    //   res.status(200).json({ message: 'Employee deleted' });
    // } else {
    //   res.status(404).json({ error: 'Employee not found' });
    // }
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error!!' });
  }
};
