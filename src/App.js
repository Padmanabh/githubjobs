import React, { useState, useEffect } from 'react';
import { Container, Navbar } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import useFetchJobs from './useFetchJobs'
import Job from './Job'
import JobsPagination from './JobsPagination'
import SearchForm from './SearchForm';
import logo from "./ms-icon-70x70.png";

function App() {

  const [page, setPage] = useState(1);
  const [params, setParams] = useState({});
  const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page);
  const [scroll, setScroll] = useState(false);
  function handleParamChange(e) {
    const name = e.target.name;
    const val = e.target.value;
    setPage(1);
    setParams(prevParams => { return { ...prevParams, [name]: val } });
  }

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 10);
    });
  }, []); 

  return (
    <Container>
      <Navbar bg="light" fixed="top" className={scroll?"shrinked":""}>
        <Navbar.Brand className="d-flex align-items-center">
          <img
            alt=""
            src={logo}
            height="50"
            className="d-inline-block align-top"
          />{' '}
          <h2 className="ml-4">GitHub Jobs</h2>
        </Navbar.Brand>
      </Navbar>

      <SearchForm params={params} onParamChange={handleParamChange}  />
      {!loading && <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />}
      {loading && <>loading...</>}
      {error && <>An error occurred, try refreshing the page again!</>}

      {jobs.map((job) => { return <Job key={job.id} job={job}></Job> })}

      {!loading && <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />}
    </Container>
  );
}

export default App;
