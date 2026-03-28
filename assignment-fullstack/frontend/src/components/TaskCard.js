import { CheckCircle2, Circle, Clock, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

export default function TaskCard({ task, onUpdate, onDelete, canEdit }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getStatusStyle = (status) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300";
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300";
      default:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-300";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-4 h-4 mr-1.5" />;
      case "in-progress":
        return <Clock className="w-4 h-4 mr-1.5" />;
      default:
        return <Circle className="w-4 h-4 mr-1.5" />;
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative group">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-lg text-zinc-900 dark:text-white line-clamp-1 pr-8">
          {task.title}
        </h3>
        
        {/* Status Badge */}
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize flex-shrink-0 ${getStatusStyle(task.status)}`}>
          {getStatusIcon(task.status)}
          {task.status.replace("-", " ")}
        </span>
      </div>

      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4 line-clamp-2">
        {task.description}
      </p>

      {/* Footer Info */}
      <div className="flex justify-between items-center text-xs text-zinc-400">
        <span suppressHydrationWarning>
          {new Date(task.createdAt).toLocaleDateString()}
        </span>
        
        {/* If populated with user name (admin view) */}
        {task.userId?.name && (
          <span className="font-medium text-blue-500">
            {task.userId.name}
          </span>
        )}
      </div>

      {/* Edit / Delete Menu overlay */}
      {canEdit && (
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
          <button
            onClick={() => onUpdate(task)}
            className="p-1.5 bg-white dark:bg-zinc-800 shadow rounded-full text-zinc-600 dark:text-zinc-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors border border-zinc-200 dark:border-zinc-700"
            title="Edit Task"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="p-1.5 bg-white dark:bg-zinc-800 shadow rounded-full text-zinc-600 dark:text-zinc-300 hover:text-red-500 dark:hover:text-red-400 transition-colors border border-zinc-200 dark:border-zinc-700"
            title="Delete Task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
