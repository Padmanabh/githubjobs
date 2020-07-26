import React, { useState } from 'react';
import { Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import useFetchJobs from './useFetchJobs'
import Job from './Job'
import JobsPagination from './JobsPagination'
import SearchForm from './SearchForm';

function App() {

  const [page, setPage] = useState(1);
  const [params, setParams] = useState({});
  const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page);

  function handleParamChange(e) {
    const name = e.target.name;
    const val = e.target.value;
    setPage(1);
    setParams(prevParams => { return { ...prevParams, [name]: val } });
  }

  return (
    <Container>
      <h1 className="mb-4">GitHub Jobs</h1>
      <SearchForm params={params} onParamChange={handleParamChange} />
      {!loading && <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />}
      {loading && <>loading...</>}
      {error && <>An error occurred, try refreshing the page again!</>}
      {jobs.map((job) => { return <Job key={job.id} job={job}></Job> })}
      {!loading && <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />}
    </Container>
  );
}

export default App;
