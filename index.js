const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Sample course data (prototype data stored in memory)
const courses = [
  {
    id: 1,
    code: "BSIT101",
    name: "Introduction to Information Technology",
    units: 3,
    department: "Information Technology"
  },
  {
    id: 2,
    code: "BSIT102",
    name: "Computer Programming",
    units: 3,
    department: "Information Technology"
  },
  {
    id: 3,
    code: "BSIT103",
    name: "Web Development",
    units: 3,
    department: "Information Technology"
  },
  {
    id: 4,
    code: "BSIT104",
    name: "Database Management",
    units: 3,
    department: "Information Technology"
  }
];

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Student Course API is running!"
  });
});

// Get all courses
app.get("/api/courses", (req, res) => {
  res.status(200).json({
    status: "success",
    total: courses.length,
    data: courses
  });
});

// Get one course by ID
app.get("/api/courses/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      status: "error",
      message: "Course ID must be a positive integer"
    });
  }

  const course = courses.find((item) => item.id === id);

  if (!course) {
    return res.status(404).json({
      status: "error",
      message: "Course not found"
    });
  }

  return res.status(200).json({
    status: "success",
    data: course
  });
});

// Deliberately invalid route for endpoint testing
app.get("/api/invalid-course", (req, res) => {
  res.status(404).json({
    status: "error",
    message: "Invalid course endpoint"
  });
});

// Handle all unknown routes
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not found"
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Student Course API running on port ${PORT}`);
});
