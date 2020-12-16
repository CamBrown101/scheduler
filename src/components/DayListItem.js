import React from 'react';
import classnames from 'classnames';
import 'components/DayListItem.scss';

export default function DayListItem(props) {
  let dayClass = classnames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': !props.spots,
  });

  const formatSpots = (spotsRemaining) => {
    if (spotsRemaining === 1) {
      return `${spotsRemaining} spot remaining`;
    } else if (spotsRemaining === 0) {
      return `no spots remaining`;
    } else {
      return `${spotsRemaining} spots remaining`;
    }
  };

  return (
    <li
      data-testid="day"
      className={dayClass}
      onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
