import React, { useEffect, useState } from "react"
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);


export const ContentListItem = (props) => {

  return (
    <div className="contentListItem" onClick={() => {props.displaySidebarWithData(props.workOrder)}}>
      <div>
      <h4>{props.workOrder.description}</h4>
      <label className="titleLabel">Description</label>
      <div className="detailRow">
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

      </div>
      </div>
      {props.workOrder.photos[0] ?
        <div className="contentListItemPhoto" style={{ background: `url(${props.workOrder.photos[0]})`, backgroundSize: 'cover' }}>
      </div>
      :
      null
      }

    </div>
  )
}

// const WorkOrderSchema = new mongoose.Schema({
//   workId: {type: Number, index: true, unique: true},
//   title: String,
//   status: String,
//   type: String,
//   dateRequested: Date,
//   addlInfo: String,
//   photos: [],
//   location: {
//     latitude: Number,
//     longitude: Number
//   },
//   personalDetails: {
//     firstName: String,
//     lastName: String,
//     phone: String,
//     email: String
//   }
// })