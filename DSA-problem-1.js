// Sample job applications array
const jobApplications = [
    { company: "Google", role: "SDE Intern", appliedDate: "2025-04-01" },
    { company: "Amazon", role: "Backend Engineer", appliedDate: "2025-03-15" },
    { company: "Meta", role: "Frontend Developer", appliedDate: "2025-04-05" },
    { company: "Netflix", role: "Fullstack Developer", appliedDate: "2025-03-20" }
  ];
  
  // Sort by appliedDate (latest first)
  const sortedJobs = jobApplications.sort((a, b) => {
    return new Date(b.appliedDate) - new Date(a.appliedDate);
  });
  
  console.log(sortedJobs);
  