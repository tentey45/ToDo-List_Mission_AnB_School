import React, { useState } from 'react';
import { Search, Plus, CheckCircle2, Circle, Users, Calendar, ListTodo, Briefcase, X, ChevronRight, FolderOpen, Menu } from 'lucide-react';
import './Todo.css'
export default function BusinessPlanner() {
  const [activeCategory, setActiveCategory] = useState('to-do');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showGroupTaskModal, setShowGroupTaskModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('Not that important');
  const [newGroupName, setNewGroupName] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const [todos, setTodos] = useState([
    { id: 1, text: 'Complete project proposal', completed: false, category: 'to-do', priority: 'important' },
    { id: 2, text: 'Review team feedback', completed: false, category: 'to-do', priority: 'Not that important' },
    { id: 3, text: 'Update documentation', completed: true, category: 'completed', priority: 'low' },
    { id: 4, text: 'Plan Q1 strategy meeting', completed: false, category: 'upcoming-project', priority: 'important' },
  ]);

  const [groups, setGroups] = useState([
    { id: 1, name: 'Marketing Campaign', tasks: [
      { id: 101, text: 'Design social media posts', completed: false, priority: 'important' },
      { id: 102, text: 'Schedule email blast', completed: true, priority: 'Not that important' }
    ]},
    { id: 2, name: 'Website Redesign', tasks: [
      { id: 201, text: 'Create wireframes', completed: false, priority: 'important' }
    ]},
  ]);

  const categories = [
    { id: 'to-do', label: 'Action Items', icon: ListTodo },
    { id: 'completed', label: 'Completed', icon: CheckCircle2 },
    { id: 'group', label: 'Group Tasks', icon: Users },
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
      setNewTaskPriority('Not that important');
      setShowAddModal(false);
      setActiveCategory('to-do');
    }
  };

  const addNewGroup = () => {
    if (newGroupName.trim()) {
      const newGroup = {
        id: Date.now(),
        name: newGroupName,
        tasks: []
      };
      setGroups([...groups, newGroup]);
      setNewGroupName('');
      setShowGroupModal(false);
    }
  };

  const addTaskToGroup = () => {
    if (newTaskText.trim() && selectedGroup) {
      const newTask = {
        id: Date.now(),
        text: newTaskText,
        completed: false,
        priority: newTaskPriority
      };
      
      setGroups(groups.map(group => {
        if (group.id === selectedGroup.id) {
          return {
            ...group,
            tasks: [...group.tasks, newTask]
          };
        }
        return group;
      }));
      
      setNewTaskText('');
      setNewTaskPriority('Not that important');
      setShowGroupTaskModal(false);
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

  const toggleGroupTask = (groupId, taskId) => {
    setGroups(groups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          tasks: group.tasks.map(task => {
            if (task.id === taskId) {
              return { ...task, completed: !task.completed };
            }
            return task;
          })
        };
      }
      return group;
    }));
  };

  const openGroupTasks = (group) => {
    setSelectedGroup(group);
    setSidebarOpen(false);
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
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-lg shadow-lg"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-72 bg-slate-900 text-white p-4 sm:p-6 shadow-2xl
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center space-x-2 sm:space-x-3 mb-6 sm:mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-lg">
            <Briefcase size={24} className="sm:w-7 sm:h-7" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold">Planner</h1>
            <p className="text-xs text-slate-400">Professional Edition</p>
          </div>
        </div>
        
        <nav className="space-y-1">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  setSelectedGroup(null);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-3 sm:px-4 py-3 sm:py-3.5 rounded-lg transition-all font-medium text-sm sm:text-base ${
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

        <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-slate-800 rounded-lg border border-slate-700">
          <p className="text-xs text-slate-400 mb-2">PRODUCTIVITY</p>
          <div className="flex items-end space-x-2">
            <span className="text-2xl sm:text-3xl font-bold">87%</span>
            <span className="text-emerald-400 text-sm mb-1">+12%</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">vs last week</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header with Search */}
        <div className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 shadow-sm">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-3 sm:mb-4 ml-12 lg:ml-0">
              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 capitalize">
                  {selectedGroup ? selectedGroup.name : categories.find(c => c.id === activeCategory)?.label}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {selectedGroup ? 'Manage tasks within this group' : 'Manage your professional tasks efficiently'}
                </p>
              </div>
              <div className="hidden sm:block text-xs sm:text-sm text-slate-600 bg-slate-100 px-3 sm:px-4 py-2 rounded-lg">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
              </div>
            </div>
            
            {selectedGroup && (
              <button 
                onClick={() => setSelectedGroup(null)}
                className="mb-3 sm:mb-4 text-blue-600 hover:text-blue-700 flex items-center text-xs sm:text-sm font-medium"
              >
                ← Back to Groups
              </button>
            )}
            
            <div className="relative">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3.5 text-sm sm:text-base border border-slate-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50"
              />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-transparent to-slate-50">
          <div className="max-w-5xl mx-auto">
            {/* Add Button */}
            {selectedGroup ? (
              <button 
                onClick={() => setShowGroupTaskModal(true)}
                className="w-full mb-6 sm:mb-8 flex items-center justify-center space-x-2 sm:space-x-3 px-4 sm:px-6 py-4 sm:py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                <Plus size={20} strokeWidth={2.5} />
                <span className="font-semibold">Add Task to Group</span>
              </button>
            ) : activeCategory === 'group' ? (
              <button 
                onClick={() => setShowGroupModal(true)}
                className="w-full mb-6 sm:mb-8 flex items-center justify-center space-x-2 sm:space-x-3 px-4 sm:px-6 py-4 sm:py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                <Plus size={20} strokeWidth={2.5} />
                <span className="font-semibold">Create New Group</span>
              </button>
            ) : (
              <button 
                onClick={() => setShowAddModal(true)}
                className="w-full mb-6 sm:mb-8 flex items-center justify-center space-x-2 sm:space-x-3 px-4 sm:px-6 py-4 sm:py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                <Plus size={20} strokeWidth={2.5} />
                <span className="font-semibold">Create New Task</span>
              </button>
            )}

            {/* Content based on active view */}
            {selectedGroup ? (
              <div className="space-y-3 sm:space-y-4">
                {selectedGroup.tasks.length === 0 ? (
                  <div className="text-center py-12 sm:py-16 text-slate-400 bg-white rounded-lg sm:rounded-xl border border-slate-200">
                    <p className="text-base sm:text-lg">No tasks in this group yet</p>
                    <p className="text-xs sm:text-sm mt-2">Add a task to get started</p>
                  </div>
                ) : (
                  selectedGroup.tasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-white p-4 sm:p-5 rounded-lg sm:rounded-xl border border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all"
                    >
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <button
                          onClick={() => toggleGroupTask(selectedGroup.id, task.id)}
                          className="flex-shrink-0 text-slate-400 hover:text-blue-600 transition-colors"
                        >
                          {task.completed ? (
                            <CheckCircle2 size={24} className="text-emerald-500 sm:w-6 sm:h-6" strokeWidth={2} />
                          ) : (
                            <Circle size={24} className="sm:w-6 sm:h-6" strokeWidth={2} />
                          )}
                        </button>
                        <div className="flex-1 min-w-0">
                          <span
                            className={`text-slate-800 font-medium text-sm sm:text-lg break-words ${
                              task.completed ? 'line-through text-slate-400' : ''
                            }`}
                          >
                            {task.text}
                          </span>
                        </div>
                        <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold border whitespace-nowrap ${getPriorityColor(task.priority)}`}>
                          {task.priority?.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : activeCategory === 'group' ? (
              <div className="space-y-3 sm:space-y-4">
                {filteredGroups.length === 0 ? (
                  <div className="text-center py-12 sm:py-16 text-slate-400 bg-white rounded-lg sm:rounded-xl border border-slate-200">
                    <p className="text-base sm:text-lg">No groups found</p>
                    <p className="text-xs sm:text-sm mt-2">Create a new group to organize your tasks</p>
                  </div>
                ) : (
                  filteredGroups.map((group) => (
                    <div
                      key={group.id}
                      onClick={() => openGroupTasks(group)}
                      className="bg-white p-4 sm:p-5 rounded-lg sm:rounded-xl border border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all cursor-pointer"
                    >
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 sm:p-3 rounded-lg text-white">
                          <FolderOpen size={20} className="sm:w-6 sm:h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-slate-800 font-semibold text-base sm:text-lg truncate">{group.name}</h3>
                          <p className="text-slate-500 text-xs sm:text-sm">
                            {group.tasks.length} {group.tasks.length === 1 ? 'task' : 'tasks'}
                            {group.tasks.filter(t => t.completed).length > 0 && 
                              ` • ${group.tasks.filter(t => t.completed).length} completed`
                            }
                          </p>
                        </div>
                        <ChevronRight size={20} className="text-slate-400 flex-shrink-0 sm:w-6 sm:h-6" />
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {filteredTodos.length === 0 ? (
                  <div className="text-center py-12 sm:py-16 text-slate-400 bg-white rounded-lg sm:rounded-xl border border-slate-200">
                    <p className="text-base sm:text-lg">No tasks found</p>
                    <p className="text-xs sm:text-sm mt-2">Create a new task to get started</p>
                  </div>
                ) : (
                  filteredTodos.map((todo) => (
                    <div
                      key={todo.id}
                      className="bg-white p-4 sm:p-5 rounded-lg sm:rounded-xl border border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all"
                    >
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <button
                          onClick={() => toggleTodo(todo.id)}
                          className="flex-shrink-0 text-slate-400 hover:text-blue-600 transition-colors"
                        >
                          {todo.completed ? (
                            <CheckCircle2 size={24} className="text-emerald-500 sm:w-6 sm:h-6" strokeWidth={2} />
                          ) : (
                            <Circle size={24} className="sm:w-6 sm:h-6" strokeWidth={2} />
                          )}
                        </button>
                        <div className="flex-1 min-w-0">
                          <span
                            className={`text-slate-800 font-medium text-sm sm:text-lg break-words ${
                              todo.completed ? 'line-through text-slate-400' : ''
                            }`}
                          >
                            {todo.text}
                          </span>
                        </div>
                        <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold border whitespace-nowrap ${getPriorityColor(todo.priority)}`}>
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

      {/* Modals remain the same but with responsive adjustments */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800">Create New Task</h3>
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
                  className="w-full px-4 py-3 text-sm sm:text-base border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Priority</label>
                <select
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value)}
                  className="w-full px-4 py-3 text-sm sm:text-base border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="Not that important">Not that important</option>
                  <option value="important">Important</option>
                </select>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-3 text-sm sm:text-base border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={addNewTask}
                  className="flex-1 px-4 py-3 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-medium"
                >
                  Create Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showGroupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800">Create New Group</h3>
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
                  className="w-full px-4 py-3 text-sm sm:text-base border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowGroupModal(false)}
                  className="flex-1 px-4 py-3 text-sm sm:text-base border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={addNewGroup}
                  className="flex-1 px-4 py-3 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-medium"
                >
                  Create Group
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showGroupTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-2xl font-bold text-slate-800">Add Task to {selectedGroup?.name}</h3>
              <button onClick={() => setShowGroupTaskModal(false)} className="text-slate-400 hover:text-slate-600">
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
                  onKeyPress={(e) => e.key === 'Enter' && addTaskToGroup()}
                  placeholder="Enter task description..."
                  className="w-full px-4 py-3 text-sm sm:text-base border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Priority</label>
                <select
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value)}
                  className="w-full px-4 py-3 text-sm sm:text-base border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="Not that important">Not that important</option>
                  <option value="important">Important</option>
                </select>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowGroupTaskModal(false)}
                  className="flex-1 px-4 py-3 text-sm sm:text-base border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={addTaskToGroup}
                  className="flex-1 px-4 py-3 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-medium"
                >
                  Add Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}