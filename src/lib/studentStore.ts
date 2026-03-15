import { Student } from "@/types/student";

const STORAGE_KEY = "scholarcore_students";
const COUNTER_KEY = "scholarcore_counter";

const DUMMY_STUDENTS: Student[] = [
  {
    id: "STU-2024-001",
    name: "Amara Okafor",
    email: "amara.okafor@university.edu",
    phone: "+1 (555) 234-5678",
    dob: "2002-03-15",
    gender: "Female",
    course: "Computer Science",
    year: "3rd Year",
    address: "42 University Ave, Campus Housing",
    status: "Active",
    photo: "",
    registeredAt: "2024-08-20T10:30:00Z",
  },
  {
    id: "STU-2024-002",
    name: "James Chen",
    email: "james.chen@university.edu",
    phone: "+1 (555) 345-6789",
    dob: "2001-07-22",
    gender: "Male",
    course: "Electrical Engineering",
    year: "4th Year",
    address: "18 Elm Street, Apt 3B",
    status: "Active",
    photo: "",
    registeredAt: "2024-08-22T14:15:00Z",
  },
  {
    id: "STU-2024-003",
    name: "Sofia Martinez",
    email: "sofia.m@university.edu",
    phone: "+1 (555) 456-7890",
    dob: "2003-11-08",
    gender: "Female",
    course: "Business Administration",
    year: "2nd Year",
    address: "",
    status: "Active",
    photo: "",
    registeredAt: "2024-09-01T09:00:00Z",
  },
  {
    id: "STU-2024-004",
    name: "David Kimani",
    email: "d.kimani@university.edu",
    phone: "+1 (555) 567-8901",
    dob: "2000-01-30",
    gender: "Male",
    course: "Mathematics",
    year: "4th Year",
    address: "7 Oak Lane",
    status: "Inactive",
    photo: "",
    registeredAt: "2024-09-05T11:45:00Z",
  },
  {
    id: "STU-2024-005",
    name: "Priya Sharma",
    email: "priya.sharma@university.edu",
    phone: "+1 (555) 678-9012",
    dob: "2002-06-12",
    gender: "Female",
    course: "Psychology",
    year: "3rd Year",
    address: "25 Maple Drive, Suite 200",
    status: "Suspended",
    photo: "",
    registeredAt: "2024-09-10T16:20:00Z",
  },
];

function initializeStore(): Student[] {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (existing) return JSON.parse(existing);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DUMMY_STUDENTS));
  localStorage.setItem(COUNTER_KEY, "5");
  return DUMMY_STUDENTS;
}

export function getStudents(): Student[] {
  return initializeStore();
}

export function saveStudents(students: Student[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

export function generateId(): string {
  const counter = parseInt(localStorage.getItem(COUNTER_KEY) || "0", 10) + 1;
  localStorage.setItem(COUNTER_KEY, counter.toString());
  return `STU-${new Date().getFullYear()}-${counter.toString().padStart(3, "0")}`;
}

export function addStudent(student: Student): Student[] {
  const students = getStudents();
  students.push(student);
  saveStudents(students);
  return students;
}

export function updateStudent(updated: Student): Student[] {
  let students = getStudents();
  students = students.map((s) => (s.id === updated.id ? updated : s));
  saveStudents(students);
  return students;
}

export function deleteStudents(ids: string[]): Student[] {
  let students = getStudents();
  students = students.filter((s) => !ids.includes(s.id));
  saveStudents(students);
  return students;
}

export function calculateAge(dob: string): number {
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

export function exportToCSV(students: Student[]): void {
  const headers = ["ID", "Name", "Email", "Phone", "DOB", "Gender", "Course", "Year", "Status", "Registered"];
  const rows = students.map((s) => [s.id, s.name, s.email, s.phone, s.dob, s.gender, s.course, s.year, s.status, s.registeredAt]);
  const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `students_${new Date().toISOString().split("T")[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
