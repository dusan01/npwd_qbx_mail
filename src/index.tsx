import React from 'react';
import ReactDOM from 'react-dom';
import '../npwd.config';

import { HashRouter } from 'react-router-dom';
import styled from '@emotion/styled';
import App from './App';
import image from './bg.png';
import { IPhoneSettings } from '@npwd/types';
import i18next from 'i18next';
import { createTheme } from '@mui/material';
import { RecoilEnv, RecoilRoot } from 'recoil';
import { lightTheme } from './app.theme';

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

const Container = styled.div`
  position: relative;
  width: 500px;
  height: 1000px;
`;
const Background = styled.div<{ src: string }>`
  background: url(${({ src }) => src});
  position: absolute;
  z-index: 100;
  width: 500px;
  height: 1000px;
  pointer-events: none;
`;

const AppContainer = styled.div`
  z-index: 2;
  position: absolute;
  bottom: 100px;
  left: 50px;
  right: 50px;
  top: 100px;
  display: flex;
  flex-direction: column;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 20px;
`;

// Default settings will come from package. This is for development purposes.
const settings = {
  language: {
    label: 'English',
    value: 'en',
  },
  theme: {
    label: 'Theme name',
    value: 'theme-name',
  },
} as IPhoneSettings;

/*
 *   Providers loaded here will only be applied to the development environment.
 *   If you want to add more providers to the actual app inside NPWD you have to add them in APP.tsx.
 */

const Root = () => {
  return (
    <HashRouter>
      <RecoilRoot>
        <React.Suspense fallback='Loading dev env'>
          <Container>
            <Background src={image} />
            <AppContainer>
              <App settings={settings} i18n={i18next} theme={createTheme(lightTheme)} />
            </AppContainer>
          </Container>
        </React.Suspense>
      </RecoilRoot>
    </HashRouter>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));