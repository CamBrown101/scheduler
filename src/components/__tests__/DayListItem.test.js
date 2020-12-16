import React from 'react';
import Application from '../Application';

import axios from 'axios';

import {
  render,
  cleanup,
  getByText,
  getAllByTestId,
  queryByText,
  queryByAltText,
  waitForElement,
  fireEvent,
  getByAltText,
  getByDisplayValue,
} from '@testing-library/react';

import DayListItem from 'components/DayListItem';

afterEach(cleanup);

it("renders 'no spots remaining' when there are 0 spots", () => {
  const { getByText } = render(<DayListItem name="Monday" spots={0} />);
  expect(getByText('no spots remaining')).toBeInTheDocument();
});

it("renders '1 spot remaining' when there is 1 spot", () => {
  const { getByText } = render(<DayListItem name="Monday" spots={1} />);
  expect(getByText('1 spot remaining')).toBeInTheDocument();
});

it("renders '2 spots remaining' when there are 2 spots", () => {
  const { getByText } = render(<DayListItem name="Monday" spots={2} />);
  expect(getByText('2 spots remaining')).toBeInTheDocument();
});

it('loads data, cancels an interview and increases the spots remaining for Monday by 1', async () => {
  // 1. Render the Application.
  const { container } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, 'Archie Cohen'));

  // 3. Click the "Delete" button on the booked appointment.
  const appointment = getAllByTestId(
    container,
    'appointment'
  ).find((appointment) => queryByText(appointment, 'Archie Cohen'));

  fireEvent.click(queryByAltText(appointment, 'Delete'));

  // 4. Check that the confirmation message is shown.
  expect(getByText(appointment, 'Are you sure?')).toBeInTheDocument();

  // 5. Click the "Confirm" button on the confirmation.
  fireEvent.click(queryByText(appointment, 'Confirm'));

  // 6. Check that the element with the text "Deleting" is displayed.
  expect(getByText(appointment, 'DELETING')).toBeInTheDocument();

  // 7. Wait until the element with the "Add" button is displayed.
  await waitForElement(() => getByAltText(appointment, 'Add'));

  // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
  const day = getAllByTestId(container, 'day').find((day) =>
    queryByText(day, 'Monday')
  );

  expect(getByText(day, '2 spots remaining')).toBeInTheDocument();
});

it('loads data, edits an interview and keeps the spots remaining for Monday the same', async () => {
  // 1. Render the Application.
  const { container, debug } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, 'Archie Cohen'));

  // 3. Click the "Edit" button on the booked appointment.
  const appointment = getAllByTestId(
    container,
    'appointment'
  ).find((appointment) => queryByText(appointment, 'Archie Cohen'));

  fireEvent.click(queryByAltText(appointment, 'Edit'));

  // 4. Check that the Edit form is shown.
  expect(getByDisplayValue(appointment, 'Archie Cohen')).toBeInTheDocument();

  // 5. Click the "Save" button on the confirmation.
  fireEvent.click(queryByText(appointment, 'Save'));

  // 6. Check that the element with the text "Saving" is displayed.
  expect(getByText(appointment, 'SAVING')).toBeInTheDocument();

  // 7. Wait until the element with "Archie Cohen" button is displayed.
  await waitForElement(() => getByText(appointment, 'Archie Cohen'));

  // 8. Check that the DayListItem with the text "Monday" also has the text "3 spots remaining".
  const day = getAllByTestId(container, 'day').find((day) =>
    queryByText(day, 'Monday')
  );

  expect(getByText(day, '1 spot remaining')).toBeInTheDocument();
});

it('shows the save error when failing to save an appointment', async () => {
  // 1. Render the Application.
  const { container, debug } = render(<Application />);
  axios.put.mockRejectedValueOnce();

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, 'Archie Cohen'));

  // 3. Click the "Save" button on the booked appointment.
  const appointment = getAllByTestId(
    container,
    'appointment'
  ).find((appointment) => queryByText(appointment, 'Archie Cohen'));

  fireEvent.click(queryByAltText(appointment, 'Edit'));

  // 4. Click the "Save" button on the confirmation.
  fireEvent.click(queryByText(appointment, 'Save'));

  // 5. Wait for the put action to fail
  await waitForElement(() => getByText(appointment, 'Error'));

  // 6. Check that the Error message is shown.
  expect(getByText(appointment, 'Error')).toBeInTheDocument();
});
