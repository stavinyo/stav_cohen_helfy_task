import React, { useState } from "react";
import "../styles/TaskList.css";
import TaskItem from "./TaskItem";

function TaskList(props) {
    const [isEdit, setIsEdit] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
	const {
		tasks,
		toggleTask = () => {},
		updateTask = () => {},
		deleteTask = () => {},
	} = props;

	const next = () =>
		setCurrentIndex((prev) => (prev === tasks.length - 1 ? 0 : prev + 1));

	const prev = () =>
		setCurrentIndex((prev) => (prev === 0 ? tasks.length - 1 : prev - 1));
    
    if(!tasks.length){
        return <p>no tasks</p>
    }

	return (
		<section className="task-list-wrapper">
		{!isEdit &&	<button
				className="btn prev"
				onClick={prev}>
				❮
			</button>}

			<div className="carousel">
				<div
					className="slider"
					style={{
						"--offset": currentIndex,
						transition:
							currentIndex === 0 || currentIndex === tasks.length - 1
								? "none"
								: "transform 0.4s ease",
					}}>
					{tasks.map((task) => (
						<TaskItem
							key={task.id}
							task={task}
							toggleTask={toggleTask}
							updateTask={updateTask}
							deleteTask={deleteTask}
							isEdit={isEdit}
							setIsEdit={setIsEdit}
						/>
					))}
				</div>
			</div>

			{!isEdit && <button
				className="btn next"
				onClick={next}>
				❯
			</button>}
		</section>
	);
}

export default TaskList;
