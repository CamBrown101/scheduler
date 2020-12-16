import React from 'react';
import 'components/Appointment/styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import useVisualMode from '../../hooks/useVisualMode';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const CONFIRM = 'CONFIRM';
const EDIT = 'EDIT';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';
const ERROR_EMPTY = 'ERROR_EMPTY';

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING, true);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  }

  function removeInterview() {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  }

  return (
    <article data-testid="appointment" className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition('CREATE')} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => {
            transition(CONFIRM);
          }}
          onEdit={() => {
            transition(EDIT);
          }}
        />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={() => {
            back(EMPTY);
          }}
          onSave={save}
        />
      )}
      {mode === CREATE && (
        <Form
          name={props.student}
          interviewers={props.interviewers}
          onCancel={() => {
            back(EMPTY);
          }}
          onSave={save}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message={'Are you sure?'}
          onConfirm={removeInterview}
          onCancel={back}
        />
      )}
      {mode === SAVING && <Status message={SAVING} />}
      {mode === ERROR_SAVE && (
        <Error onClose={back} message={'There was an error saving'} />
      )}
      {mode === DELETING && <Status message={DELETING} />}
      {mode === ERROR_DELETE && (
        <Error onClose={back} message={'There was an error deleting'} />
      )}
      {mode === ERROR_EMPTY && (
        <Error
          onClose={back}
          message={'You must input a name and choose an interviewer'}
        />
      )}
    </article>
  );
}
