import { h } from 'preact';
import Register from '../routes/register/index';


import { render, fireEvent, screen, cleanup } from '@testing-library/preact';
describe('Register', ()=> {
  jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
    Map: () => ({})
    }));
  // window.URL.createObjectURL = jest.fn();

  test('should be able to register', async ()=> {
   
    const {debug} = render( <Register /> );
  
    const text = screen.getByText("SLOPEER" )
    window.URL.createObjectURL = jest.fn();
    expect(text).toBeTruthy();
    
    // const submitButton = getByTestId('submit-button', {name: 'submit'})
    // // const usernameInput = getByPlaceholderText('Username'); 
    // // const passwordInput = getByPlaceholderText('Password'); 
    // // const emailInput = getByPlaceholderText('Email'); 
  
  
    // fireEvent.click(submitButton).should();
    
    debug()
    // cleanup()
  })
})



