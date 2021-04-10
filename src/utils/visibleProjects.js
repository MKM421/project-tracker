const visibleProjects = (projects, { text }) => {
  if (text) {
    return projects.filter((project) => {
      const textMatch = project.projectName.toLowerCase().includes(text.toLowerCase());

      return textMatch;
    });
  }

  return projects;
};

export default visibleProjects;
