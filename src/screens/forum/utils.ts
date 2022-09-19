export type PostVoteType = 1 | 0 | -1;

export const calculateVote = (
  oldVote: PostVoteType,
  isUp: boolean,
): { dif: { u: PostVoteType; d: PostVoteType }; newVote: PostVoteType } => {
  let newVote: PostVoteType;
  const dif: { u: PostVoteType; d: PostVoteType } = { u: 0, d: 0 };

  if (isUp) {
    newVote = oldVote === -1 ? 0 : 1;
    if (newVote === 0 && oldVote === -1) {
      dif.u = 0;
      dif.d = -1;
    }

    if (newVote === 1 && oldVote === 0) {
      dif.u = 1;
      dif.d = 0;
    }
  } else {
    newVote = oldVote === 1 ? 0 : -1;

    if (newVote === 0 && oldVote === 1) {
      dif.u = -1;
      dif.d = 0;
    }

    if (newVote === -1 && oldVote === 0) {
      dif.u = 0;
      dif.d = 1;
    }
  }

  return { dif, newVote };
};
