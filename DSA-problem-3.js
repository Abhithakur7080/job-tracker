const jobApplications3 = [
    { company: "Google", role: "SDE Intern" },
    { company: "google", role: "sde intern" },
    { company: "Amazon", role: "Backend Engineer" },
    { company: "Meta", role: "Frontend Developer" },
    { company: "amazon", role: "backend engineer" }
  ];
  
  const hasDuplicateApplications = (applications) => {
    const seen = new Set();
    for (let app of applications) {
      const key = (app.company + "|" + app.role).toLowerCase();
      if (seen.has(key)) {
        return true;
      }
      seen.add(key);
    }
    return false;
  };
  
  console.log("Has Duplicates:", hasDuplicateApplications(jobApplications3));