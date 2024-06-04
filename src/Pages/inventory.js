import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

const tableStyle = {
  borderRadius: '20px',
  overflow: 'hidden',
};

function Inventory() {
  const [devices, setDevices] = useState(null);
  const [search, setSearch] = useState('')

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
  }, [search])

  return (
    <div className="container-fluid p-0">
      <div className='content p-4'>
        <h2 className='m-4'>Inventory</h2>
        <div className='mb-4 px-4'>
          <div className='col d-flex mt-2'>
            <form className="d-flex" role="search">
              <input className="form-control me-2 rounded-5 py-3 px-5 border border-success border-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => { setSearch(e.target.value) }} />
            </form>
            <button className="btn btn-outline-success rounded-5 px-4" type="submit">Search</button>
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
                <td>
                  <Link to={`${device.id}`} className='btn btn-sm btn-outline-primary mt-1 mx-1'>details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default Inventory