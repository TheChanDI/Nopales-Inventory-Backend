"use client";
import { useEffect, useState } from "react";
import InventoryItem from "./components/InventoryItem";
import toast from "react-hot-toast";

export interface InventoryListProps {
  id: number;
  label: string;
  perBox: number;
}

export default function Home() {
  const [inventoryList, setInventoryList] = useState<
    Array<{ id: number; category: string; list: Array<InventoryListProps> }>
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getInventoryList();
  }, []);

  const getInventoryList = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api", {
        method: "GET",
      });
      const data = await response.json();
      toast.success("Inventory List Fetched Successfully");
      console.log(data, "data -->");
      setInventoryList(data);
    } catch (error) {
      toast.error("Error Fetching Inventory List");
      console.error("Error fetching list:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToList = async (
    inventoryCategoryLabel: string,
    inventoryItemLabel: string,
    perBox: number
  ) => {
    setLoading(true);
    try {
      const response = await fetch("/api", {
        method: "POST",
        body: JSON.stringify({
          category: inventoryCategoryLabel,
          label: inventoryItemLabel,
          perBox: perBox,
        }),
      });

      const data = await response.json();
      const index = inventoryList.findIndex(
        (item) => item.category === inventoryCategoryLabel
      );
      console.log(index, "index -->");
      const updatedList = [...inventoryList];

      updatedList[index] = {
        ...updatedList[index],
        list: [...updatedList[index].list, data],
      };
      setInventoryList(updatedList);
      toast.success("Item Added Successfully");
    } catch (error) {
      console.error("Error adding to list:", error);
      toast.error("Error Adding Item");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (id: number) => {
    setLoading(true);
    try {
      const response = await fetch("/api", {
        method: "DELETE",
        body: JSON.stringify({
          id,
        }),
      });
      const data = await response.json();
      const tempList = [...inventoryList];
      const updatedList = tempList.map((item) => ({
        ...item,
        list: item.list.filter((wine) => wine.id !== data.id),
      }));
      setInventoryList(updatedList);
      toast.success("Item Deleted Successfully");
    } catch (error) {
      console.error("Error deleting an item:", error);
      toast.error("Error Deleting Item");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateItem = async (
    inventoryCategoryLabel: string,
    { id, label, perBox }: InventoryListProps
  ) => {
    try {
      setLoading(true);
      const response = await fetch("/api", {
        method: "PUT",
        body: JSON.stringify({
          id,
          label,
          perBox,
        }),
      });
      const data = await response.json();
      const index = inventoryList.findIndex(
        (item) => item.category === inventoryCategoryLabel
      );
      const updatedCategory = { ...inventoryList[index] };

      // Replace the updated wine in the list
      updatedCategory.list = updatedCategory.list.map((wine) =>
        wine.id === id ? data : wine
      );

      const updatedList = [...inventoryList];
      updatedList[index] = updatedCategory;

      setInventoryList(updatedList);
      toast.success("Item Updated Successfully");
    } catch (error) {
      console.error("Error updating an item:", error);
      toast.error("Error Updating Item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 border-4 border-dashed border-white rounded-full animate-spin"></div>
            <span className="mt-4 text-white text-sm">Loading...</span>
          </div>
        </div>
      )}
      <InventoryItem
        handleUpdateItem={(category, item) => handleUpdateItem(category, item)}
        label={"Wine"}
        headerLabel={"Sparkling Wine"}
        handleAddButton={(data) =>
          addToList("Sparkling Wine", data.label, data.perBox)
        }
        inventoryList={inventoryList}
        handleDelete={handleDeleteItem}
      />

      <InventoryItem
        handleUpdateItem={(category, item) => handleUpdateItem(category, item)}
        label={"Wine"}
        headerLabel={"Rose"}
        handleAddButton={(data) => addToList("Rose", data.label, data.perBox)}
        inventoryList={inventoryList}
        handleDelete={handleDeleteItem}
      />
      <InventoryItem
        label={"Wine"}
        handleUpdateItem={(category, item) => handleUpdateItem(category, item)}
        headerLabel={"Red Wine"}
        handleAddButton={(data) =>
          addToList("Red Wine", data.label, data.perBox)
        }
        inventoryList={inventoryList}
        handleDelete={handleDeleteItem}
      />
      <InventoryItem
        handleUpdateItem={(category, item) => handleUpdateItem(category, item)}
        label={"Wine"}
        headerLabel={"White Wine"}
        handleAddButton={(data) =>
          addToList("White Wine", data.label, data.perBox)
        }
        inventoryList={inventoryList}
        handleDelete={handleDeleteItem}
      />
      <InventoryItem
        handleUpdateItem={(category, item) => handleUpdateItem(category, item)}
        label={"Tequila (Blanco)"}
        headerLabel={"Tequila (Blanco)"}
        handleAddButton={(data) =>
          addToList("Tequila (Blanco)", data.label, data.perBox)
        }
        inventoryList={inventoryList}
        handleDelete={handleDeleteItem}
      />
      <InventoryItem
        handleUpdateItem={(category, item) => handleUpdateItem(category, item)}
        label={"Tequila (Reposado)"}
        headerLabel={"Tequila (Reposado)"}
        handleAddButton={(data) =>
          addToList("Tequila (Reposado)", data.label, data.perBox)
        }
        inventoryList={inventoryList}
        handleDelete={handleDeleteItem}
      />
      <InventoryItem
        handleUpdateItem={(category, item) => handleUpdateItem(category, item)}
        label={"Tequila (Anejo)"}
        headerLabel={"Tequila (Anejo)"}
        handleAddButton={(data) =>
          addToList("Tequila (Anejo)", data.label, data.perBox)
        }
        inventoryList={inventoryList}
        handleDelete={handleDeleteItem}
      />
      <InventoryItem
        handleUpdateItem={(category, item) => handleUpdateItem(category, item)}
        label={"Mezcal"}
        headerLabel={"Mezcal"}
        handleAddButton={(data) => addToList("Mezcal", data.label, data.perBox)}
        inventoryList={inventoryList}
        handleDelete={handleDeleteItem}
      />
      <InventoryItem
        handleUpdateItem={(category, item) => handleUpdateItem(category, item)}
        label={"Spirits (Vodka)"}
        headerLabel={"Spirits (Vodka)"}
        handleAddButton={(data) =>
          addToList("Spirits (Vodka)", data.label, data.perBox)
        }
        inventoryList={inventoryList}
        handleDelete={handleDeleteItem}
      />
      <InventoryItem
        handleUpdateItem={(category, item) => handleUpdateItem(category, item)}
        label={"Spirits (Gin)"}
        headerLabel={"Spirits (Gin)"}
        handleAddButton={(data) =>
          addToList("Spirits (Gin)", data.label, data.perBox)
        }
        inventoryList={inventoryList}
        handleDelete={handleDeleteItem}
      />
      <InventoryItem
        handleUpdateItem={(category, item) => handleUpdateItem(category, item)}
        label={"Spirits (Scotch)"}
        headerLabel={"Spirits (Scotch)"}
        handleAddButton={(data) =>
          addToList("Spirits (Scotch)", data.label, data.perBox)
        }
        inventoryList={inventoryList}
        handleDelete={handleDeleteItem}
      />
      <InventoryItem
        handleUpdateItem={(category, item) => handleUpdateItem(category, item)}
        label={"Spirits (Whiskey)"}
        headerLabel={"Spirits (Whiskey)"}
        handleAddButton={(data) =>
          addToList("Spirits (Whiskey)", data.label, data.perBox)
        }
        inventoryList={inventoryList}
        handleDelete={handleDeleteItem}
      />
      <InventoryItem
        handleUpdateItem={(category, item) => handleUpdateItem(category, item)}
        label={"Spirits (Rum)"}
        headerLabel={"Spirits (Rum)"}
        handleAddButton={(data) =>
          addToList("Spirits (Rum)", data.label, data.perBox)
        }
        inventoryList={inventoryList}
        handleDelete={handleDeleteItem}
      />
      <InventoryItem
        handleUpdateItem={(category, item) => handleUpdateItem(category, item)}
        label={"Beer"}
        headerLabel={"Beers"}
        handleAddButton={(data) => addToList("Beers", data.label, data.perBox)}
        inventoryList={inventoryList}
        handleDelete={handleDeleteItem}
      />
      <InventoryItem
        handleUpdateItem={(category, item) => handleUpdateItem(category, item)}
        label={"Liqueur"}
        headerLabel={"Liqueur"}
        handleAddButton={(data) =>
          addToList("Liqueur", data.label, data.perBox)
        }
        inventoryList={inventoryList}
        handleDelete={handleDeleteItem}
      />
      <InventoryItem
        handleUpdateItem={(category, item) => handleUpdateItem(category, item)}
        label={"Miscellaneous"}
        headerLabel={"Miscellaneous"}
        handleAddButton={(data) =>
          addToList("Miscellaneous", data.label, data.perBox)
        }
        inventoryList={inventoryList}
        handleDelete={handleDeleteItem}
      />
    </div>
  );
}
