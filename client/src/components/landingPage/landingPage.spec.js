import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import LandingPage from './index';


configure({adapter: new Adapter()});

describe('<LandingPage />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper =  shallow(<LandingPage />)
  })

  it('deberia tener un titulo representativo', () => {
    expect(wrapper.find('h1')).toHaveLength(1)
  })

  it('deberia tener un Botón para ingresar al home (Ruta principal)', () => {
    expect(wrapper.find('button')).toHaveLength(1)
  })

  
});