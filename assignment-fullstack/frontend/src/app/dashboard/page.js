"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { getTasks, createTask, updateTask, deleteTask } from "@/services/taskService";
import TaskCard from "@/components/TaskCard";
import TaskModal from "@/components/TaskModal";
import { LayoutDashboard, LogOut, Plus, ShieldCheck } from "lucide-react";

export default function Dashboard() {
  const { user, loading: authLoading, logout } = useAuth();
  const router = useRouter();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) fetchTasks();
  }, [user]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data.data || []);
    } catch (error) {
      console.error("Failed to load tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreateModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (taskData) => {
    try {
      if (editingTask) {
        await updateTask(editingTask._id, taskData);
      } else {
        await createTask(taskData);
      }
      await fetchTasks(); // Refresh list via network sync
    } catch (error) {
      console.error("Task action failed", error);
      alert("Failed to save task.");
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await deleteTask(taskId);
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
    } catch (error) {
      console.error("Delete failed", error);
      alert("Failed to delete task.");
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (authLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-zinc-500 font-medium tracking-wide">Loading workspace...</p>
        </div>
      </div>
    );
  }

  // Admin users can edit/delete ALL tasks. Regular users can only see their own tasks.
  const canEditTask = (task) => user.role === "admin" || task.userId === user._id || (task.userId?._id === user._id);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Navbar Section */}
      <nav className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg text-blue-600 dark:text-blue-400">
                <LayoutDashboard className="w-5 h-5" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent">
                Task Workspace
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col items-end pr-4 border-r border-zinc-200 dark:border-zinc-700">
                <span className="text-sm font-semibold text-zinc-900 dark:text-white capitalize">
                  {user.name}
                </span>
                <span className="text-xs text-zinc-500 flex items-center gap-1">
                  {user.role === 'admin' && <ShieldCheck className="w-3 h-3 text-emerald-500" />}
                  {user.role} role
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-zinc-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Banner for Admin */}
        {user.role === 'admin' && (
          <div className="mb-8 p-4 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 rounded-xl flex items-center gap-3 text-indigo-700 dark:text-indigo-300">
            <ShieldCheck className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm"><strong>Administrator Mode:</strong> You are currently viewing all tasks submitted across the platform. You have the authority to edit or remove any entry.</p>
          </div>
        )}

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-1">Your Tasks</h2>
            <p className="text-sm text-zinc-500">Manage and track your ongoing projects.</p>
          </div>
          <button
            onClick={handleOpenCreateModal}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm shadow-blue-500/20 transition-all hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" />
            New Task
          </button>
        </div>

        {/* Task Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-40 bg-zinc-200 dark:bg-zinc-800 rounded-xl animate-pulse"></div>
            ))}
          </div>
        ) : tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center bg-white dark:bg-zinc-900 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-2xl">
            <div className="w-16 h-16 bg-blue-50 dark:bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
              <Plus className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-medium text-zinc-900 dark:text-white mb-2">No tasks found</h3>
            <p className="text-zinc-500 max-w-sm">Get started by creating a new task to organize your workspace.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onUpdate={handleOpenEditModal}
                onDelete={handleDeleteTask}
                canEdit={canEditTask(task)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Global Modals */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        editingTask={editingTask}
      />
    </div>
  );
}
