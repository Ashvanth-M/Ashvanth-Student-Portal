import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StudentForm from "@/components/StudentForm";

export default function RegisterPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Register Student</h1>
        <p className="text-muted-foreground">Enroll a new student into the system</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Student Information</CardTitle>
        </CardHeader>
        <CardContent>
          <StudentForm />
        </CardContent>
      </Card>
    </div>
  );
}
