import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import data from '../staticData/locationData'

const tableStyle = {
    borderRadius: '20px',
    overflow: 'hidden',
};

function ReceivedOrder() {
    const [modalShow, setModalShow] = useState(false);
    const [search, setSearch] = useState('')
    const [order, setOrder] = useState(null)
    const [cmd, setCmd] = useState(null)
    const [orders, setOrders] = useState(null)
    const [expDate, setExpDate] = useState(null)
    const [quantity, setQuantity] = useState(0)
    const [location, setLocation] = useState('')
    const [room, setRoom] = useState('')
    const [wardrobe, setWardrobe] = useState('')
    const [totalQnt, setTotalQnt] = useState(0)

    useEffect(() => {
        fetchData();
    }, [search])

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/received-order?search=${search}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            const json = await response.json();
            setOrders(json);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault()
        const repl = { cmdId: cmd, quantity, location, room, wardrobe, expDate }
        const response = await fetch(`api/replishement/${order}`, {
            method: 'POST',
            body: JSON.stringify(repl),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.ok) {
            fetchData()
            setModalShow(false)
            setCmd(null)
            setQuantity(0)
            setLocation('')
            setRoom('')
            setWardrobe('')
            setOrder(null)
            setTotalQnt(0)
        }
    }

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
        setRoom('');
        setWardrobe('');
    };

    const handleRoomChange = (e) => {
        setRoom(e.target.value);
        setWardrobe('');
    };

    const handleDropeChange = (e) => {
        setWardrobe(e.target.value);
    };

    const filteredRooms = location
        ? data.locations.find((loc) => loc.id === location).rooms
        : [];

    const filteredDropes = room ? data.rooms[room].dropes : [];

    const handleCancel = () => {
        setModalShow(false)
        setCmd(null)
        setQuantity(0)
        setLocation('')
        setRoom('')
        setWardrobe('')
        setOrder(null)
        setTotalQnt(0)
    }

    return (
        <div className="container-fluid p-0">
            <div className='content p-4'>
                <h2 className='m-4'>Received Orders</h2>
                <div className='mb-4 px-4'>
                    <div className='col d-flex justify-content-between mt-2'>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2 rounded-5 py-3 px-5 border border-success border-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => { setSearch(e.target.value) }} />
                            <button className="btn btn-outline-success rounded-5 px-4" type="submit">Search</button>
                        </form>
                    </div>
                </div>
                <Table striped responsive style={tableStyle}>
                    <thead>
                        <tr className='text-center'>
                            <th className='py-4'>#</th>
                            <th className='py-4'>M device</th>
                            <th className='py-4'>quantity</th>
                            <th className='py-4'>date</th>
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
                                <td className='py-3'>
                                    <Button onClick={() => { setModalShow(true); setCmd(order.consumableMDId); setOrder(order.id) ; setTotalQnt(order.quantity) }} className='btn btn-sm rounded-3 btn-primary mx-1'>add replishement</Button>
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
                        Add replishement
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='p-4'>
                    <div className="alert alert-primary m-3 text-center">
                       order total quantity is <span className='fw-bold'>{totalQnt}</span> , please insert valid and corrupted quantities!
                    </div>
                    <form onSubmit={handleAdd}>
                        <div className="form-group  mt-2 px-2">
                            <div className="row justify-content-center">
                                <div className="col-12 col-md-6">
                                    <input type="text" className="form-control my-2" placeholder='valid quantity (please enter a number)' pattern="^[0-9]\d*$" onChange={(e) => { setQuantity(e.target.value) }} required />
                                </div>
                                <div className="col-12 col-md-6">
                                    <input type="text" className="form-control my-2" placeholder='corrupted quantity (please enter a number)' pattern="^[0-9]\d*$" required />
                                </div>
                                <div className="col-12  col-md-6">
                                    <select className="form-select my-2" value={location} onChange={handleLocationChange} required>
                                        <option value="" disabled selected hidden>Select Location</option>
                                        {data.locations.map((location) => (
                                            <option key={location.id} value={location.id}>
                                                {location.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-12 col-md-6">
                                    <select className="form-select my-2" value={room} onChange={handleRoomChange} disabled={!location} required>
                                        <option value="" disabled selected hidden>Select Room</option>
                                        {filteredRooms.map((roomId) => (
                                            <option key={roomId} value={roomId}>
                                                {data.rooms[roomId].name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-12 col-md-6">
                                    <select className="form-select my-2" value={wardrobe} onChange={handleDropeChange} disabled={!room} required>
                                        <option value="" disabled selected hidden>Select Drope</option>
                                        {filteredDropes.map((drope) => (
                                            <option key={drope} value={drope}>
                                                {drope}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-12 col-md-6 d-flex align-items-center">
                                    <label className='fw-semibold text-danger me-3'>exp:</label>
                                    <input type="date" className="form-control my-2" onChange={(e) => { setExpDate(e.target.value) }} required />
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 align-items-center text-center">
                            <button className="btn btn-success text-white fw-bold" type="submit">create</button>
                            <span className="text-muted text-decoration-none fw-semibold mx-4" type="button" onClick={() => handleCancel()} >Cancel</span>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ReceivedOrder