import React, { useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { getListTag, getListTagByTime } from 'slices/postUser';
import { RootState } from 'store';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Select, Typography } from 'antd';

ChartJS.register(ArcElement, Tooltip, Legend);

const formatTag = (namTag: string) => {
  switch (namTag) {
    case 'thoitrang':
      return 'Thời trang';
    case 'lamdep':
      return 'Làm đẹp';
    case 'doisong':
      return 'Đời sống';
    case 'amthuc':
      return 'Ẩm thực';
    case 'dulich':
      return 'Du lịch';
    case 'tuvi':
      return 'Tử vi';
    case 'suckhoe':
      return 'Sức khỏe';
    case 'khampha':
      return 'Khám phá';
    case 'congnghe':
      return 'Công nghệ';
    default:
      break;
  }
};

const TagComponent = () => {
  const dispatch = useDispatch();
  const dataTag = useSelector((state: RootState) => state.postUser.dataTag);
  //state
  const [arrFormat, setArrFormat] = React.useState([]);

  useEffect(() => {
    let newArrFormat: any = [];
    if (dataTag !== null) {
      Object.keys(dataTag).forEach(function (key, index) {
        newArrFormat.push({
          name: formatTag(key),
          y: dataTag[key],
        });
      });
      setArrFormat(newArrFormat);
    }
  }, [dataTag]);

  useEffect(() => {
    dispatch(getListTag());
  }, []);

  const options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    },
    title: {
      text: 'Thống kê lượt xem theo danh mục bài viết',
      align: 'left',
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        },
      },
    },
    series: [
      {
        name: 'Brands',
        colorByPoint: true,
        data: arrFormat,
      },
    ],
  };

  const handleChange = (value: string) => {
    if (value == 'mon')
      dispatch(getListTagByTime({ startTime: '2023-05-02', endTime: '2023-06-02' }));
    else if (value == 'qua')
      dispatch(getListTagByTime({ startTime: '2023-03-02', endTime: '2023-06-02' }));
    else dispatch(getListTag());
  };

  const { Title } = Typography;

  return (
    <>
      <div style={{ width: '80%', margin: '15px auto' }}>
        <Title level={4}>Chọn khung thời gian thống kê</Title>
        <Select
          defaultValue="all"
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            { value: 'mon', label: 'Tháng' },
            { value: 'qua', label: 'Quý' },
            { value: 'all', label: 'Tất cả' },
          ]}
        />
      </div>
      <div style={{ width: '80%', margin: '50px auto' }}>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </>
  );
};

export default TagComponent;
