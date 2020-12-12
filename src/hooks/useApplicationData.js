import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  const getSpots = (state) => {
    return state.days.map((day) => {
      const spots = day.appointments.filter(
        (appointment) => !state.appointments[appointment].interview
      ).length;
      return { ...day, spots };
    });
  };

  console.log(getSpots(state));

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState((state) => ({ ...state, appointments }));
      setState((state) => ({ ...state, days: getSpots(state) }));
    });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = { ...state.appointments, [id]: appointment };
    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({ ...state, appointments });
      setState((state) => ({ ...state, days: getSpots(state) }));
    });
  }

  const setDay = (day) => setState({ ...state, day });

  return { state, setState, bookInterview, cancelInterview, setDay, getSpots };
}
