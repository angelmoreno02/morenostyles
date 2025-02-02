import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

//MUI
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";

export default function Login() {
	const navigate = useNavigate();
	const smallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

	const { login, userLoading } = useContext(UserContext);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [errors, setErrors] = useState({});

	const sxStyles = {
		container: {
			padding: 30,
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
		},
		inputField: {
			display: "block",
			marginBottom: 5,
			width: smallScreen ? 250 : 300,
		},
		submitButton: {
			display: "block",
			margin: "20px auto 0",
			width: 100,
		},
		errors: {
			backgroundColor: "#f4f4f4",
			padding: 10,
			lineHeight: "0",
			textAlign: "center",
		},
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		switch (name) {
			case "username":
				setUsername(value);
				break;
			case "password":
				setPassword(value);
				break;
			default:
				return null;
		}
	};

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (username.trim() === "")
			setErrors({ ...errors, username: "no puede estar vacio" });
		else if (password.trim() === "")
			setErrors({ ...errors, password: "no puede estar vacio" });
		else {
			const user = {
				username,
				password,
			};
			login(user)
				.then(() => navigate("/"))
				.catch((err) => setErrors(err));
		}
	};

	return userLoading ? (
		<Loading />
	) : (
		<div style={{ ...sxStyles.container }}>
			<Typography variant="h4" gutterBottom color="secondary">
				LOGIN
			</Typography>
			{errors.login && (
				<div style={{ ...sxStyles.errors }}>
					<p>{errors.login}</p>
				</div>
			)}
			<form noValidate autoComplete="off" onSubmit={handleSubmit}>
				<TextField
					label="Nombre de usuario"
					name="username"
					fullWidth
					variant="standard"
					error={errors.username ? true : false}
					helperText={errors.username}
					onChange={handleChange}
					sx={{ ...sxStyles.inputField }}
				/>
				<TextField
					label="Contraseña"
					name="password"
					type={showPassword ? "text" : "password"}
					fullWidth
					variant="standard"
					error={errors.password ? true : false}
					helperText={errors.password}
					onChange={handleChange}
					autoComplete="current-password"
					sx={{ ...sxStyles.inputField }}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
								>
									{showPassword ? <Visibility /> : <VisibilityOff />}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
				<span>
					no tiene usuario ? <a href="/signup">signup</a>
				</span>
				<Button
					type="submit"
					variant="contained"
					color="secondary"
					sx={{ ...sxStyles.submitButton }}
				>
					login
				</Button>
			</form>
		</div>
	);
}
