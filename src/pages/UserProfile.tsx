import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { User, BookOpen, GraduationCap, BarChart3, CheckCircle } from "lucide-react";

type UserData = {
  name: string;
  regNo: string;
  section: string;
  program: string;
  cgpa: number;
  attendance: string;
  courses: { code: string; name: string; percent: string }[];
};

const UserProfile = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://7bd256a9-2bcd-4a13-b382-62f52e7279ed.up.railway.app/api/user")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user data");
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load profile data. Please make sure the server is running.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-4 text-center">
        <p className="text-sm text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-4 text-center">
        <p className="text-sm text-red-500">{error || "No user data available."}</p>
      </div>
    );
  }

  const attendanceNum = parseFloat(user.attendance);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-6">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-bold text-primary">My Profile</h1>
        <p className="text-sm text-muted-foreground mt-1">
          View your academic details and course progress
        </p>
      </header>

      {/* Profile Card */}
      <section className="glass-card p-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <User className="text-primary" size={32} />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-semibold text-foreground">{user.name}</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Reg No: {user.regNo}
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge variant="secondary" className="gap-1">
                <GraduationCap size={12} />
                {user.program}
              </Badge>
              <Badge variant="outline" className="gap-1">
                Section {user.section}
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <section className="glass-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 size={18} className="text-primary" />
            <h3 className="text-sm font-semibold text-foreground">CGPA</h3>
          </div>
          <p className="text-3xl font-bold text-primary">{user.cgpa}</p>
          <Progress value={(user.cgpa / 10) * 100} className="mt-3 h-2" />
          <p className="text-xs text-muted-foreground mt-1">out of 10.0</p>
        </section>

        <section className="glass-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle size={18} className="text-emerald-600" />
            <h3 className="text-sm font-semibold text-foreground">Attendance</h3>
          </div>
          <p className="text-3xl font-bold text-emerald-600">{user.attendance}</p>
          <Progress
            value={isNaN(attendanceNum) ? 0 : attendanceNum}
            className="mt-3 h-2"
          />
          <p className="text-xs text-muted-foreground mt-1">overall attendance</p>
        </section>
      </div>

      {/* Courses */}
      <section className="glass-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen size={18} className="text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Current Courses</h3>
        </div>
        <Separator className="mb-4" />
        <div className="space-y-3">
          {user.courses.map((course) => {
            const coursePercent = parseFloat(course.percent);
            return (
              <div
                key={course.code}
                className="flex items-center justify-between rounded-lg border border-border px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {course.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{course.code}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="w-24 hidden sm:block">
                    <Progress
                      value={isNaN(coursePercent) ? 0 : coursePercent}
                      className="h-1.5"
                    />
                  </div>
                  <span className="text-sm font-semibold text-primary min-w-[40px] text-right">
                    {course.percent}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default UserProfile;
