import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwnerSidebar from "../../components/owner/OwnerSidebar";
import {
    getMyPgs,
    addPg,
    updatePg,
    deletePg
} from "../../services/ownerService";

const MyPgs = () => {
    const owner = JSON.parse(localStorage.getItem("owner"));
    const [pgs, setPgs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editId, setEditId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState("");
    const [showImageModal, setShowImageModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    const [formData, setFormData] = useState({
        ownerId: owner?.ownerId || "",
        pgName: "",
        description: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        rentStarting: "",
        genderType: "Unisex",
        foodAvailable: false,
        wifiAvailable: false,
        laundryAvailable: false,
        imageUrl: ""
    });

    useEffect(() => {
        loadPgs();
    }, []);

    const loadPgs = async () => {
        try {
            const response = await getMyPgs(owner?.ownerId);
            setPgs(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) {
            alert("Image size should be less than 5 MB");
            return;
        }
        if (!file.type.startsWith("image/")) {
            alert("Please select a valid image");
            return;
        }
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const resetForm = () => {
        setFormData({
            ownerId: owner?.ownerId || "",
            pgName: "",
            description: "",
            address: "",
            city: "",
            state: "",
            pincode: "",
            rentStarting: "",
            genderType: "Unisex",
            foodAvailable: false,
            wifiAvailable: false,
            laundryAvailable: false,
            imageUrl: ""
        });
        setImageFile(null);
        setImagePreview("");
        setEditId(null);
        setShowModal(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await updatePg(editId, formData, imageFile);
                alert("PG Updated Successfully");
            } else {
                await addPg(formData, imageFile);
                alert("PG Added Successfully");
            }
            resetForm();
            loadPgs();
        } catch (error) {
            console.error(error);
            if (error.response) {
                alert(error.response.data);
            } else {
                alert("Something went wrong");
            }
        }
    };

    const handleEdit = (pg) => {
        setEditId(pg.pgId);
        setFormData({
            ownerId: pg.ownerId,
            pgName: pg.pgName,
            description: pg.description,
            address: pg.address,
            city: pg.city,
            state: pg.state,
            pincode: pg.pincode,
            rentStarting: pg.rentStarting,
            genderType: pg.genderType,
            foodAvailable: pg.foodAvailable,
            wifiAvailable: pg.wifiAvailable,
            laundryAvailable: pg.laundryAvailable,
            imageUrl: pg.imageUrl || ""
        });
        setImagePreview(
            pg.imageUrl
                ? `http://localhost:8080/uploads/${pg.imageUrl}`
                : ""
        );
        setImageFile(null);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Delete this PG ?");
        if (!confirmDelete) return;
        try {
            await deletePg(id);
            alert("PG Deleted Successfully");
            loadPgs();
        } catch (error) {
            console.log(error);
        }
    };

    const handleImageClick = (imageUrl) => {
        if (imageUrl) {
            setSelectedImage(`http://localhost:8080/uploads/${imageUrl}`);
            setShowImageModal(true);
        }
    };

    const filteredPgs = pgs.filter((pg) =>
        pg.pgName.toLowerCase().includes(search.toLowerCase()) ||
        pg.city.toLowerCase().includes(search.toLowerCase())
    );

    const pageStyles = `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

        * {
            font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif !important;
        }

        .my-pgs-wrapper {
            display: flex;
            min-height: 100vh;
            background: #eef2f6;
        }

        .my-pgs-main {
            flex: 1;
            margin-left: 240px;
            padding: 25px 30px;
            background: #eef2f6;
            min-height: 100vh;
        }

        /* Header */
        .page-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 28px;
            flex-wrap: wrap;
            gap: 15px;
        }

        .page-title {
            font-size: 2rem;
            font-weight: 800;
            letter-spacing: -0.03em;
            color: #0f172a;
            margin: 0;
            line-height: 1.15;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .page-title-pill {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            background: #d9f99d;
            border-radius: 50%;
            margin: 0 6px;
            vertical-align: middle;
        }

        .page-subtitle {
            color: #64748b;
            font-size: 0.9rem;
            font-weight: 500;
            margin-top: 4px;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        /* Stats Cards */
        .stats-mini-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
            margin-bottom: 24px;
        }

        @media (max-width: 1024px) {
            .stats-mini-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        @media (max-width: 640px) {
            .stats-mini-grid {
                grid-template-columns: 1fr;
            }
        }

        .stat-mini-card {
            background: #ffffff;
            border-radius: 16px;
            padding: 20px;
            border: 1px solid #e2e8f0;
            display: flex;
            align-items: center;
            gap: 16px;
            transition: all 0.2s ease;
        }

        .stat-mini-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(15, 23, 42, 0.06);
        }

        .stat-mini-icon {
            width: 48px;
            height: 48px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
            flex-shrink: 0;
        }

        .stat-mini-icon.blue { background: #dbeafe; }
        .stat-mini-icon.green { background: #dcfce7; }
        .stat-mini-icon.purple { background: #eef2ff; }
        .stat-mini-icon.orange { background: #fef3c7; }

        .stat-mini-info {
            flex: 1;
        }

        .stat-mini-label {
            font-size: 0.8rem;
            color: #64748b;
            font-weight: 600;
            margin: 0;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .stat-mini-value {
            font-size: 1.5rem;
            font-weight: 800;
            color: #0f172a;
            margin: 0;
            line-height: 1.2;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        /* Search & Filter */
        .search-filter-section {
            display: flex;
            gap: 16px;
            margin-bottom: 24px;
            flex-wrap: wrap;
        }

        .search-box {
            flex: 1;
            min-width: 200px;
            position: relative;
        }

        .search-box input {
            width: 100%;
            padding: 12px 16px 12px 44px;
            border: 1px solid #e2e8f0;
            border-radius: 14px;
            font-size: 0.9rem;
            font-weight: 500;
            background: #ffffff;
            transition: all 0.2s ease;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
            color: #0f172a;
        }

        .search-box input::placeholder {
            color: #94a3b8;
            font-weight: 400;
        }

        .search-box input:focus {
            outline: none;
            border-color: #6366f1;
            box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
        }

        .search-box .search-icon {
            position: absolute;
            left: 14px;
            top: 50%;
            transform: translateY(-50%);
            color: #94a3b8;
            font-size: 18px;
        }

        .btn-primary-premium {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: #0f172a;
            color: #ffffff;
            text-decoration: none;
            font-weight: 700;
            font-size: 0.88rem;
            padding: 12px 24px;
            border-radius: 30px;
            transition: all 0.2s ease;
            box-shadow: 0 4px 14px rgba(15, 23, 42, 0.15);
            border: none;
            cursor: pointer;
            white-space: nowrap;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .btn-primary-premium:hover {
            background: #1e293b;
            transform: translateY(-1px);
            box-shadow: 0 6px 20px rgba(15, 23, 42, 0.2);
        }

        .btn-primary-premium svg {
            width: 18px;
            height: 18px;
        }

        /* Table Card */
        .table-card {
            background: #ffffff;
            border-radius: 24px;
            border: 1px solid #e2e8f0;
            box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.04);
            overflow: hidden;
        }

        .table-card-header {
            padding: 20px 24px;
            border-bottom: 1px solid #f1f5f9;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .table-card-title {
            font-size: 1.1rem;
            font-weight: 800;
            color: #0f172a;
            margin: 0;
            display: flex;
            align-items: center;
            gap: 10px;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .table-card-badge {
            background: #eef2ff;
            color: #4f46e5;
            font-size: 0.7rem;
            font-weight: 700;
            padding: 2px 12px;
            border-radius: 12px;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .table-wrap {
            overflow-x: auto;
            padding: 0 24px 24px;
        }

        .premium-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.9rem;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .premium-table thead th {
            padding: 16px 12px;
            font-size: 0.7rem;
            font-weight: 800;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            border-bottom: 2px solid #f1f5f9;
            text-align: left;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .premium-table tbody td {
            padding: 16px 12px;
            color: #334155;
            font-weight: 600;
            border-bottom: 1px solid #f8fafc;
            vertical-align: middle;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .premium-table tbody tr:hover {
            background: #f8fafc;
        }

        .premium-table tbody tr:last-child td {
            border-bottom: none;
        }

        .pg-image-cell {
            width: 50px;
            height: 50px;
            border-radius: 12px;
            object-fit: cover;
            border: 2px solid #f1f5f9;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .pg-image-cell:hover {
            transform: scale(1.1);
            border-color: #6366f1;
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }

        .pg-name-cell {
            font-weight: 700;
            color: #0f172a;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .pg-rent-cell {
            font-weight: 700;
            color: #4f46e5;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .pg-gender-cell {
            font-weight: 600;
            color: #475569;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .badge-status {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 4px 14px;
            border-radius: 20px;
            font-size: 0.7rem;
            font-weight: 800;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .badge-status.success { 
            background: #dcfce7; 
            color: #166534; 
        }
        .badge-status.danger { 
            background: #fee2e2; 
            color: #991b1b; 
        }

        .btn-action {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 6px 14px;
            border-radius: 8px;
            font-size: 0.78rem;
            font-weight: 700;
            border: none;
            cursor: pointer;
            transition: all 0.2s ease;
            text-decoration: none;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .btn-action.edit {
            background: #eef2ff;
            color: #4f46e5;
        }

        .btn-action.edit:hover {
            background: #c7d2fe;
            transform: scale(1.05);
        }

        .btn-action.delete {
            background: #fee2e2;
            color: #dc2626;
        }

        .btn-action.delete:hover {
            background: #fecaca;
            transform: scale(1.05);
        }

        .action-buttons {
            display: flex;
            gap: 8px;
        }

        /* Empty State */
        .empty-state {
            text-align: center;
            padding: 60px 20px;
        }

        .empty-state-icon {
            font-size: 64px;
            margin-bottom: 16px;
        }

        .empty-state-title {
            font-size: 1.3rem;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 8px;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .empty-state-desc {
            color: #94a3b8;
            font-size: 0.95rem;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        /* Loading Spinner */
        .loading-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #e2e8f0;
            border-top: 4px solid #6366f1;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        /* Form Modal */
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(15, 23, 42, 0.6);
            backdrop-filter: blur(8px);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }

        .modal-container {
            background: #ffffff;
            border-radius: 28px;
            max-width: 700px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            padding: 32px;
            box-shadow: 0 30px 60px rgba(15, 23, 42, 0.2);
        }

        .modal-container::-webkit-scrollbar {
            width: 4px;
        }

        .modal-container::-webkit-scrollbar-thumb {
            background: #e2e8f0;
            border-radius: 10px;
        }

        .modal-header-custom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
            padding-bottom: 16px;
            border-bottom: 1px solid #f1f5f9;
        }

        .modal-title-custom {
            font-size: 1.4rem;
            font-weight: 800;
            color: #0f172a;
            margin: 0;
            display: flex;
            align-items: center;
            gap: 12px;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .modal-close-btn {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: none;
            background: #f1f5f9;
            color: #475569;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
        }

        .modal-close-btn:hover {
            background: #fee2e2;
            color: #dc2626;
        }

        .form-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
        }

        .form-grid .full-width {
            grid-column: 1 / -1;
        }

        .form-group {
            display: flex;
            flex-direction: column;
            gap: 6px;
        }

        .form-group label {
            font-size: 0.8rem;
            font-weight: 700;
            color: #475569;
            letter-spacing: 0.02em;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
            padding: 10px 14px;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            font-size: 0.9rem;
            font-weight: 500;
            transition: all 0.2s ease;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
            background: #f8fafc;
            color: #0f172a;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: #6366f1;
            background: #ffffff;
            box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.08);
        }

        .form-group textarea {
            resize: vertical;
            min-height: 80px;
        }

        .checkbox-group {
            display: flex;
            gap: 24px;
            flex-wrap: wrap;
            padding-top: 8px;
        }

        .checkbox-item {
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
            font-weight: 600;
            color: #334155;
            font-size: 0.85rem;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .checkbox-item input[type="checkbox"] {
            width: 18px;
            height: 18px;
            accent-color: #6366f1;
            cursor: pointer;
        }

        .image-upload-area {
            border: 2px dashed #e2e8f0;
            border-radius: 12px;
            padding: 20px;
            text-align: center;
            cursor: pointer;
            transition: all 0.2s ease;
            background: #f8fafc;
        }

        .image-upload-area:hover {
            border-color: #6366f1;
            background: #eef2ff;
        }

        .image-upload-area input {
            display: none;
        }

        .image-preview-container {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-top: 12px;
        }

        .image-preview-container img {
            width: 80px;
            height: 80px;
            object-fit: cover;
            border-radius: 12px;
            border: 2px solid #e2e8f0;
        }

        .modal-actions {
            display: flex;
            justify-content: flex-end;
            gap: 12px;
            margin-top: 24px;
            padding-top: 16px;
            border-top: 1px solid #f1f5f9;
        }

        .btn-secondary-premium {
            padding: 10px 24px;
            border-radius: 30px;
            border: 1px solid #e2e8f0;
            background: #ffffff;
            color: #475569;
            font-weight: 700;
            font-size: 0.88rem;
            cursor: pointer;
            transition: all 0.2s ease;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .btn-secondary-premium:hover {
            background: #f1f5f9;
        }

        .btn-primary-premium.submit {
            padding: 10px 32px;
        }

        /* Image Preview Modal */
        .image-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.85);
            backdrop-filter: blur(12px);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            animation: fadeIn 0.3s ease;
            cursor: pointer;
        }

        .image-modal-content {
            position: relative;
            max-width: 90vw;
            max-height: 90vh;
            cursor: default;
        }

        .image-modal-content img {
            max-width: 90vw;
            max-height: 85vh;
            border-radius: 16px;
            box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
            object-fit: contain;
        }

        .image-modal-close {
            position: absolute;
            top: -50px;
            right: 0;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: #ffffff;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            font-size: 24px;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .image-modal-close:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: rotate(90deg);
        }

        .image-modal-label {
            position: absolute;
            bottom: -40px;
            left: 50%;
            transform: translateX(-50%);
            color: rgba(255, 255, 255, 0.6);
            font-size: 0.85rem;
            font-weight: 500;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
            white-space: nowrap;
        }

        @media (max-width: 768px) {
            .my-pgs-main {
                margin-left: 0;
                padding: 16px;
            }

            .form-grid {
                grid-template-columns: 1fr;
            }

            .page-title {
                font-size: 1.5rem;
            }

            .stats-mini-grid {
                grid-template-columns: 1fr 1fr;
            }

            .modal-container {
                padding: 20px;
                margin: 10px;
            }

            .search-filter-section {
                flex-direction: column;
            }

            .table-card-header {
                flex-direction: column;
                gap: 12px;
                align-items: flex-start;
            }

            .action-buttons {
                flex-direction: column;
                gap: 6px;
            }

            .btn-action {
                justify-content: center;
            }

            .image-modal-content img {
                max-width: 95vw;
                max-height: 70vh;
            }
        }

        @media (max-width: 480px) {
            .stats-mini-grid {
                grid-template-columns: 1fr;
            }
        }
    `;

    return (
        <div className="my-pgs-wrapper">
            <style dangerouslySetInnerHTML={{ __html: pageStyles }} />
            
            <OwnerSidebar />

            <div className="my-pgs-main">
                {/* Header */}
                <div className="page-header">
                    <div>
                        <h1 className="page-title">
                            My PGs
                            <span className="page-title-pill">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#365314" strokeWidth="3">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </span>
                            Property List
                        </h1>
                        <p className="page-subtitle">Manage all your PG properties from one place</p>
                    </div>
                    <button className="btn-primary-premium" onClick={() => setShowModal(true)}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        Add New PG
                    </button>
                </div>

                {/* Stats */}
                <div className="stats-mini-grid">
                    <div className="stat-mini-card">
                        <div className="stat-mini-icon blue">🏠</div>
                        <div className="stat-mini-info">
                            <p className="stat-mini-label">Total PGs</p>
                            <p className="stat-mini-value">{pgs.length}</p>
                        </div>
                    </div>
                    <div className="stat-mini-card">
                        <div className="stat-mini-icon green">✅</div>
                        <div className="stat-mini-info">
                            <p className="stat-mini-label">Active</p>
                            <p className="stat-mini-value">{pgs.filter(p => p.active !== false).length}</p>
                        </div>
                    </div>
                    <div className="stat-mini-card">
                        <div className="stat-mini-icon purple">📍</div>
                        <div className="stat-mini-info">
                            <p className="stat-mini-label">Cities</p>
                            <p className="stat-mini-value">{new Set(pgs.map(p => p.city)).size}</p>
                        </div>
                    </div>
                    <div className="stat-mini-card">
                        <div className="stat-mini-icon orange">🛏️</div>
                        <div className="stat-mini-info">
                            <p className="stat-mini-label">Total Rooms</p>
                            <p className="stat-mini-value">{pgs.reduce((acc, p) => acc + (p.totalRooms || 0), 0)}</p>
                        </div>
                    </div>
                </div>

                {/* Search */}
                <div className="search-filter-section">
                    <div className="search-box">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            placeholder="Search by PG name or city..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="table-card">
                    <div className="table-card-header">
                        <h4 className="table-card-title">
                            📋 PG List
                            <span className="table-card-badge">{filteredPgs.length} Properties</span>
                        </h4>
                    </div>

                    {loading ? (
                        <div style={{ padding: "40px", textAlign: "center" }}>
                            <div className="loading-spinner"></div>
                        </div>
                    ) : filteredPgs.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">🏠</div>
                            <div className="empty-state-title">No PGs Found</div>
                            <div className="empty-state-desc">
                                {search ? "Try adjusting your search" : "Start by adding your first PG property"}
                            </div>
                            <button 
                                className="btn-primary-premium" 
                                style={{ marginTop: "16px" }}
                                onClick={() => setShowModal(true)}
                            >
                                + Add Your First PG
                            </button>
                        </div>
                    ) : (
                        <div className="table-wrap">
                            <table className="premium-table">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>PG Name</th>
                                        <th>City</th>
                                        <th>Rent</th>
                                        <th>Gender</th>
                                        <th>Food</th>
                                        <th>WiFi</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredPgs.map((pg) => (
                                        <tr key={pg.pgId}>
                                            <td>
                                                <img
                                                    src={
                                                        pg.imageUrl
                                                            ? `http://localhost:8080/uploads/${pg.imageUrl}`
                                                            : "https://via.placeholder.com/50"
                                                    }
                                                    alt={pg.pgName}
                                                    className="pg-image-cell"
                                                    onClick={() => handleImageClick(pg.imageUrl)}
                                                    title="Click to view full image"
                                                />
                                            </td>
                                            <td className="pg-name-cell">{pg.pgName}</td>
                                            <td>{pg.city}</td>
                                            <td className="pg-rent-cell">₹{pg.rentStarting}</td>
                                            <td className="pg-gender-cell">{pg.genderType}</td>
                                            <td>
                                                <span className={`badge-status ${pg.foodAvailable ? 'success' : 'danger'}`}>
                                                    {pg.foodAvailable ? '✓ Yes' : '✗ No'}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`badge-status ${pg.wifiAvailable ? 'success' : 'danger'}`}>
                                                    {pg.wifiAvailable ? '✓ Yes' : '✗ No'}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="action-buttons">
                                                    <button
                                                        className="btn-action edit"
                                                        onClick={() => handleEdit(pg)}
                                                    >
                                                        ✎ Edit
                                                    </button>
                                                    <button
                                                        className="btn-action delete"
                                                        onClick={() => handleDelete(pg.pgId)}
                                                    >
                                                        ✕ Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Form Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => resetForm()}>
                    <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header-custom">
                            <h3 className="modal-title-custom">
                                {editId ? '✎ Update PG' : '🏠 Add New PG'}
                            </h3>
                            <button className="modal-close-btn" onClick={resetForm}>✕</button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="form-grid">
                                <div className="form-group full-width">
                                    <label>PG Name *</label>
                                    <input
                                        type="text"
                                        name="pgName"
                                        placeholder="Enter PG name"
                                        value={formData.pgName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group full-width">
                                    <label>Description *</label>
                                    <textarea
                                        name="description"
                                        placeholder="Describe your PG"
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group full-width">
                                    <label>Address *</label>
                                    <input
                                        type="text"
                                        name="address"
                                        placeholder="Full address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>City *</label>
                                    <input
                                        type="text"
                                        name="city"
                                        placeholder="City"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>State *</label>
                                    <input
                                        type="text"
                                        name="state"
                                        placeholder="State"
                                        value={formData.state}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Pincode *</label>
                                    <input
                                        type="text"
                                        name="pincode"
                                        placeholder="Pincode"
                                        value={formData.pincode}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Starting Rent (₹) *</label>
                                    <input
                                        type="number"
                                        name="rentStarting"
                                        placeholder="Rent amount"
                                        value={formData.rentStarting}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Gender Type *</label>
                                    <select
                                        name="genderType"
                                        value={formData.genderType}
                                        onChange={handleChange}
                                    >
                                        <option value="Boys">Boys</option>
                                        <option value="Girls">Girls</option>
                                        <option value="Unisex">Unisex</option>
                                    </select>
                                </div>

                                <div className="form-group full-width">
                                    <label>Amenities</label>
                                    <div className="checkbox-group">
                                        <label className="checkbox-item">
                                            <input
                                                type="checkbox"
                                                name="foodAvailable"
                                                checked={formData.foodAvailable}
                                                onChange={handleChange}
                                            />
                                            🍽️ Food
                                        </label>
                                        <label className="checkbox-item">
                                            <input
                                                type="checkbox"
                                                name="wifiAvailable"
                                                checked={formData.wifiAvailable}
                                                onChange={handleChange}
                                            />
                                            📶 WiFi
                                        </label>
                                        <label className="checkbox-item">
                                            <input
                                                type="checkbox"
                                                name="laundryAvailable"
                                                checked={formData.laundryAvailable}
                                                onChange={handleChange}
                                            />
                                            👕 Laundry
                                        </label>
                                    </div>
                                </div>

                                <div className="form-group full-width">
                                    <label>PG Image</label>
                                    <div className="image-upload-area">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            id="imageUpload"
                                        />
                                        <label htmlFor="imageUpload" style={{ cursor: "pointer", display: "block" }}>
                                            <div style={{ fontSize: "32px", marginBottom: "8px" }}>🖼️</div>
                                            <div style={{ fontWeight: 600, color: "#0f172a", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                                Click to upload image
                                            </div>
                                            <div style={{ fontSize: "0.8rem", color: "#94a3b8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                                PNG, JPG up to 5MB
                                            </div>
                                        </label>
                                    </div>
                                    {imagePreview && (
                                        <div className="image-preview-container">
                                            <img src={imagePreview} alt="Preview" />
                                            <span style={{ fontSize: "0.85rem", color: "#64748b", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                                {imageFile ? imageFile.name : "Preview"}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="modal-actions">
                                <button type="button" className="btn-secondary-premium" onClick={resetForm}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn-primary-premium submit">
                                    {editId ? 'Update PG' : 'Add PG'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Image Preview Modal */}
            {showImageModal && (
                <div className="image-modal-overlay" onClick={() => setShowImageModal(false)}>
                    <div className="image-modal-content">
                        <img src={selectedImage} alt="PG Preview" />
                        <button 
                            className="image-modal-close" 
                            onClick={() => setShowImageModal(false)}
                        >
                            ✕
                        </button>
                        <div className="image-modal-label">Click anywhere to close</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyPgs;