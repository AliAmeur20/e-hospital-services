import { Button, Modal } from 'react-bootstrap';
import MyNavbar from '../Components/myNavBar';
import Table from 'react-bootstrap/Table';
import { BiTrash, BiPencil } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import OrderStatus from '../Components/orderStatus';

const tableStyle = {
    borderRadius: '20px',
    overflow: 'hidden',
};

function Order() {

    const [modalShow, setModalShow] = useState(false);
    const [modalShow2, setModalShow2] = useState(false);
    const [order, setOrder] = useState(null)
    const [orders, setOrders] = useState(null)
    const [cmd, setCmd] = useState(null)
    const [cost, setCost] = useState(null)
    const [quantity, setQuantity] = useState(0)
    const [deliveryDate, setDeliveryDate] = useState(null)
    const [devices, setDevices] = useState(null);
    const [search, setSearch] = useState('')

    useEffect(() => {
        fetchData();
        fetchDevices();
    }, [search])

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/order?search=${search}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            const json = await response.json();
            setOrders(json);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchDevices = async () => {
        try {
            const response = await fetch('/api/consumable-md');
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            const json = await response.json();
            setDevices(json);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault()
        const body = { consumableMDId: cmd, quantity, cost, deliveryDate }
        const response = await fetch('api/order', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        if (response.ok) {
            fetchData()
            setModalShow(false)
            setCmd(null)
            setCost(null)
            setQuantity(0)
            setDeliveryDate(null)
        } else {
            console.error(json.err)
        }
    }

    const handleDelete = async (id) => {
        const response = await fetch(`/api/order/${id}`, {
            method: 'DELETE'
        })
        if (response.ok) {
            fetchData()
            setModalShow2(false)
            setOrder(null)
        } else {
            const json = await response.json()
            console.error(json.err)
        }
    }

    return (
        <div className="container-fluid p-0">
            <MyNavbar />
            <div className='content p-4'>
                <h2 className='m-4'>Orders</h2>
                <div className='row mb-4 px-4 d-flex align-items-center'>
                    <div className='col d-flex justify-content-between mt-2'>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2 rounded-5 py-3 px-5 border border-success border-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => { setSearch(e.target.value) }} />
                            <button className="btn btn-outline-success rounded-5 px-4" type="submit">Search</button>
                        </form>
                    </div>
                    <div className='col-auto mt-2'>
                        <Button onClick={() => setModalShow(true)} className='btn btn-success d-flex align-items-center rounded-4 py-2 px-5'>Add <BiPencil fill="#ffffff" size="1.2em" className='ms-2' /></Button>
                    </div>
                </div>
                <Table striped responsive style={tableStyle}>
                    <thead>
                        <tr className='text-center'>
                            <th className='py-4'>#</th>
                            <th className='py-4'>M device</th>
                            <th className='py-4'>quantity</th>
                            <th className='py-4'>date</th>
                            <th className='py-4'>delivery date</th>
                            <th className='py-4'>cost</th>
                            <th className='py-4'>status</th>
                            <th className='py-4'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders && orders.map((order) => (
                            <tr key={order.id} className='text-center'>
                                <td className='py-3'>{order.id}</td>
                                <td className='py-3'>{order.consumableMDName}</td>
                                <td className='py-3'>{order.quantity}</td>
                                <td className='py-3'>{order.date}</td>
                                <td className='py-3'>{order.deliveryDate}</td>
                                <td className='py-3'>{order.cost}</td>
                                <td className='py-3'><OrderStatus delivered={order.status !== 'NEW'} /></td>
                                <td className='py-3'>
                                    <Button onClick={() => { setModalShow2(true); setOrder(order) }} className='btn btn-sm btn-danger mx-1'><BiTrash fill="#ffffff" size="1.2em" /></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            <Modal
                show={modalShow}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                backdrop="static"
                centered
            >
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter" className='py-1 px-3'>
                        Add new order
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='p-4'>
                    <form onSubmit={handleAdd}>
                        <div className="form-group  mt-2 px-2">
                            <div className="row justify-content-center">
                                <div className="col-12">
                                    <select className="form-select my-2" aria-label="Default select example" onChange={(e) => { setCmd(e.target.value) }} required>
                                        <option value="" disabled selected hidden>medical device</option>
                                        {devices && devices.map((device) => (
                                            <option key={device.id} value={device.id}>{device.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-12 col-md-6">
                                    <input type="text" className="form-control mt-2" placeholder="quantity (please enter a number)" pattern="^[1-9]\d*$" onChange={(e) => { setQuantity(e.target.value) }} required />
                                </div>
                                <div className="col-12 col-md-6">
                                    <input type="text" className="form-control my-2" placeholder='cost' onChange={(e) => { setCost(e.target.value) }} required />
                                </div>
                                <div className="d-flex align-items-center justify-content-start">
                                    <label className="fw-semibold text-success me-4" style={{ whiteSpace: 'nowrap' }}>delivery date:</label>
                                    <input type="date" className="form-control my-2 flex-grow-1" onChange={(e) => { setDeliveryDate(e.target.value) }} required />
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 align-items-center text-center">
                            <button className="btn btn-success text-white fw-bold" type="submit">create</button>
                            <span className="text-muted text-decoration-none fw-semibold mx-4" type="button" onClick={() => setModalShow(false)} >Cancel</span>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            <Modal
                show={modalShow2}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                backdrop="static"
                centered

            >

                <Modal.Body className='p-4 border border-danger border-2 rounded'>
                    <h1 className='h5 text-center'>are you sure thet you want to delete this order ?</h1>

                    <div className="mt-4 align-items-center text-center">
                        <button className="btn btn-danger text-white fw-bold" type="submit" onClick={() => handleDelete(order.id)}>delete</button>
                        <span className="text-muted text-decoration-none fw-semibold mx-4" type="button" onClick={() => { setModalShow2(false); setOrder(null) }} >Cancel</span>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Order