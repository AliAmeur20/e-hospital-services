import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

function MedicalDeviceDetails() {
    const { id } = useParams();
    const [cmd, setCmd] = useState(null);
    const [image, setImage] = useState(null);
    const [stock, setStock] = useState(null);
    const [packages, setPackages] = useState(null)

    const fetchCMDs = async () => {
        try {
            const response = await fetch(`/api/consumable-md/${id}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            const json = await response.json();
            setCmd(json);
            if (json.image) {
               const base64Image = `data:image/png;base64,${json.image}`;                
               setImage(base64Image);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchStock = async () => {
        try {
            const response = await fetch(`/api/stock/${id}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            const json = await response.json();
            setStock(json);
            setPackages(json.devicePackages);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCMDs();
        fetchStock();
    }, [id]);

    return (
        <div className="container-fluid p-0">
            <div className="content p-5 mt-5">
                {cmd && (
                    <div className="row py-5 px-0 px-md-4">
                        <div className="col-12 col-xl-4 mb-4">
                            <div className="mb-4">
                                {image ? (
                                    <img
                                        className="rounded object-fit-cover"
                                        width="360px"
                                        alt="cmd"
                                        src={image}
                                    />
                                ) : (
                                    <img
                                        className="rounded object-fit-cover"
                                        width="360px"
                                        alt="cmd"
                                        src="https://liftlearning.com/wp-content/uploads/2020/09/default-image.png"
                                    />
                                )}
                            </div>
                            <div className="row">
                                <div className="col-6 mb-3">
                                    <span className="fw-bold">Name</span>
                                    <p className="h6 text-secondary">{cmd.name}</p>
                                </div>
                                <div className="col-6 mb-3">
                                    <span className="fw-bold">Reference</span>
                                    <p className="h6 text-secondary">{cmd.reference}</p>
                                </div>
                                <div className="col-6 mb-3">
                                    <span className="fw-bold">Type</span>
                                    <p className="h6 text-secondary">{cmd.type}</p>
                                </div>
                                <div className="col-6 mb-3">
                                    <span className="fw-bold">Total Quantity</span>
                                    <p className="h6 text-secondary">{stock && stock.quantity}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-xl-8">

                            <h2 className='m-4'>Packages</h2>

                            <div className="row">
                                {packages && packages.map((stock => (
                                    <div key={stock.id} className="col-12 col-xl-5 rounded-5 border border-secondary border-4 subContainer p-4 m-4">
                                        <div className="row justify-content-between">
                                            <div className="col-6">
                                                <span className="fw-bold">Ref</span>
                                                <p className="text-secondary">{stock.reference}</p>
                                            </div>
                                            <div className="col-6">
                                                <span className="fw-bold">Expiry date</span>
                                                <p className="text-secondary">{stock.expDate}</p>
                                            </div>
                                            <div className="col-6">
                                                <span className="fw-bold">Location</span>
                                                <p className="text-secondary">{stock.location}</p>
                                            </div>
                                            <div className="col-6">
                                                <span className="fw-bold">Salle</span>
                                                <p className="text-secondary">{stock.room}</p>
                                            </div>
                                            <div className="col-6">
                                                <span className="fw-bold">Armoire</span>
                                                <p className="text-secondary">{stock.wardrobe}</p>
                                            </div>
                                            <div className="col-6">
                                                <span className="fw-bold">Quantity</span>
                                                <p className="text-secondary">{stock.quantity}</p>
                                            </div>
                                        </div>
                                    </div>
                                )))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MedicalDeviceDetails;
