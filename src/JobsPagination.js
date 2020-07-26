import React, { Component } from 'react'
import { Pagination } from 'react-bootstrap'

export default class JobsPagination extends Component {

    adjustPage(amount) {
        this.props.setPage(this.props.page + amount);
    }

    render() {

        const { page, setPage, hasNextPage } = this.props;

        return (
            <Pagination className="mb-2">
                {page > 1 && <Pagination.Prev onClick={() => this.adjustPage(-1)} />}
                {page >= 2 && <Pagination.Item onClick={() => setPage(1)}>1</Pagination.Item>}
                {page > 2 && <Pagination.Ellipsis />}
                {page > 3 && <Pagination.Item onClick={() => this.adjustPage(-1)}>{page - 1}</Pagination.Item>}
                <Pagination.Item active>{page}</Pagination.Item>
                {hasNextPage && <Pagination.Item onClick={() => this.adjustPage(1)}>{page + 1}</Pagination.Item>}
                {hasNextPage && <Pagination.Next onClick={() => this.adjustPage(1)} />}
            </Pagination>
        )
    }
}
