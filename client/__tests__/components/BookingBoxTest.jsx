import React from 'react';
// import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import BookingBox from '../../src/components/BookingBox';

it('should add', () => {
  const two = 2;
  expect(1 + 1).toEqual(two);
});

describe('BookingBox', () => {
  it('renders correctly', () => {
    const component = shallow(
      <BookingBox />,
    );
    expect(component).toMatchSnapshot();
  });
});
