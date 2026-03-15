import { useState, useRef, useEffect } from "react";
import { Student, Gender, StudentStatus, COURSES, YEARS } from "@/types/student";
import { getStudents, addStudent, updateStudent, generateId, calculateAge } from "@/lib/studentStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Loader2, Upload } from "lucide-react";

interface Props {
  student?: Student;
  onSave?: () => void;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  dob?: string;
  gender?: string;
  course?: string;
  year?: string;
}

export default function StudentForm({ student, onSave }: Props) {
  const isEdit = !!student;
  const [form, setForm] = useState({
    name: student?.name || "",
    email: student?.email || "",
    phone: student?.phone || "",
    dob: student?.dob || "",
    gender: (student?.gender || "") as Gender | "",
    course: student?.course || "",
    year: student?.year || "",
    address: student?.address || "",
    status: (student?.status || "Active") as StudentStatus,
    photo: student?.photo || "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [age, setAge] = useState<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (form.dob) setAge(calculateAge(form.dob));
    else setAge(null);
  }, [form.dob]);

  const update = (key: string, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email format";
    if (form.phone && !/^[\d\s\+\-\(\)]+$/.test(form.phone)) e.phone = "Invalid phone format";
    if (!form.dob) e.dob = "Date of birth is required";
    if (!form.gender) e.gender = "Gender is required";
    if (!form.course) e.course = "Course is required";
    if (!form.year) e.year = "Year is required";

    // Duplicate check
    const existing = getStudents();
    const emailDup = existing.find((s) => s.email.toLowerCase() === form.email.toLowerCase() && s.id !== student?.id);
    if (emailDup) e.email = "Email already registered";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => update("photo", reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // simulate network delay
    await new Promise((r) => setTimeout(r, 600));

    const data: Student = {
      id: student?.id || generateId(),
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      dob: form.dob,
      gender: form.gender as Gender,
      course: form.course,
      year: form.year,
      address: form.address.trim(),
      status: form.status,
      photo: form.photo,
      registeredAt: student?.registeredAt || new Date().toISOString(),
    };

    if (isEdit) {
      updateStudent(data);
      toast({ title: "Record Updated ✏️", description: `${data.name}'s record has been updated.` });
    } else {
      addStudent(data);
      toast({ title: "Student Registered ✅", description: `${data.name} (${data.id}) has been enrolled.` });
      // reset form
      setForm({ name: "", email: "", phone: "", dob: "", gender: "", course: "", year: "", address: "", status: "Active", photo: "" });
    }

    setLoading(false);
    onSave?.();
  };

  const Field = ({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) => (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Photo */}
      <div className="flex items-center gap-4">
        <div
          className="h-20 w-20 rounded-full bg-muted flex items-center justify-center overflow-hidden cursor-pointer border-2 border-dashed border-border hover:border-primary/40 transition-colors"
          onClick={() => fileRef.current?.click()}
        >
          {form.photo ? (
            <img src={form.photo} alt="Preview" className="h-full w-full object-cover" />
          ) : (
            <Upload className="h-6 w-6 text-muted-foreground" />
          )}
        </div>
        <div>
          <p className="text-sm font-medium">Profile Photo</p>
          <p className="text-xs text-muted-foreground">Click to upload (optional)</p>
        </div>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full Name *" error={errors.name}>
          <Input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="John Doe" />
        </Field>
        <Field label="Email Address *" error={errors.email}>
          <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="john@uni.edu" />
        </Field>
        <Field label="Phone Number" error={errors.phone}>
          <Input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+1 (555) 000-0000" />
        </Field>
        <Field label={`Date of Birth *${age !== null ? ` (Age: ${age})` : ""}`} error={errors.dob}>
          <Input type="date" value={form.dob} onChange={(e) => update("dob", e.target.value)} />
        </Field>
        <Field label="Gender *" error={errors.gender}>
          <Select value={form.gender} onValueChange={(v) => update("gender", v)}>
            <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Course / Department *" error={errors.course}>
          <Select value={form.course} onValueChange={(v) => update("course", v)}>
            <SelectTrigger><SelectValue placeholder="Select course" /></SelectTrigger>
            <SelectContent>
              {COURSES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Year / Semester *" error={errors.year}>
          <Select value={form.year} onValueChange={(v) => update("year", v)}>
            <SelectTrigger><SelectValue placeholder="Select year" /></SelectTrigger>
            <SelectContent>
              {YEARS.map((y) => <SelectItem key={y} value={y}>{y}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Status">
          <Select value={form.status} onValueChange={(v) => update("status", v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
              <SelectItem value="Suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>

      <Field label="Address (optional)">
        <Textarea value={form.address} onChange={(e) => update("address", e.target.value)} placeholder="Street address…" rows={2} />
      </Field>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
        {isEdit ? "Update Student" : "Register Student"}
      </Button>
    </form>
  );
}
