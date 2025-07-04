"use client";

import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
	const { data: session } = useSession();
	const router = useRouter();
	const pathname = usePathname();
	const [copied, setCopied] = useState("");

	const handleCopy = () => {
		setCopied(post.prompt);
		navigator.clipboard.writeText(post.prompt);
		setTimeout(() => setCopied(""), 3000);
	};

	const handleProfileClick = () => {
		if (post.creator._id === session?.user.id) return router.push("/profile");
		console.log(post);

		router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
	};

	return (
		<div className="prompt_card">
			<div className="flex justify-between items-start gapt-5">
				<div
					className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
					onClick={handleProfileClick}
				>
					<Image
						src={post?.creator?.image}
						alt="user_image"
						width={40}
						height={40}
						className="rounded-full object-contain"
					/>
					<div className="flex flex-col">
						<h3 className="font-satoshi font-semibold text-gray-900">
							{post?.creator?.username}
						</h3>
						<p className="font-inter text-sm text-gray-500">
							{post?.creator?.email}
						</p>
					</div>
				</div>

				<div className="copy_btn" onClick={handleCopy}>
					<Image
						alt="copy-button"
						src={
							copied === post.prompt
								? "/assets/icons/tick.svg"
								: "/assets/icons/copy.svg"
						}
						width={12}
						height={12}
					/>
				</div>
			</div>
			<p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
			<p
				className="font-inter text-sm blue_gradient cursor-pointer"
				onClick={() => handleTagClick && handleTagClick(post.tag)}
			>
				#{post.tag}
			</p>

			{session?.user.id === post?.creator?._id && pathname === "/profile" && (
				<div className="flex-end gap-3 mt-2 border-t border-gray-100 pt-3">
					<p
						className="font-inter text-sm green_gradient cursor-pointer"
						onClick={handleEdit}
					>
						Edit
					</p>
					<p
						className="font-inter text-sm orange_gradient cursor-pointer"
						onClick={handleDelete}
					>
						Delete
					</p>
				</div>
			)}
		</div>
	);
};

export default PromptCard;
