import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Error from '../../../components/error';
import Loading from '../../../components/loading';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ username: '',password:'', role: 'user' });
  const [editingUserId, setEditingUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/users');
        setUsers(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddUser = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/auth/register', formData);
      setUsers([...users, response.data]);
      setFormData({ username: '',password: '', role: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditUser = async () => {
    try {
      await axios.put(`http://localhost:3001/api/users/${editingUserId}`, formData);
      setUsers(users.map(user => (user._id === editingUserId ? { ...user, ...formData } : user)));
      setEditingUserId(null);
      setFormData({ username: '', role: '' });
    } catch (err) {
      setError(err);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/users/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <Loading/>;
  if (error) return <Error error={error}/>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      <div className="mb-6">
        <div className="flex space-x-4 mb-6">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Name"
            className="border p-2 flex-1"
          />
          {!editingUserId && (
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="border p-2 flex-1"
            />
          )}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="border p-2 flex-2"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

        </div>


        {editingUserId ? (
          <button
            onClick={handleEditUser}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update User
          </button>
        ) : (
          <button
            onClick={handleAddUser}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add User
          </button>
        )}
      </div>

      <table className="min-w-full bg-white border border-gray-200 rounded">
        <thead>
          <tr>
            <th className="border-b px-4 py-2">Name</th>
            <th className="border-b px-4 py-2">Email</th>
            <th className="border-b px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td className="border-b px-4 py-2">{user.username}</td>
              <td className="border-b px-4 py-2">{user.role}</td>
              <td className="border-b px-4 py-2 flex space-x-2">
                <button
                  onClick={() => {
                    setEditingUserId(user._id);
                    setFormData({ username: user.username, role: user.role });
                  }}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
