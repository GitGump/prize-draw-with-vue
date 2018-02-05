<template>
	<div class="child-page-bg">
		<div class="prize-area">
			<div class="prize-con">
				<img src="../assets/prizes/masage-chair.gif" class="prize-pic"/>
				<button v-if="masage_chair_flag == 0" @click="rollMasageChair()" class="rolling-btn" v-text="str.roll"></button>
				<button v-else-if="masage_chair_flag == 1" @click="stopRollMasageChair()" v-text="str.stop" class="rolling-btn"></button>
				<button v-else @click="reRollMasageChair()" v-text="str.restart" class="rolling-btn"></button>
			</div>
			<div class="prize-con">
				<img src="../assets/prizes/dabaojian.gif" class="prize-pic"/>
				<button v-if="dabaojian_flag == 0" @click="rollDaBaoJian()" v-text="str.roll" class="rolling-btn"></button>
				<button v-else-if="dabaojian_flag == 1" @click="stopRollDaBaoJian()" v-text="str.stop" class="rolling-btn"></button>
				<button v-else @click="reRollDaBaoJian()" v-text="str.restart" class="rolling-btn"></button>
			</div>
		</div>
		<div class="winner-area">
			<div class="winner-con">
				<div v-for="person in masage_chair_list" class="avatar-con">
					<div class="avatar-bg">
						<transition-group name="flip-list" mode="out-in" tag="div">
							<img v-if="person && person.src" :key="person.id" :src="person.src" class="avatar-pic"/>
						</transition-group>
					</div>
					<span v-if="person && person.name" v-text="person.name" class="winner-info"></span>
				</div>
			</div>
			<div class="winner-con">
				<div v-for="person in dabaojian_list" class="avatar-con">
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
		name: 'meng',
		data() {
			return {
				str: str,
				left: [],
				masage_chair_list: [],
				dabaojian_list: [],
				masage_chair_flag: 2,
				dabaojian_flag: 2,
				masage_chair_timer: null,
				dabaojian_timer: null
			}
		},
		beforeMount() {
			this.left = JSON.parse(window.sessionStorage.getItem('list'));
			this.masage_chair_list = JSON.parse(window.sessionStorage.getItem('masage_chair_list'));
			if (!this.masage_chair_list) {
				this.masage_chair_list = new Array(4);
				this.masage_chair_flag = 0;
			}
			this.dabaojian_list = JSON.parse(window.sessionStorage.getItem('dabaojian_list'));
			if (!this.dabaojian_list) {
				this.dabaojian_list = new Array(3);
				this.dabaojian_flag = 0;
			}
		},
		methods: {
			rollMasageChair() {
				this.masage_chair_flag = 1;
				this.left = api.shuffle(this.left);
				this.masage_chair_list = this.left.slice(0, 4);
				this.masage_chair_timer = setInterval(() => {
					this.left = api.shuffle(this.left);
					this.masage_chair_list = this.left.slice(0, 4);
				}, 150)
			},
			stopRollMasageChair() {
				clearInterval(this.masage_chair_timer);
				setTimeout(() => {
					this.masage_chair_list = api.pick(this.left, 4);
					console.info(JSON.stringify(this.masage_chair_list));
					window.sessionStorage.setItem('masage_chair_list', JSON.stringify(this.masage_chair_list));
					window.sessionStorage.setItem('list', JSON.stringify(this.left));
					this.masage_chair_flag = 2;
				}, 150)
			},
			reRollMasageChair() {
				this.masage_chair_flag = 0;
				this.left = [...this.left, ...this.masage_chair_list];
				window.sessionStorage.setItem('list', JSON.stringify(this.left));
				this.masage_chair_list = new Array(4);
				window.sessionStorage.removeItem('masage_chair_list');
			},
			rollDaBaoJian() {
				this.dabaojian_flag = 1;
				this.left = api.shuffle(this.left);
				this.dabaojian_list = this.left.slice(0, 3);
				this.dabaojian_timer = setInterval(() => {
					this.left = api.shuffle(this.left);
					this.dabaojian_list = this.left.slice(0, 3);
				}, 150)
			},
			stopRollDaBaoJian() {
				clearInterval(this.dabaojian_timer);
				setTimeout(() => {
					this.dabaojian_list = api.pick(this.left, 3);
					console.info(JSON.stringify(this.dabaojian_list));
					window.sessionStorage.setItem('dabaojian_list', JSON.stringify(this.dabaojian_list));
					window.sessionStorage.setItem('list', JSON.stringify(this.left));
					this.dabaojian_flag = 2;
				}, 150);
			},
			reRollDaBaoJian() {
				this.dabaojian_flag = 0;
				this.left = [...this.left, ...this.dabaojian_list];
				window.sessionStorage.setItem('list', JSON.stringify(this.left));
				this.dabaojian_list = new Array(3);
				window.sessionStorage.removeItem('dabaojian_list');
			}
		}
	}
</script>

<style>
	@import '../common/common.css';
</style>