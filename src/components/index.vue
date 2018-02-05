<template>
  <div class="main-page-bg">
    <div class="child-page-entry">
      <button v-for="nav in navs" @click="goToPage(nav.path)" v-text="nav.name" class="entry-button"></button>
    </div>
  </div>
</template>

<script>
	export default {
		name: 'index',
		data() {
			return {
				navs: this.$router.options.routes.slice(1)
			}
		},
		methods: {
			goToPage: function(path) {
        console.dir(this.$router);
        this.$router.push(path);
      }
		}
	}
</script>

<style>
  .main-page-bg {
    position: relative;
  }

  .child-page-entry {
    position: absolute;
    width: 680px;
    margin-top: 40%;
    left: 50%;
    margin-left: -300px;
  }

  .entry-button {
  	width: 120px;
    padding: 4px 24px;
    margin-right: 40px;
    margin-bottom: 30px;
    color: #f71b1b;
    background-color: #fff202;
    font-size: 2.4em;
    border-radius: 4px;
  }

  .child-page-entry button:last-child {
    margin-right: 0;
  }
</style>