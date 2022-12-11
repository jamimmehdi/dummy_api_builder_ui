import { Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NEW_PROJECT } from "../../../routes";

export default function Navbar() {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const isNewProjectScreen = pathname === NEW_PROJECT;

	const handleNavigateToNewProject = () => navigate(NEW_PROJECT)
	return (
		<Stack
			direction="row"
			sx={{
				padding: "1rem 1rem",
				boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
				alignItems: "center",
			}}
		>
			<Stack
				direction="row"
				sx={{
					flex: 2,
				}}
			>
				<Typography>DUMMY API BUILDER</Typography>
			</Stack>
			<Stack
				direction="row"
				sx={{
					flex: 6,
					justifyContent: "flex-end",
				}}
			>
				{!isNewProjectScreen && <Button variant="contained" size="small" onClick={handleNavigateToNewProject}>
					NEW PROJECT
				</Button>}
			</Stack>
		</Stack>
	);
}
