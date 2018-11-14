import React from 'react';
// import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import BookingBox from '../../src/components/BookingBox';

jest.mock('axios', () => {
  const exampleArticles = {
    data: [{
      nightlyFee: 1,
      serviceFee: 2,
      cleaningFee: 3,
      numReviews: 4,
      reviewRating: 5,
      numGuests: 6,
    }],
  };

  return {
    get: jest.fn(() => Promise.resolve(exampleArticles)),
  };
});

// it('should add', () => {
//   const two = 2;
//   expect(1 + 1).toEqual(two);
// });

describe('BookingBox', () => {
  it('renders correctly', () => {
    const component = shallow(
      <BookingBox />,
    );
    expect(component).toMatchSnapshot();
  });
});
