// Simple Express backend API structure for LPU Navigator
import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());

// Mock data (replace with DB integration as needed)
const announcements = [
  { id: 1, title: 'Webinar: AI-Powered BMS', date: '2026-03-13', details: 'Webinar by MathWorks...' },
  { id: 2, title: 'Hackathon: Flying Wings', date: '2026-03-13', details: 'Defence innovation challenge...' },
];
const events = [
  { id: 1, name: 'Spectra 2026', date: '2026-03-12', description: 'A celebration of talent...' },
  { id: 2, name: 'Entrepreneurship Conclave', date: '2026-03-10', description: 'Shaping ideas into impact.' },
];
const messages = [
  { id: 1, from: 'Dr. Nitin Bhardwaj', subject: 'Hostel Duty Leave', date: '2026-03-13', content: 'Your leave approved...' },
];
const userProfile = {
  id: 1,
  name: 'Jyotirmay Khare',
  regNo: '12516403',
  section: '225IQ',
  program: 'B.Tech. (CSE)',
  cgpa: 7,
  attendance: '98%',
};
const notifications = [
  { id: 1, message: 'Your password will expire in 61 days.', date: '2026-03-14' },
];
const issues = [];

// Endpoints
app.get('/api/announcements', (req, res) => res.json(announcements));
app.get('/api/events', (req, res) => res.json(events));
app.get('/api/messages', (req, res) => res.json(messages));
app.get('/api/user', (req, res) => res.json(userProfile));
app.get('/api/notifications', (req, res) => res.json(notifications));
app.get('/api/issues', (req, res) => res.json(issues));
app.post('/api/issues', (req, res) => {
  const issue = { id: issues.length + 1, ...req.body, date: new Date().toISOString() };
  issues.push(issue);
  res.status(201).json(issue);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API server running on port ${PORT}`));
