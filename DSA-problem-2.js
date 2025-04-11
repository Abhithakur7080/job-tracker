const jobApplications2 = [
    { company: "Google", role: "SDE Intern", status: "Applied" },
    { company: "Amazon", role: "Backend Engineer", status: "Interview" },
    { company: "Meta", role: "Frontend Developer", status: "Applied" },
    { company: "Netflix", role: "Fullstack Developer", status: "Rejected" },
    { company: "Apple", role: "QA Engineer", status: "Applied" },
    { company: "Adobe", role: "DevOps", status: "Rejected" },
    { company: "Uber", role: "SDE", status: "Offer" },
    { company: "Lyft", role: "SDE", status: "Interview" },
    { company: "Twitter", role: "Intern", status: "Rejected" },
    { company: "Tesla", role: "Engineer", status: "Applied" }
  ];
  
  const countStatusFrequency = (applications) => {
    const statusCount = {};
    for (let app of applications) {
      const status = app.status;
      statusCount[status] = (statusCount[status] || 0) + 1;
    }
    return statusCount;
  };
  
  console.log("Status Frequency:", countStatusFrequency(jobApplications2));
  