import { Request, Response } from 'express';
import EmployeeRepository from '../repositories/EmployeeRepository';
import EmployeeService from '../services/employeeService';
import employeeSchema from './validationSchema';
import bcrypt from 'bcrypt';
/*------------------------GetAllEmployee-----------------------*/
export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await EmployeeService.getAllEmployees();
    if (employees.length > 0) {
      console.log(employees);
      return res.json(employees);
    } else {
      return res.status(404).json({ message: 'No Employees found' });
    }
  } catch (error) {
    console.error('Error fetching all employees:', error);
    return res.status(500).json({ error: 'Internal Server Error!!' });
  }
};
/*----------------------------GetEmployeeById-------------------------*/
export const getEmployeesById = async (req: Request, res: Response) => {
  const EmployeeId = parseInt(req.params.id);
  if (isNaN(EmployeeId)) {
    return res.status(400).json({ error: `ID entered is Not a Number` });
  }
  const employee = await EmployeeService.getEmployeesById(EmployeeId);
  if (employee) {
    return res.json(employee);
  } else {
    return res
      .status(404)
      .json({ message: `Employee ${EmployeeId} is not Found` });
  }
};
/*----------------------------UpdateEmployee-------------------------*/
export const editEmployee = async (req: Request, res: Response) => {
  const employeeId = parseInt(req.params.id, 10); // Changed variable name to camelCase
  if (isNaN(employeeId)) {
    return res.status(400).json({ error: 'ID entered is not a number' }); // Minor text change for consistency
  }

  const { error } = employeeSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(req.body.passowrd, saltRounds);
  const newEmployee = {
    ...req.body,
    passowrd: hashedPassword,
  };

  try {
    await EmployeeService.UpdateEmployee(employeeId, newEmployee);
    return res.status(200).json({ message: 'Employee updated successfully' });
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'An error occurred while updating the employee' });
  }
};
// ------------------AddEmployees------------------------
export const AddNewEmployee = async (req: Request, res: Response) => {
  try {
    const { error } = employeeSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.passowrd, saltRounds);
    const newEmployee = {
      ...req.body,
      passowrd: hashedPassword,
    };

    const employee = await EmployeeService.AddEmployee(newEmployee);

    if (employee) {
      return res.status(201).json(employee); // 201 Created
    } else {
      return res.status(500).json({ message: 'Failed to create employee' });
    }
  } catch (error) {
    console.error('Error adding new employee:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
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
    const position = req.query.position as string | null;
    const fullName = req.query.name as string | null;
    const employees = await EmployeeRepository.getByPosition(
      position ?? '',
      fullName ?? '',
    );
    if (employees.count > 0) {
      return res.status(200).json(employees);
    } else {
      return res.status(404).json({
        message: `No employees found with name ${fullName ?? ''} position: ${position ?? 'All Employees'}`,
      });
    }
  } catch (error) {
    console.error('Error fetching employees by position:', error);
    return res.status(500).json({ error: 'Internal Server Error!!' });
  }
};
