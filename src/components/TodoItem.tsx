import { Check, Trash2 } from 'lucide-react';
import { Todo } from './TodoApp';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`group flex items-start p-4 rounded-lg border-2 transition-all duration-200 ${
      todo.completed 
        ? 'bg-green-50 border-green-200' 
        : 'bg-gray-50 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
    }`}>
      <button
        onClick={() => onToggle(todo.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 mt-1 ${
          todo.completed
            ? 'bg-green-500 border-green-500 text-white'
            : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
        }`}
        aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {todo.completed && <Check size={14} />}
      </button>

      <div className="flex-1 ml-4">
        <h3 className={`font-medium transition-all duration-200 ${
          todo.completed 
            ? 'text-gray-500 line-through' 
            : 'text-gray-800'
        }`}>
          {todo.title}
          {todo.priority && (
            <span
              className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold
                ${todo.priority === 'high' ? 'bg-red-100 text-red-600' : ''}
                ${todo.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : ''}
                ${todo.priority === 'low' ? 'bg-gray-200 text-gray-700' : ''}
              `}
            >
              {todo.priority === 'high' && 'Ưu tiên cao'}
              {todo.priority === 'medium' && 'Trung bình'}
              {todo.priority === 'low' && 'Thấp'}
            </span>
          )}
        </h3>
        
        {todo.description && (
          <p className={`text-sm mt-1 transition-all duration-200 ${
            todo.completed 
              ? 'text-gray-400 line-through' 
              : 'text-gray-600'
          }`}>
            {todo.description}
          </p>
        )}

        {/* Dates row: createdAt, deadlineAt, completedAt */}
        <div className="flex flex-row gap-4 mt-2 text-xs">
          <span className="font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">Tạo: {formatDate(todo.createdAt)}</span>
          <span className="font-semibold text-orange-600 bg-orange-100 px-2 py-1 rounded-full">Hạn: {formatDate(todo.deadlineAt)}</span>
          {todo.completed && todo.completedAt && (
            <span className="font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">Hoàn thành: {formatDate(todo.completedAt)}</span>
          )}
        </div>
      </div>

      <button
        onClick={() => onDelete(todo.id)}
        className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
        aria-label="Delete todo"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

export default TodoItem;
