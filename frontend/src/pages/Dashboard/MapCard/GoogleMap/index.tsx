/** @jsxImportSource @emotion/react */
import { RefCallback, useCallback, useEffect, useState } from 'react';
import { googleMapWrapStyle } from './style.ts';
import { useDashboardStore } from '../../../../store/dashboard';
import MapFilter from './MapFilter';
import { MapItemType } from '../../../../store/dashboard/type.ts';
import { createRoot, Root } from 'react-dom/client';
import MapMarker from './MapMarker';

type MarkerInstances = {
  [key: string]: google.maps.marker.AdvancedMarkerElement;
};
type MarkerRoots = {
  [key: string]: Root; //Root 타입 설정
};

const GoogleMap = () => {
  const [googleMap, setGoogleMap] = useState<google.maps.Map>();
  const { region, site, mainSiteFilter, setDrawerData } = useDashboardStore();
  const [markerInstances, setMarkerInstances] = useState<MarkerInstances>({});
  const [markerRoots, setMarkerRoots] = useState<MarkerRoots>({});

  // 구글맵 render
  const mapRef = useCallback<RefCallback<HTMLDivElement>>((node: HTMLDivElement) => {
    if (node) {
      const initialMap = new window.google.maps.Map(node, {
        center: {
          lat: 36.5,
          lng: 127.987,
        },
        mapId: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
        zoom: 8,
        /* disableDefaultUI: true,
          clickableIcons: false,
          disableDefaultUI: true, */
        gestureHandling: 'greedy',
        mapTypeControl: false, // 지도 or 위성 선택 탭
        streetViewControl: false, // 거리뷰
        fullscreenControl: false, // 전체화면 버튼
      });

      setGoogleMap(initialMap);
    }
  }, []);

  // marker render
  useEffect(() => {
    if (!googleMap) return;
    // 지역, 시설 선택에 따른 data 사용 대상
    let data: MapItemType[] = [];
    if (mainSiteFilter === 'region') data = region ?? [];
    else data = site ?? [];

    const newMarkerInstances: MarkerInstances = { ...markerInstances };
    const newMarkerRoots: MarkerRoots = { ...markerRoots };

    // id 겹치는지 확인 겹치면 지움
    Object.keys(markerInstances).forEach((id) => {
      if (!data.find((item) => item.id === id)) {
        markerInstances[id].map = null;
        delete newMarkerInstances[id];
        delete newMarkerRoots[id];
      }
    });

    // data 확인하고 마커 만들어
    data.forEach((item) => {
      const container = document.createElement('div');
      const markerItem = new google.maps.marker.AdvancedMarkerElement({
        position: {
          lat: item.latitude,
          lng: item.longitude,
        },
        map: googleMap,
        title: item.id,
        content: container,
        gmpClickable: true,
        zIndex: 1,
      });

      // 있던건 갱신, 없던건 새로
      if (!markerRoots[item.id]) newMarkerRoots[item.id] = createRoot(container);
      else newMarkerRoots[item.id] = markerRoots[item.id];

      newMarkerRoots[item.id].render(<MapMarker key={item.id} data={item} />);

      // markerItem.addListener('click', () => {
      google.maps.event.addListener(markerItem, 'click', () => {
        setDrawerData({ open: true, data: { id: item.id, title: item.title, type: mainSiteFilter } });
      });
      container.addEventListener('mouseenter', () => {
        markerItem.zIndex = 10;
      });
      container.addEventListener('mouseleave', () => {
        markerItem.zIndex = 1;
      });

      newMarkerInstances[item.id] = markerItem;

      setMarkerInstances(newMarkerInstances);
      setMarkerRoots(newMarkerRoots);
      // cleanup 해줘야함
      return () => {
        markerItem.map = null;
      };
    });
  }, [googleMap, site, region, mainSiteFilter]);

  return (
    <div css={googleMapWrapStyle}>
      <MapFilter />
      <div ref={mapRef} id="map" style={{ height: '100%' }} />
    </div>
  );
};

export default GoogleMap;
