import { Flex, IconButton } from "@chakra-ui/core";
import React, { useState } from "react";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface VoteSectionProps {
  post: PostSnippetFragment;
}

export const VoteSection: React.FC<VoteSectionProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<
    "not-loading" | "upvote-loading" | "downvote-loading"
  >("not-loading");
  const [, vote] = useVoteMutation();
  return (
    <Flex direction="column" justifyContent="center" alignItems="center" mr={4}>
      <IconButton
        icon="chevron-up"
        aria-label="upvote"
        variantColor={post.voteStatus === 1 ? "green" : undefined}
        onClick={async () => {
          if (post.voteStatus === 1) return;

          setLoadingState("upvote-loading");
          await vote({
            value: 1,
            postId: post.id,
          });
          setLoadingState("not-loading");
        }}
        isLoading={loadingState === "upvote-loading"}
      />
      {post.points}
      <IconButton
        icon="chevron-down"
        aria-label="downvote"
        variantColor={post.voteStatus === -1 ? "red" : undefined}
        onClick={async () => {
          if (post.voteStatus === -1) return;

          setLoadingState("downvote-loading");
          await vote({
            value: -1,
            postId: post.id,
          });
          setLoadingState("not-loading");
        }}
        isLoading={loadingState === "downvote-loading"}
      />
    </Flex>
  );
};
