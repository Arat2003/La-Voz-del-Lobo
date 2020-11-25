import { Box, Flex, Text } from "@chakra-ui/core";
import React from "react";
import { Comment } from "../generated/graphql";

interface CommentCardProps {
  comment?: Comment;
}

export const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  if (!comment) {
    return <div>...</div>;
  }

  return (
    <Flex p={5} shadow="md" borderWidth="1px" mb={3}>
      <Box flex={1}>
        <Text fontWeight="bold">{comment.author.username}</Text>
        <Flex>
          <Text flex={1} mt={4}>{`${comment.text}`}</Text>
          {/* <Box ml="auto">
            <EditDeletePostButtons id={post.id} creatorId={post.creator.id} />
          </Box> */}
        </Flex>
      </Box>
    </Flex>
  );
};
