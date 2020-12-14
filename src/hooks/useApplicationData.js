import { useReducer, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {
  const SET_DAY = 'SET_DAY';
  const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
  const SET_INTERVIEW = 'SET_INTERVIEW';

  const getEmptySpots = (state, nameOfDay) => {
    const dayObject = state.days.find((day) => {
      return day.name === nameOfDay;
    });
    const availibleSpaces = dayObject.appointments.filter((appointment) => {
      return state.appointments[appointment].interview === null;
    });
    return availibleSpaces.length;
  };

  function reducer(state, action) {
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

        const targetDay = state.days.find((day) =>
          day.appointments.includes(action.id)
        );

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

  useEffect(() => {
    const webSocket = new WebSocket('ws://localhost:8002', 'protocolOne');
    webSocket.onopen = function (event) {
      webSocket.send('Ping!');
    };
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      dispatch({ type: SET_APPLICATION_DATA, value: all });
    });
  }, []);

  const [state, dispatch] = useReducer(reducer, {
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      dispatch({ type: SET_INTERVIEW, id, interview });
    });
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`).then(() => {
      dispatch({ type: SET_INTERVIEW, id, interview: null });
    });
  }

  const setDay = (day) => dispatch({ type: SET_DAY, value: day });

  return { state, bookInterview, cancelInterview, setDay };
}
