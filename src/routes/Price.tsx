import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import { IPriceData } from '../interfaces/common';

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
`;

const Overview = styled.div`
  width: ;
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.cardBgColor};
  padding: 10px 20px;
  border-radius: 10px;
  margin: 25px 0px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;

  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

interface IPriceProps {
  tickersData?: IPriceData;
}

function Price() {
  const { tickersData } = useOutletContext<IPriceProps>();
  return (
    <Container>
      <Overview>
        <OverviewItem>
          <span>All Time High Price:</span>
          <span>{tickersData?.quotes.USD.ath_price}</span>
        </OverviewItem>
        <OverviewItem>
          <span>All Time Date:</span>
          <span>{tickersData?.quotes.USD.ath_date.split('T')[0]}</span>
        </OverviewItem>
      </Overview>
      <Overview>
        <OverviewItem>
          <span>Percent From ATH Price:</span>
          <span>{tickersData?.quotes.USD.percent_from_price_ath}%</span>
        </OverviewItem>
        <OverviewItem>
          <span>Market CAP:</span>
          <span>
            ${tickersData?.quotes.USD.market_cap.toLocaleString('en-US')}
          </span>
        </OverviewItem>
      </Overview>
    </Container>
  );
}

export default Price;
