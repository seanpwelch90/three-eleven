import React, { useEffect, useState } from "react";
import { ContentListItem } from "./contentListItem";

export const ContentList = (props) => {

  return (
    <div className="contentList">
      <h2>Current Work Orders</h2>
    <div className="contentListItems">
    {props.workOrders.map((workOrder, i) => {
      return  <ContentListItem key={i} workOrder={workOrder}  displaySidebarWithData={props.displaySidebarWithData}/>
    })}
    </div>
    </div>
  )
}