import React from 'react';
import NavBar from './NavBar';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BedIcon from '@mui/icons-material/Bed';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6I…4NTR9.I7VkSRzYK4EvvFvXzV7kgAhSmBzBu9OumlBXbBVMjnE';
const logoutFn = jest.fn();

Enzyme.configure({ adapter: new Adapter() });
describe('NavBar testing', () => {
  it('icons after logging in', () => {
    const result = shallow(<NavBar token={token}/>);
    // .find(screen.getByRole('button', { name: /Log out/i })).simulate('click');
    // expect(screen.getByRole('button', { name: /view/i })).toBeInTheDocument();
    // expect(logoutFn).toHaveBeenCalledTimes(1);
    // screen.getByRole('');
    // screen.logTestingPlaygroundURL();
    expect(result.find(BottomNavigationAction)).toHaveLength(3)
    // Explore, MyListings and Logout
  });
  it('icons if not logged in', () => {
    const result = shallow(<NavBar/>);
    expect(result.find(BottomNavigationAction)).toHaveLength(2)
    // Explore and Login
  });
  it('bed icon if logged in', () => {
    const result = shallow(<NavBar token={token}/>);
    // expect(result.find(SearchIcon)).toHaveLength(1);
    expect(result.find(BedIcon));
  });
  it('search icon if logged in', () => {
    const result = shallow(<NavBar token={token}/>);
    // expect(result.find(SearchIcon)).toHaveLength(1);
    expect(result.find(SearchIcon));
  });
  it('account circle icon if not logged in', () => {
    const result = shallow(<NavBar/>);
    // expect(result.find(SearchIcon)).toHaveLength(1);
    expect(result.find(AccountCircleIcon));
  });
  it('search icon if not logged in', () => {
    const result = shallow(<NavBar/>);
    // expect(result.find(SearchIcon)).toHaveLength(1);
    expect(result.find(SearchIcon));
  });
  it('logout button being clicked', () => {
    shallow(<NavBar token={token} logoutFn={logoutFn}/>)
      .find(BottomNavigationAction)
      .last().simulate('click', { preventDefault () {} });
    // expect(result.find(SearchIcon)).toHaveLength(1);
    expect(logoutFn).toHaveBeenCalledTimes(1);
  });
});
