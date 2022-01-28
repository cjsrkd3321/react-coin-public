import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useQuery } from 'react-query';
import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useParams,
} from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoinInfo, fetchCoinTickers } from '../api';
import { IPriceData } from '../interfaces/common';
import { ICoin } from './Coins';

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.cardBgColor};
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33%;

  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${(props) => props.theme.cardBgColor};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    width: 100%;
    padding: 10px;
    display: block;
  }
`;

const HomeBtn = styled(Tabs)`
  grid-template-columns: repeat(1, 1fr);
`;

interface IRouteState {
  state: {
    coin: ICoin;
  };
}

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

function Coin() {
  const { coinId } = useParams();
  const { state } = useLocation() as IRouteState;
  const priceMatch = useMatch('/:coinId/price');
  const chartMatch = useMatch('/:coinId/chart');
  const { isLoading: infoLoading, data: IinfoData } = useQuery<IInfoData>(
    ['info', coinId],
    () => fetchCoinInfo(coinId!)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<IPriceData>(
    ['tickers', coinId],
    () => fetchCoinTickers(coinId!),
    { refetchInterval: 5_000 }
  );
  const loading = infoLoading || tickersLoading;
  return (
    <Container>
      <HelmetProvider>
        <Helmet>
          <title>
            {state?.coin.name
              ? state.coin.name
              : loading
              ? 'Loading...'
              : IinfoData?.name}
          </title>
        </Helmet>
      </HelmetProvider>

      <Header>
        <Title>
          {state?.coin.name
            ? state.coin.name
            : loading
            ? 'Loading...'
            : IinfoData?.name}
        </Title>
      </Header>

      <HomeBtn>
        <Tab isActive>
          <Link to='/'>HOME</Link>
        </Tab>
      </HomeBtn>

      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{IinfoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>{IinfoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>${tickersData?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{IinfoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={'chart'}>Cahrt</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={'price'}>Price</Link>
            </Tab>
          </Tabs>

          <Outlet context={{ coinId, tickersData }} />
        </>
      )}
    </Container>
  );
}

export default Coin;
