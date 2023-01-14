import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CreateListingThumbnail from './CreateListingThumbnail';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6I…4NTR9.I7VkSRzYK4EvvFvXzV7kgAhSmBzBu9OumlBXbBVMjnE';
const filterdata = {
  bed_num: 1,
  date: [null, null],
  maxPrice: '',
  minPrice: '',
  rating: '',
  search_string: '',
  searchbut: false
}
const setfilteredbook = jest.fn();
const setfilteredpub = jest.fn();
const setsearch = jest.fn();

Enzyme.configure({ adapter: new Adapter() });
describe('Sort List testing', () => {
  // update listings while filtering
  // it('Update states to update listings', () => {
  //     const useStateSpy = jest.spyOn(React, 'useState');
  //     shallow(<CreateListingThumbnail token={token} filterdata={filterdata} setfilteredbook={setfilteredbook} setfilteredpub={setfilteredpub} setsearch={setsearch}/>);
  //     expect(useStateSpy).toHaveBeenCalledTimes(3);
  // });
  it('Update states to update listings', () => {
    shallow(<CreateListingThumbnail token={token} filterdata={filterdata} setfilteredbook={setfilteredbook} setfilteredpub={setfilteredpub} setsearch={setsearch}/>);
    expect(setfilteredpub).toHaveBeenCalledTimes(0);
  });
  it('Update states to update listings', () => {
    shallow(<CreateListingThumbnail token={token} filterdata={filterdata} setfilteredbook={setfilteredbook} setfilteredpub={setfilteredpub} setsearch={setsearch}/>);
    expect(setfilteredbook).toHaveBeenCalledTimes(0);
  });
  it('Update states to update listings', () => {
    shallow(<CreateListingThumbnail token={token} filterdata={filterdata} setfilteredbook={setfilteredbook} setfilteredpub={setfilteredpub} setsearch={setsearch}/>);
    expect(setsearch).toHaveBeenCalledTimes(0);
  });
  it('Update states to update listings', () => {
    const useStateSpy = jest.spyOn(React, 'useState');
    shallow(<CreateListingThumbnail token={token} filterdata={filterdata} setfilteredbook={setfilteredbook} setfilteredpub={setfilteredpub} setsearch={setsearch}/>);
    expect(useStateSpy).toHaveBeenCalledTimes(3);
  });
});
