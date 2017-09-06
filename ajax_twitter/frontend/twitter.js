const FollowToggle = require("./follow_toggle");

$( () => {
  $(".follow-toggle").each((idx, el) => {
    const toggle = new FollowToggle(el);
  });
});
