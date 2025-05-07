"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
	const searchParams = useSearchParams();
	const userName = searchParams.get("name");

	const [posts, setPosts] = useState([]);

	const fetchPosts = async () => {
		const response = await fetch(`/api/users/${params.id}/posts`);
		const data = await response.json();
		setPosts(data);
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	return (
		<Profile
			name={`${userName}'s`}
			desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
			posts={posts}
		/>
	);
};

export default UserProfile;
