import React, { useState, useEffect } from 'react';
import DayList from './DayList';
import Appointment from './Appointment';
import 'components/Application.scss';
import axios from 'axios';
import getAppointmentsForDay from '../helpers/selectors';

// const appointments = [
//   {
//     id: 1,
//     time: '12pm',
//   },
//   {
//     id: 2,
//     time: '1pm',
//     interview: {
//       student: 'Lydia Miller-Jones',
//       interviewer: {
//         id: 1,
//         name: 'Sylvia Palmer',
//         avatar: 'https://i.imgur.com/LpaY82x.png',
//       },
//     },
//   },
//   {
//     id: 3,
//     time: '1pm',
//     interview: {
//       student: 'Lydia Miller-Jones',
//       interviewer: {
//         id: 1,
//         name: 'Sylvia Palmer',
//         avatar: 'https://i.imgur.com/LpaY82x.png',
//       },
//     },
//   },
//   {
//     id: 4,
//     time: '3pm',
//     interview: {
//       student: 'Cam Brown',
//       interviewer: {
//         id: 1,
//         name: 'Sylvia Palmer',
//         avatar: 'https://i.imgur.com/LpaY82x.png',
//       },
//     },
//   },
//   {
//     id: 5,
//     time: '4pm',
//     interview: {
//       student: 'Jones',
//       interviewer: {
//         id: 1,
//         name: 'Sylvia Palmer',
//         avatar: 'https://i.imgur.com/LpaY82x.png',
//       },
//     },
//   },
// ];

export default function Application(props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const setDay = (day) => setState({ ...state, day });
  const setDays = (days) => setState((prev) => ({ ...prev, days }));

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
    ]).then((all) => {
      console.log(all);
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
      }));
    });
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />{' '}
      </section>
      <section className="schedule">
        {dailyAppointments.map((appointment) => {
          return <Appointment key={appointment.id} {...appointment} />;
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
