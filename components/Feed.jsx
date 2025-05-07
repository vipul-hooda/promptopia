"use client";

import { useState, useEffect } from "react";
import PromptCardList from "./PromptCardList";

const Feed = () => {
	const [posts, setPosts] = useState([]);

	// Search States
	const [searchText, setSearchText] = useState("");
	const [searchTimeout, setSearchTimeout] = useState(null);
	const [searchedResults, setSearchedResults] = useState([]);

	const fetchPosts = async () => {
		const response = await fetch("/api/prompt");
		const data = await response.json();
		setPosts(data);
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	const filterPrompts = (searchText) => {
		const regex = new RegExp(searchText, "i"); // 'i' flag for case-insensitive search
		return posts.filter(
			(post) =>
				regex.test(post.creator.username) ||
				regex.test(post.tag) ||
				regex.test(post.prompt)
		);
	};
	const handleSearchChange = (e) => {
		clearTimeout(searchTimeout);
		setSearchText(e.target.value);

		setSearchTimeout(
			setTimeout(() => {
				const searchResult = filterPrompts(e.target.value);
				setSearchedResults(searchResult);
			}, 500)
		);
	};
	const handleTagClick = (tag) => {
		setSearchText(tag);

		const searchResult = filterPrompts(tag);
		setSearchedResults(searchResult);
	};

	return (
		<section className="feed">
			<form className="relative w-full flex-center">
				<input
					type="text"
					placeholder="Search for a tag or a username"
					value={searchText}
					onChange={handleSearchChange}
					required
					className="search_input peer"
				/>
			</form>
			{searchText ? (
				<PromptCardList
					posts={searchedResults}
					handleTagClick={handleTagClick}
				/>
			) : (
				<PromptCardList posts={posts} handleTagClick={handleTagClick} />
			)}
		</section>
	);
};

export default Feed;
