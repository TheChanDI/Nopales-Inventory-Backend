"use client";
import { useState } from "react";

interface WineProps {
  label: string;
  perBox: number;
}

export default function Home() {
  const [wineName, setWineName] = useState("");
  const [perBox, setPerBox] = useState("");
  const [wineList, setWineList] = useState<Array<WineProps>>([]);

  const handleAddWine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wineName.trim() || !perBox.trim()) return;

    const newEntry = {
      label: wineName.trim(),
      perBox: parseInt(perBox, 10),
    };

    setWineList([...wineList, newEntry]);
    setWineName("");
    setPerBox("");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Sparkling Wine Inventory
      </h2>
      <form onSubmit={handleAddWine} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Wine Name
          </label>
          <input
            type="text"
            value={wineName}
            onChange={(e) => setWineName(e.target.value)}
            placeholder="e.g., Amanti Prossecco NV Glera"
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bottles per Box
          </label>
          <input
            type="number"
            value={perBox}
            onChange={(e) => setPerBox(e.target.value)}
            placeholder="e.g., 12"
            min="1"
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
        >
          Add Wine
        </button>
      </form>

      {wineList.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Current Wine List
          </h3>
          <ul className="space-y-2">
            {wineList.map((wine, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-50 p-4 rounded-md border border-gray-200"
              >
                <span className="text-gray-700">{wine.label}</span>
                <span className="text-sm text-gray-500">
                  {wine.perBox} bottles/box
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
