<template>
	<div class="child-page-bg">
		<div class="prize-area">
			<div class="prize-con">
				<img src="../assets/prizes/jd-200.gif" class="prize-pic"/>
				<button v-if="jd_200_flag == 0" @click="rollJD200()" v-text="str.roll" class="rolling-btn"></button>
				<button v-else-if="jd_200_flag == 1" @click="stopRollJD200()" v-text="str.stop" class="rolling-btn"></button>
				<button v-else @click="reRollJD200()" v-text="str.restart" class="rolling-btn"></button>
			</div>
			<div class="prize-con">
				<img src="../assets/prizes/mi-weigher.gif" class="prize-pic"/>
				<button v-if="mi_weigher_flag == 0" @click="rollMiWeigher()" v-text="str.roll" class="rolling-btn"></button>
				<button v-else-if="mi_weigher_flag == 1" @click="stopRollMiWeigher()" v-text="str.stop" class="rolling-btn"></button>
				<button v-else @click="reRollMiWeigher()" v-text="str.restart" class="rolling-btn"></button>
			</div>
		</div>
		<div class="winner-area">
			<div class="winner-con" id="winner-con-cheng-up">
				<div v-for="person in jd_200_list" class="avatar-con">
					<div class="avatar-bg">
						<transition-group name="flip-list" mode="out-in" tag="div">
							<img v-if="person && person.src" :key="person.id" :src="person.src" class="avatar-pic"/>
						</transition-group>
					</div>
					<span v-if="person && person.name" v-text="person.name" class="winner-info"></span>
				</div>
			</div>
			<div class="winner-con" id="winner-con-cheng-down">
				<div v-for="person in mi_weigher_list" class="avatar-con">
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
		name: 'cheng',
		data() {
			return {
				str: str,
				left: [],
				jd_200_list: [],
				mi_weigher_list: [],
				jd_200_flag: 2,
				mi_weigher_flag: 2,
				jd_200_timer: [],
				mi_weigher_timer: []
			}
		},
		beforeMount() {
			this.left = JSON.parse(window.sessionStorage.getItem('list'));
			this.jd_200_list = JSON.parse(window.sessionStorage.getItem('jd_200_list'));
			if (!this.jd_200_list) {
				this.jd_200_list = new Array(6);
				this.jd_200_flag = 0;
			}
			this.mi_weigher_list = JSON.parse(window.sessionStorage.getItem('mi_weigher_list'));
			if (!this.mi_weigher_list) {
				this.mi_weigher_list = new Array(5);
				this.mi_weigher_flag = 0;
			}
		},
		methods: {
			rollJD200() {
				this.jd_200_flag = 1;
				this.left = api.shuffle(this.left);
				this.jd_200_list = this.left.slice(0, 6);
				this.jd_200_timer = setInterval(() => {
					this.left = api.shuffle(this.left);
					this.jd_200_list = this.left.slice(0, 6);
				}, 150);
			},
			stopRollJD200() {
				clearInterval(this.jd_200_timer);
				setTimeout(() => {
					this.jd_200_list = api.pick(this.left, 6);
					console.info(JSON.stringify(this.jd_200_list));
					window.sessionStorage.setItem('jd_200_list', JSON.stringify(this.jd_200_list));
					window.sessionStorage.setItem('list', JSON.stringify(this.left));
					this.jd_200_flag = 2;
				}, 150);
			},
			reRollJD200() {
				this.jd_200_flag = 0;
				this.left = [...this.left, ...this.jd_200_list];
				window.sessionStorage.setItem('list', JSON.stringify(this.left));
				this.jd_200_list = new Array(6);
				window.sessionStorage.removeItem('jd_200_list');
			},
			rollMiWeigher() {
				this.mi_weigher_flag = 1;
				this.left = api.shuffle(this.left);
				this.mi_weigher_list = this.left.slice(0, 5);
				this.mi_weigher_timer = setInterval(() => {
					this.left = api.shuffle(this.left);
					this.mi_weigher_list = this.left.slice(0, 5);
				}, 150);
			},
			stopRollMiWeigher() {
				clearInterval(this.mi_weigher_timer);
				setTimeout(() => {
					this.mi_weigher_list = api.pick(this.left, 5);
					console.info(JSON.stringify(this.mi_weigher_list));
					window.sessionStorage.setItem('mi_weigher_list', JSON.stringify(this.mi_weigher_list));
					window.sessionStorage.setItem('list', JSON.stringify(this.left));
					this.mi_weigher_flag = 2;
				}, 150);
			},
			reRollMiWeigher() {
				this.mi_weigher_flag = 0;
				this.left = [...this.left, ...this.mi_weigher_list];
				window.sessionStorage.setItem('list', JSON.stringify(this.left));
				this.mi_weigher_list = new Array(5);
				window.sessionStorage.removeItem('mi_weigher_list');
			}
		}
	}
</script>

<style>
	@import '../common/common.css';
</style>