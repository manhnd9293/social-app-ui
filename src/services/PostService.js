import {beClient} from "../config/BeClient";
import {Media} from "../utils/Constant";

class PostService {
  async mutateReaction({postId, reactionType, reaction}) {
    if (!reaction || reaction !== reactionType) {
      return beClient.patch(`/post/reaction`, {
        id: postId,
        media: Media.Post,
        react: reactionType
      }).then(res => res.data);
    } else {
      return beClient.patch(`/post/un-reaction`, {
        mediaType: Media.Post,
        mediaId: postId
      }).then(res => res.data)
    }
  }
}

const postService = new PostService();

export default postService;