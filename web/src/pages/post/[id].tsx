import { Box, Flex, Heading, IconButton, Stack } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import React from "react";
import { CommentCard } from "../../components/CommentCard";
import { EditDeletePostButtons } from "../../components/EditDeletePostButtons";
import { InputField } from "../../components/InputField";
import { Layout } from "../../components/Layout";
import { useCommentMutation } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";
import { Comment } from "../../generated/graphql";
import { useRouter } from "next/router";

const Post = ({}) => {
  const [{ data, error, fetching }] = useGetPostFromUrl();
  const router = useRouter();
  const [, comment] = useCommentMutation();

  if (error) {
    console.log(error);
  }

  if (fetching) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    );
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>Could not find post.</Box>
      </Layout>
    );
  }
  console.log(data.post.comments);

  return (
    <Layout>
      <Heading mb={4}>{data.post.title}</Heading>
      <Box mb={4}>{data.post.text}</Box>
      <EditDeletePostButtons
        id={data.post.id}
        creatorId={data.post.creator.id}
      />
      <Formik
        initialValues={{ comment: "" }}
        onSubmit={async (values, actions) => {
          await comment({
            postId: data.post!.id,
            text: values.comment,
          });
          actions.resetForm();
          router.reload();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Flex alignItems="center" flexDirection="row" mb={4}>
              <Box flex={1}>
                <InputField
                  name="comment"
                  placeholder="Añadir comentario"
                  label=""
                />
              </Box>
              <Box>
                <IconButton
                  icon="plus-square"
                  aria-label="Add Comment"
                  isLoading={isSubmitting}
                  type="submit"
                  mt={6}
                />
              </Box>
            </Flex>
          </Form>
        )}
      </Formik>
      {!data.post.comments ? null : (
        <Stack spacing={8}>
          {data.post.comments.map((c) =>
            !c ? null : <CommentCard key={c.id} comment={c as Comment} />
          )}
        </Stack>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
