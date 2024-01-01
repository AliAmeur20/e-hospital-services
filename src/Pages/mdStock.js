import { Button, Modal } from 'react-bootstrap';
import MyNavbar from '../Components/myNavBar';
import Table from 'react-bootstrap/Table';
import { BiShield, BiDotsVertical } from 'react-icons/bi';
import { useEffect, useState } from 'react';

const tableStyle = {
  borderRadius: '20px',
  overflow: 'hidden',
};

function MdStock() {
  const [modalShow2, setModalShow2] = useState(false);
  const [modalShow3, setModalShow3] = useState(false);
  const [stocks, setStocks] = useState(null)
  const [stock, setStock] = useState(null)
  const [search, setSearch] = useState('')
  const [sStorage, setSStorage] = useState(null)

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/stock?search=${search}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const json = await response.json();
      setStocks(json);
    } catch (error) {
      console.error(error);
    }
  };

  const countSecurityStorage = async () => {
    try {
      const response = await fetch(`/api/consumable-md/security-storage/${stock.consumableMDId}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const json = await response.json();
      setSStorage(json);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
    if (stock) {
      countSecurityStorage();
    }
  }, [search, stock])

  return (
    <div className="container-fluid p-0">
      <MyNavbar />
      <div className='content p-4'>
        <h2 className='m-4'>Stocks</h2>
        <div className='row mb-4 px-4 d-flex align-items-center'>
          <div className='col d-flex justify-content-between mt-2'>
            <form className="d-flex" role="search">
              <input className="form-control me-2 rounded-5 py-3 px-5 border border-success border-2" type="search" placeholder="Search" aria-label="Search" onChange={(e)=>{setSearch(e.target.value)}}/>
              <button className="btn btn-outline-success rounded-5 px-4">Search</button>
            </form>
          </div>
        </div>
        <Table striped responsive style={tableStyle}>
          <thead>
            <tr className='text-center'>
              <th className='py-4'>#</th>
              <th className='py-4'>M device</th>
              <th className='py-4'>quantity</th>
              <th className='py-4'></th>
            </tr>
          </thead>
          <tbody>
            {stocks && stocks.map((stock) => (
              <tr key={stock.id} className='text-center'>
                <td className='py-3'>{stock.id}</td>
                <td className='py-3'>{stock.consumableMDName}</td>
                <td className='py-3'>{stock.quantity}</td>
                <td className='py-3'>
                <Button onClick={() => { setStock(stock); setModalShow3(true); }} className='btn btn-sm btn-success mx-1'><BiShield fill="#ffffff" size="1.2em" /></Button>
                <Button onClick={() => { setModalShow2(true); setStock(stock); }} className='btn btn-sm btn-primary mx-1'><BiDotsVertical fill="#ffffff" size="1.2em" /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal
        show={modalShow2}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        centered
      >
        <Modal.Body className='p-1 rounded'>
        <Table responsive>
          <thead>
            <tr className='text-center'>
            <th className='py-4'>location</th>
              <th className='py-4'>level</th>
              <th className='py-4'>quantity</th>
              <th className='py-4'>state</th>
            </tr>
          </thead>
          <tbody>
            {stock && stock.devicePackages.map((devPackage) => (
              <tr key={devPackage.id} className='text-center'>
                <td className='py-3'>{devPackage.location}</td>
                <td className='py-3'>{devPackage.level}</td>
                <td className='py-3'>{devPackage.quantity}</td>
                <td className='py-3'><div className={`rounded-3 ${devPackage.cmdState === "SAFE" ? "bg-success" : (devPackage.cmdState === "CLOSE_TO_DATE" ? 'bg-warning' : "bg-danger")}`} style={{width : '32px', height : '32px', margin : '0 auto'}} ></div></td>  
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="d-flex justify-content-end">
            <button className="btn btn-light text-muted fw-semibold mb-2 mx-4 px-3" onClick={() => { setModalShow2(false); setStock(null) }} >OK</button>
            </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={modalShow3}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        centered
      >
        <Modal.Body className='py-4 px-5 rounded'>
        <div className='h5 fw-semibold my-4'>Security Storage of <span className='h4 text-success fw-bold mx-1'>{stock && stock.consumableMDName}</span> is: <span className='h4 text-success fw-bold mx-2'>{sStorage}</span> device. </div>
        <div className="d-flex justify-content-end">
            <button className="btn btn-success px-3 fw-semibold" onClick={() => { setModalShow3(false); setStock(null) }} >OK</button>
            </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default MdStock;