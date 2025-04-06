import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { db, auth, storage } from "../components/firebase";  // Import Firestore and Auth
import { doc, setDoc, getDoc, collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { useAuthState } from "../components/firebase";

const Profile = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        university: '',
        resume: null,
        major: '',
        emailSubject: '',
        emailBody: '',
    });

    const [user] = useAuthState();
    const isLoggedIn = user ? true : false;

    useEffect(() => {
        if (isLoggedIn && auth.currentUser) {
            const fetchProfile = async () => {
                const userId = auth.currentUser.email; // Using email as document ID
                const profileRef = doc(db, "profiles", userId);

                try {
                    const profileSnap = await getDoc(profileRef);
                    if (profileSnap.exists()) {
                        setFormData(profileSnap.data());
                    }
                } catch (error) {
                    console.error("Error fetching profile:", error);
                }
            };

            fetchProfile();
        }
    }, [isLoggedIn]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!auth.currentUser) {
            alert("You must be signed in to save your profile.");
            return;
        }

        try {
            const userId = auth.currentUser.email; // Using email as document ID
            const userRef = doc(db, "profiles", userId);

            if (formData.resume instanceof File) {
                const resumeRef = ref(storage, `resumes/${userId}_${formData.resume.name}`);
                await uploadBytes(resumeRef, formData.resume);
                formData.resume = await getDownloadURL(resumeRef);
            }

            const profileData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                university: formData.university,
                resume: formData.resume ,
                major: formData.major
            };

            await setDoc(userRef, profileData, { merge: true });
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Error updating profile. Try again.");
        }
    };

    return (
        <div>
            <NavigationBar />
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="overlay"></div>
                <div className="container" style={{ maxWidth: '500px', color: 'white', zIndex: 2 }}>
                    <h2 className="mb-4 text-center">Profile</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="lastName"
                                value={formData.lastName}
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
                            <label className="form-label">Area of Study</label>
                            <input
                                type="text"
                                className="form-control"
                                name="major"
                                value={formData.major}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Upload Resume</label>
                            <input
                                type="file"
                                className="form-control"
                                name="resume"
                                onChange={handleChange}
                                accept=".pdf,.doc,.docx"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email Subject</label>
                            <input
                                type="text"
                                className="form-control"
                                name="emailSubject"
                                value={formData.emailSubject}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email Body</label>
                            <textarea
                                className="form-control"
                                name="emailBody"
                                value={formData.emailBody}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Save Profile</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;