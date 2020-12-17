import { getEmptySpots } from '../helpers/selectors';

const SET_DAY = 'SET_DAY';
const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
const SET_INTERVIEW = 'SET_INTERVIEW';

export default function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return {
        ...state,
        day: action.value,
      };

    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.value[0].data,
        appointments: action.value[1].data,
        interviewers: action.value[2].data,
      };

    case SET_INTERVIEW: {
      const appointment = {
        ...state.appointments[action.id],
        interview: action.interview && { ...action.interview },
      };
      const appointments = {
        ...state.appointments,
        [action.id]: appointment,
      };

      const stateCopy = {
        ...state,
        appointments,
      };

      //Sets the day we are targeting when we add or remove an interview
      const targetDay = state.days.find((day) => {
        return day.appointments.includes(action.id);
      });

      const days = state.days.map((day) => {
        if (day.name === targetDay.name) {
          return {
            ...day,
            spots: getEmptySpots(stateCopy, targetDay.name),
          };
        } else {
          return day;
        }
      });

      return {
        ...state,
        appointments: appointments,
        days: days,
      };
    }

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export { SET_APPLICATION_DATA, SET_DAY, SET_INTERVIEW };
