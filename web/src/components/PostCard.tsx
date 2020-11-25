import { Flex, Box, Heading, Text, Link } from "@chakra-ui/core";
import React from "react";
import { Post } from "../generated/graphql";
import { VoteSection } from "./VoteSection";
import NextLink from "next/link";
import { EditDeletePostButtons } from "./EditDeletePostButtons";

interface PostCardProps {
  post?: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  if (!post) {
    return <div>...</div>;
  }

  return (
    <Flex p={5} shadow="md" borderWidth="1px">
      <VoteSection post={post} />
      <Box flex={1}>
        <NextLink href="/post/[id]" as={`/post/${post.id}`}>
          <Link>
            <Heading fontSize="xl">{post.title}</Heading>
          </Link>
        </NextLink>
        <Text>author: {post.creator.username}</Text>
        <Flex>
          <Text flex={1} mt={4}>{`${post.textSnippet}...`}</Text>
          <Box ml="auto">
            <EditDeletePostButtons id={post.id} creatorId={post.creator.id} />
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};
