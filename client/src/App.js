import { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import { DashboardMap } from './components/maps';
import { ContentList } from './components/contentList';
import { SidebarDetail } from './components/sidebar/sidebarDetail';

let ws = new WebSocket('ws://localhost:5002/');

function App() {

  const [showSidebar, setShowSidebar] = useState(false);
  const [workOrders, setWorkOrders] = useState([]);
  const [orderDetailView, setOrderDetailView] = useState({});
  const [connectionStatus, setConnectionStatus] = useState(false);

  const connectToWSAndListen = () => {
    ws.onopen = () => {
      console.log('You are now connect to the websocket server.');
      setConnectionStatus(true);
    }
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setWorkOrders((previousWorkOrders) => {
        return [...previousWorkOrders, message]
      })
    }
    ws.onclose = () => {
      setConnectionStatus(false);
      console.log('The connection was closed, will attempt to reconnect...');
      setTimeout(() => {
        connectToWSAndListen();
        console.log('Trying...')
      }, 3000);
    }
  }

  const getCurrentWorkOrders = (cb) => {
    axios('http://localhost:5001/wo')
    .then((response) => {
      cb(response.data);
    })
  }

  const refresh = () => {
    axios('http://localhost:5001/wo')
    .then((response) => {
      setWorkOrders(response.data);
    })
  }

  useEffect(() => {
    getCurrentWorkOrders((data) => {
      setWorkOrders(data);
    });
    connectToWSAndListen();
  },[])


  const toggleSideBar = () => {
    setShowSidebar(!showSidebar);
  }

  const displaySidebarWithData = (workOrder) => {
    setShowSidebar(true);
    setOrderDetailView(workOrder);
  }

  const hideSidebar = () => {
    setOrderDetailView({});
    setShowSidebar(false);
  }


  return (
    <div className="App">
      <div className='header'>
        <h1>Three Eleven</h1>
        <button className='standardButton'>
          {connectionStatus ? 'Connected to WS Server' : 'Disconnected'}
        </button>
      </div>
      <div className='content'>
      <div className="leftSection">

        {workOrders.length > 0 ?
        <ContentList workOrders={workOrders}  displaySidebarWithData={displaySidebarWithData} /> : <p>Loading...</p>}
      </div>
      <div className={showSidebar ? "sidebar" : "noSidebar" }>
        <SidebarDetail workOrder={orderDetailView} hideSidebar={hideSidebar} refresh={refresh} />
      </div>
      <div className="mapArea">
        <DashboardMap
          hideSidebar={hideSidebar}
          displaySidebarWithData={displaySidebarWithData}
          workOrders={workOrders}
          zoomedWorkOrder={orderDetailView}
           />
      </div>
      </div>
    </div>
  );
}

export default App;
