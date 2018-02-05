<template>
	<div class="child-page-bg">
		<div class="prize-area">
			<div class="prize-con one-prize">
				<img src="../assets/prizes/jd-100.gif" class="prize-pic"/>
			</div>
		</div>
		<div class="winner-area">
			<div class="winner-con one-prize" id="winner-con-zhen">
				<div v-for="person in sunshine_list" class="avatar-con">
					<div class="avatar-bg">
						<transition-group name="flip-list" mode="out-in" tag="div">
							<img v-if="person && person.src" :key="person.id" :src="person.src" class="avatar-pic" id="avatar-pic-zhen"/>
						</transition-group>
					</div>
					<span v-if="person && person.name" v-text="person.name" class="winner-info"></span>
				</div>
			</div>
		</div>
		<router-link to="/"><button class="backToHome" v-text="str.back"></button></router-link>
	</div>
</template>

<script>
	import str from '../common/str.js';

	export default {
		name: 'zhen',
		data() {
			return {
				str: str,
				left: [],
				sunshine_list: new Array(24)
			}
		},
		beforeMount() {
			this.left = JSON.parse(window.sessionStorage.getItem('list'));
		},
		mounted() {
			this.sunshine_list = this.left;
		}
	}
</script>

<style>
	@import '../common/common.css';
	#winner-con-zhen .avatar-con {
		width: 112px;
		height: 140px;
		margin-bottom: 2.2rem;
	}

	#winner-con-zhen .winner-info {
		font-size: 1.4rem;
		line-height: 2.2rem;
	}
</style>