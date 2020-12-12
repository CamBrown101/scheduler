export function getAppointmentsForDay(state, day) {
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

export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.filter((element) => {
    return element.name === day;
  });
  let filteredInterviewers = [];
  if (filteredDays.length > 0) {
    filteredInterviewers = filteredDays[0].interviewers.map((id) => {
      return state.interviewers[id];
    });
  }
  return filteredInterviewers;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewCopy = { ...interview };
  interviewCopy.interviewer = state.interviewers[interview.interviewer];
  return interviewCopy;
}
