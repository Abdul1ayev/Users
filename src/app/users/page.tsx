"use client";
import React, { useEffect, useState, ChangeEvent } from "react";
import { supaBase } from "../create/page";

interface User {
  id: number;
  name: string;
  email: string;
  age: string;
  avatar: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const fetchData = async () => {
    const { data, error } = await supaBase.from("users").select("*");
    if (error) {
      console.error("Error fetching data:", error.message);
    } else {
      setUsers(data as User[]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    const { error } = await supaBase.from("users").delete().eq("id", id);
    if (error) {
      console.error("Error deleting user:", error.message);
    } else {
      fetchData();
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  const handleUpdate = async () => {
    if (!editingUser) return;
    const { id, name, email, age, avatar } = editingUser;
    const { error } = await supaBase
      .from("users")
      .update({ name, email, age, avatar })
      .eq("id", id);
    if (error) {
      console.error("Error updating user:", error.message);
    } else {
      setEditingUser(null);
      fetchData();
    }
  };

  const handleEditUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingUser) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Avatar = reader.result as string;
      setEditingUser({ ...editingUser, avatar: base64Avatar });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-lg">
      <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-300 brode">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-800 dark:text-gray-200">
          <tr>
            <th className="py-3 px-6">№</th>
            <th className="py-3 px-6">Avatar</th>
            <th className="py-3 px-6">Name</th>
            <th className="py-3 px-6">Age</th>
            <th className="py-3 px-6">Email</th>
            <th className="py-3 px-6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) =>
            editingUser && editingUser.id === user.id ? (
              <tr key={user.id} className="border-t-2 border-gray-200 ">
                <td className="py-4 px-6 text-gray-500">{i + 1}</td>
                <td className="py-4 px-6 flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    {editingUser.avatar && (
                      <img
                        src={editingUser.avatar}
                        alt="avatar"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    )}
                    <label className="btn btn-dark mt-2 cursor-pointer">
                      Change
                      <input
                        type="file"
                        onChange={handleEditUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <input
                    type="text"
                    className="w-full p-2 rounded-md border border-gray-300"
                    value={editingUser.name}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, name: e.target.value })
                    }
                  />
                </td>
                <td className="py-4 px-6">
                  <input
                    type="text"
                    className="w-full p-2 rounded-md border border-gray-300"
                    value={editingUser.age}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, age: e.target.value })
                    }
                  />
                </td>
                <td className="py-4 px-6">
                  <input
                    type="email"
                    className="w-full p-2 rounded-md border border-gray-300"
                    value={editingUser.email}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, email: e.target.value })
                    }
                  />
                </td>
                <td className="py-4 px-6 flex space-x-2">
                  <button className="btn btn-success" onClick={handleUpdate}>
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => setEditingUser(null)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={user.id} className="border-t-2 border-gray-200">
                <td className="py-4 px-6">{i + 1}</td>
                <td className="py-4 px-6">
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </td>
                <td className="py-4 px-6 text-gray-800 font-semibold">
                  {user.name}
                </td>
                <td className="py-4 px-6 text-gray-800 font-semibold">
                  {user.age}
                </td>
                <td className="py-4 px-6 text-gray-800 font-semibold">
                  {user.email}
                </td>
                <td className="py-4 px-6 flex space-x-2 justify-center">
                  <button
                    className="btn btn-info"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
