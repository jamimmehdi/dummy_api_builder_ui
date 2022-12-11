import React, { useState } from "react";

import {
	Button,
	InputAdornment,
	MenuItem,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import 'react-toastify/dist/ReactToastify.css';
import TaskAltIcon from "@mui/icons-material/TaskAlt";

import { colors } from "../../../constants/colors";
import { fontsize } from "../../../constants/fontsize";
import { requests } from "../../../constants/request_options";
import isValidJsonData from "../../../utils/validate_json";
import { toasts } from "../../../utils/toasts";
import api from "../../../api";
import CONFIG from "../../../config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HOME } from "../../../routes";

export default function NewProject() {
	const [project, setProject] = useState("");
	const [type, setType] = useState("GET");
	const [route, setRoute] = useState("");
	const [payload, setPayload] = useState("{}");
	const [response, setResponse] = useState("{}");

	const [isValidPayloadType, setIsValidPayloadType] = useState(false);
	const [isValidResponseType, setIsValidResponseType] = useState(false);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const { projects } = useSelector((state) => state.projects);
	const hasProjects = projects.length > 0;

	const handleNavigateToHome = () => navigate(HOME);

	const handleProjectChange = (event) => setProject(event.target.value);

	const handleTypeChange = (event) => setType(event.target.value);

	const handleRouteChange = (event) =>
		setRoute(event.target.value.replace(/[^a-zA-Z]/g, ""));

	const handlePayloadChange = (event) => {
		setPayload(event.target.value);
		setIsValidPayloadType(false);
	};

	const handleResponseChange = (event) => {
		setResponse(event.target.value);
		setIsValidResponseType(false);
	};

	const handleValidatePayloadJson = async () => {
		try {
			await isValidJsonData(payload);

			toasts.success("JSON validated successfully.")
			setIsValidPayloadType(true);
		} catch (error) {
			toasts.error(error.message + " Format JSON data correctly.");
		}
	}

	const handleValidateResponseJson = async () => {
		try {
			await isValidJsonData(response);

			toasts.success("JSON validated successfully.")
			setIsValidResponseType(true);
		} catch (error) {
			toasts.error(error.message + " Format JSON data correctly.");
		}
	}

	const handleCreateApi = async () => {
		try {
			setLoading(true);

			if (!isValidPayloadType) return toasts.warning("Please validate JSON payload.");

			if (!isValidResponseType) return toasts.warning("Please validate JSON response.");

			const variables = {
				projectId: project,
				requestType: type,
				route: "/" + route,
				payload: payload,
				requestResponse: response
			}

			await api.post({ route: CONFIG.CREATE_REQUEST, variables });

			navigate(HOME);
			toasts.success("API created successfully.");
		} catch (error) {
			toasts.error(error.message)
		} finally {
			setLoading(false);
		}
	}

	return (
		<Stack
			sx={{
				height: "calc(100vh - 4rem)",
				width: "100vw",
				p: 10,
				backgroundColor: colors.lightGrey,
			}}
			direction="column"
		>
			<Stack direction="row" sx={{ width: "100%" }}>
				<Button onClick={handleNavigateToHome}>GOTO HOME</Button>
			</Stack>
			<Stack
				direction="column"
				sx={{
					m: "4rem 0",
					width: "500px",
				}}
				spacing={4}
			>
				<TextField
					select
					label="Select Project"
					size="small"
					value={project}
					onChange={handleProjectChange}
					sx={{
						width: "100%",
						background: "white",
					}}
				>
					{hasProjects && projects.map((project, index) => (
						<MenuItem key={index} value={project._id}>
							{project.projectTitle}
						</MenuItem>
					))}
				</TextField>
				<Stack
					direction="row"
					spacing={4}
					sx={{
						width: "100%",
						justifyContent: "space-between",
					}}
				>
					<TextField
						select
						label="Request Type"
						size="small"
						value={type}
						onChange={handleTypeChange}
						sx={{
							width: "100%",
							background: "white",
						}}
					>
						{requests.map((request, index) => (
							<MenuItem key={index} value={request}>
								{request}
							</MenuItem>
						))}
					</TextField>

					<TextField
						label="Route"
						size="small"
						value={route}
						onChange={handleRouteChange}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">/</InputAdornment>
							),
						}}
						sx={{
							width: "100%",
							background: "white",
						}}
					/>
				</Stack>
				<Stack
					direction="column"
					spacing={4}
					sx={{
						width: "100%",
					}}
				>
					<Stack spacing={2}>
						<TextField
							label="Payload"
							multiline
							rows={4}
							value={payload}
							onChange={handlePayloadChange}
							sx={{
								width: "100%",
								backgroundColor: "white",
							}}
						/>
						<Stack direction="row" justifyContent="space-between">
							<Typography
								sx={{
									fontSize: fontsize.paragraph_xsmall,
									color: colors.grey,
									m: "0.5rem 0",
								}}
							>
								{`Example payload:  { "name" : "Jamim", "city" : "Bengaluru" }`}
							</Typography>
							{isValidPayloadType ? (
								<TaskAltIcon color="success" />
							) : (
								<Button size="small" onClick={handleValidatePayloadJson}>VALIDATE JSON</Button>
							)}
						</Stack>
					</Stack>

					<Stack spacing={2}>
						<TextField
							label="Response"
							multiline
							rows={4}
							value={response}
							onChange={handleResponseChange}
							sx={{
								width: "100%",
								backgroundColor: "white",
							}}
						/>
						<Stack direction="row" justifyContent="space-between">
							<Typography
								sx={{
									fontSize: fontsize.paragraph_xsmall,
									color: colors.grey,
									m: "0.5rem 0",
								}}
							>
								{`Example payload: { "name" : "Jamim", "city" : "Bengaluru" }`}
							</Typography>
							{isValidResponseType ? (
								<TaskAltIcon color="success" />
							) : (
								<Button size="small" onClick={handleValidateResponseJson}>VALIDATE JSON</Button>
							)}
						</Stack>
					</Stack>
				</Stack>
				<LoadingButton
					size="small"
					onClick={handleCreateApi}
					loading={loading}
					variant="contained"
					sx={{
						padding: "10px 30px",
						width: "fit-content",
						fontSize: fontsize.paragraph_xsmall
					}}
				>
					CREATE API
				</LoadingButton>
			</Stack>
		</Stack>
	);
}
