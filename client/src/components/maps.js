import React, { useEffect, useState } from "react"
import { Map, Marker } from "pigeon-maps"
import { stamenToner } from 'pigeon-maps/providers'
import { WorkMapMarker } from '../components/maps/marker';

export const DashboardMap = (props) => {

  const [currentCenter, setCurrentCenter] = useState([37.7562, -122.438])
  const [zoom, setZoom] = useState(13);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    setMarkers(props.workOrders);
  }, [props.workOrders])

  useEffect(() => {
    if (props.zoomedWorkOrder.location) {
      setCurrentCenter([props.zoomedWorkOrder.location.latitude, props.zoomedWorkOrder.location.longitude])
      setZoom(16);
    } else {
      setCurrentCenter([37.7562, -122.438]);
      setZoom(13)
    }
  }, [props.zoomedWorkOrder])

  return (
    <Map onBoundsChanged={({ center, zoom }) => {
      setCurrentCenter(center)
      setZoom(zoom)
    }}
    provider={stamenToner} center={currentCenter} zoom={zoom}>
      {markers.map((workOrder, i) => {
        return ( <WorkMapMarker key={i} onClick={() => {setCurrentCenter([workOrder.location.latitude, workOrder.location.longitude]); setZoom(16); }} className={workOrder.status} width={50} anchor={[Number(workOrder.location.latitude), Number(workOrder.location.longitude)]}></WorkMapMarker> );
      })}
    </Map>
  )
}