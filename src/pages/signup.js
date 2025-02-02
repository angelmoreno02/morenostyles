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

	const { register, userLoading } = useContext(UserContext);

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
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
			case "email":
				setEmail(value);
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
		else if (email.trim() === "")
			setErrors({ ...errors, email: "no puede estar vacio" });
		else if (password.trim() === "")
			setErrors({ ...errors, password: "no puede estar vacio" });
		else if (username.trim().length < 2 || username.trim().length > 15)
			setErrors({
				...errors,
				username: "username debe tener entre 2 y 15 caracteres",
			});
		else if (email.trim().length > 30)
			setErrors({ ...errors, email: "email demaciado largo" });
		else if (
			!email.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			)
		)
			setErrors({ ...errors, email: "email invalido" });
		else if (password.trim().length < 8 || password.trim().length > 20)
			setErrors({
				...errors,
				password: "la contraseña debe tener entre 8 y 20 caracteres",
			});
		else {
			const newUser = { username, email, password };
			register(newUser)
				.then(() => navigate("/"))
				.catch((err) => setErrors(err));
		}
	};

	return userLoading ? (
		<Loading />
	) : (
		<div style={{ ...sxStyles.container }}>
			<Typography variant="h4" gutterBottom color="secondary">
				SIGNUP
			</Typography>
			{errors.register && (
				<div style={{ ...sxStyles.errors }}>
					<p>{errors.register}</p>
				</div>
			)}
			<form noValidate autoComplete="off" onSubmit={handleSubmit}>
				<TextField
					label="Nombre de usuario"
					name="username"
					value={username}
					error={errors.username ? true : false}
					helperText={errors.username}
					fullWidth
					variant="standard"
					onChange={handleChange}
					sx={{ ...sxStyles.inputField }}
				/>
				<TextField
					label="Email"
					name="email"
					value={email}
					error={errors.email ? true : false}
					helperText={errors.email}
					fullWidth
					variant="standard"
					onChange={handleChange}
					sx={{ ...sxStyles.inputField }}
				/>
				<TextField
					label="Contraseña"
					name="password"
					type={showPassword ? "text" : "password"}
					value={password}
					error={errors.password ? true : false}
					helperText={errors.password}
					fullWidth
					variant="standard"
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
					ya tiene usuario ? <a href="/login">login</a>
				</span>
				<Button
					type="submit"
					variant="contained"
					color="secondary"
					sx={{ ...sxStyles.submitButton }}
				>
					signup
				</Button>
			</form>
		</div>
	);
}
