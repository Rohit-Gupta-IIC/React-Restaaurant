import React, { useState, useEffect } from 'react'
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000',
})

const ListItems = () => {

    const [data, setdata] = useState()

    function getData() {
        api.get('/getall')
            .then(res => {
                setdata(res.data)
            })
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>Email ID</th>
                        <th>Order</th>
                        <th>Order Details</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.Name}</td>
                                    <td>{item.Mobile}</td>
                                    <td>{item.Email}</td>
                                    <td>{item.Menu}</td>
                                    <td>{item.Extra}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default ListItems
