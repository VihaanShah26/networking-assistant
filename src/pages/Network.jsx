import React, { useState } from 'react';
import NavigationBar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

const Network = () => {
    const [formData, setFormData] = useState({
        company: '',
        role: '',
        university: '',
        numPeople: '',
    });
    const [emailList, setEmailList] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let profiles = [];
        try {
            const response = await fetch(`http://127.0.0.1:5001/get_profiles?job_title=${formData.role}&company=${formData.company}&university=${formData.university}`);

            if (!response.ok) {
                throw new Error('Failed to fetch profiles');
            }

            const data = await response.json();
            if (data) {
                profiles.push(data);
            }
            profiles = profiles[0];
            console.log('Profiles received:', profiles);
        } catch (err) {
            console.error('Error fetching profiles:', err);
        }

        let emails = [];
        try {
            for (let i = 0; i < profiles.length; i++) {
                const response = await fetch(`http://127.0.0.1:5001/get_email?name=${profiles[i]["name"]}&company=${formData.company}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch email');
                }

                const data = await response.json();
                if (data && data["person"]["email"]) {
                    emails.push(data["person"]["email"]);
                }
            }

            console.log('Emails received:', emails);
            setEmailList(emails);
            setShowModal(true);

        } catch (err) {
            console.error('Error fetching emails:', err);
        }

        return emails;
    };

    const handleSendEmails = () => {
        if (!emailSubject || !emailBody) {
          alert("Please fill out both the subject and the body of the email.");
          return;
        }
      
        const bcc = emailList.join(",");
        const emailSubject = "Expressing Interest in " + formData.company;
        const emailBody = `Hello,\n\nI hope this message finds you well. I am reaching out to express my interest in the ${formData.role} position at ${formData.company}. I would love to connect and learn more about the opportunities available.\n`;
        const subject = encodeURIComponent(emailSubject);
        const body = encodeURIComponent(emailBody);
        const mailtoURL = `mailto:?bcc=${bcc}&subject=${subject}&body=${body}`;
      
        // Open the mail client in a new tab
        window.location.href = mailtoURL;
      
        setShowModal(false);
      };

    return (
        <div>
            <NavigationBar />
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className='overlay'></div>
                <div className="container" style={{ maxWidth: '500px', zIndex: 2, color: 'white' }}>
                    <h2 className="text-center mb-4">Look for People</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Company Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Role</label>
                            <input
                                type="text"
                                className="form-control"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">University</label>
                            <input
                                type="text"
                                className="form-control"
                                name="university"
                                value={formData.university}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Number of People</label>
                            <input
                                type="number"
                                className="form-control"
                                name="numPeople"
                                value={formData.numPeople}
                                onChange={handleChange}
                                min="1"
                                max="10"
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-100">Search</button>
                    </form>
                    {showModal && (
                      <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
                        <div className="modal-dialog modal-dialog-centered">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title">Emails Found</h5>
                              <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                              <ul>
                                {emailList.map((email, index) => (
                                  <li key={index}>{email}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="modal-footer">
                              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                              <button className="btn btn-success" onClick={handleSendEmails}>Send Emails</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Network;