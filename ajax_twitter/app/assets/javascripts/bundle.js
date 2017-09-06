/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__(1);

$( () => {
  $(".follow-toggle").each((idx, el) => {
    const toggle = new FollowToggle(el);
  });
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(2);

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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map