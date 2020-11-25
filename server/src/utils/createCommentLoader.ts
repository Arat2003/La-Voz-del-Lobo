import DataLoader from "dataloader";
import { Comment } from "../entities/Comment";

// export const createCommentLoader = () =>
//   new DataLoader<number, Comment | null>(async (postIds) => {
//     const comments = await Comment.findByIds(postIds as number[]);
//     const postIdToComment: Record<number, Comment> = {};

//     comments.forEach((comment) => (postIdToComment[comment.postId] = comment));

//     console.log(comments);
//     return postIds.map((postId) => postIdToComment[postId]);
//   });

export const createCommentLoader = () =>
  new DataLoader<number, Comment | null>(async (postIds) => {
    let postIdToComment: Record<number, Comment> = {};
    postIds.map(async (postId) => {
      const comments = await Comment.find({
        where: { postId },
        relations: ["author"],
      });

      // comments.forEach(
      //   (comment) => (postIdToComment[comment.postId] = comment)
      // );

      postIdToComment[postId] = comments[0];

      // console.log(comments);
    });
    console.log(postIdToComment);
    return postIds.map((postId) => postIdToComment[postId]);
  });
