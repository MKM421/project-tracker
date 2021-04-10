const filtersReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PLATFORM':
      return {
        ...state,
        platform: action.platform
      }
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      }
    case 'SET_ACTIVE_PROJECT':
      return {
        ...state,
        activeProject: action.project
      }
    default:
      return state
  }
}

export default filtersReducer
