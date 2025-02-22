import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './css/style.css';
import Layout from './layouts/Layout';
import Dashboard from './pages/Dashboard';
import EmployeeTableView from './pages/EmployeeTableView';
import EmployeeCardView from './pages/EmployeeCardView';

// Import pages


function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/table-view" element={<EmployeeTableView />} />
          <Route path="/card-view" element={<EmployeeCardView />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;