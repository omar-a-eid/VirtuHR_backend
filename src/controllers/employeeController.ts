// import { Request, Response } from 'express';
// import EmployeeRepository from '../repositories/EmployeeRepository';
// // import DaysOffRepository from '../repositories/DaysOffRepository';
// // import DivisionRepository from '../repositories/DivisionRepository';
// import EmployeeService from '../services/employeeService';
// import employeeSchema from './validationSchema';
// import DepartmentRepository from '../repositories/DepartmentRepository';
// // import bcrypt from 'bcrypt';

// /*------------------------GetAllEmployee-----------------------*/
// export const getAllEmployees = async (req: Request, res: Response) => {
//   try {
//     const employees = await EmployeeService.getAllEmployees();
//     if (employees.length > 0) {
//       console.log(employees);
//       return res.json(employees);
//     } else {
//       return res.status(404).json({ message: 'No Employees found' });
//     }
//   } catch (error) {
//     console.error('Error fetching all employees:', error);
//     return res.status(500).json({ error: 'Internal Server Error!!' });
//   }
// };
// /*----------------------------GetEmployeeById-------------------------*/
// export const getEmployeesById = async (req: Request, res: Response) => {
//   const EmployeeId = parseInt(req.params.id);
//   if (isNaN(EmployeeId)) {
//     return res.status(400).json({ error: `ID entered is Not a Number` });
//   }
//   const employee = await EmployeeService.getEmployeesById(EmployeeId);
//   if (employee) {
//     return res.json(employee);
//   } else {
//     return res
//       .status(404)
//       .json({ message: `Employee ${EmployeeId} is not Found` });
//   }
// };
// /*----------------------------UpdateEmployee-------------------------*/
// export const editEmployee = async (req: Request, res: Response) => {
//   const employeeId = parseInt(req.params.id, 10); // Changed variable name to camelCase
//   if (isNaN(employeeId)) {
//     return res.status(400).json({ error: 'ID entered is not a number' }); // Minor text change for consistency
//   }

//   const { error } = employeeSchema.validate(req.body);
//   if (error) {
//     return res.status(400).json({ error: error.details[0].message });
//   }
//   // const saltRounds = 10;
//   // const hashedPassword = await bcrypt.hash(req.body.passowrd, saltRounds);
//   const newEmployee = {
//     ...req.body,
//     // passowrd: hashedPassword,
//   };

//   try {
//     await EmployeeService.UpdateEmployee(employeeId, newEmployee);
//     return res.status(200).json({ message: 'Employee updated successfully' });
//   } catch (err) {
//     return res
//       .status(500)
//       .json({ error: 'An error occurred while updating the employee' });
//   }
// };
// /*----------------------------AddNewEmployee-------------------------*/

// export const AddNewEmployee = async (req: Request, res: Response) => {
//   try {
//     const { error } = employeeSchema.validate(req.body);
//     if (error) {
//       return res.status(400).json({ error: error.message });
//     }

//     const { email, firstName, lastName, departmentId, managerId } = req.body;

//     /* check if the Email exists */
//     const existingEmail = await EmployeeRepository.findByEmail(email);
//     if (existingEmail) {
//       console.log(existingEmail);
//       return res
//         .status(400)
//         .json({ error: `Email ${existingEmail} already exists` });
//     }

//     /* check if the FullName exists */
//     const existingFullName = await EmployeeRepository.findByFullName(
//       firstName,
//       lastName,
//     );
//     if (existingFullName) {
//       return res.status(400).json({
//         error: `Employee with this FullName ${existingFullName}  already exists`,
//       });
//     }

//     /* check if the DepartmentId doesnot exists */
//     const existingDepartment =
//       await DepartmentRepository.findById(departmentId);
//     if (!existingDepartment) {
//       return res
//         .status(400)
//         .json({ error: `Department ID ${departmentId} does not exist` });
//     }

//     // Check if the ManagerId exists
//     const existingManager = await EmployeeRepository.getById(managerId);
//     if (!existingManager) {
//       return res
//         .status(400)
//         .json({ error: `Manager ID ${managerId} does not exist` });
//     }

