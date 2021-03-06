export const fetchComments = (id) => (
  $.ajax({
    method: 'GET',
    url: `api/songs/${id}/comments`
  })
);

export const createComment = (comment) => (
  $.ajax({
    method: 'POST',
    url: `api/songs/${comment.song_id}/comments`,
    data: {comment}
  })
);

export const editComment = (comment) => (
  $.ajax({
    method: 'PATCH',
    url: `api/songs/${comment.song_id}/comments/${comment.id}`,
    data: {comment}
  })
)

export const deleteComment = (comment) => (
  $.ajax({
    method: 'DELETE',
    url: `api/songs/${comment.song_id}/comments/${comment.id}`
  })
);
