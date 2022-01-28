import ReactApexChart from 'react-apexcharts';
import { useQuery } from 'react-query';
import { useOutletContext } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { fetchCoinHistory } from '../api';
import { isDarkAtom } from '../atom';

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface IChartProps {
  coinId: string;
}

function Chart() {
  const isDark = useRecoilValue(isDarkAtom);
  const { coinId } = useOutletContext<IChartProps>();
  const { isLoading, data } = useQuery<IHistorical[]>(
    ['ohlcv', coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10_000,
    }
  );
  return (
    <div>
      {isLoading ? (
        'Loading chart...'
      ) : (
        <ReactApexChart
          type='candlestick'
          series={[
            {
              data: data?.map((d) => {
                return {
                  x: d.time_close,
                  y: [d.open, d.high, d.low, d.close],
                };
              }),
            },
          ]}
          options={{
            theme: {
              mode: isDark ? 'dark' : 'light',
            },
            chart: {
              type: 'candlestick',
              height: 300,
              width: 500,
              toolbar: {
                show: true,
              },
              background: 'transparent',
            },
            grid: { show: false },
            stroke: {
              curve: 'smooth',
              width: 4,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              axisBorder: { show: true },
              axisTicks: { show: false },
              labels: { show: true },
              type: 'datetime',
              categories: data?.map((price) => price.time_close),
            },
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
