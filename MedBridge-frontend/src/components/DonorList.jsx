// import { useEffect, useState } from "react";
// import { Alert, Button, Container, Table } from "react-bootstrap";

// import { fetchAllDonors } from "../services/DonorService";
// import { fetchaAlldetails } from "../services/PatientService";

// export function DonorList(){

//     const [donors, setDonors] = useState([]);
//     const [selectedDonorId,setSelectedDonorId]=useState();

//     const getDonors = async ()=>{
//         try {
//             const response = await fetchAllDonors(); // service api call
//             setDonors(response.data);
//         } catch (error) {
//             console.log(error);
//         }

//     }
//     useEffect(()=>{
//         getDonors();
//     },[]);
//     const giveDetails =async()=>{
//         const res=await fetchaAlldetails();
//     }

//     return (
//         <Container className="mt-4">
//             <Alert variant="success">
//                 <h5>List of students</h5>
//             </Alert>
//             <Container className="mt-3">
//                 {
//                     donors.length > 0 ? <Table>
//                     <thead>
//                         <tr>
//                             <th>Id</th>
//                             <th>Name</th>
//                             <th>Phone</th>
//                             <th>email</th>
//                             <th>Oragan</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {
//                            donors.map((s)=>{
//                                 return (
//                                     <tr>
//                                         <td>{s.donor_id}</td>
//                                         <td>{s.full_name}</td>
//                                         <td>{s.phone_number}</td>
//                                         <td>{s.email}</td>
//                                         <td>{s.organs_to_donate}</td>
//                                         <td>
//                                             <Button variant="primary" className="btn-sm" onClick={giveDetails}>More</Button>
//                                             &nbsp;&nbsp;
//                                             <Button variant="danger" className="btn-sm" onClick={handleSelect}>Select</Button>
//                                         </td>
//                                     </tr>
//                                 )
//                            })
//                         }
//                     </tbody>
//                 </Table> : <h2>No record found !</h2>
//                 }

//             </Container>
//         </Container>
//     )
// }

