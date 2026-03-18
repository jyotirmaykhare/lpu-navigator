
import React, { useEffect, useState } from "react";

type User = {
  name: string;
  regNo: string;
  section: string;
  program: string;
  cgpa: number;
  attendance: string;
  courses: { code: string; name: string; percent: string }[];
};

type Notification = { id: number; message: string; date: string };
type Announcement = { title: string; details: string; date: string };
type EventItem = { name: string; description: string; date: string };
type Message = { subject: string; from: string; content: string; date: string };

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
          const [userRes, notifRes, annRes, eventsRes, messagesRes] = await Promise.all([
            fetch("https://7bd256a9-2bcd-4a13-b382-62f52e7279ed.up.railway.app/api/user"),
            fetch("https://7bd256a9-2bcd-4a13-b382-62f52e7279ed.up.railway.app/api/notifications"),
            fetch("https://7bd256a9-2bcd-4a13-b382-62f52e7279ed.up.railway.app/api/announcements"),
            fetch("https://7bd256a9-2bcd-4a13-b382-62f52e7279ed.up.railway.app/api/events"),
            fetch("https://7bd256a9-2bcd-4a13-b382-62f52e7279ed.up.railway.app/api/messages"),
        ]);

        if (!userRes.ok || !notifRes.ok || !annRes.ok || !eventsRes.ok || !messagesRes.ok) {
          throw new Error("Failed to load dashboard data");
        }

        const [userData, notifData, annData, eventsData, messagesData] = await Promise.all([
          userRes.json(),
          notifRes.json(),
          annRes.json(),
          eventsRes.json(),
          messagesRes.json(),
        ]);

        setUser(userData);
        setNotifications(notifData || []);
        setAnnouncements(annData || []);
        setEvents(eventsData || []);
        setMessages(messagesData || []);
        setLoading(false);
      } catch (e) {
        setError("Could not load dashboard data");
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 space-y-6">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-primary">LPU Navigator Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Overview of your academics, campus updates, and smart alerts.
          </p>
        </div>
      </header>

      {/* Loading indicator removed */}
      {error && !loading && <p className="text-sm text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column: user + courses */}
          <div className="space-y-4 lg:col-span-2">
            {user && (
              <section className="glass-card p-4 md:p-5">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">{user.name}</h2>
                    <p className="text-xs text-muted-foreground">
                      Reg No: {user.regNo} · {user.section} · {user.program}
                    </p>
                  </div>
                  <div className="flex gap-3 text-xs">
                    <div className="px-3 py-2 rounded-lg bg-primary/10 text-primary font-semibold">
                      CGPA: {user.cgpa}
                    </div>
                    <div className="px-3 py-2 rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200 font-semibold">
                      Attendance: {user.attendance}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-2">Current Courses</h3>
                  <div className="space-y-2">
                    {user.courses.map((c) => (
                      <div
                        key={c.code}
                        className="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-xs"
                      >
                        <div>
                          <p className="font-medium text-foreground">
                            {c.code} · {c.name}
                          </p>
                        </div>
                        <div className="text-primary font-semibold">{c.percent}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Announcements */}
            <section className="glass-card p-4 md:p-5">
              <h2 className="text-sm font-semibold text-foreground mb-3">Announcements</h2>
              {announcements.length === 0 && (
                <p className="text-xs text-muted-foreground">No announcements right now.</p>
              )}
              <div className="space-y-2">
                {announcements.map((a, idx) => (
                  <div key={idx} className="rounded-lg border border-border px-3 py-2 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-foreground">{a.title}</p>
                      <span className="text-[10px] text-muted-foreground">{a.date}</span>
                    </div>
                    <p className="text-muted-foreground">{a.details}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right column: notifications, events, messages */}
          <div className="space-y-4">
            <section className="glass-card p-4 md:p-5">
              <h2 className="text-sm font-semibold text-foreground mb-3">Notifications</h2>
              {notifications.length === 0 && (
                <p className="text-xs text-muted-foreground">No notifications.</p>
              )}
              <div className="space-y-2">
                {notifications.map((n) => (
                  <div key={n.id} className="rounded-lg bg-primary/5 px-3 py-2 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-foreground">{n.message}</span>
                      <span className="text-[10px] text-muted-foreground">{n.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="glass-card p-4 md:p-5">
              <h2 className="text-sm font-semibold text-foreground mb-3">Upcoming Events</h2>
              {events.length === 0 && (
                <p className="text-xs text-muted-foreground">No upcoming events.</p>
              )}
              <div className="space-y-2">
                {events.map((e, idx) => (
                  <div key={idx} className="rounded-lg border border-border px-3 py-2 text-xs">
                    <p className="font-semibold text-foreground">{e.name}</p>
                    <p className="text-[11px] text-muted-foreground mb-1">{e.description}</p>
                    <span className="text-[10px] text-muted-foreground">{e.date}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="glass-card p-4 md:p-5">
              <h2 className="text-sm font-semibold text-foreground mb-3">Messages</h2>
              {messages.length === 0 && (
                <p className="text-xs text-muted-foreground">No messages.</p>
              )}
              <div className="space-y-2">
                {messages.map((m, idx) => (
                  <div key={idx} className="rounded-lg border border-border px-3 py-2 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-foreground">{m.subject}</p>
                      <span className="text-[10px] text-muted-foreground">{m.date}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground">From: {m.from}</p>
                    <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2">{m.content}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
