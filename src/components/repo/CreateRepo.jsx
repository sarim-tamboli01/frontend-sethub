import React, { useState } from "react";
import Navbar from "../Navbar";
import "./createRepo.css";

const CreateRepo = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const owner = localStorage.getItem("userId");
    if (!owner) {
      setMessage("You must be logged in to create a repository.");
      return;
    }
    if (!name.trim()) {
      setMessage("Repository name is required.");
      return;
    }
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3002/repo/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ owner, name, description, visibility }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || data?.message || "Failed to create repository");
      }
      setMessage("Repository created successfully!");
      setName("");
      setDescription("");
      setVisibility("public");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="create-repo-page">
        <div className="create-repo-card">
          <h2>Create Repository</h2>
          <form onSubmit={handleSubmit} className="create-repo-form">
            <label>
              <span>Name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="my-awesome-repo"
              />
            </label>
            <label>
              <span>Description</span>
              <textarea
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What does this repo do?"
              />
            </label>
            <label>
              <span>Visibility</span>
              <div className="visibility-group">
                <label className="pill">
                  <input
                    type="radio"
                    name="visibility"
                    value="public"
                    checked={visibility === "public"}
                    onChange={(e) => setVisibility(e.target.value)}
                  />
                  <span>Public</span>
                </label>
                <label className="pill">
                  <input
                    type="radio"
                    name="visibility"
                    value="private"
                    checked={visibility === "private"}
                    onChange={(e) => setVisibility(e.target.value)}
                  />
                  <span>Private</span>
                </label>
              </div>
            </label>
            <button type="submit" disabled={loading} className="primary-btn">
              {loading ? "Creating..." : "Create Repository"}
            </button>
            {message && <p className="form-message">{message}</p>}
          </form>
        </div>
      </section>
    </>
  );
};

export default CreateRepo;


