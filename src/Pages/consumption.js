import { Button, Modal } from 'react-bootstrap';
import MyNavbar from '../Components/myNavBar';
import Table from 'react-bootstrap/Table';
import { BiTrash, BiPencil } from 'react-icons/bi';
import { useState } from 'react';

const tableStyle = {
    borderRadius: '20px',
    overflow: 'hidden',
};

function AddModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            backdrop="static"
            centered
        >
            <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter" className='py-1 px-3'>
                    Add new consumption
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='p-4'>
                <form >
                    <div className="form-group  mt-2 px-2">
                        <div className="row justify-content-center">
                            <div className="col-12">
                                <input type="text" className="form-control my-2" placeholder='medical device' />
                            </div>
                            <div className="col-12">
                                <input type="text" className="form-control my-2" placeholder='staff' />
                            </div>
                            <div className="col-12 col-md-6">
                                <input type="text" className="form-control mt-2" placeholder="quantity" />
                            </div>
                            <div className="col-12 col-md-6">
                                <input type="date" className="form-control mt-2" placeholder="date" />
                            </div>
                        </div>
                    </div>
                </form>

                <div className="mt-4 align-items-center text-center">
                    <button className="btn btn-success text-white fw-bold" type="submit">create</button>
                    <span className="text-muted text-decoration-none fw-semibold mx-4" type="button" onClick={props.onHide} >Cancel</span>
                </div>
            </Modal.Body>
        </Modal>
    );
}

function UpdateModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            backdrop="static"
            centered
        >
            <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter" className='py-1 px-3'>
                    Update consumption
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='p-4'>
                <form >
                    <div className="form-group  mt-2 px-2">
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-6">
                                <input type="text" className="form-control my-2" placeholder='quantity' />
                            </div>
                            <div className="col-12 col-md-6">
                                <input type="date" className="form-control my-2" placeholder='date' />
                            </div>
                        </div>
                    </div>
                </form>

                <div className="mt-4 align-items-center text-center">
                    <button className="btn btn-primary text-white fw-bold" type="submit">save changes</button>
                    <span className="text-muted text-decoration-none fw-semibold mx-4" type="button" onClick={props.onHide} >Cancel</span>
                </div>
            </Modal.Body>
        </Modal>
    );
}

function DeleteModal(props) {
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            backdrop="static"
            centered

        >

            <Modal.Body className='p-4 border border-danger border-2 rounded'>
                <h1 className='h5 text-center'>are you sure thet you want to delete this consumption ?</h1>

                <div className="mt-4 align-items-center text-center">
                    <button className="btn btn-danger text-white fw-bold" type="submit">delete</button>
                    <span className="text-muted text-decoration-none fw-semibold mx-4" type="button" onClick={props.onHide} >Cancel</span>
                </div>
            </Modal.Body>
        </Modal>
    );
}

function Consumption() {
    const [modalShow, setModalShow] = useState(false);
    const [modalShow2, setModalShow2] = useState(false);
    const [modalShow3, setModalShow3] = useState(false);
    return (
        <div className="container-fluid p-0">
            <MyNavbar />
            <div className='content p-4'>
                <h2 className='m-4'>Consumptions</h2>
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
                            <th className='py-4'>M device</th>
                            <th className='py-4'>staff</th>
                            <th className='py-4'>quantity</th>
                            <th className='py-4'>date</th>
                            <th className='py-4'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <tr key={index} className='text-center'>
                                <td className='py-3'>{index}</td>
                                <td className='py-3'>device-{index}</td>
                                <td className='py-3'>staff-{index}</td>
                                <td className='py-3'>{100 + index}</td>
                                <td className='py-3'>0{index}-12-2023</td>
                                <td className='py-3'>
                                    <Button onClick={() => setModalShow2(true)} className='btn btn-sm btn-primary mx-1'><BiPencil fill="#ffffff" size="1.2em" /></Button>
                                    <Button onClick={() => setModalShow3(true)} className='btn btn-sm btn-danger mx-1'><BiTrash fill="#ffffff" size="1.2em" /></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <AddModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <UpdateModal
                show={modalShow2}
                onHide={() => setModalShow2(false)}
            />
            <DeleteModal
                show={modalShow3}
                onHide={() => setModalShow3(false)}
            />
        </div>
    );
}

export default Consumption;