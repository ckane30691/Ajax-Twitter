const APIUtil = require('./api_util');

class FollowToggle {
  constructor(el) {
    this.$el = $(el);
    this.userId = this.$el.attr('data-user-id');
    this.followState = this.$el.attr('data-initial-follow-state');
    this.render();
    this.handleClick();
  }

  render() {
    if (this.followState === "unfollowed") {
      this.$el.val("Follow!");
    } else if (this.followState === "followed") {
      this.$el.val("Unfollow!");
    } else {
      this.$el.prop("disabled");
    }
  }

  followSuccess() {
    this.followState = "followed";
    this.render();
  }

  unfollowSuccess() {
    this.followState = "unfollowed";
    this.render();
  }

  handleClick() {
    $(".follow-toggle").on("click", e => {
      e.preventDefault();
      if (this.followState === "unfollowed") {
        this.followState = "following";
        this.render();
        APIUtil.followUser(this.userId).then(this.followSuccess.bind(this));
      } else if (this.followState === "followed") {
        this.followState = "unfollowing";
        this.render();
        APIUtil.unfollowUser(this.userId).then(this.unfollowSuccess.bind(this));
      }
    });
  }
}

module.exports = FollowToggle;
