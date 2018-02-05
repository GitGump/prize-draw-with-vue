<template>
	<div class="child-page-bg">
		<div class="prize-area">
			<div class="prize-con">
				<img src="../assets/prizes/e-toothbrush.gif" class="prize-pic"/>
				<button v-if="e_toothbrush_flag == 0" @click="rollEToothbrush()" class="rolling-btn" v-text="str.roll"></button>
				<button v-else-if="e_toothbrush_flag == 1" @click="stopRollEToothbrush()" v-text="str.stop" class="rolling-btn"></button>
				<button v-else @click="reRollEToothbrush()" v-text="str.restart" class="rolling-btn"></button>
			</div>
			<div class="prize-con">
				<img src="../assets/prizes/jd-300.gif" class="prize-pic"/>
				<button v-if="jd_300_flag == 0" @click="rollJD300()" class="rolling-btn" v-text="str.roll"></button>
				<button v-else-if="jd_300_flag == 1" @click="stopRollJD300()" v-text="str.stop" class="rolling-btn"></button>
				<button v-else @click="reRollJD300()" v-text="str.restart" class="rolling-btn"></button>
			</div>
		</div>
		<div class="winner-area">
			<div class="winner-con">
				<div v-for="person in e_toothbrush_list" class="avatar-con">
					<div class="avatar-bg">
						<transition-group name="flip-list" mode="out-in" tag="div">
							<img v-if="person && person.src" :key="person.id" :src="person.src" class="avatar-pic"/>
						</transition-group>
					</div>
					<span v-if="person && person.name" v-text="person.name" class="winner-info"></span>
				</div>
			</div>
			<div class="winner-con">
				<div v-for="person in jd_300_list" class="avatar-con">
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
		name: 'jin',
		data() {
			return {
				str: str,
				left: [],
				e_toothbrush_list: [],
				jd_300_list: [],
				e_toothbrush_flag: 2,
				jd_300_flag: 2,
				e_toothbrush_timer: null,
				jd_300_timer: null
			}
		},
		beforeMount() {
			this.left = JSON.parse(window.sessionStorage.getItem('list'));
			this.e_toothbrush_list = JSON.parse(window.sessionStorage.getItem('e_toothbrush_list'));
			if (!this.e_toothbrush_list) {
				this.e_toothbrush_list = new Array(3);
				this.e_toothbrush_flag = 0;
			}
			this.jd_300_list = JSON.parse(window.sessionStorage.getItem('jd_300_list'));
			if (!this.jd_300_list) {
				this.jd_300_list = new Array(3);
				this.jd_300_flag = 0;
			}
		},
		methods: {
			rollEToothbrush() {
				this.e_toothbrush_flag = 1;
				this.left = api.shuffle(this.left);
				this.e_toothbrush_list = this.left.slice(0, 3);
				this.e_toothbrush_timer = setInterval(() => {
					this.left = api.shuffle(this.left);
					this.e_toothbrush_list = this.left.slice(0, 3);
				}, 150);
			},
			stopRollEToothbrush() {
				clearInterval(this.e_toothbrush_timer);
				setTimeout(() => {
					this.e_toothbrush_list = api.pick(this.left, 3);
					console.info(JSON.stringify(this.e_toothbrush_list));
					window.sessionStorage.setItem('e_toothbrush_list', JSON.stringify(this.e_toothbrush_list));
					window.sessionStorage.setItem('list', JSON.stringify(this.left));
					this.e_toothbrush_flag = 2;
				}, 150);
			},
			reRollEToothbrush() {
				this.e_toothbrush_flag = 0;
				this.left = [...this.left, ...this.e_toothbrush_list];
				window.sessionStorage.setItem('list', JSON.stringify(this.left));
				this.e_toothbrush_list = new Array(3);
				window.sessionStorage.removeItem('e_toothbrush_list');
			},
			rollJD300() {
				this.jd_300_flag = 1;
				this.left = api.shuffle(this.left);
				this.jd_300_list = this.left.slice(0, 3);
				this.jd_300_timer = setInterval(() => {
					this.left = api.shuffle(this.left);
					this.jd_300_list = this.left.slice(0, 3);
				}, 150);
			},
			stopRollJD300() {
				clearInterval(this.jd_300_timer);
				setTimeout(() => {
					this.jd_300_list = api.pick(this.left, 3);
					console.info(JSON.stringify(this.jd_300_list));
					window.sessionStorage.setItem('jd_300_list', JSON.stringify(this.jd_300_list));
					window.sessionStorage.setItem('list', JSON.stringify(this.left));
					this.jd_300_flag = 2;
				}, 150)
			},
			reRollJD300() {
				this.jd_300_flag = 0;
				this.left = [...this.left, ...this.jd_300_list];
				window.sessionStorage.setItem('list', JSON.stringify(this.left));
				this.jd_300_list = new Array(3);
				window.sessionStorage.removeItem('jd_300_list');
			}
		}
	}
</script>

<style>
	@import '../common/common.css';
</style>