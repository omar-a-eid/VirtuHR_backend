import { Op } from 'sequelize';
import Attendance from '../db/models/attendance';
import { IAttendenceRepository } from '../interface/IAttendenceRepository';
import Employee from '../db/models/employee';

class AttendenceRepository implements IAttendenceRepository {
  async checkIn(employeeId: number): Promise<void> {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);
    const activeCheckIn = await Attendance.findOne({
      where: {
        employeeId,
        checkedOut: false,
        createdAt: {
          [Op.between]: [todayStart, todayEnd],
        },
      },
    });
    if (activeCheckIn) {
      throw new Error('Employee already checked in without checking out');
    }
    await Attendance.create({ employeeId, checkedOut: false });
  }

  async checkOut(employeeId: number): Promise<void> {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const attendance = await Attendance.findOne({
      where: {
        employeeId,
        checkedOut: false,
        createdAt: {
          [Op.between]: [todayStart, todayEnd],
        },
      },
      order: [['createdAt', 'DESC']],
    });

    if (!attendance) {
      throw new Error('No active check-in record found for today');
    }

    const checkInTime = attendance.createdAt;
    const checkOutTime = new Date();

    let hoursWorked =
      (checkOutTime.getTime() - checkInTime.getTime()) / 3600000;
    hoursWorked = Math.ceil(hoursWorked);

    attendance.checkedOut = true;
    attendance.updatedAt = checkOutTime;
    attendance.hours = hoursWorked;

    await attendance.save();
  }

  async getDailyHours(employeeId: number, date: Date): Promise<number> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const attendances = await Attendance.findAll({
      where: {
        employeeId,
        createdAt: {
          [Op.between]: [startOfDay, endOfDay],
        },
        checkedOut: true,
      },
    });

    const totalHours = attendances.reduce(
      (sum, record) => sum + (record.hours || 0),
      0,
    );
    return totalHours;
  }

  async getMonthlyHours(
    employeeId: number,
    year: number,
    month: number,
  ): Promise<{ hours: number; salary: number }> {
    const startOfMonth = new Date(year, month - 1, 1, 0, 0, 0, 0);
    const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);

    const attendances = await Attendance.findAll({
      where: {
        employeeId,
        createdAt: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
        checkedOut: true,
      },
    });

    const totalHours = attendances.reduce(
      (sum, record) => sum + (record.hours || 0),
      0,
    );

    // Fetch the employee's salary
    const employee = await Employee.findByPk(employeeId);
    if (!employee) {
      throw new Error('Employee not found');
    }

    if (employee.salary === undefined || employee.salary === null) {
      throw new Error('Employee salary not defined');
    }

    const salaryPerHour = employee.salary / (8 * 26); // Assuming 8 hours a day and 26 working days a month
    const salary = totalHours * salaryPerHour;

    return { hours: totalHours, salary };
  }
}

export default new AttendenceRepository();