import { useEffect, useState } from "react";
import { Alert, Button, Container, Modal, Table } from "react-bootstrap";
import {
  fetchAllDonors,
  DeleteDonor,
  fetchAllDetailsDonors,
} from "../services/DoctorService";
// import { fetchaAlldetails } from "../services/PatientService";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./Navbar/NavigationBar";
import Footer from "./Footer/Footer";
import { removeToken } from "../services/tokenService";
export function DonorList() {
  const navigate = useNavigate();
  const { organ } = useParams();
  const [donors, setDonors] = useState([]);
  const [selectedDonorId, setSelectedDonorId] = useState(null);
  const [dialogVisibility, setDialogVisibility] = useState(false);
  const [detailVisibility, setDetailVisibility] = useState(false);
  const [donorDetails, setDonorDetails] = useState(null);
  const [successModal, setSuccessModal] = useState(false);

  useEffect(() => {
    const getDonors = async () => {
      try {
        const response = await fetchAllDonors(organ);
        setDonors(response.data);
      } catch (error) {
        toast.error("Failed to fetch Donors.");
        console.log(error);
      }
    };
    getDonors();
  }, [organ]);

  const giveDetails = async (donorId) => {
    try {
      const res = await fetchAllDetailsDonors(donorId);
      setDonorDetails(res.data[0]); // Ensure you access the first result
      setDetailVisibility(true);
    } catch (error) {
      console.log("Error fetching details:", error);
    }
  };

  const closeDetailModal = () => setDetailVisibility(false);
  const closeDialog = () => setDialogVisibility(false);

  // const confirmSelection = async () => {
  //   try {
  //     const res = await DeleteDonor(selectedDonorId);
  //     // const res = await DeleteDonor(selectedDonorId);
  //     console.log(res)
  //     toast.success(`Donor ${selectedDonorId} selected successfully`);
  //     setDonors(donors.filter((d) => d.donor_id !== selectedDonorId));
  //     closeDialog();
  //     toast.success(`Donor ${selectedDonorId} selected successfully`);
  //     removeToken();
  //     toast.success(`Donor selected successfully`);
  //     navigate(`/`)
  //   } catch (error) {
  //     toast.error("Something went wrong!");
  //     console.log(error);
  //   }
  // };
  const confirmSelection = async () => {
    try {
      const res = await DeleteDonor(selectedDonorId);
      toast.success(`Donor ${selectedDonorId} selected successfully`);
      setDonors(donors.filter((d) => d.donor_id !== selectedDonorId));
      closeDialog();
      console.log(res);

      // Show success modal
      setSuccessModal(true);

      // Clear token and redirect after delay
      removeToken();
      setTimeout(() => {
        setSuccessModal(false);
        navigate(`/`);
      }, 2500); // 2.5 second delay
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }
  };

  return (
    <div>
      <NavigationBar />
      <Container className="mt-4">
        <Alert variant="success">
          <h5>List of Donors</h5>
        </Alert>
        <Container className="mt-3">
          {donors.length > 0 ? (
            <Table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Organ</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {donors.map((s) => (
                  <tr key={s.donor_id}>
                    <td>{s.donor_id}</td>
                    <td>{s.full_name}</td>
                    <td>{s.phone_number}</td>
                    <td>{s.email}</td>
                    <td>{s.organs_to_donate}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button
                          variant="primary"
                          className="btn-sm"
                          onClick={() => giveDetails(s.donor_id)}
                        >
                          View
                        </Button>
                        <Button
                          variant="danger"
                          className="btn-sm"
                          onClick={() => {
                            setSelectedDonorId(s.donor_id);
                            setDialogVisibility(true);
                          }}
                        >
                          Select
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <h2>No record found!</h2>
          )}
          <Modal show={dialogVisibility} onHide={closeDialog} centered>
            <Modal.Header closeButton>
              <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to select Donor ID: {selectedDonorId}?
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="success"
                className="btn-sm"
                onClick={confirmSelection}
              >
                Yes
              </Button>
              <Button variant="danger" className="btn-sm" onClick={closeDialog}>
                No
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Details Modal */}
          <Modal show={detailVisibility} onHide={closeDetailModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>Donor Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {donorDetails ? (
                <div>
                  <p>
                    <strong>Donor ID:</strong> {donorDetails.donor_id}
                  </p>
                  <p>
                    <strong>Name:</strong> {donorDetails.full_name}
                  </p>
                  <p>
                    <strong>Gender:</strong> {donorDetails.gender}
                  </p>
                  <p>
                    <strong>DOB:</strong>{" "}
                    {new Date(donorDetails.dob).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Phone:</strong> {donorDetails.phone_number}
                  </p>
                  <p>
                    <strong>Email:</strong> {donorDetails.email}
                  </p>
                  <p>
                    <strong>Address:</strong> {donorDetails.address}
                  </p>
                  <p>
                    <strong>ID Proof:</strong> {donorDetails.id_proof}
                  </p>
                  <hr />
                  <p>
                    <strong>Blood Group:</strong> {donorDetails.blood_group}
                  </p>
                  <p>
                    <strong>Height:</strong> {donorDetails.height_cm} cm
                  </p>
                  <p>
                    <strong>Weight:</strong> {donorDetails.weight_kg} kg
                  </p>
                  <p>
                    <strong>Known Conditions:</strong>{" "}
                    {donorDetails.known_conditions}
                  </p>
                  <p>
                    <strong>Current Medications:</strong>{" "}
                    {donorDetails.current_medications}
                  </p>
                  <p>
                    <strong>Allergies:</strong> {donorDetails.allergies}
                  </p>
                  <p>
                    <strong>Smoking/Alcohol:</strong>{" "}
                    {donorDetails.smoking_or_alcohol}
                  </p>
                  <hr />
                  <p>
                    <strong>Organs to Donate:</strong>{" "}
                    {donorDetails.organs_to_donate}
                  </p>
                  <p>
                    <strong>Donation Type:</strong> {donorDetails.donation_type}
                  </p>
                  <p>
                    <strong>Emergency Contact:</strong>{" "}
                    {donorDetails.emergency_contact}
                  </p>
                </div>
              ) : (
                <p>Loading details...</p>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                className="btn-sm"
                onClick={closeDetailModal}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal
            show={successModal}
            onHide={() => setSuccessModal(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Registration Successful</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Donor has been successfully selected. Redirecting to home page...
            </Modal.Body>
          </Modal>
        </Container>
      </Container>
      <Footer />
    </div>
  );
}
