// src/components/SubmitPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function SubmitPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    country: "",
    website: "",
    instagram: "",
    description: "",
    submittedBy: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState(null);

  // ---------- helpers ----------
  const normalizeWebsite = (url) => {
    if (!url) return "";
    const trimmed = url.trim();
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    return `https://${trimmed}`;
  };

  const normalizeInstagram = (handle) => {
    if (!handle) return "";
    return handle.trim().replace(/^@/, "");
  };

  const validate = (values) => {
    const errs = {};
    if (!values.name.trim()) errs.name = "Shop name is required.";
    if (!values.city.trim()) errs.city = "City is required.";
    if (!values.country.trim()) errs.country = "Country is required.";

    if (values.website.trim()) {
      const candidate = normalizeWebsite(values.website);
      try {
        // throws if invalid
        new URL(candidate);
      } catch {
        errs.website = "Enter a valid URL (e.g., https://example.com).";
      }
    }
    return errs;
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ---------- submit ----------
  const onSubmit = async (e) => {
    e.preventDefault();
    const next = {
      ...formData,
      website: normalizeWebsite(formData.website),
      instagram: normalizeInstagram(formData.instagram),
    };

    const v = validate(next);
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    setSubmitting(true);
    try {
      const docRef = await addDoc(collection(db, "barbershops"), {
        name: next.name.trim(),
        address: next.address.trim(),
        city: next.city.trim(),
        country: next.country.trim(),
        website: next.website,
        instagram: next.instagram,
        description: next.description.trim(),
        submittedBy: next.submittedBy.trim(),
        createdAt: serverTimestamp(), // works with rules that compare to request.time
      });

      setSubmittedId(docRef.id);
      setFormData({
        name: "",
        address: "",
        city: "",
        country: "",
        website: "",
        instagram: "",
        description: "",
        submittedBy: "",
      });
      setErrors({});
    } catch (err) {
      console.error("Error saving barbershop:", err);
      setErrors({ submit: "We couldn't save that. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  // ---------- UI ----------
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="bg-white shadow-sm rounded-2xl p-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            Add a Barbershop
          </h1>
          <p className="mt-2 text-gray-600">
            Know a great Black-owned barbershop? Add it to the directory.
          </p>

          {submittedId && (
            <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4 text-green-900">
              <p className="font-medium">Thanks! Your submission was received.</p>
              <div className="mt-3 flex gap-3">
                <button
                  onClick={() => navigate("/shops")}
                  className="inline-flex items-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-100"
                >
                  View All Shops
                </button>
                <button
                  onClick={() => setSubmittedId(null)}
                  className="inline-flex items-center rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
                >
                  Add Another
                </button>
              </div>
            </div>
          )}

          {errors.submit && (
            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
              {errors.submit}
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={onSubmit} noValidate>
            {/* Shop Name (required) */}
            <div>
              <label className="block text-sm font-semibold text-gray-900">
                Shop Name <span className="text-red-600">*</span>
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={onChange}
                type="text"
                className={`mt-2 w-full rounded-lg border px-4 py-3 outline-none transition ${
                  errors.name
                    ? "border-red-400 focus:ring-2 focus:ring-red-200"
                    : "border-gray-300 focus:ring-2 focus:ring-gray-200"
                }`}
                placeholder="e.g., SliderCuts Studios"
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Address (optional) */}
            <div>
              <label className="block text-sm font-semibold text-gray-900">
                Address
              </label>
              <input
                name="address"
                value={formData.address}
                onChange={onChange}
                type="text"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="Street, city, postcode"
              />
            </div>

            {/* City (required) */}
            <div>
              <label className="block text-sm font-semibold text-gray-900">
                City <span className="text-red-600">*</span>
              </label>
              <input
                name="city"
                value={formData.city}
                onChange={onChange}
                type="text"
                className={`mt-2 w-full rounded-lg border px-4 py-3 outline-none transition ${
                  errors.city
                    ? "border-red-400 focus:ring-2 focus:ring-red-200"
                    : "border-gray-300 focus:ring-2 focus:ring-gray-200"
                }`}
                placeholder="e.g., London"
              />
              {errors.city && (
                <p className="mt-2 text-sm text-red-600">{errors.city}</p>
              )}
            </div>

            {/* Country (required) */}
            <div>
              <label className="block text-sm font-semibold text-gray-900">
                Country <span className="text-red-600">*</span>
              </label>
              <input
                name="country"
                value={formData.country}
                onChange={onChange}
                type="text"
                className={`mt-2 w-full rounded-lg border px-4 py-3 outline-none transition ${
                  errors.country
                    ? "border-red-400 focus:ring-2 focus:ring-red-200"
                    : "border-gray-300 focus:ring-2 focus:ring-gray-200"
                }`}
                placeholder="e.g., United Kingdom"
              />
              {errors.country && (
                <p className="mt-2 text-sm text-red-600">{errors.country}</p>
              )}
            </div>

            {/* Website (optional) */}
            <div>
              <label className="block text-sm font-semibold text-gray-900">
                Website (optional)
              </label>
              <input
                name="website"
                value={formData.website}
                onChange={onChange}
                type="url"
                className={`mt-2 w-full rounded-lg border px-4 py-3 outline-none transition ${
                  errors.website
                    ? "border-red-400 focus:ring-2 focus:ring-red-200"
                    : "border-gray-300 focus:ring-2 focus:ring-gray-200"
                }`}
                placeholder="https://example.com"
              />
              {errors.website && (
                <p className="mt-2 text-sm text-red-600">{errors.website}</p>
              )}
            </div>

            {/* Instagram (optional) */}
            <div>
              <label className="block text-sm font-semibold text-gray-900">
                Instagram Handle (optional)
              </label>
              <input
                name="instagram"
                value={formData.instagram}
                onChange={onChange}
                type="text"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="@barbershop"
              />
            </div>

            {/* Description (optional) */}
            <div>
              <label className="block text-sm font-semibold text-gray-900">
                Description (optional)
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={onChange}
                rows={4}
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="Anything people should know?"
              />
            </div>

            {/* Submitted By (optional) */}
            <div>
              <label className="block text-sm font-semibold text-gray-900">
                Your name or email (optional)
              </label>
              <input
                name="submittedBy"
                value={formData.submittedBy}
                onChange={onChange}
                type="text"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="So we can reach you if needed"
              />
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center rounded-lg bg-black px-5 py-3 text-white font-semibold hover:bg-gray-800 disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Submit Barbershop"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="inline-flex items-center rounded-lg px-5 py-3 font-semibold border border-gray-300 text-gray-800 hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>

            <p className="text-xs text-gray-500">
              <span className="text-red-600">*</span> Required fields
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}