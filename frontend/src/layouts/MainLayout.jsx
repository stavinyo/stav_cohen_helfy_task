import React from "react";
import '../styles/MainLayout.css'

const Header = () => (
	<header>
		<h1 className="header-title">Helfy - Task List</h1>
	</header>
);

const MainLayout = ({ children }) => {

	return (
		<div className="main-layout">
			<Header/>
			<main className="main-context">{children}</main>
		</div>
	);
};

export default MainLayout;
