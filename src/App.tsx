import styled, { ThemeProvider } from 'styled-components';
import Router from './Router';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useState } from 'react';
import { darkTheme, lightTheme } from './theme';

const ThemeBtn = styled.button`
  position: fixed;
  font-size: 16px;
  top: 20px;
  right: 25px;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  border-color: ${(props) => props.theme.bgColor};
  border-style: none;
  &:active {
    border-style: outset;
  }
`;

function App() {
  const [themeMode, setThemeMode] = useState('dark');

  const onClick = () => {
    setThemeMode(themeMode === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <ThemeProvider theme={themeMode === 'dark' ? lightTheme : darkTheme}>
        <ThemeBtn
          theme={themeMode === 'dark' ? lightTheme : darkTheme}
          onClick={onClick}
        >
          {`To ${themeMode.toUpperCase()}`}
        </ThemeBtn>
        {/* Fragments 일종의 유령 컴포넌트 */}
        <Router basename={process.env.PUBLIC_URL} />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={true}></ReactQueryDevtools>
    </>
  );
}

export default App;