//     // /* check if the Divisionid doesnot exists */
//     // const existingDivisionId = await DivisionRepository.findById(divisionId);
//     // if (!existingDivisionId) {
//     //   return res
//     //     .status(400)
//     //     .json({ error: `Division ID ${divisionId} does not exist` });
//     // }

//     /* check if the DaysOff doesnot exists */
//     // const existingDaysOffId = await DaysOffRepository.findById(daysOffId);
//     // if (!existingDaysOffId) {
//     //   return res
//     //     .status(400)
//     //     .json({ error: `Days Off ID ${existingDaysOffId} does not exist` });
//     // }
//     // console.log('******');
//     // console.log('******');
//     // console.log('******');
//     // console.log('******');
//     // console.log('******');
//     // console.log(`the departmentid is ${existingDepartment}`);
//     // console.log(`the dayoffid is ${existingDaysOffId}`);
//     // console.log(`the managerId is ${existingManager}`);

//     // Hash the password
//     // const saltRounds = 10;
//     // const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

//     // Create new employee object with hashed password
//     const newEmployee = {
//       ...req.body,
//       // password: hashedPassword,
//     };

//     // Call EmployeeRepository to add employee
//     const employee = await EmployeeRepository.add(newEmployee);

//     if (employee) {
//       return res.status(201).json(employee); // 201 Created
//     } else {
//       return res.status(500).json({ message: 'Failed to create new employee' });
//     }
//   } catch (error) {
//     console.error('Error adding new employee:', error);
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// };
// /*----------------------------DeleteEmployee-------------------------*/
// export const DeleteEmployee = async (req: Request, res: Response) => {
//   try {
//     const employeeId = parseInt(req.params.id);
//     if (isNaN(employeeId)) {
//       return res.status(400).json({ error: `ID entered is Not a Number` });
//     }
//     const softDelete = req.query.hard !== 'true';
//     const deletedCount = await EmployeeRepository.delete(
//       employeeId,
//       softDelete,
//     );
//     if (deletedCount === 0) {
//       return res
//         .status(404)
//         .json({ message: `Employee with ID ${employeeId} not found` });
//     }
//     //the default behaviour of the delete function is the soft delete
//     //but if you want to make hard delete send query string hard=true
//     //we will handle this in front end isa
//     const deleteType = softDelete ? 'soft' : 'hard';
//     return res.status(200).json({
//       message: `Employee with ID ${employeeId} ${deleteType} deleted successfully`,
//     });
//   } catch (error) {
//     return res.status(500).json({ error: 'Internal Server Error!!' });
//   }
// };

// /* to get -> Employee by Position and Fullname with query parameter position=(Manager) name=(karim)*/
// export const getEmployeesByPosition = async (req: Request, res: Response) => {
//   try {
//     const position = req.query.position as string | null;
//     const fullName = req.query.name as string | null;
//     const employees = await EmployeeRepository.getByPosition(
//       position ?? '',
//       fullName ?? '',
//     );
//     if (employees.count > 0) {
//       return res.status(200).json(employees);
//     } else {
//       return res.status(404).json({
//         message: `No employees found with name ${fullName ?? ''} position: ${position ?? 'All Employees'}`,
//       });
//     }
//   } catch (error) {
//     console.error('Error fetching employees by position:', error);
//     return res.status(500).json({ error: 'Internal Server Error!!' });
//   }
// };

import { Request, Response } from 'express';
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
        console.log(employees);
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
  // public static async AddNewEmployee(
  //   req: Request,
  //   res: Response,
  // ): Promise<void> {
  //   try {
  //     const { error } = employeeSchema.validate(req.body);
  //     if (error) {
  //       res.status(400).json({ error: error.details[0].message });
  //     }
  //     // const saltRounds = 10;
  //     // const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  //     const newEmployee = {
  //       ...req.body,
  //       // password: hashedPassword,
  //     };

  //     const employee = await employeeService.create(newEmployee);

  //     if (employee) {
  //       res.status(201).json(employee); // 201 Created
  //     } else {
  //       res.status(500).json({ message: 'Failed to create employee' });
  //     }
  //   } catch (error) {
  //     console.error('Error adding new employee:', error);
  //     res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // }

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
}
