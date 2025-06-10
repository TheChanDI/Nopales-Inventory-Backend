"use client";

import React, { useState } from "react";
import { InventoryListProps } from "../page";
import { Trash2 } from "lucide-react";

interface Props {
  headerLabel: string;
  label: string;
  handleAddButton: (data: { label: string; perBox: number }) => void;
  inventoryList: Array<{ category: string; list: Array<InventoryListProps> }>;
  handleDelete: (id: number) => void;
  handleUpdateItem: (category: string, item: InventoryListProps) => void;
}

/**
 * InventoryItem component.
 *
 * Renders an inventory item with a form to add a new wine to the inventory
 * list. The form contains fields for the wine name, bottles per box, and a
 * button to add the wine to the list. The component also displays the current
 * wine list.
 *
 * @param {string} headerLabel - The header label for the inventory item.
 * @param {string} label - The label for the wine name.
 * @param {function} handleAddButton - The function to handle the add button
 *   click event.
 * @param {Array<InventoryProps>} inventoryList - The current inventory list.
 * @returns {ReactElement} The InventoryItem component.
 */
const InventoryItem = ({
  headerLabel,
  label,
  handleAddButton,
  inventoryList,
  handleDelete,
  handleUpdateItem,
}: Props) => {
  const [wineName, setWineName] = useState("");
  const [perBox, setPerBox] = useState("");
  const [updateItem, setUpdateItem] = useState<InventoryListProps>();

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (updateItem) {
      handleUpdateItem(headerLabel, {
        id: updateItem.id,
        label: wineName.trim(),
        perBox: parseInt(perBox, 10),
      });
      setUpdateItem(undefined);
    } else {
      handleAddButton({
        label: wineName.trim(),
        perBox: parseInt(perBox, 10),
      });
    }

    setWineName("");
    setPerBox("");
  };

  const handleDeleteButton = (id: number) => {
    handleDelete(id);
  };

  const handleItemClicked = (item: InventoryListProps) => {
    setWineName(item.label);
    setPerBox(String(item.perBox));
    setUpdateItem(item);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="flex  justify-between items-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {headerLabel} Inventory
        </h2>
        <h5
          onClick={() => {
            setWineName("");
            setPerBox("");
            setUpdateItem(undefined);
          }}
          className="text-sm font-bold mb-2 text-gray-400 cursor-pointer"
        >
          clear
        </h5>
      </div>

      <form onSubmit={handleOnSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label} Name
          </label>
          <input
            type="text"
            value={wineName}
            onChange={(e) => setWineName(e.target.value)}
            placeholder={`Add ${label}`}
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
          {updateItem ? "Update" : "Add"} {label}
        </button>
      </form>

      {inventoryList.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Current {label} List
          </h3>
          <ul className="space-y-2">
            {inventoryList
              .find((item) => item.category === headerLabel)
              ?.list.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center bg-gray-50 p-4 rounded-md border border-gray-200 hover:bg-gray-100"
                >
                  <div
                    onClick={() => handleItemClicked(item)}
                    className="cursor-pointer"
                  >
                    <span className="text-gray-700 font-medium">
                      {item.label}
                    </span>
                    <div className="text-sm text-gray-500">
                      {item.perBox} bottles/box
                    </div>
                  </div>

                  <Trash2
                    onClick={() => handleDeleteButton(item.id)}
                    size={20}
                    className="text-black hover:text-red-500 cursor-pointer"
                  />
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InventoryItem;
