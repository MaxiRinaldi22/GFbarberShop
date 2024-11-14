import db from "@/util/firestore";
import { doc, deleteDoc } from "firebase/firestore";

export default function DeleteItem({ id }: { id: string }) {
  const handleDelete = async () => {
    const itemRef = doc(db, "clientes", id);
    try {
      await deleteDoc(itemRef);
      alert("Item deleted successfully");
    } catch (error) {
      console.error("Error deleting item", error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="mt-3 rounded-md bg-red-500 px-2 text-sm text-white"
    >
      Cancelar
    </button>
  );
}
