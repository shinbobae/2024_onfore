/** @jsxImportSource @emotion/react */
import { Status, Wrapper } from '@googlemaps/react-wrapper';
import { Spin } from 'antd';
import GoogleMap from '../index.tsx';

const render = (status: Status) => {
  switch (status) {
    case Status.LOADING:
      return <Spin />;
    case Status.FAILURE:
      return <>에러 발생</>;
    case Status.SUCCESS:
      return <GoogleMap />;
  }
};

const GoogleMapWrapper = () => {
  return <Wrapper apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY} render={render} libraries={['marker']} />;
};

export default GoogleMapWrapper;
