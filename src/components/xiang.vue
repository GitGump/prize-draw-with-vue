<template>
	<div class="child-page-bg">
		<div class="prize-area">
			<div class="prize-con">
				<img src="../assets/prizes/e-shaver.gif" class="prize-pic"/>
				<button v-if="e_shaver_flag == 0" @click="rollEShaver()" v-text="str.roll" class="rolling-btn"></button>
				<button v-else-if="e_shaver_flag == 1" @click="stopRollEShaver()" v-text="str.stop" class="rolling-btn"></button>
				<button v-else @click="reRollEShaver()" v-text="str.restart" class="rolling-btn"></button>
			</div>
			<div class="prize-con">
				<img src="../assets/prizes/jd-500.gif" class="prize-pic"/>
				<button v-if="jd_500_flag == 0" @click="rollJD500()" class="rolling-btn" v-text="str.roll"></button>
				<button v-else-if="jd_500_flag == 1" @click="stopRollJD500()" v-text="str.stop" class="rolling-btn"></button>
				<button v-else @click="reRollJD500()" v-text="str.restart" class="rolling-btn"></button>
			</div>
		</div>
		<div class="winner-area">
			<div class="winner-con">
				<div v-for="person in e_shaver_list" class="avatar-con">
					<div class="avatar-bg">
						<transition-group name="flip-list" mode="out-in" tag="div">
							<img v-if="person && person.src" :key="person.id" :src="person.src" class="avatar-pic"/>
						</transition-group>
					</div>
					<span v-if="person && person.name" v-text="person.name" class="winner-info"></span>
				</div>
			</div>
			<div class="winner-con">
				<div v-for="person in jd_500_list" class="avatar-con">
					<div class="avatar-bg">
						<transition-group name="flip-list" mode="out-in" tag="div">
							<img v-if="person && person.src" :key="person.id" :src="person.src" class="avatar-pic"/>
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
	import * as api from '../api/index.js';

	export default {
		name: 'xiang',
		data() {
			return {
				str: str,
				left: [],
				e_shaver_list: [],
				jd_500_list: [],
				e_shaver_flag: 2,
				jd_500_flag: 2,
				e_shaver_timer: null,
				jd_500_timer: null
			}
		},
		beforeMount() {
			this.left = JSON.parse(window.sessionStorage.getItem('list'));
			this.e_shaver_list = JSON.parse(window.sessionStorage.getItem('e_shaver_list'));
			if (!this.e_shaver_list) {
				this.e_shaver_list = new Array(2);
				this.e_shaver_flag = 0;
			}
			this.jd_500_list = JSON.parse(window.sessionStorage.getItem('jd_500_list'));
			if (!this.jd_500_list) {
				this.jd_500_list = new Array(3);
				this.jd_500_flag = 0;
			}
		},
		methods: {
			rollEShaver() {
				this.e_shaver_flag = 1;
				this.left = api.shuffle(this.left);
				this.e_shaver_list = this.left.slice(0, 2);
				this.e_shaver_timer = setInterval(() => {
					this.left = api.shuffle(this.left);
					this.e_shaver_list = this.left.slice(0, 2);
				}, 150)
			},
			stopRollEShaver() {
				clearInterval(this.e_shaver_timer);
				setTimeout(() => {
					this.e_shaver_list = api.pick(this.left, 2);
					console.info(JSON.stringify(this.e_shaver_list));
					window.sessionStorage.setItem('e_shaver_list', JSON.stringify(this.e_shaver_list));
					window.sessionStorage.setItem('list', JSON.stringify(this.left));
					this.e_shaver_flag = 2;
				}, 150)
			},
			reRollEShaver() {
				this.e_shaver_flag = 0;
				this.left = [...this.left, ...this.e_shaver_list];
				window.sessionStorage.setItem('list', JSON.stringify(this.left));
				this.e_shaver_list = new Array(2);
				window.sessionStorage.removeItem('e_shaver_list');
			},
			rollJD500() {
				this.jd_500_flag = 1;
				this.left = api.shuffle(this.left);
				this.jd_500_list = this.left.slice(0, 3);
				this.jd_500_timer = setInterval(() => {
					this.left = api.shuffle(this.left);
					this.jd_500_list = this.left.slice(0, 3);
				}, 150)
			},
			stopRollJD500() {
				clearInterval(this.jd_500_timer);
				setTimeout(() => {
					this.jd_500_list = api.pick(this.left, 3);
					console.info(JSON.stringify(this.jd_500_list));
					window.sessionStorage.setItem('jd_500_list', JSON.stringify(this.jd_500_list));
					window.sessionStorage.setItem('list', JSON.stringify(this.left));
					this.jd_500_flag = 2;
				}, 150);
			},
			reRollJD500() {
				this.jd_500_flag = 0;
				this.left = [...this.left, ...this.jd_500_list];
				window.sessionStorage.setItem('list', JSON.stringify(this.left));
				this.jd_500_list = new Array(3);
				window.sessionStorage.removeItem('jd_500_list');
			}
		}
	}
</script>

<style>
	@import '../common/common.css';
</style>