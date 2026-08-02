import React, { useState } from 'react';
import { addPg } from '../../services/ownerService';

const AddPg = () => {
  // Local storage ya Auth Context se logged in owner ka ID lein
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const ownerId = storedUser?.id || 1; 

  const [pgData, setPgData] = useState({
    ownerId: ownerId,
    pgName: '',
    description: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    rentStarting: '',
    foodAvailable: false,
    wifiAvailable: false,
    laundryAvailable: false,
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPgData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await addPg(pgData, imageFile);
      setMessage('PG successfully added!');
      // Reset Form
      setPgData({
        ownerId: ownerId,
        pgName: '',
        description: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        rentStarting: '',
        foodAvailable: false,
        wifiAvailable: false,
        laundryAvailable: false,
      });
      setImageFile(null);
    } catch (error) {
      console.error('Error adding PG:', error);
      setMessage('Failed to add PG. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-pg-container" style={{ maxWidth: '600px', margin: '2rem auto', padding: '1rem' }}>
      <h2>Add New PG</h2>
      {message && <p style={{ fontWeight: 'bold', color: message.includes('Failed') ? 'red' : 'green' }}>{message}</p>}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input type="text" name="pgName" placeholder="PG Name" value={pgData.pgName} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={pgData.description} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" value={pgData.address} onChange={handleChange} required />
        
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input type="text" name="city" placeholder="City" value={pgData.city} onChange={handleChange} required />
          <input type="text" name="state" placeholder="State" value={pgData.state} onChange={handleChange} required />
          <input type="text" name="pincode" placeholder="Pincode (6 digits)" value={pgData.pincode} onChange={handleChange} required />
        </div>

        <input type="number" name="rentStarting" placeholder="Starting Rent (₹)" value={pgData.rentStarting} onChange={handleChange} required />

        <div>
          <label><input type="checkbox" name="foodAvailable" checked={pgData.foodAvailable} onChange={handleChange} /> Food Available</label> <br />
          <label><input type="checkbox" name="wifiAvailable" checked={pgData.wifiAvailable} onChange={handleChange} /> WiFi Available</label> <br />
          <label><input type="checkbox" name="laundryAvailable" checked={pgData.laundryAvailable} onChange={handleChange} /> Laundry Available</label>
        </div>

        <div>
          <label>PG Photo: </label>
          <input type="file" accept="image/*" onChange={handleImageChange} required />
        </div>

        <button type="submit" disabled={loading} style={{ padding: '0.75rem', cursor: 'pointer' }}>
          {loading ? 'Submitting...' : 'Add PG'}
        </button>
      </form>
    </div>
  );
};

export default AddPg;