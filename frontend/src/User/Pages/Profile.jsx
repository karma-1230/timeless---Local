import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import styles from "../Styles/Profile.module.css";
import { useNavigate } from "react-router-dom";

// --------------------
// ZOD SCHEMA
// --------------------
const profileSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().optional(),
    address: z.string().min(1, "Address is required"),
});

export default function Profile() {
    const url = "http://localhost:5000"
    const [editMode, setEditMode] = useState(false);
    const [profilePic, setProfilePic] = useState("/images/default-avatar.jpg");
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const nav = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(profileSchema),
    });

    const token = localStorage.getItem("token");

    // --------------------
    // Fetch user data
    // --------------------
    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (!token) return;

                const res = await axios.get("http://localhost:5000/user/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUserData(res.data.user);

                reset({
                    firstName: res.data.user.fName || "",
                    lastName: res.data.user.lName || "",
                    email: res.data.user.email || "",
                    phone: res.data.user.phone || "",
                    address: res.data.user.address || "",
                });

                if (res.data.user.profilePhoto) {
                    setProfilePic(res.data.user.profilePhoto);
                }

                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        fetchUser();
    }, [token, reset]);

    // --------------------
    // Handle profile picture change
    // --------------------
    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setProfilePic(reader.result);
            reader.readAsDataURL(file);
        }
    };

    // --------------------
    // Handle form submit
    // --------------------
    const onSubmit = async (data) => {
        try {
            if (!token) {
                nav("/login")
                return;
            }

            const formData = new FormData();
            formData.append("fName", data.firstName);
            formData.append("lName", data.lastName);
            formData.append("email", data.email);
            formData.append("phone", data.phone || "");
            formData.append("address", data.address);

            // Append new profile photo if changed
            if (
                profilePic &&
                !profilePic.startsWith("http") &&
                profilePic !== "/images/default-avatar.jpg"
            ) {
                const blob = await fetch(profilePic).then((res) => res.blob());
                formData.append("profilePhoto", blob, "profile.jpg");
            }

            const res = await axios.put("http://localhost:5000/user/update", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            setUserData(res.data.user);
            alert("Profile updated successfully!");
            setEditMode(false);
        } catch (err) {
            console.error(err.response?.data || err);
            alert("Failed to update profile.");
        }
    };

    // --------------------
    // Handle delete profile
    // --------------------
    const handleDeleteProfile = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete your profile? This action cannot be undone."
        );
        if (confirmed) {
            try {
                await axios.delete("http://localhost:5000/user/delete", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                alert("Profile deleted successfully!");
                setUserData(null);
                setProfilePic("/images/default-avatar.jpg");
                setEditMode(false);
            } catch (err) {
                console.error(err);
                alert("Failed to delete profile.");
            }
        }
    };

    if (loading) return <p style={{ textAlign: "center", marginTop: "100px" }}>Loading...</p>;

    return (
        <>
            <Navbar />
            <div className={styles.profilePage}>
                <div className={styles.profileCard}>
                    {/* Left Column: Profile Picture */}
                    <div className={styles.leftColumn}>
                        <div className={styles.profilePicWrapper}>
                            <img src={`${url}${profilePic}`} alt="Profile" className={styles.profilePic} />
                            {editMode && (
                                <label className={styles.changePicBtn}>
                                    <span role="img" aria-label="camera">📷</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleProfilePicChange}
                                        hidden
                                    />
                                </label>
                            )}
                        </div>
                        <button className={styles.deleteBtn} onClick={handleDeleteProfile}>
                            Delete Profile
                        </button>
                    </div>

                    {/* Right Column: Info Form */}
                    <div className={styles.rightColumn}>
                        <h2>My Profile</h2>
                        <p>Manage your personal information and account settings.</p>

                        {editMode ? (
                            <form onSubmit={handleSubmit(onSubmit)} className={styles.infoForm}>
                                <div className={styles.formRow}>
                                    <label>First Name:</label>
                                    <input {...register("firstName")} />
                                    {errors.firstName && <span className={styles.error}>{errors.firstName.message}</span>}
                                </div>
                                <div className={styles.formRow}>
                                    <label>Last Name:</label>
                                    <input {...register("lastName")} />
                                    {errors.lastName && <span className={styles.error}>{errors.lastName.message}</span>}
                                </div>
                                <div className={styles.formRow}>
                                    <label>Email:</label>
                                    <input {...register("email")} />
                                    {errors.email && <span className={styles.error}>{errors.email.message}</span>}
                                </div>
                                <div className={styles.formRow}>
                                    <label>Phone:</label>
                                    <input {...register("phone")} />
                                </div>
                                <div className={styles.formRow}>
                                    <label>Address:</label>
                                    <input {...register("address")} />
                                    {errors.address && <span className={styles.error}>{errors.address.message}</span>}
                                </div>

                                <div className={styles.buttonRow}>
                                    <button type="submit" className={styles.saveBtn}>Save</button>
                                    <button type="button" className={styles.cancelBtn} onClick={() => setEditMode(false)}>Cancel</button>
                                </div>
                            </form>
                        ) : (
                            <div className={styles.infoDisplay}>
                                <div className={styles.displayRow}><span className={styles.label}>First Name:</span> <span>{userData.fName}</span></div>
                                <div className={styles.displayRow}><span className={styles.label}>Last Name:</span> <span>{userData.lName}</span></div>
                                <div className={styles.displayRow}><span className={styles.label}>Email:</span> <span>{userData.email}</span></div>
                                <div className={styles.displayRow}><span className={styles.label}>Phone:</span> <span>{userData.phone}</span></div>
                                <div className={styles.displayRow}><span className={styles.label}>Address:</span> <span>{userData.address}</span></div>

                                <div className={styles.buttonRow}>
                                    <button className={styles.editBtn} onClick={() => setEditMode(true)}>Edit Profile</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
