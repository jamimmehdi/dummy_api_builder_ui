import {
	InputAdornment,
	TextField,
} from "@mui/material";
import { Stack } from "@mui/system";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";


import React, { useEffect, useState } from "react";

import { colors } from "../../../constants/colors";

import ProjectCard from "../../common/ProjectCard";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../api";
import CONFIG from "../../../config";
import { setProjects } from "../../../helper/Project/projectSlice";
import { toasts } from "../../../utils/toasts";

export default function Home() {
	const { projects } = useSelector((state) => state.projects);
	const dispatch = useDispatch();

	const hasProject = projects.length > 0;

	const getAllProjects = async () => {
		try {
			const response = await api.get({ route: CONFIG.GET_ALL_PROJECT });

			dispatch(setProjects(response.projects));
		} catch (error) {
			toasts.error(error.message || error);
		} finally {

		}
	}



	useEffect(() => {
		getAllProjects()
	}, [])
	return (
		<Stack
			sx={{
				height: "calc(100vh - 4rem)",
				width: "100vw",
				p: 10,
				backgroundColor: colors.lightGrey,
				// justifyContent: "space-around"
			}}
			direction="column"
		>
			<Stack
				direction="row"
				sx={{
					justifyContent: "center",
					alignItems: "center",
					height: "200px"
				}}
			>
				<TextField
					sx={{
						minWidth: "100px",
						width: "100%",
						maxWidth: "700px",
						backgroundColor: "white"
					}}
					placeholder="Search for projects"
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchOutlinedIcon />
							</InputAdornment>
						),
					}}
				/>
			</Stack>
			<Stack direction="row" sx={{
				display: "flex",
				flexWrap: "wrap",
				rowGap: "2rem",
				columnGap: "2rem",
				p: "2rem"

			}}>
				{hasProject && projects.map((project) => (
					<ProjectCard key={project._id} {...project} />
				))}
			</Stack>
		</Stack>
	);
}
