<template>
  <div class="home-article" v-if="article" @scroll="scrollHieght">
    <div class="header">
      <ArticleHeader @article-clear="articleClear" :scroll="scroll"/>
    </div>

    <div>
      <ArticleContent
        :article="article"
        :recommed="recommed"
      ></ArticleContent>
    </div>

    <div class="article" v-if="article.probation && article.article_type == 'subject'">
      <ArticleFooter />
    </div>
    <div class="magazine" v-if="!article.probation && article.article_type == 'subject'">
      <span>{{'¥' + article.subject.price + '订阅单行本' + '《' + article.subject.name + '》'}}</span>
    </div>
  </div>
</template>
<script>
import { debounce } from "lodash-es";
import ArticleContent from "../../views/HomeChildren/ArticleContent.vue";
import ArticleHeader from "../../components/ArticleHeader.vue";
import ArticleFooter from "../../components/ArticleFooter.vue";
export default {
  data() {
    return {
      articleId: this.$route.query.subject_article_id,
      scroll:0,
      article: {},
      recommed:[]
    };
  },
  watch: {
    "$route.query.subject_article_id"(val) {
      this.articleId = val;
    },

    articleId(a, b) {
      if (a != undefined && a != b) {
        this.getArticleData();
        this.getArticleRecommend()
      }
    },
  },
  created() {
    this.getArticleData = debounce(this.getArticleData);
    this.getArticleRecommend = debounce(this.getArticleRecommend);
    this.getArticleData();
    this.getArticleRecommend()
  },
  methods: {
    getArticleData() {
      this.$axios
        .get(`http://api2021.cbnweek.com/v4/articles/${this.articleId}`)
        .then(({ data }) => {
          this.article = data;
        });
    },
    getArticleRecommend(){
      this.$axios
        .get(`http://api2021.cbnweek.com:80/v4/articles/${this.articleId}/recommendations`)
        .then(({ data }) => {
          this.recommed = data;
        });
    },
    articleClear(){
      this.article=''
    },
     scrollHieght(event){
      this.scroll=parseInt(event.target.scrollTop)
    }
  },
  components: { ArticleContent, ArticleHeader, ArticleFooter },
};
</script>
<style lang="scss" scoped>
.home-article {
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  overflow: auto;

  .magazine {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 10px 3vw;
    border-top: 1px solid #eee;
    width: 100%;
    height: 45px;
    color: #fff;
    font-size: 16px;
    background-color: #0090f0;
    z-index: 999;
  }
}
</style>