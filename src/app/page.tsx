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
    Array<{ category: string; list: Array<InventoryListProps> }>
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
      console.log(inventoryList, "inventoryList -->");
      const index = inventoryList.findIndex(
        (item) => item.category === inventoryCategoryLabel
      );
      console.log(index, "index -->");
      // setInventoryList([
      //   ...inventoryList,
      //   {
      //     category: inventoryCategoryLabel,
      //     list: [...inventoryList[index].list, data],
      //   },
      // ]);

      // Update the existing category
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
      await fetch("/api", {
        method: "DELETE",
        body: JSON.stringify({
          id,
        }),
      });
    } catch (error) {
      console.error("Error deleting an item:", error);
    }
  };

  return (
    <div>
      <InventoryItem
        label={"Wine"}
        headerLabel={"Sparkling Wine"}
        handleAddButton={(data) =>
          addToList("Sparkling Wine", data.label, data.perBox)
        }
        inventoryList={inventoryList}
        handleDelete={handleDeleteItem}
      />

      <InventoryItem
        label={"Wine"}
        headerLabel={"Rose"}
        handleAddButton={(data) => addToList("Rose", data.label, data.perBox)}
        inventoryList={inventoryList}
        handleDelete={handleDeleteItem}
      />
      <InventoryItem
        label={"Wine"}
        headerLabel={"Red Wine"}
        handleAddButton={(data) =>
          addToList("Red Wine", data.label, data.perBox)
        }
        inventoryList={inventoryList}
        handleDelete={handleDeleteItem}
      />
      <InventoryItem
        label={"Wine"}
        headerLabel={"White Wine"}
        handleAddButton={(data) =>
          addToList("White Wine", data.label, data.perBox)
        }
        inventoryList={inventoryList}
        handleDelete={handleDeleteItem}
      />
      <InventoryItem
        label={"Tequila (Blanco)"}
        headerLabel={"Tequila (Blanco)"}
        handleAddButton={(data) =>
          addToList("Tequila (Blanco)", data.label, data.perBox)
        }
        inventoryList={inventoryList}
        handleDelete={handleDeleteItem}
      />
      <InventoryItem
        label={"Tequila (Reposado)"}
        headerLabel={"Tequila (Reposado)"}
        handleAddButton={(data) =>
          addToList("Tequila (Reposado)", data.label, data.perBox)
        }
        inventoryList={inventoryList}
        handleDelete={handleDeleteItem}
      />
      <InventoryItem
        label={"Tequila (Anejo)"}
        headerLabel={"Tequila (Anejo)"}
        handleAddButton={(data) =>
          addToList("Tequila (Anejo)", data.label, data.perBox)
        }
        inventoryList={inventoryList}
        handleDelete={handleDeleteItem}
      />
      <InventoryItem
        label={"Mezcal"}
        headerLabel={"Mezcal"}
        handleAddButton={(data) => addToList("Mezcal", data.label, data.perBox)}
        inventoryList={inventoryList}
        handleDelete={handleDeleteItem}
      />
      <InventoryItem
        label={"Spirits (Vodka)"}
        headerLabel={"Spirits (Vodka)"}
        handleAddButton={(data) =>
          addToList("Spirits (Vodka)", data.label, data.perBox)
        }
        inventoryList={inventoryList}
        handleDelete={handleDeleteItem}
      />
      <InventoryItem
        label={"Spirits (Gin)"}
        headerLabel={"Spirits (Gin)"}
        handleAddButton={(data) =>
          addToList("Spirits (Gin)", data.label, data.perBox)
        }
        inventoryList={inventoryList}
        handleDelete={handleDeleteItem}
      />
      <InventoryItem
        label={"Spirits (Scotch)"}
        headerLabel={"Spirits (Scotch)"}
        handleAddButton={(data) =>
          addToList("Spirits (Scotch)", data.label, data.perBox)
        }
        inventoryList={inventoryList}
        handleDelete={handleDeleteItem}
      />
      <InventoryItem
        label={"Spirits (Whiskey)"}
        headerLabel={"Spirits (Whiskey)"}
        handleAddButton={(data) =>
          addToList("Spirits (Whiskey)", data.label, data.perBox)
        }
        inventoryList={inventoryList}
        handleDelete={handleDeleteItem}
      />
      <InventoryItem
        label={"Spirits (Rum)"}
        headerLabel={"Spirits (Rum)"}
        handleAddButton={(data) =>
          addToList("Spirits (Rum)", data.label, data.perBox)
        }
        inventoryList={inventoryList}
        handleDelete={handleDeleteItem}
      />
      <InventoryItem
        label={"Beer"}
        headerLabel={"Beers"}
        handleAddButton={(data) => addToList("Beers", data.label, data.perBox)}
        inventoryList={inventoryList}
        handleDelete={handleDeleteItem}
      />
      <InventoryItem
        label={"Liqueur"}
        headerLabel={"Liqueur"}
        handleAddButton={(data) =>
          addToList("Liqueur", data.label, data.perBox)
        }
        inventoryList={inventoryList}
        handleDelete={handleDeleteItem}
      />
      <InventoryItem
        label={"Miscellaneous "}
        headerLabel={"Miscellaneous "}
        handleAddButton={(data) =>
          addToList("Miscellaneous ", data.label, data.perBox)
        }
        inventoryList={inventoryList}
        handleDelete={handleDeleteItem}
      />
    </div>
  );
}
