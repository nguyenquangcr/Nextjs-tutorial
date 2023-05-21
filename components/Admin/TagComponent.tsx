import React, { useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { getListTag } from 'slices/postUser';
import { RootState } from 'store';

ChartJS.register(ArcElement, Tooltip, Legend);

const TagComponent = () => {
  const dispatch = useDispatch();
  const dataTag = useSelector((state: RootState) => state.postUser.dataTag);
  //state
  const [arrTag, setArrTag] = React.useState([]);
  const [arrValue, setArrValue] = React.useState([]);

  useEffect(() => {
    let newArrTag: any = [];
    let newArrValue: any = [];
    if (dataTag !== null) {
      Object.keys(dataTag).forEach(function (key, index) {
        newArrTag.push(key);
        newArrValue.push(dataTag[key]);
      });
    }
    setArrTag(newArrTag);
    setArrValue(newArrValue);
  }, [dataTag]);

  useEffect(() => {
    const data = dispatch(getListTag());
  }, []);

  const data = {
    labels: arrTag,
    datasets: [
      {
        label: '# of Votes',
        data: arrValue,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: '90%', height: '500px' }}>
      {' '}
      <Pie data={data} />
    </div>
  );
};

export default TagComponent;
