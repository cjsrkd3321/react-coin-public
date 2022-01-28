import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import Router from './Router';
import { ReactQueryDevtools } from 'react-query/devtools';
import { darkTheme, lightTheme } from './theme';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isDarkAtom } from './atom';

// /* @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap'); */
// /* font-family: 'Source Sans Pro', sans-serif; */

const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-weight: 300;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  line-height: 1.2;
}
a {
  text-decoration:none;
  color: inherit;
}
`;

const CheckBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

const CheckBoxLabel = styled.label`
  margin-bottom: 10px;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: ${(props) => props.theme.accentColor};
  cursor: pointer;
  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 4px;
    margin-left: 21px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;

const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${CheckBoxLabel} {
    background: ${(props) => props.theme.accentColor};
    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin: 4px;
      transition: 0.2s;
    }
  }
`;

const ThemeState = styled.span`
  color: ${(props) => props.theme.accentColor};
  font-weight: 500;
`;

function App() {
  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((isDark) => !isDark);
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <CheckBoxWrapper>
          <CheckBox
            id='checkbox'
            type='checkbox'
            onChange={toggleDarkAtom}
            checked={isDark ? true : false}
          />
          <CheckBoxLabel htmlFor='checkbox'></CheckBoxLabel>
          <ThemeState>{isDark ? 'Dark' : 'Light'}</ThemeState>
        </CheckBoxWrapper>
        <GlobalStyle />
        <Router />
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </>
  );
}

export default App;
