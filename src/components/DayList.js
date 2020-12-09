import React from 'react';
import DayListItem from './DayListItem';

export default function Daylist(props) {
  return (
    <ul>
      {props.days.map((day) => (
        <DayListItem
          key={day.name}
          name={day.name}
          spots={day.spots}
          selected={day.name === props.day}
          setDay={props.setDay}
        />
      ))}
    </ul>
  );
}
