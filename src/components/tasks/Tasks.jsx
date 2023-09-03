import React, { useState, useEffect } from "react";
import "./tasks.css";
import { Collapsible } from "../index";
import { useSelector, useDispatch } from "react-redux";
import { toDisplayDateFormat } from "../../utils";
import { createTask, deleteTask, fetchTasks, cancelFetchTasks } from "../../redux/actions/tasks";

const Tasks = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDateTime, setTaskDateTime] = useState("");
  const [search, setSearch] = useState("");
  const { tasksList, isLoading, error } = useSelector(state => state.tasks);
  const dispatch = useDispatch();

  const tasksF = tasksList?.filter((task) =>
    task.taskTitle.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = () => {
    setIsOpen(!isOpen);
    dispatch(createTask({
        id: parseInt(Math.random() * 10000),
        taskTitle,
        taskDateTime,
      }));
    setTaskTitle("");
    setTaskDateTime("");
  };

  const handleCancel = () => {
    setIsOpen(!isOpen);
    setTaskTitle("");
    setTaskDateTime("");
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleCancelTasks = () => {
    dispatch(cancelFetchTasks());
  };

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  return (
    <div className="outer-container">
      <div className="container">
        <div className="app-title-container">
          <div className="app-title">
            <h1>
              Tasks{" "}
              {isLoading && (
                <span>
                  <i className="fa fa-spinner fa-spin"></i>
                  <button
                    className="btn btn-red"
                    onClick={() => handleCancelTasks()}
                  >
                    Cancel
                  </button>
                </span>
              )}
            </h1>
            {error?.message ?? <h2>{error?.message}</h2>}
          </div>

          <div className="create-button-container">
            {!isOpen && (
              <button
                className="button create-button"
                onClick={() => setIsOpen(!isOpen)}
              >
                <i className="fa fa-calendar-plus"></i>Create
              </button>
            )}
          </div>
        </div>

        <Collapsible isOpen={isOpen}>
          <div className="new-task-container">
            <h4 className="new-task-title">New Task</h4>

            <div className="form-group">
              <label className="form-label" htmlFor="task-title">
                Task Title
                <div className="form-input">
                  <input
                    id="task-title"
                    type="text"
                    placeholder="Task Title"
                    className="text-box"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                  />
                </div>
              </label>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="task-date-time">
                Task Date and Time
                <div className="form-input">
                  <input
                    id="task-date-time"
                    type="datetime-local"
                    placeholder="Task Date and Time"
                    className="text-box"
                    value={taskDateTime}
                    onChange={(e) => setTaskDateTime(e.target.value)}
                  />
                </div>
              </label>
            </div>

            <div className="button-group">
              <button
                className="button save-button"
                onClick={() => handleSave()}
              >
                <i className="fa fa-save"></i> Save
              </button>
              <button
                className="button cancel-button"
                onClick={() => handleCancel()}
              >
                <i className="fa fa-window-close"></i> Cancel
              </button>
            </div>
          </div>
        </Collapsible>

        <div className="search-box">
          <input
            type="search"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <i className="fa fa-search"></i>
        </div>

        <div className="content-body">
          {tasksF?.map((task) => {
            return (
              <div className="task" key={task.id}>
                <div className="task-body">
                  <div className="task-title"></div>
                  <i className="fa fa-thumbtack"></i>
                  <span className="task-title-text">{task.taskTitle}</span>
                  <div className="task-subtitle">
                    <i className="fa fa-clock"></i>
                    <span className="task-subtitle">
                      {toDisplayDateFormat(task.taskDateTime)}
                    </span>
                  </div>
                </div>

                <div className="task-options">
                  <button
                    className="icon-button"
                    title="Delete"
                    onClick={() => handleDelete(task.id)}
                  >
                    &times;
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {tasksF?.length === 0 && <h3>No Tasks Loaded</h3>}
      </div>
    </div>
  );
};

// const mapStateToProps = (state) => ({ tasks: state.tasks });
// const mapDispatchToProps = (dispatch) => ({
//     dispatchFetchTasks: () => dispatch(actions.fetchTasks()),
//     dispatchCreateTask: (newTask) => dispatch(actions.createTask(newTask)),
//     dispatchDeleteTask: (taskId) => dispatch(actions.deleteTask(taskId)),
//     dispatch,
// })

// export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
export default Tasks;
