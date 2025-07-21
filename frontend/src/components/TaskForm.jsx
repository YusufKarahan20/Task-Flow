import { useState } from "react";
import { useUsers } from "../hooks/useUsers";
import { useStatuses } from "../hooks/useStatuses";
import axios from "../lib/axiosInstance";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { memo } from "react";

export default function TaskForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    assigned_to: "",
    status_id: "",
  });

  const [todos, setTodos] = useState([
    { id: Date.now(), content: "", is_done: false },
  ]);

  const { data: users = [], isLoading: isUsersLoading } = useUsers();
  const { data: statuses = [], isLoading: isStatusesLoading } = useStatuses();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const addTodo = () => {
    setTodos([...todos, { id: Date.now(), content: "", is_done: false }]);
  };

  const removeTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleTodoChange = (id, newContent) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, content: newContent } : todo
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const filteredTodos = todos.filter(
      (todo) => todo.content.trim() !== ""
    );

    if (filteredTodos.length === 0) {
      alert("En az bir to-do maddesi eklemelisiniz.");
      return;
    }

    const payload = {
      ...formData,
      todos: filteredTodos,
    };

    console.log("📦 Gönderilen payload:", payload);

    try {
      const res = await axios.post("/tasks", payload);

      alert("Görev başarıyla oluşturuldu 🎉");
      console.log("✅ Görev oluşturuldu:", res.data);

      // Formu temizle
      setFormData({
        title: "",
        description: "",
        deadline: "",
        assigned_to: "",
        status_id: "",
      });
      setTodos([{ id: Date.now(), content: "", is_done: false }]);
    } catch (err) {
      console.error("❌ Hata:", err);
      alert("Görev oluşturulamadı.");
    }
  };

  const sensors = useSensors(useSensor(PointerSensor));

  if (isUsersLoading || isStatusesLoading) return <p>Yükleniyor...</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow w-full max-w-xl mt-10"
    >
      <h2 className="text-xl font-semibold mb-4">📝 Yeni Görev Oluştur</h2>

      <label className="block mb-2 font-medium">Başlık</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded mb-4"
      />

      <label className="block mb-2 font-medium">Açıklama</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        rows="3"
        className="w-full border p-2 rounded mb-4"
      />

      <label className="block mb-2 font-medium">Teslim Tarihi</label>
      <input
        type="date"
        name="deadline"
        value={formData.deadline}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-4"
      />

      <label className="block mb-2 font-medium">Atanacak Kişi</label>
      <select
        name="assigned_to"
        value={formData.assigned_to}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-4"
      >
        <option value="">Seçiniz</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.email}
          </option>
        ))}
      </select>

      <label className="block mb-2 font-medium">Durum</label>
      <select
        name="status_id"
        value={formData.status_id}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-4"
      >
        <option value="">Seçiniz</option>
        {statuses.map((status) => (
          <option key={status.id} value={status.id}>
            {status.name}
          </option>
        ))}
      </select>

      <label className="block mb-2 font-medium">To-Do List</label>
      <DndContext
        collisionDetection={closestCenter}
        sensors={sensors}
        onDragEnd={({ active, over }) => {
          if (active.id !== over.id) {
            const oldIndex = todos.findIndex((t) => t.id === active.id);
            const newIndex = todos.findIndex((t) => t.id === over.id);
            setTodos((items) => arrayMove(items, oldIndex, newIndex));
          }
        }}
      >
        <SortableContext items={todos} strategy={verticalListSortingStrategy}>
          {todos.map((todo) => (
            <SortableItem
              key={todo.id}
              todo={todo}
              onChange={handleTodoChange}
              onDelete={removeTodo}
            />
          ))}
        </SortableContext>
      </DndContext>

      <button
        type="button"
        onClick={addTodo}
        className="mb-4 mt-2 bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
      >
        ➕ Yeni Madde Ekle
      </button>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded ml-2"
      >
        Görevi Oluştur
      </button>
    </form>
  );
}

const SortableItem = memo(function SortableItem({ todo, onChange, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 mb-2"
    >
      <span {...attributes} {...listeners} className="cursor-grab text-gray-500">
        ⠿
      </span>
      <input
        type="text"
        value={todo.content}
        onChange={(e) => onChange(todo.id, e.target.value)}
        placeholder="To-do içeriği"
        className="flex-1 border px-3 py-2 rounded"
      />
      <button
        type="button"
        onClick={() => onDelete(todo.id)}
        className="bg-red-500 text-white px-3 py-2 rounded"
      >
        ❌
      </button>
    </div>
  );
});
