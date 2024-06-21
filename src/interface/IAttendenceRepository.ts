export interface IAttendenceRepository {
  checkIn(employeeId: number): Promise<void>;
  checkOut(employeeId: number): Promise<void>;
  getDailyHours(employeeId: number, date: Date): Promise<number>;
  getMonthlyHours(
    employeeId: number,
    year: number,
    month: number,
  ): Promise<{ hours: number; salary: number }>;
}
