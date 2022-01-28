import 'styled-components';

// 이걸 해주는 이유는 실제로 DefaultTheme에는 아무런 타입이 들어가있지않음.
// 그래서 declaration merging을 이용해서 우리가 쓰고싶은걸 추가로 선언해주는거임!
declare module 'styled-components' {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    accentColor: string;
    cardBgColor: string;
  }
}
