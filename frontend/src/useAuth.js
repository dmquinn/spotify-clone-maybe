import { useState, useEffect } from "react";
import axios from "axios";
const SpotifyWebApi = require("spotify-web-api-node");

export default function useAuth(code) {
	const [accessToken, setAccessToken] = useState();
	const [refreshToken, setRefreshToken] = useState();
	const [expiresIn, setExpiresIn] = useState();
	const spotifyApi = new SpotifyWebApi({
		redirectUri: process.env.REACT_APP_REDIRECT_URI,
		clientId: process.env.REACT_APP_CLIENT_ID,
		clientSecret: process.env.REACT_APP_CLIENT_SECRET,
		refreshToken,
	});
	useEffect(() => {
		axios
			.post("http://localhost:3001/login", {
				code,
			})
			.then((res) => {
				setAccessToken(res.data.accessToken);
				setRefreshToken(res.data.refreshToken);
				setExpiresIn(res.data.expiresIn);
				window.history.pushState({}, null, "/");
			})
			.catch(() => {
				window.location = "/";
			});
	}, [code]);

	useEffect(() => {
		if (!refreshToken || !expiresIn) return;
		const interval = setInterval(() => {
			axios
				.post("http://localhost:3001/refresh", {
					refreshToken,
				})
				.then((res) => {
					setAccessToken(res.data.accessToken);
					setExpiresIn(res.data.expiresIn);
				})
				.catch(() => {
					window.location = "/";
				});
		}, (expiresIn - 60) * 1000);

		return () => clearInterval(interval);
	}, [refreshToken, expiresIn]);

	useEffect(() => {
		spotifyApi.getMe().then(
			function (data) {
				const userName = data.body.display_name;
				return userName;
			},
			function (err) {
				console.log("Something went wrong!", err);
			}
		);
	});
	return accessToken;
}
