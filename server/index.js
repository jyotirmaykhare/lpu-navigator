const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Mock data
const user = {
  name: 'Alex Johnson',
  regNo: '123456',
  section: 'A',
  program: 'B.Tech CSE',
  cgpa: 8.7,
  attendance: '92%',
  courses: [
    { code: 'CSE101', name: 'Data Structures', percent: '95%' },
    { code: 'CSE102', name: 'Algorithms', percent: '90%' },
    { code: 'CSE103', name: 'Operating Systems', percent: '88%' },
  ],
};

let notifications = [
  { id: 1, message: 'Event: Coding Hackathon tomorrow!', date: '2026-03-15' },
  { id: 2, message: 'Library will be closed on Sunday.', date: '2026-03-14' },
];

let issues = [
  { id: 1, title: 'WiFi not working', description: 'No internet in Block 34', date: '2026-03-13' },
];

let messages = [
  { subject: 'Welcome!', from: 'Admin', content: 'Welcome to LPU Navigator!', date: '2026-03-14' },
];

let announcements = [
  { title: 'Exam Schedule Released', details: 'Check your dashboard for the new exam schedule.', date: '2026-03-13' },
];

let events = [
  { name: 'Tech Fest', description: 'Annual technology festival.', date: '2026-03-20' },
];

// Facilities data
let facilities = [
  { id: 1, name: 'Central Library', description: 'Central library with 50,000+ books and digital resources', icon: 'library' },
  { id: 2, name: 'Computer Labs', description: 'State-of-the-art labs with high-speed internet', icon: 'labs' },
  { id: 3, name: 'Cafeteria', description: 'Multiple food courts and dining options across campus', icon: 'cafeteria' },
  { id: 4, name: 'Sports Complex', description: 'Olympic-size pool, gym, and indoor sports facilities', icon: 'sports' },
  { id: 5, name: 'Admin Block', description: 'Registrar, admissions, and administrative offices', icon: 'admin' },
  { id: 6, name: 'Auditorium', description: 'Shanti Devi Mittal Auditorium for events and seminars', icon: 'auditorium' },
];

// Campus locations data (static base points)
const campusLocations = [
  {
    name: "Main Gate",
    position: [31.2536, 75.7033],
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Central Library",
    position: [31.2548, 75.7044],
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "UniMall",
    position: [31.2552, 75.7052],
    image: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Block 34",
    position: [31.2560, 75.7061],
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Block 35",
    position: [31.2565, 75.7065],
    image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Block 36",
    position: [31.2570, 75.7070],
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Block 27",
    position: [31.2540, 75.7050],
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Block 28",
    position: [31.2545, 75.7055],
    image: "https://images.unsplash.com/photo-1519494080410-f9aa8f52f1e1?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Block 29",
    position: [31.2550, 75.7060],
    image: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Block 30",
    position: [31.2555, 75.7065],
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Chancellory",
    position: [31.2532, 75.7042],
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Auditorium",
    position: [31.2529, 75.7049],
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Sports Complex",
    position: [31.2517, 75.7038],
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Food Court",
    position: [31.2542, 75.7048],
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Hostel Block A",
    position: [31.2555, 75.7025],
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Medical Center",
    position: [31.2530, 75.7050],
    image: "https://images.unsplash.com/photo-1519494080410-f9aa8f52f1e1?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Admin Block",
    position: [31.2540, 75.7030],
    image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Lecture Hall Complex",
    position: [31.2550, 75.7040],
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Parking Lot",
    position: [31.2525, 75.7020],
    image: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80"
  },
];

// In-memory live locations derived from campusLocations
let liveLocations = campusLocations.map((loc, idx) => ({
  id: idx + 1,
  name: loc.name,
  // start from same position, will jitter slightly on each request
  position: [...loc.position],
  type: 'live',
}));

// API endpoints
app.get('/api/user', (req, res) => res.json(user));
app.get('/api/notifications', (req, res) => res.json(notifications));
app.get('/api/issues', (req, res) => res.json(issues));
app.post('/api/issues', (req, res) => {
  const { title, description } = req.body;
  const newIssue = { id: issues.length + 1, title, description, date: new Date().toISOString().slice(0, 10) };
  issues.unshift(newIssue);
  res.status(201).json(newIssue);
});
app.get('/api/messages', (req, res) => res.json(messages));
app.get('/api/announcements', (req, res) => res.json(announcements));
app.get('/api/events', (req, res) => res.json(events));
app.get('/api/facilities', (req, res) => res.json(facilities));

// Static campus locations
app.get('/api/locations', (req, res) => res.json(campusLocations));

// Live locations (simulated small movement around base points)
app.get('/api/live-locations', (req, res) => {
  liveLocations = liveLocations.map((loc, idx) => {
    const base = campusLocations[idx] || loc;
    const [lat, lng] = base.position;
    // jitter within ~50m
    const jitterLat = (Math.random() - 0.5) * 0.0005;
    const jitterLng = (Math.random() - 0.5) * 0.0005;
    return {
      ...loc,
      position: [lat + jitterLat, lng + jitterLng],
    };
  });
  res.json(liveLocations);
});

app.listen(PORT, () => {
  console.log(`Mock API server running at http://localhost:${PORT}`);
});
