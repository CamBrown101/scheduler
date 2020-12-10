export default function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter((element) => {
    return element.name === day;
  });
  let filteredAppointments = [];
  if (filteredDays.length > 0) {
    filteredAppointments = filteredDays[0].appointments.map((id) => {
      return state.appointments[id];
    });
  }
  return filteredAppointments;
}

// function selectUserByName(state, name) {
//   const filteredNames = state.users.filter((user) => user.name === name);
//   return filteredNames;
// }
