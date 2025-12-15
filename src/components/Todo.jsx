import React, { useState } from 'react';
import './Todo.css'
import { Search, Plus, CheckCircle2, Circle, Users, Calendar, ListTodo, Briefcase, X } from 'lucide-react';

export default function BusinessPlanner() {
  const [activeCategory, setActiveCategory] = useState('to-do');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('medium');
  const [newGroupName, setNewGroupName] = useState('');
  
  const [todos, setTodos] = useState([
    { id: 1, text: 'Complete project proposal', completed: false, category: 'to-do', priority: 'important' },
    { id: 2, text: 'Review team feedback', completed: false, category: 'to-do', priority: 'Not that important' },
    { id: 3, text: 'Update documentation', completed: true, category: 'completed', priority: 'low' },
    { id: 4, text: 'Plan Q1 strategy meeting', completed: false, category: 'upcoming-project', priority: 'important' },
  ]);

  const [groups, setGroups] = useState([
    { id: 1, name: 'Marketing Team', members: 5 },
    { id: 2, name: 'Development Squad', members: 8 },
  ]);

  const categories = [
    { id: 'to-do', label: 'Action Items', icon: ListTodo },
    { id: 'completed', label: 'Completed', icon: CheckCircle2 },
    { id: 'group', label: 'Team Projects', icon: Users },
    { id: 'upcoming-project', label: 'Pipeline', icon: Calendar },
  ];

  const filteredTodos = todos.filter(todo => 
    todo.category === activeCategory && 
    todo.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addNewTask = () => {
    if (newTaskText.trim()) {
      const newTask = {
        id: Date.now(),
        text: newTaskText,
        completed: false,
        category: 'to-do',
        priority: newTaskPriority
      };
      setTodos([...todos, newTask]);
      setNewTaskText('');
      setNewTaskPriority('medium');
      setShowAddModal(false);
      setActiveCategory('to-do');
    }
  };

  const addNewGroup = () => {
    if (newGroupName.trim()) {
      const newGroup = {
        id: Date.now(),
        name: newGroupName,
        members: 0
      };
      setGroups([...groups, newGroup]);
      setNewGroupName('');
      setShowGroupModal(false);
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
          category: !todo.completed ? 'completed' : 'to-do'
        };
      }
      return todo;
    }));
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'important': return 'bg-red-100 text-red-700 border-red-200';
      case 'Not that important': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'low': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Sidebar */}
      <div className="w-72 bg-slate-900 text-white p-6 shadow-2xl">
        <div className="flex items-center space-x-3 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-lg">
            <Briefcase size={28} />
          </div>
          <div>
            <h1 className="text-xl font-bold">Business Planner</h1>
            <p className="text-xs text-slate-400">Professional Edition</p>
          </div>
        </div>
        
        <nav className="space-y-1">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-lg transition-all font-medium ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/50'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span>{category.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-8 p-4 bg-slate-800 rounded-lg border border-slate-700">
          <p className="text-xs text-slate-400 mb-2">PRODUCTIVITY</p>
          <div className="flex items-end space-x-2">
            <span className="text-3xl font-bold">87%</span>
            <span className="text-emerald-400 text-sm mb-1">+12%</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">vs last week</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header with Search */}
        <div className="bg-white border-b border-slate-200 px-8 py-6 shadow-sm">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-3xl font-bold text-slate-800 capitalize">
                  {categories.find(c => c.id === activeCategory)?.label}
                </h2>
                <p className="text-sm text-slate-500 mt-1">Manage your professional tasks efficiently</p>
              </div>
              <div className="text-sm text-slate-600 bg-slate-100 px-4 py-2 rounded-lg">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
              </div>
            </div>
            
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search tasks, projects, or action items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50"
              />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-8 bg-gradient-to-b from-transparent to-slate-50">
          <div className="max-w-5xl mx-auto">
            {/* Add New Task/Group Button */}
            {activeCategory === 'group' ? (
              <button 
                onClick={() => setShowGroupModal(true)}
                className="w-full mb-8 flex items-center justify-center space-x-3 px-6 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
              >
                <Plus size={22} strokeWidth={2.5} />
                <span className="font-semibold text-lg">Create New Group</span>
              </button>
            ) : (
              <button 
                onClick={() => setShowAddModal(true)}
                className="w-full mb-8 flex items-center justify-center space-x-3 px-6 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
              >
                <Plus size={22} strokeWidth={2.5} />
                <span className="font-semibold text-lg">Create New Task</span>
              </button>
            )}

            {/* Content based on active category */}
            {activeCategory === 'group' ? (
              <div className="space-y-4">
                {filteredGroups.length === 0 ? (
                  <div className="text-center py-16 text-slate-400 bg-white rounded-xl border border-slate-200">
                    <p className="text-lg">No groups found</p>
                    <p className="text-sm mt-2">Create a new group to get started</p>
                  </div>
                ) : (
                  filteredGroups.map((group) => (
                    <div
                      key={group.id}
                      className="bg-white p-5 rounded-xl border border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-lg text-white">
                          <Users size={24} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-slate-800 font-semibold text-lg">{group.name}</h3>
                          <p className="text-slate-500 text-sm">{group.members} members</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTodos.length === 0 ? (
                  <div className="text-center py-16 text-slate-400 bg-white rounded-xl border border-slate-200">
                    <p className="text-lg">No tasks found</p>
                    <p className="text-sm mt-2">Create a new task to get started</p>
                  </div>
                ) : (
                  filteredTodos.map((todo) => (
                    <div
                      key={todo.id}
                      className="bg-white p-5 rounded-xl border border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all"
                    >
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => toggleTodo(todo.id)}
                          className="flex-shrink-0 text-slate-400 hover:text-blue-600 transition-colors"
                        >
                          {todo.completed ? (
                            <CheckCircle2 size={26} className="text-emerald-500" strokeWidth={2} />
                          ) : (
                            <Circle size={26} strokeWidth={2} />
                          )}
                        </button>
                        <div className="flex-1">
                          <span
                            className={`text-slate-800 font-medium text-lg ${
                              todo.completed ? 'line-through text-slate-400' : ''
                            }`}
                          >
                            {todo.text}
                          </span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(todo.priority)}`}>
                          {todo.priority?.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-800">Create New Task</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Task Description</label>
                <input
                  type="text"
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addNewTask()}
                  placeholder="Enter task description..."
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Priority</label>
                <select
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="Not that important">Not that important/option</option>
                  <option value="important">Important</option>
                </select>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={addNewTask}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-medium"
                >
                  Create Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Group Modal */}
      {showGroupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-800">Create New Group</h3>
              <button onClick={() => setShowGroupModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Group Name</label>
                <input
                  type="text"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addNewGroup()}
                  placeholder="Enter group name..."
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowGroupModal(false)}
                  className="flex-1 px-4 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={addNewGroup}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-medium"
                >
                  Create Group
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}