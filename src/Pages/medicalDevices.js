import { Button, Modal } from 'react-bootstrap';
import MyNavbar from '../Components/myNavBar';
import Table from 'react-bootstrap/Table';
import { BiTrash, BiPencil } from 'react-icons/bi';
import { useEffect, useState } from 'react';

const tableStyle = {
    borderRadius: '20px',
    overflow: 'hidden',
};

function MedicalDevices() {
    const [modalShow, setModalShow] = useState(false);
    const [modalShow2, setModalShow2] = useState(false);
    const [modalShow3, setModalShow3] = useState(false);
    const [devices, setDevices] = useState(null);
    const [device, setDevice] = useState(null);
    const [name, setName] = useState(null);
    const [type, setType] = useState(null);
    const [expDate, setExpDate] = useState(null);
    const [size, setSize] = useState(0);

    const fetchData = async () => {
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
    }, [])

    const handleAdd = async (e) => {
        e.preventDefault()
        const device = { name, type, expDate, size }
        const response = await fetch('api/consumable-md', {
            method: 'POST',
            body: JSON.stringify(device),
            headers: {
                'Content-Type': 'application/json'
              }
        })
        const json = await response.json()
        if (response.ok) {
            fetchData()
            setModalShow(false)
            setName(null)
            setType(null)
            setExpDate(null)
            setSize(0)
        } else {
            console.error(json.err)
        }
    }

    const handleUpdate = async (id, e) => {
        e.preventDefault()
        const device = { name, type, expDate, size }
        const response = await fetch(`api/consumable-md/${id}`, {
            method: 'PUT',
            body: JSON.stringify(device),
            headers: {
                'Content-Type': 'application/json'
              }
        })
        const json = await response.json()
        if (response.ok) {
            fetchData()
            setModalShow2(false)
            setDevice(null)
            setName(null)
            setType(null)
            setExpDate(null)
            setSize(0)
        } else {
            console.error(json.err)
        }
    }

    const handleDelete = async (id) => {
        const response = await fetch( `/api/consumable-md/${id}`,{
            method : 'DELETE'
          })
          if (response.ok) {
            fetchData()
            setModalShow3(false)
            setDevice(null)
        } else {
            const json = await response.json()
            console.error(json.err)
        }
    }

    return (
        <div className="container-fluid p-0">
            <MyNavbar />
            <div className='content p-4'>
                <h2 className='m-4'>Consommable Medical Devices</h2>
                <div className='row mb-4 px-4 d-flex align-items-center'>
                    <div className='col d-flex justify-content-between mt-2'>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2 rounded-5 py-3 px-5 border border-success border-2" type="search" placeholder="Search" aria-label="Search" />
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
                            <th className='py-4'>D name</th>
                            <th className='py-4'>type</th>
                            <th className='py-4'>size</th>
                            <th className='py-4'>Exp state</th>
                            <th className='py-4'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {devices && devices.map((device) => (
                            <tr key={device.id} className='text-center'>
                                <td className='py-3'>{device.id}</td>
                                <td className='py-3'>{device.name}</td>
                                <td className='py-3'>{device.type}</td>
                                <td className='py-3'>{device.size}</td>
                                <td className='py-3'><div className={`rounded-3 ${device.cmdState === "SAFE" ? 'bg-success' : (device.cmdState === "CLOSE_TO_DATE" ? 'bg-warning' : 'bg-danger')}`} style={{ width: '32px', height: '32px', margin: '0 auto' }}></div></td>
                                <td className='py-3'>
                                    <Button onClick={() => {setModalShow2(true); setDevice(device);}} className='btn btn-sm btn-primary mx-1'><BiPencil fill="#ffffff" size="1.2em" /></Button>
                                    <Button onClick={() => {setModalShow3(true); setDevice(device);}} className='btn btn-sm btn-danger mx-1'><BiTrash fill="#ffffff" size="1.2em" /></Button>
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
                        Add new consomable medical device
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='p-4'>
                    <form onSubmit={handleAdd}>
                        <div className="form-group  mt-2 px-2">
                            <div className="row justify-content-center">
                                <div className="col-12 ">
                                    <input type="text" className="form-control my-2" placeholder='name' onChange={(e)=>{setName(e.target.value)}} required/>
                                </div>
                                <div className="col-12">
                                    <input type="text" className="form-control my-2" placeholder='type' onChange={(e)=>{setType(e.target.value)}} required/>
                                </div>
                                <div className="col-12 col-md-6 d-flex align-items-center">
                                    <label className='fw-semibold text-danger me-3'>exp:</label>
                                    <input type="date" className="form-control my-2" onChange={(e)=>{setExpDate(e.target.value)}} required/>
                                </div>
                                <div className="col-12 col-md-6">
                                    <input type="text" className="form-control mt-2" placeholder="size (please enter a number)" pattern="[0-9]+" onChange={(e)=>{setSize(e.target.value)}} required/>
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
                        Update device
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='p-4'>
                <form onSubmit={(e) => handleUpdate(device.id, e)}>
                        <div className="form-group  mt-2 px-2">
                            <div className="row justify-content-center">
                                <div className="col-12 ">
                                    <input type="text" className="form-control my-2" placeholder={device && device.name} onChange={(e)=>{setName(e.target.value)}}/>
                                </div>
                                <div className="col-12">
                                    <input type="text" className="form-control my-2" placeholder={device && device.type} onChange={(e)=>{setType(e.target.value)}}/>
                                </div>
                                <div className="col-12 col-md-6 d-flex align-items-center">
                                    <label className='fw-semibold text-danger me-3'>exp:</label>
                                    <input type="date" className="form-control my-2" onChange={(e)=>{setExpDate(e.target.value)}}/>
                                </div>
                                <div className="col-12 col-md-6">
                                    <input type="text" className="form-control mt-2" placeholder={device && device.size} pattern="[0-9]+" onChange={(e)=>{setSize(e.target.value)}}/>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 align-items-center text-center">
                        <button className="btn btn-primary text-white fw-bold" type="submit">save changes</button>
                        <span className="text-muted text-decoration-none fw-semibold mx-4" type="button" onClick={() => {setModalShow2(false); setDevice(null)}} >Cancel</span>
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
                    <h1 className='h5 text-center'>are you sure that you want to delete this device?</h1>

                    <div className="mt-4 align-items-center text-center">
                        <button className="btn btn-danger text-white fw-bold" type="submit" onClick={() => handleDelete(device.id)}>delete</button>
                        <span className="text-muted text-decoration-none fw-semibold mx-4" type="button" onClick={() => {setModalShow3(false); setDevice(null);}} >Cancel</span>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default MedicalDevices;