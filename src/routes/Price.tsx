import styled from 'styled-components';
import View from '../common-component/View';
import { IPriceData } from '../Interface';

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
interface IPriceProps {
  coinId: string;
  tickerData?: IPriceData;
}

function Price({ coinId, tickerData }: IPriceProps) {
  return (
    <Container>
      <View
        isCenter
        comment={`ALL TIME HIGH : `}
        text={`${tickerData?.quotes.USD.ath_price.toFixed(4)}`}
      />
      <View
        isCenter
        comment={`ALL TIME DATE : `}
        text={`${tickerData?.quotes.USD.ath_date}`}
      />
      <View
        isCenter
        comment={`Change in Last 1Y : `}
        text={`${tickerData?.quotes.USD.percent_change_1y}%`}
      />
      <View
        isCenter
        comment={`Change in Last 30D : `}
        text={`${tickerData?.quotes.USD.percent_change_30d}%`}
      />
      <View
        isCenter
        comment={`Change in Last 7D : `}
        text={`${tickerData?.quotes.USD.percent_change_7d}%`}
      />
      <View
        isCenter
        comment={`Change in Last 24H : `}
        text={`${tickerData?.quotes.USD.percent_change_24h}%`}
      />
    </Container>
  );
}

export default Price;
