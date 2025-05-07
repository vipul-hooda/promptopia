import PromptCard from "./PromptCard";

const PromptCardList = ({
	posts,
	handleTagClick,
	handleEdit,
	handleDelete,
}) => {
	return (
		<div className="mt-16 prompt_layout">
			{posts.map((post) => (
				<PromptCard
					key={post._id}
					post={post}
					handleTagClick={handleTagClick}
					handleEdit={() => {
						handleEdit && handleEdit(post);
					}}
					handleDelete={() => {
						handleDelete && handleDelete(post);
					}}
				/>
			))}
		</div>
	);
};

export default PromptCardList;
