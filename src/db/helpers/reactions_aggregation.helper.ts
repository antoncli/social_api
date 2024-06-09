import { PipelineStage } from 'mongoose';

export const reactionsAggregation = (
  user: string,
  localField: string,
  foreignField: string,
): PipelineStage[] => [
  {
    $lookup: {
      from: 'reactions',
      localField,
      foreignField,
      as: 'likeCount',
    },
  },
  {
    $set: {
      likeCount: { $arrayElemAt: ['$likeCount.likes.count', 0] },
      users: { $arrayElemAt: ['$likeCount.likes.users', 0] },
    },
  },
  {
    $fill: {
      output: {
        users: { value: [] },
      },
    },
  },
  {
    $addFields: {
      liked: {
        $setIsSubset: [[user], '$users'],
      },
    },
  },
  {
    $fill: {
      output: {
        likeCount: { value: 0 },
      },
    },
  },
];
