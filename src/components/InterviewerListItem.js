import React from 'react';
import classnames from 'classnames';
import 'components/InterviewerListItem.scss';

export default function InterviewerListItem(props) {
  let interviewerClass = classnames('interviewers__item', {
    'interviewers__item--selected': props.selected,
    'interviewers__item-image': props.selected,
  });

  // let interviewerName = '';
  // if (props.selected) {
  //   interviewerName = props.name;
  // }

  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
