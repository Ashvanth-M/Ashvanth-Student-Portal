import { useMemo } from "react";
import { getStudents } from "@/lib/studentStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, UserCheck, BookOpen, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const STATUS_COLORS: Record<string, string> = {
  Active: "hsl(142, 71%, 45%)",
  Inactive: "hsl(0, 72%, 51%)",
  Suspended: "hsl(38, 92%, 50%)",
};

export default function Dashboard() {
  const students = useMemo(() => getStudents(), []);

  const totalStudents = students.length;
  const activeStudents = students.filter((s) => s.status === "Active").length;
  const courses = [...new Set(students.map((s) => s.course))];

  const courseData = useMemo(() => {
    const counts: Record<string, number> = {};
    students.forEach((s) => {
      counts[s.course] = (counts[s.course] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [students]);

  const statusData = useMemo(() => {
    const counts: Record<string, number> = {};
    students.forEach((s) => {
      counts[s.status] = (counts[s.status] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({
      name,
      value,
      fill: STATUS_COLORS[name] || "hsl(var(--muted))",
    }));
  }, [students]);

  const recentStudents = useMemo(
    () => [...students].sort((a, b) => new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime()).slice(0, 5),
    [students]
  );

  const statCards = [
    { label: "Total Students", value: totalStudents, icon: Users, color: "text-primary" },
    { label: "Active Students", value: activeStudents, icon: UserCheck, color: "text-success" },
    { label: "Departments", value: courses.length, icon: BookOpen, color: "text-warning" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back to ScholarCore</p>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {statCards.map((s) => (
          <Card key={s.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle>
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tabular-nums">{s.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Department bar chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Students by Department</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={courseData} layout="vertical" margin={{ left: 10, right: 20 }}>
                <XAxis type="number" allowDecimals={false} />
                <YAxis type="category" dataKey="name" width={150} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(217, 91%, 50%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Status donut */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Status Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={statusData} innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={3}>
                  {statusData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-2">
              {statusData.map((s) => (
                <div key={s.name} className="flex items-center gap-1.5 text-xs">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.fill }} />
                  {s.name} ({s.value})
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent registrations */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <CardTitle className="text-base">Recent Registrations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {recentStudents.map((s) => (
              <div key={s.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <Avatar className="h-9 w-9">
                  {s.photo ? (
                    <img src={s.photo} alt={s.name} className="h-full w-full object-cover" />
                  ) : (
                    <AvatarFallback className="text-xs bg-primary/10 text-primary">
                      {s.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.course} · {s.year}</p>
                </div>
                <Badge
                  variant={s.status === "Active" ? "default" : s.status === "Inactive" ? "destructive" : "secondary"}
                  className="text-[10px]"
                >
                  {s.status}
                </Badge>
                <span className="text-xs text-muted-foreground tabular-nums">{s.id}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
