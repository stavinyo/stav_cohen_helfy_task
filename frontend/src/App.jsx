import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import TaskManagerPage from "./pages/TaskManagerPage";

const App = () => {
	return (
			<Router>
				<MainLayout>
					<Routes>
						<Route
							path="/"
							element={<TaskManagerPage />}
						/>
					</Routes>
				</MainLayout>
			</Router>
	);
};

export default App;
