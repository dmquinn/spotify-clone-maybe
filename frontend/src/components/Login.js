import React, { useEffect } from "react";

const AUTH_URL =
	"https://accounts.spotify.com/authorize?client_id=d9eef23f8ad74b80b1e7535609cfc4cf&response_type=code&redirect_uri=http://localhost:3000/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

export default function Login() {
	useEffect(() => {
		console.log(AUTH_URL);
	}, [AUTH_URL]);
	return (
		<div
			className="d-flex justify-content-center align-items-center"
			style={{ minHeight: "100vh" }}
		>
			<a className="" href={AUTH_URL} className="button">
				Let's Start!
			</a>
		</div>
	);
}
