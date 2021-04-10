const projectsReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PROJECT':
      return [
        ...state,
        action.project
      ]
    case 'REMOVE_PROJECT':
      return state.filter((project) => project.id !== action.id)
    case 'EDIT_PROJECT':
      return state.map((project) => {
        if (project.id === action.id) {
          return {
            ...project,
            ...action.updates
          };
        } else {
          return project;
        };
      });
    case 'POPULATE_PROJECTS':
      return action.projects;
    default:
      return state
  }
}

export default projectsReducer
