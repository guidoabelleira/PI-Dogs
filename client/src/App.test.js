import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { MemoryRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { App } from './App.js';
import LandingPage from './components/landingPage/index.jsx';
import Home from './components/home/home';
import AddDog from './components/addDog/index';
import Nav from './components/nav/index';

configure({adapter: new Adapter()});

describe('App', () => {
  let store
  const middlewares = []
  const mockStore = configureStore(middlewares);

  beforeEach(() => {
    store = mockStore([]);
  });

  xdescribe('El componente LandingPage debe renderizar en la ruta "/".', () => {
    it('Debería renderizarse en la ruta "/"', () => {
      const wrapper = mount(
          <Provider store={store}>
            <MemoryRouter initialEntries={[ '/' ]}>
              <App />
            </MemoryRouter>
          </Provider>
      );
        expect(wrapper.find(LandingPage)).toHaveLength(1);
    });
    xit('Debería renderizarse en la ruta "/otraRuta"', () => {
      const wrapper = mount(
          <Provider store={store}>
            <MemoryRouter initialEntries={[ '/otraRuta' ]}>
              <App />
            </MemoryRouter>
          </Provider>
      );
        expect(wrapper.find(Nav)).toHaveLength(1);
    });
  });

  xit('El componente Home debe renderizar en la ruta / (Sólo en la ruta "/")', () => {
    const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={[ '/home' ]}>
            <App />
          </MemoryRouter>
        </Provider>
    );

      expect(wrapper.find(Home)).toHaveLength(1);
      expect(wrapper.find(Nav)).toHaveLength(1);
      expect(wrapper.find(AddDog)).toHaveLength(0);
  });

  xit('El componente AddDog debe renderizar en la ruta /add - este test no pasará si Otro componente (que no sea Nav) se renderiza en esta ruta.', () => {
    const container = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={[  '/addDog' ]}>
            <App />
          </MemoryRouter>
        </Provider>
    );
    expect(container.find(LandingPage)).toHaveLength(1);
    // expect(container.find(Home)).toHaveLength(0);
    // expect(container.find(AddDog)).toHaveLength(1);
  });

 
});
