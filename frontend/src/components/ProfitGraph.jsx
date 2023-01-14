/* eslint react/prop-types: 0 */
/* eslint eqeqeq: 0 */
import React from 'react';
import ReactECharts from 'echarts-for-react';
import dayjs from 'dayjs';
import { makeRequest } from '../components/Helpers';

const dateMaps = new Map();
const hosted = [];

export default function ProfitGraph (props) {
  const [bookings, setBookings] = React.useState([]);

  const [loading, setLoading] = React.useState(true);

  const analyzeData = () => {
    for (const booking of bookings) {
      const dateStart = booking.dateRange.start;
      const dateEnd = booking.dateRange.end;
      const status = booking.status;
      const totalPrice = booking.totalPrice;
      if (status === 'accepted') {
        const diff = dayjs().diff(dayjs(dateStart), 'day');
        if (diff >= 0 && diff <= 30) {
          const bookingDays = dayjs(dateEnd).diff(dayjs(dateStart), 'day');
          const dayProfit = totalPrice / bookingDays;
          let temp = 0;
          for (let i = 0; i < bookingDays; i++) {
            if (dateMaps.get(diff - i) === undefined) {
              temp = 0;
            } else {
              temp = dateMaps.get(diff - i);
            }
            dateMaps.set(diff - i, temp + dayProfit);
          }
        }
      }
    }
    setLoading(false);
  };
  const getbookings = async () => {
    const dataOne = await makeRequest('bookings', 'GET', undefined, props.token);
    for (const bookings of dataOne.bookings) {
      for (const listings of hosted) {
        if (listings.id == bookings.listingId) {
          setBookings(current => [...current, bookings]);
        }
      }
    }
  }

  const initGraphData = async () => {
    try {
      const getalllistings = async () => {
        const data = await makeRequest('listings', 'GET', undefined, props.token);
        for (const listing of data.listings) {
          if (listing.owner === localStorage.getItem('user')) {
            hosted.push(listing)
          }
        }
      }
      await getalllistings();
      await getbookings();
      if (bookings.length > 0) {
        analyzeData();
      } else {
        setLoading(false)
      }
    } catch (error) {
      alert(error.message)
    }
  }
  const initXAxis = () => [...new Array(31).keys()].reverse();

  const getGraphData = () => {
    const xAxis = initXAxis();
    const res = [];
    for (const x of xAxis) {
      if (dateMaps.get(x) === undefined) {
        res.push(0)
      } else {
        res.push(dateMaps.get(x))
      }
    }
    return res;
  };

  const options = {
    title: { show: true, text: 'Profit in the last 30 days' },
    xAxis: { data: initXAxis() },
    yAxis: { name: '$' },
    series: [
      {
        data: getGraphData(),
        type: 'line',
        smooth: true,
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
  };

  const loadingOption = {
    text: 'loading...',
    color: '#4413c2',
    textColor: '#270240',
    zLevel: 0,
  };

  React.useEffect(() => {
    initGraphData();
  }, []);

  return (
    <>
      {loading
        ? (
        <ReactECharts
          option={options}
          style={{ paddingTop: 30, height: 400, width: 600 }}
          showLoading
          loadingOption={loadingOption}
        />
          )
        : (
        <ReactECharts option={options} style={{ paddingTop: 30, height: 400, width: 400 }} />
          )}
    </>
  );
}
