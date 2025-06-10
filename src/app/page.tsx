"use client";
import { useEffect, useState } from "react";
import InventoryItem from "./components/InventoryItem";

export interface InventoryListProps {
  id: number;
  label: string;
  perBox: number;
}

export default function Home() {
  const [inventoryList, setInventoryList] = useState<
    Array<{ id: number; category: string; list: Array<InventoryListProps> }>
  >([]);

  useEffect(() => {
    getInventoryList();
  }, []);

  const getInventoryList = async () => {
    try {
      const response = await fetch("/api", {
        method: "GET",
      });
      const data = await response.json();
      console.log(data, "data -->");
      setInventoryList(data);
    } catch (error) {
      console.error("Error fetching list:", error);
    }
  };

  const addToList = async (
    inventoryCategoryLabel: string,
    inventoryItemLabel: string,
    perBox: number
  ) => {
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
    } catch (error) {
      console.error("Error adding to list:", error);
    }
  };

  const handleDeleteItem = async (id: number) => {
    console.log("numbe is ", id);
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
    } catch (error) {
      console.error("Error deleting an item:", error);
    }
  };

  const handleUpdateItem = async (
    inventoryCategoryLabel: string,
    { id, label, perBox }: InventoryListProps
  ) => {
    try {
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
    } catch (error) {
      console.error("Error updating an item:", error);
    }
  };

  return (
    <div>
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
