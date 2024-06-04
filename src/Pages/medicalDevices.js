import { Button, Modal } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { BiTrash, BiPencil, BiBarChart } from 'react-icons/bi';
import { useEffect, useState } from 'react';

const tableStyle = {
    borderRadius: '20px',
    overflow: 'hidden',
};

function MedicalDevices() {
    const [modalShow, setModalShow] = useState(false);
    const [modalShow2, setModalShow2] = useState(false);
    const [modalShow3, setModalShow3] = useState(false);
    const [modalShow4, setModalShow4] = useState(false);
    const [devices, setDevices] = useState(null);
    const [device, setDevice] = useState(null);
    const [name, setName] = useState(null);
    const [type, setType] = useState(null);
    const [image, setImage] = useState(null);
    const [orderType, setOrderType] = useState(null);
    const [search, setSearch] = useState('')
    const [average, setAverage] = useState(null)

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/consumable-md?search=${search}`);
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
        countAverage()
    }, [search, device])

    const handleAdd = async (e) => {
        e.preventDefault()
        const dto = { name, type, orderType }
        const formData = new FormData();
        formData.append('cmd', new Blob([JSON.stringify(dto)], { type: 'application/json' }));
        image && formData.append('image', new Blob([image]), image.name);
        const response = await fetch('api/consumable-md', {
            method: 'POST',
            body: formData,
        });
        const json = await response.json()
        if (response.ok) {
            fetchData()
            setModalShow(false)
            setName(null)
            setType(null)
            setOrderType(null)
            setImage(null)
        } else {
            console.error(json.err)
        }
    }

    const handleUpdate = async (id, e) => {
        e.preventDefault()
        const dto = { name, type }
        const formData = new FormData();
        formData.append('cmd', new Blob([JSON.stringify(dto)], { type: 'application/json' }));
        image && formData.append('image', new Blob([image]), image.name);
        const response = await fetch(`api/consumable-md/${id}`, {
            method: 'PUT',
            body: formData,
        });
        const json = await response.json()
        if (response.ok) {
            fetchData()
            setModalShow2(false)
            setDevice(null)
            setName(null)
            setType(null)
            setImage(null)
        } else {
            console.error(json.err)
        }
    }

    const handleDelete = async (id) => {
        const response = await fetch(`/api/consumable-md/${id}`, {
            method: 'DELETE'
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

    const countAverage = async () => {
        try {
            const response = await fetch(`/api/consumption/average-consumption/${device.id}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            const json = await response.json();
            setAverage(json);
        } catch (error) {
            console.error(error);
        }
    }

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log(file)
            const reader = new FileReader();
            reader.readAsArrayBuffer(file)
            reader.onload = () => {
                setImage(reader.result);
            };
        }
    };

    return (
        <div className="container-fluid p-0">
            <div className='content p-4'>
                <h2 className='m-4'>Consommable Medical Devices</h2>
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
                            <th className='py-4'>Ref</th>
                            <th className='py-4'>D name</th>
                            <th className='py-4'>type</th>
                            <th className='py-4'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {devices && devices.map((device) => (
                            <tr key={device.id} className='text-center'>
                                <td className='py-3'>{device.reference}</td>
                                <td className='py-3'>{device.name}</td>
                                <td className='py-3'>{device.type}</td>
                                <td className='py-3'>
                                    <Button onClick={(e) => { e.stopPropagation(); setDevice(device); setModalShow4(true); }} className='btn btn-sm btn-success mx-1'>
                                        <BiBarChart fill="#ffffff" size="1.2em" />
                                    </Button>
                                    <Button onClick={(e) => { e.stopPropagation(); setModalShow2(true); setDevice(device); }} className='btn btn-sm btn-primary mx-1'>
                                        <BiPencil fill="#ffffff" size="1.2em" />
                                    </Button>
                                    <Button onClick={(e) => { e.stopPropagation(); setModalShow3(true); setDevice(device); }} className='btn btn-sm btn-danger mx-1'>
                                        <BiTrash fill="#ffffff" size="1.2em" />
                                    </Button>
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
                                    <input type="text" className="form-control mt-2" placeholder='name' onChange={(e) => { setName(e.target.value) }} required />
                                </div>
                                <div className="col-12">
                                    <select className="form-select mt-2" aria-label="Default select example" onChange={(e) => { setType(e.target.value) }} required>
                                        <option value="" disabled selected hidden>type</option>
                                        <option value="Fourniture">Fourniture</option>
                                        <option value="Soin">Soin</option>
                                        <option value="Protection">Protection</option>
                                        <option value="Medicament">Medicament</option>
                                        <option value="Nutrition">Nutrition</option>
                                        <option value="Maintenance">Maintenance</option>
                                        <option value="Diagnostic">Diagnostic</option>
                                    </select>
                                </div>
                                <div className="col-12 d-flex align-items-center">
                                    <label className='fw-semibold me-3'>image:</label>
                                    <input type="file" className="form-control my-2" onChange={handleFileInputChange} accept=".png" />
                                </div>
                                <div className="col-12 ">
                                    <select className="form-select" aria-label="Default select example" onChange={(e) => { setOrderType(e.target.value) }} required>
                                        <option value="" disabled selected hidden>order type</option>
                                        <option value="ORDER_POINT">order point</option>
                                        <option value="ORDER_FREQUENCY">order frequency</option>
                                    </select>
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
                                    <input type="text" className="form-control my-2" placeholder={device && device.name} onChange={(e) => { setName(e.target.value) }} />
                                </div>
                                <div className="col-12">
                                    <select className="form-select mt-2" aria-label="Default select example" onChange={(e) => { setType(e.target.value) }} required>
                                        <option value="" disabled selected hidden>type</option>
                                        <option value="Fourniture">Fourniture</option>
                                        <option value="Soin">Soin</option>
                                        <option value="Protection">Protection</option>
                                        <option value="Medicament">Medicament</option>
                                        <option value="Nutrition">Nutrition</option>
                                        <option value="Maintenance">Maintenance</option>
                                        <option value="Diagnostic">Diagnostic</option>
                                    </select>
                                </div>
                                <div className="col-12 d-flex align-items-center">
                                    <label className='fw-semibold me-3'>image:</label>
                                    <input type="file" className="form-control my-2" onChange={handleFileInputChange} accept=".png" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 align-items-center text-center">
                            <button className="btn btn-primary text-white fw-bold" type="submit">save changes</button>
                            <span className="text-muted text-decoration-none fw-semibold mx-4" type="button" onClick={() => { setModalShow2(false); setDevice(null) }} >Cancel</span>
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
                        <span className="text-muted text-decoration-none fw-semibold mx-4" type="button" onClick={() => { setModalShow3(false); setDevice(null); }} >Cancel</span>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal
                show={modalShow4}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                backdrop="static"
                centered
            >
                <Modal.Body className='py-3 px-4 rounded border border-success border-2'>
                    <div className='fw-semibold my-4'>Current month Consumption Average is : <span className='h5 text-success fw-bold mx-2'>{average && average.currentMonthAverage}</span> device.</div>
                    <div className='fw-semibold my-4'>Previous month Consumption Average is : <span className='h5 text-success fw-bold mx-2'>{average && average.previousMonthAverage}</span> device.</div>
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-success px-3 fw-semibold" onClick={() => { setModalShow4(false); setDevice(null) }} >OK</button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default MedicalDevices;