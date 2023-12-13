import { Button, Modal } from 'react-bootstrap';
import MyNavbar from '../Components/myNavBar';
import Table from 'react-bootstrap/Table';
import { BiTrash, BiPencil } from 'react-icons/bi';
import { useEffect, useState } from 'react';

const tableStyle = {
  borderRadius: '20px',
  overflow: 'hidden',
};

function MdStock() {
  const [modalShow, setModalShow] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const [modalShow3, setModalShow3] = useState(false);
  const [stocks, setStocks] = useState(null)
  const [stock, setStock] = useState(null)
  const [name, setName] = useState(null)
  const [cmd, setCmd] = useState(null)
  const [location, setLocation] = useState(null)
  const [quantity, setQuantity] = useState(0)
  const [level, setLevel] = useState(null)

  const fetchData = async () => {
    try {
      const response = await fetch('/api/stock');
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const json = await response.json();
      setStocks(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [])

  const handleAdd = async (e) => {
    e.preventDefault()
    const stock = { name, consumableMDId : cmd, quantity, location, level}
    const response = await fetch('api/stock', {
        method: 'POST',
        body: JSON.stringify(stock),
        headers: {
            'Content-Type': 'application/json'
          }
    })
    const json = await response.json()
    if (response.ok) {
        fetchData()
        setModalShow(false)
        setName(null)
        setCmd(null)
        setLocation(null)
        setLevel(null)
        setQuantity(0)
    } else {
        console.error(json.err)
    }
}

const handleUpdate = async (id, e) => {
  e.preventDefault()
  const stock = { name, quantity, location, level}
  const response = await fetch(`api/stock/${id}`, {
      method: 'PUT',
      body: JSON.stringify(stock),
      headers: {
          'Content-Type': 'application/json'
        }
  })
  const json = await response.json()
  if (response.ok) {
      fetchData()
      setModalShow(false)
      setName(null)
      setLocation(null)
      setLevel(null)
      setQuantity(0)
      setStock(null)
      setModalShow2(false)
  } else {
      console.error(json.err)
  }
}

const handleDelete = async (id) => {
  const response = await fetch( `/api/stock/${id}`,{
      method : 'DELETE'
    })
    if (response.ok) {
      fetchData()
      setModalShow3(false)
      setStock(null)
  } else {
      const json = await response.json()
      console.error(json.err)
  }
}

  return (
    <div className="container-fluid p-0">
      <MyNavbar />
      <div className='content p-4'>
        <h2 className='m-4'>Stocks</h2>
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
              <th className='py-4'>S name</th>
              <th className='py-4'>M device</th>
              <th className='py-4'>quantity</th>
              <th className='py-4'>location</th>
              <th className='py-4'>level</th>
              <th className='py-4'></th>
            </tr>
          </thead>
          <tbody>
            {stocks && stocks.map((stock) => (
              <tr key={stock.id} className='text-center'>
                <td className='py-3'>{stock.id}</td>
                <td className='py-3'>{stock.name}</td>
                <td className='py-3'>{stock.consumableMDName}</td>
                <td className='py-3'>{stock.quantity}</td>
                <td className='py-3'>{stock.location}</td>
                <td className='py-3'>{stock.level}</td>
                <td className='py-3'>
                  <Button onClick={() => {setModalShow2(true); setStock(stock);}} className='btn btn-sm btn-primary mx-1'><BiPencil fill="#ffffff" size="1.2em" /></Button>
                  <Button onClick={() => {setModalShow3(true); setStock(stock);}} className='btn btn-sm btn-danger mx-1'><BiTrash fill="#ffffff" size="1.2em" /></Button>
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
            Add new stock
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='p-4'>
          <form onSubmit={handleAdd}>
            <div className="form-group  mt-2 px-2">
              <div className="row justify-content-center">
                <div className="col-12">
                  <input type="text" className="form-control my-2" placeholder='name' onChange={(e)=>{setName(e.target.value)}} required/>
                </div>
                <div className="col-12">
                  <input type="text" className="form-control my-2" placeholder='medical device' onChange={(e)=>{setCmd(e.target.value)}} required/>
                </div>
                <div className="col-12">
                  <input type="text" className="form-control my-2" placeholder='location' onChange={(e)=>{setLocation(e.target.value)}} required/>
                </div>
                <div className="col-12 col-md-6">
                  <input type="text" className="form-control my-2" placeholder='quantity (please enter a number)' pattern="[0-9]+" onChange={(e)=>{setQuantity(e.target.value)}}/>
                </div>
                <div className="col-12 col-md-6">
                  <input type="text" className="form-control my-2" placeholder='level' onChange={(e)=>{setLevel(e.target.value)}} required/>
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
            Update stock
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='p-4'>
          <form onSubmit={(e) => handleUpdate(stock.id, e)}>
            <div className="form-group  mt-2 px-2">
              <div className="row justify-content-center">
                <div className="col-12">
                  <input type="text" className="form-control my-2" placeholder={stock && stock.name} onChange={(e)=>{setName(e.target.value)}}/>
                </div>
                <div className="col-12">
                  <input type="text" className="form-control my-2" placeholder={stock && stock.location} onChange={(e)=>{setLocation(e.target.value)}}/>
                </div>
                <div className="col-12 col-md-6">
                  <input type="text" className="form-control my-2" placeholder={stock && stock.quantity} pattern="[0-9]+" onChange={(e)=>{setQuantity(e.target.value)}}/>
                </div>
                <div className="col-12 col-md-6">
                  <input type="text" className="form-control my-2" placeholder={stock && stock.level} onChange={(e)=>{setLevel(e.target.value)}}/>
                </div>
              </div>
            </div>
            <div className="mt-4 align-items-center text-center">
            <button className="btn btn-primary text-white fw-bold" type="submit">save changes</button>
            <span className="text-muted text-decoration-none fw-semibold mx-4" type="button" onClick={() => {setModalShow2(false); setStock(stock);}} >Cancel</span>
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
          <h1 className='h5 text-center'>are you sure thet you want to delete this stock ?</h1>

          <div className="mt-4 align-items-center text-center">
            <button className="btn btn-danger text-white fw-bold" type="submit" onClick={()=>handleDelete(stock.id)}>delete</button>
            <span className="text-muted text-decoration-none fw-semibold mx-4" type="button" onClick={() => {setModalShow3(false); setStock(null)}} >Cancel</span>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default MdStock;