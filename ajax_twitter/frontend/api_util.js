const APIUtil = {
  followUser: id => {
    return $.ajax({
      type: 'POST',
      dataType: 'JSON',
      url: `/users/${id}/follow`,
    });
  },

  unfollowUser: id => {
    return $.ajax({
      type: 'DELETE',
      dataType: 'JSON',
      url: `/users/${id}/follow`,
    });
  }
};



module.exports = APIUtil;
