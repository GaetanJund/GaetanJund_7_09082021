<template>
  <div class="post">
    <NewPost />
    <Post />
    <Comments />
  </div>
</template>

<script>
import NewPost from "../components/NewPost.vue";
import Post from "../components/Post.vue";
export default {
  name: "HomePage",
  components: {
    NewPost,
    Post
  },
};
</script>