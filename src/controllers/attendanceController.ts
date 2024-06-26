import { Request, Response } from 'express';
import AttendanceRepository from '../repositories/AttendenceRepository';
import EmployeeRepository from '../repositories/EmployeeRepository';

/*----------------------------Checkin-------------------------*/

export const checkIn = async (req: Request, res: Response) => {
  const { employeeId } = req.body;
  try {
    if (!employeeId) {
      return res.status(400).json({ error: 'Employee ID is required' });
    }
    const employee = await EmployeeRepository.getById(employeeId);
    if (!employee) {
      return res
        .status(404)
        .json({ error: `Employee ID ${employeeId} Not found` });
    }
    await AttendanceRepository.checkIn(employeeId);
    return res
      .status(200)
      .json({ message: `Checked In successfully for ID: ${employeeId}` });
  } catch (error) {
    console.error(`Error while Checking in for ID ${employeeId}`, error);
    return res.status(500).json({ error: 'Internal Server Error!!' });
  }
};

/*----------------------------Checkout-------------------------*/

export const checkOut = async (req: Request, res: Response) => {
  const { employeeId } = req.body;
  try {
    if (!employeeId) {
      return res.status(400).json({ error: 'Employee ID is required' });
    }
    const employee = await EmployeeRepository.getById(employeeId);

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    await AttendanceRepository.checkOut(employeeId);
    res
      .status(200)
      .json({ message: `Check-out successfull for ID: ${employeeId}` });
  } catch (error) {
    const err = error as Error;
    console.error(
      `Error while Checking out for ID: ${employeeId}`,
      err.message,
    );

    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
/*----------------------------getDailyHours-------------------------*/
export const getDailyHours = async (req: Request, res: Response) => {
  const { employeeId } = req.query;
  const date = new Date(req.query.date as string);
  try {
    if (!employeeId) {
      return res.status(400).json({ error: 'Employee ID is required' });
    }
    const totalHours = await AttendanceRepository.getDailyHours(
      parseInt(employeeId as string),
      date,
    );
    return res.status(200).json({
      employeeId,
      date: date.toISOString().split('T')[0],
      totalHours,
    });
  } catch (error) {
    console.error(
      `Error while fetching daily hours for ID: ${employeeId}`,
      error,
    );
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
/*----------------------------getMonthlyHours-------------------------*/
export const getMonthlyHours = async (req: Request, res: Response) => {
  const { employeeId, year, month } = req.query;
  try {
    if (!employeeId || !year || !month) {
      return res
        .status(400)
        .json({ error: 'Employee ID, year, and month are required' });
    }
    const employeeExists = await EmployeeRepository.getById(Number(employeeId));
    if (!employeeExists) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    const { hours, salary } = await AttendanceRepository.getMonthlyHours(
      Number(employeeId),
      Number(year),
      Number(month),
    );
    return res.status(200).json({ hours, salary });
  } catch (error) {
    console.error(
      `Error fetching monthly hours for employee ID: ${employeeId}`,
      error,
    );
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
