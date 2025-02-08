"use client";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { createClient } from "@/supabase/client";
import Image from "next/image";

export default function Create() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [avatar, setAvatar] = useState("");
  const supaBase = createClient();
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!name || !email || !age || !avatar) {
      return;
    }

    const { data, error } = await supaBase.from("users").insert([
      {
        name: name,
        email: email,
        age: age,
        avatar: avatar,
      },
    ]);

    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-[400px] p-6 bg-white">
        <div className="w-[150px] h-[150px] rounded-full border-dashed border-3 border-gray-500 mx-auto mb-6 flex justify-center items-center">
          <label htmlFor="avatar" className="cursor-pointer">
            {avatar ? (
              <Image
                width={150}
                height={150}
                src={avatar}
                alt="Avatar"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <svg
                className="w-10 h-10 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M4 19H20V12H22V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V12H4V19ZM13 9V16H11V9H6L12 3L18 9H13Z"></path>
              </svg>
            )}
            <input
              onChange={handleUpload}
              id="avatar"
              type="file"
              className="hidden"
            />
          </label>
        </div>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Name..."
        />

        <input
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full p-3 mb-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Age..."
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-6 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          placeholder="Email..."
        />

        <button
          onClick={handleSave}
          className="btn btn-dark d-block mx-auto w-1/2"
        >
          Save
        </button>
      </div>
    </div>
  );
}
