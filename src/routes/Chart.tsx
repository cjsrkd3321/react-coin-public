import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';

interface IChartProps {
  coinId: string;
}

interface IHistoricalData {
  time_open: Date;
  time_close: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart({ coinId }: IChartProps) {
  const { isLoading, data } = useQuery<IHistoricalData[]>(
    ['ohlcv', coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );

  return (
    <div>
      {isLoading ? (
        'Loading chart...'
      ) : (
        <ApexChart
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
            chart: {
              type: 'candlestick',
              toolbar: {
                show: false,
              },
              width: 500,
              height: 500,
              background: 'transparent',
            },
            grid: { show: false },
            xaxis: {
              type: 'datetime',
              axisTicks: { show: false },
              labels: { show: false },
              axisBorder: { show: false },
            },
            yaxis: {
              show: false,
              tooltip: {
                enabled: true,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
