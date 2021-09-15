import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Nav from './index';


configure({adapter: new Adapter()});

describe('<Nav />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper =  shallow(<Nav />)
  })

  it('deberia tener tres Link con ruta a "/home", "/addDog", "/about" ', () => {
    expect(wrapper.find('Link')).toHaveLength(3)
  })

});