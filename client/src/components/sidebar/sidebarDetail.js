import axios from "axios";
import React, { useEffect, useState } from "react"
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const SidebarDetail = (props) => {

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
  }, [props]);

  const onChangeStatus = (e) => {
    let update = { status: e.target.value };
    axios.post(`http://localhost:5001/update/${props.workOrder._id}`, update)
    .then((res) => {
      props.refresh();
    });
  }

  return (
    <div className="sideBar_Detail" style={{ position: 'relative' }}>
      <button className="closeButton" style={{ position: 'absolute', top: 0, right: 0, borderRadius: '5px', marginBottom: -15, border: '1px solid #A8A8A8', padding: 10, paddingLeft: 20, paddingRight: 20 }} onClick={() => { props.hideSidebar() }} >X</button>
      {isEditing ? <button style={{ position: 'absolute', top: 0, right: 70, borderRadius: '5px', marginBottom: -15, border: '1px solid #A8A8A8', padding: 10, paddingLeft: 20, paddingRight: 20 }} onClick={() => { props.hideSidebar() }} >Save</button> : null}

      <div className="labelContainer" style={{ borderBottom: '1px solid #A8A8A8', paddingBottom: 15, }}>
        <h3>{props.workOrder.description}</h3>
        <label>Description</label>
      </div>
      <div className="detailRow" style={{ borderBottom: '1px solid #A8A8A8', paddingBottom: 15 }}>
      <div className="labelContainer">
          <p><strong>{props.workOrder.type}</strong></p>
          <label>Type</label>
        </div>

        <div className="labelContainer">
          <p><strong>{props.workOrder.status}</strong></p>
          <label>Status</label>
        </div>

        <div className="labelContainer">
          <p><strong>{String(props.workOrder.dispatched)}</strong></p>
          <label>Dispatched</label>
        </div>

        <div className="labelContainer">
          <p><strong>{dayjs().to(dayjs(props.workOrder.dateRequested))}</strong></p>
          <label>Date</label>
        </div>
        <div className="labelContainer">
          <select style={{ border: '1px solid #A8A8A8', padding: 4, borderRadius: 5, marginTop: 15, fontFamily: 'inherit', fontWeight: 700, backgroundColor: 'transparent' }} defaultValue={props.workOrder.status} onChange={onChangeStatus}>
            <option value="unassigned">Unassigned</option>
            <option value="normal">Normal</option>
            <option value="important">Important</option>
            <option value="urgent">Urgent</option>
          </select><br />
          <label>Status</label>
        </div>

      </div>

      <p className="titleLabel" style={{ paddingTop: 5, marginBottom: 5 }}>Additional Information</p>
      <p style={{ borderBottom: '1px solid #A8A8A8', paddingBottom: 15, marginTop: 5 }}>{props.workOrder.addlInfo}</p>

      <p>{props.workOrder.photos?.map((photo, i) => {
        return <img key={i} width={150} style={{ borderRadius: 5 }} alt={props.workOrder.description} src={photo}></img>
      })}</p>
      {/* <p>{props.workOrder.personalDetails}</p> */}
    </div>
  )
}