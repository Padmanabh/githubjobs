import React from 'react'
import { Form, Col } from 'react-bootstrap'

export default function SearchForm({ params, onParamChange }) {
    return (
        <Form className="mb-2" style={{marginTop:"87px"}}>
            <Form.Row className="align-items-end">
                <Form.Group as={Col}>
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Enter Description" value={params.description} name="description" onChange={onParamChange} />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Location</Form.Label>
                    <Form.Control type="text" placeholder="Enter Location" value={params.description} name="location" onChange={onParamChange} />
                </Form.Group>
                <Form.Group as={Col} xs="auto" className="ml-2">
                    <Form.Check className="mb-2" type="checkbox" id="full-time" value={params.full_time} name="full_time" onChange={onParamChange} label="Only full-time jobs" />
                </Form.Group>
            </Form.Row>
        </Form>
    )
}
