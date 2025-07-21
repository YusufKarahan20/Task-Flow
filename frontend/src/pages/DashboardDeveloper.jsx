// src/pages/DashboardDeveloper.jsx
import { Helmet } from "react-helmet-async";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useTasks } from "../hooks/useTasks";
import { useAuth } from "../contexts/AuthContexts";
import TaskForm from "../components/TaskForm";
import axiosInstance from "../lib/axiosInstance";

const STATUS_LABELS = {
  1: "To Do",
  2: "In Progress",
  3: "Done",
};

export default function DashboardDeveloper() {
  const { logout } = useAuth();
  const { data: user, isLoading, isError, error } = useCurrentUser();
  const {
    data: tasks,
    isLoading: isTasksLoading,
    isError: isTasksError,
    refetch,
  } = useTasks();

  const handleToggleTodo = async (todoId, newIsDone) => {
    try {
      await axiosInstance.patch(`/todos/${todoId}`, {
        is_done: newIsDone,
      });
      refetch();
    } catch (err) {
      console.error("❌ To-do güncellenemedi:", err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axiosInstance.delete(`/tasks/${taskId}`);
      refetch();
    } catch (err) {
      console.error("❌ Görev silinemedi:", err);
    }
  };

  if (isLoading || isTasksLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <p className="text-lg animate-pulse">Yükleniyor...</p>
      </div>
    );
  }

  if (isError || isTasksError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100">
        <p className="text-red-600 font-semibold">
          ❌ Hata: {error?.message || "Görevler alınırken hata oluştu"}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-slate-100 p-4">
      <Helmet>
        <title>Developer Dashboard</title>
      </Helmet>

      <h1 className="text-3xl font-bold mb-2">
        Hoş geldin, {user.displayName || user.email}! 👩‍💻
      </h1>

      <p className="mb-6 text-gray-600">Rolün: {user.role}</p>

      <button
        onClick={logout}
        className="mb-6 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
      >
        Çıkış Yap
      </button>

      {/* Görev Listesi */}
      <div className="w-full max-w-xl mb-12">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          📋 Görevler
        </h2>
        <ul className="space-y-4">
          {(tasks ?? []).map((task) => (
            <li
              key={task.id}
              className="bg-white p-4 shadow rounded border border-gray-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">{task.title}</h3>
                  <p className="text-gray-700 mb-1">{task.description}</p>

                  <p className="text-sm text-gray-500">
                    Durum: <span className="font-medium">{STATUS_LABELS[task.status_id] || "Bilinmiyor"}</span>
                  </p>

                  <p className="text-sm text-gray-500">
                    Atanan: {task.assigned_to_email || "Bilinmiyor"}
                  </p>

                  <p className="text-sm text-gray-500 mb-2">
                    Deadline:{" "}
                    {new Date(task.deadline).toLocaleDateString("tr-TR")}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  🗑 Sil
                </button>
              </div>

              {task.todos?.length > 0 && (
                <div className="mt-2">
                  <p className="font-semibold mb-1">📌 To-Do List:</p>
                  <ul className="list-inside text-sm text-gray-700 space-y-1">
                    {task.todos.map((todo) => (
                      <li key={todo.id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={todo.is_done}
                          onChange={() =>
                            handleToggleTodo(todo.id, !todo.is_done)
                          }
                        />
                        <span
                          className={
                            todo.is_done ? "line-through text-gray-400" : ""
                          }
                        >
                          {todo.content}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Yeni Görev Oluştur */}
      <TaskForm />
    </div>
  );
}
