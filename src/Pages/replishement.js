import { Button, Modal } from 'react-bootstrap';
import MyNavbar from '../Components/myNavBar';
import Table from 'react-bootstrap/Table';
import { BiTrash, BiPencil } from 'react-icons/bi';
import { useEffect, useState } from 'react';

const tableStyle = {
    borderRadius: '20px',
    overflow: 'hidden',
};

function Replishement() {
    const [modalShow, setModalShow] = useState(false);
    const [modalShow2, setModalShow2] = useState(false);
    const [modalShow3, setModalShow3] = useState(false);
    const [Replishements, setReplishements] = useState(null)
    const [Replishement, setReplishement] = useState(null)
    const [cmd, setCmd] = useState(null)
    const [supplier, setSupplier] = useState(null)
    const [expDate, setExpDate] = useState(null)
    const [quantity, setQuantity] = useState(0)
    const [location, setLocation] = useState(null)
    const [room, setRoom] = useState(null)
    const [wardrobe, setWardrobe] = useState(null)
    const [devices, setDevices] = useState(null)
    const [search, setSearch] = useState('')

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/replishement?search=${search}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            const json = await response.json();
            setReplishements(json);
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

    useEffect(() => {
        fetchData();
        fetchDevices();
    }, [search])

    const handleAdd = async (e) => {
        e.preventDefault()
        const repl = { cmdId: cmd, quantity, supplier, location, room, wardrobe, expDate }
        const response = await fetch('api/replishement', {
            method: 'POST',
            body: JSON.stringify(repl),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        if (response.ok) {
            fetchData()
            setModalShow(false)
            setCmd(null)
            setSupplier(null)
            setQuantity(0)
        } else {
            console.error(json.err)
        }
    }

    const handleUpdate = async (id, e) => {
        e.preventDefault()
        const repl = { quantity, supplier }
        const response = await fetch(`api/replishement/${id}`, {
            method: 'PUT',
            body: JSON.stringify(repl),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        if (response.ok) {
            fetchData()
            setModalShow2(false)
            setSupplier(null)
            setQuantity(0)
            setReplishement(null)
        } else {
            console.error(json.err)
        }
    }

    const handleDelete = async (id) => {
        const response = await fetch(`/api/replishement/${id}`, {
            method: 'DELETE'
        })
        if (response.ok) {
            fetchData()
            setModalShow3(false)
            setReplishement(null)
        } else {
            const json = await response.json()
            console.error(json.err)
        }
    }

    return (
        <div className="container-fluid p-0">
            <MyNavbar />
            <div className='content p-4'>
                <h2 className='m-4'>Replishments</h2>
                <div className='row mb-4 px-4 d-flex align-items-center'>
                    <div className='col d-flex justify-content-between mt-2'>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2 rounded-5 py-3 px-5 border border-success border-2" type="search" placeholder="Search" aria-label="Search" onChange={(e)=>{setSearch(e.target.value)}}/>
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
                            <th className='py-4'>supplier</th>
                            <th className='py-4'>date</th>
                            <th className='py-4'>quantity</th>
                            <th className='py-4'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Replishements && Replishements.map((repl) => (
                            <tr key={repl.id} className='text-center'>
                                <td className='py-3'>{repl.id}</td>
                                <td className='py-3'>{repl.consumableMDName}</td>
                                <td className='py-3'>{repl.supplier}</td>
                                <td className='py-3'>{repl.date}</td>
                                <td className='py-3'>{repl.quantity}</td>
                                <td className='py-3'>
                                    <Button onClick={() => { setModalShow2(true); setReplishement(repl) }} className='btn btn-sm btn-primary mx-1'><BiPencil fill="#ffffff" size="1.2em" /></Button>
                                    <Button onClick={() => { setModalShow3(true); setReplishement(repl) }} className='btn btn-sm btn-danger mx-1'><BiTrash fill="#ffffff" size="1.2em" /></Button>
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
                        Add new replishements
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='p-4'>
                    <form onSubmit={handleAdd}>
                        <div className="form-group  mt-2 px-2">
                            <div className="row justify-content-center">
                                <div className="col-12">
                                    <select className="form-select" aria-label="Default select example" onChange={(e) => { setCmd(e.target.value) }} required>
                                        <option value="" disabled selected hidden>medical device</option>
                                        {devices && devices.map((device) => (
                                            <option key={device.id} value={device.id}>{device.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-12  col-md-6">
                                    <input type="text" className="form-control my-2" placeholder='supplier' onChange={(e) => { setSupplier(e.target.value) }} required />
                                </div>
                                <div className="col-12 col-md-6">
                                    <input type="text" className="form-control my-2" placeholder='quantity (please enter a number)' pattern="^[1-9]\d*$" onChange={(e) => { setQuantity(e.target.value) }} required />
                                </div>
                                <div className="col-12  col-md-6">
                                    <input type="text" className="form-control my-2" placeholder='location' onChange={(e) => { setLocation(e.target.value) }} required />
                                </div>
                                <div className="col-12 col-md-6">
                                    <input type="text" className="form-control my-2" placeholder='salle' onChange={(e) => { setRoom(e.target.value) }} required />
                                </div>
                                <div className="col-12 col-md-6">
                                    <input type="text" className="form-control my-2" placeholder='armoire' onChange={(e) => { setWardrobe(e.target.value) }} required />
                                </div>
                                <div className="col-12 col-md-6 d-flex align-items-center">
                                    <label className='fw-semibold text-danger me-3'>exp:</label>
                                    <input type="date" className="form-control my-2" onChange={(e) => { setExpDate(e.target.value) }} required />
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
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                backdrop="static"
                centered
            >
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter" className='py-1 px-3'>
                        Update replishement
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='p-4'>
                    <form onSubmit={(e) => handleUpdate(Replishement.id, e)}>
                        <div className="form-group  mt-2 px-2">
                            <div className="row justify-content-center">
                                <div className="col-12 col-md-6">
                                    <input type="text" className="form-control my-2" placeholder={Replishement && Replishement.supplier} onChange={(e) => { setSupplier(e.target.value) }} />
                                </div>
                                <div className="col-12 col-md-6">
                                    <input type="text" className="form-control my-2" placeholder={Replishement && Replishement.quantity} pattern="^[1-9]\d*$" onChange={(e) => { setQuantity(e.target.value) }} />
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 align-items-center text-center">
                            <button className="btn btn-primary text-white fw-bold" type="submit">save changes</button>
                            <span className="text-muted text-decoration-none fw-semibold mx-4" type="button" onClick={() => { setModalShow2(false); setReplishement(null) }} >Cancel</span>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            <Modal
                show={modalShow3}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                backdrop="static"
                centered

            >

                <Modal.Body className='p-4 border border-danger border-2 rounded'>
                    <h1 className='h5 text-center'>are you sure thet you want to delete this replishement ?</h1>

                    <div className="mt-4 align-items-center text-center">
                        <button className="btn btn-danger text-white fw-bold" type="submit" onClick={() => handleDelete(Replishement.id)}>delete</button>
                        <span className="text-muted text-decoration-none fw-semibold mx-4" type="button" onClick={() => { setModalShow3(false); setReplishement(null) }} >Cancel</span>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Replishement;