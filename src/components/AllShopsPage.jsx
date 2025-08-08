// src/components/AllShopsPage.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

export default function AllShopsPage() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const q = query(collection(db, "barbershops"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setShops(list);
      } catch (e) {
        console.error("Error fetching shops:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">All Shops</h1>
      {loading ? (
        <p className="text-gray-600">Loading…</p>
      ) : shops.length === 0 ? (
        <p className="text-gray-600">No shops found.</p>
      ) : (
        <ul className="space-y-4">
          {shops.map((shop) => (
            <li key={shop.id} className="border rounded-lg p-4">
              <h2 className="text-lg font-semibold">{shop.name}</h2>
              {(shop.city || shop.country) && (
                <p className="text-gray-700">
                  {shop.city ? shop.city : ""}{shop.city && shop.country ? ", " : ""}
                  {shop.country ? shop.country : ""}
                </p>
              )}
              {shop.address && <p className="text-gray-700">Address: {shop.address}</p>}
              {shop.website && (
                <p>
                  <a className="text-blue-600 underline" href={shop.website} target="_blank" rel="noreferrer">
                    Website
                  </a>
                </p>
              )}
              {shop.instagram && <p className="text-gray-700">IG: @{shop.instagram.replace(/^@/, "")}</p>}
              {shop.description && <p className="text-gray-700 mt-2">{shop.description}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}