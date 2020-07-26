import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import useFetchJobs from './useFetchJobs'
import Job from './Job'

function App() {

  const [page, setPage] = useState(1);
  const [params, setParams] = useState({ location: "nebraska" });
  const { jobs, loading, error } = useFetchJobs(params, page);

  return (
    <Container>
      <h1 className="mb-4">GitHub Jobs</h1>
      <Form inline>
        <Form.Group controlId="type" className="mr-2">
          <Form.Label>Type</Form.Label>
          <Form.Control type="text" placeholder="Enter Type" />
        </Form.Group>
        <Form.Group controlId="location">
          <Form.Label>Location</Form.Label>
          <Form.Control type="text" placeholder="Enter Location" />
        </Form.Group>
      </Form>

      {loading && <>loading...</>}
      {error && <>An error occurred, try refreshing the page again!</>}
      {jobs.map((job) => { return <Job key={job.id} job={job}></Job> })}
    </Container>
  );
}

export default App;
