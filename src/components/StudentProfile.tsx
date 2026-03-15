import { Student } from "@/types/student";
import { calculateAge } from "@/lib/studentStore";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Phone, MapPin, Calendar, BookOpen, Hash } from "lucide-react";

export default function StudentProfile({ student }: { student: Student }) {
  const s = student;
  const age = calculateAge(s.dob);

  const statusVariant = s.status === "Active" ? "default" as const : s.status === "Inactive" ? "destructive" as const : "secondary" as const;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          {s.photo ? (
            <img src={s.photo} alt={s.name} className="h-full w-full object-cover" />
          ) : (
            <AvatarFallback className="text-lg bg-primary/10 text-primary">
              {s.name.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          )}
        </Avatar>
        <div>
          <h3 className="text-lg font-semibold">{s.name}</h3>
          <p className="text-sm text-muted-foreground tabular-nums">{s.id}</p>
          <Badge variant={statusVariant} className="mt-1">{s.status}</Badge>
        </div>
      </div>

      {/* Details */}
      <div className="grid gap-3 text-sm">
        <DetailRow icon={Mail} label="Email" value={s.email} />
        <DetailRow icon={Phone} label="Phone" value={s.phone || "—"} />
        <DetailRow icon={Calendar} label="Date of Birth" value={`${s.dob} (Age ${age})`} />
        <DetailRow icon={BookOpen} label="Course" value={`${s.course} · ${s.year}`} />
        <DetailRow icon={Hash} label="Gender" value={s.gender} />
        <DetailRow icon={MapPin} label="Address" value={s.address || "—"} />
      </div>

      <p className="text-xs text-muted-foreground">
        Registered on {new Date(s.registeredAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
      </p>
    </div>
  );
}

function DetailRow({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}
