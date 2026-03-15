export type StudentStatus = "Active" | "Inactive" | "Suspended";
export type Gender = "Male" | "Female" | "Other";

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  gender: Gender;
  course: string;
  year: string;
  address: string;
  status: StudentStatus;
  photo: string;
  registeredAt: string;
}

export const COURSES = [
  "Computer Science",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Business Administration",
  "Mathematics",
  "Physics",
  "Biology",
  "Psychology",
  "Economics",
  "English Literature",
] as const;

export const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year"] as const;
