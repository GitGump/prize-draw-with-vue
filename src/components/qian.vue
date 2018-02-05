<template>
	<div class="child-page-bg">
		<div class="prize-area">
			<div class="prize-con">
				<img src="../assets/prizes/mi-lamp.gif" class="prize-pic"/>
				<button v-if="mi_lamp_flag == 0" @click="rollMiLamp()" v-text="str.roll" class="rolling-btn"></button>
				<button v-else-if="mi_lamp_flag == 1" @click="stopRollMiLamp()" v-text="str.stop" class="rolling-btn"></button>
				<button v-else @click="reRollMiLamp()" v-text="str.restart" class="rolling-btn"></button>
			</div>
			<div class="prize-con">
				<img src="../assets/prizes/mobile-power-pack.gif" class="prize-pic"/>
				<button v-if="mobile_power_pack_flag == 0" @click="rollMobilePowerPack()" v-text="str.roll" class="rolling-btn"></button>
				<button v-else-if="mobile_power_pack_flag == 1" @click="stopRollMobilePowerPack()" v-text="str.stop" class="rolling-btn"></button>
				<button v-else @click="reRollMobilePowerPack()" v-text="str.restart" class="rolling-btn"></button>
			</div>
		</div>
		<div class="winner-area">
			<div class="winner-con" id="winner-con-qian-up">
				<div v-for="person in mi_lamp_list" class="avatar-con">
					<div class="avatar-bg">
						<transition-group name="flip-list" mode="out-in" tag="div">
							<img v-if="person && person.src" :key="person.id" :src="person.src" class="avatar-pic"/>
						</transition-group>
					</div>
					<span v-if="person && person.name" v-text="person.name" class="winner-info"></span>
				</div>
			</div>
			<div class="winner-con" id="winner-con-qian-down">
				<div v-for="person in mobile_power_pack_list" class="avatar-con">
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
		name: 'qian',
		data() {
			return {
				str: str,
				left: [],
				mi_lamp_list: [],
				mobile_power_pack_list: [],
				mi_lamp_flag: 2,
				mobile_power_pack_flag: 2,
				mi_lamp_timer: null,
				mobile_power_pack_timer: null
			}
		},
		beforeMount() {
			this.left = JSON.parse(window.sessionStorage.getItem('list'));
			this.mi_lamp_list = JSON.parse(window.sessionStorage.getItem('mi_lamp_list'));
			if (!this.mi_lamp_list) {
				this.mi_lamp_list = new Array(5);
				this.mi_lamp_flag = 0;
			}
			this.mobile_power_pack_list = JSON.parse(window.sessionStorage.getItem('mobile_power_pack_list'));
			if (!this.mobile_power_pack_list) {
				this.mobile_power_pack_list = new Array(7);
				this.mobile_power_pack_flag = 0;
			}
		},
		methods: {
			rollMiLamp() {
				this.mi_lamp_flag = 1;
				this.left = api.shuffle(this.left);
				this.mi_lamp_list = this.left.slice(0, 5);
				this.mi_lamp_timer = setInterval(() => {
					this.left = api.shuffle(this.left);
					this.mi_lamp_list = this.left.slice(0, 5);
				}, 150);
			},
			stopRollMiLamp() {
				clearInterval(this.mi_lamp_timer);
				setTimeout(() => {
					this.mi_lamp_list = api.pick(this.left, 5);
					console.info(JSON.stringify(this.mi_lamp_list));
					window.sessionStorage.setItem('mi_lamp_list', JSON.stringify(this.mi_lamp_list));
					window.sessionStorage.setItem('list', JSON.stringify(this.left));
					this.mi_lamp_flag = 2;
				}, 150);
			},
			reRollMiLamp() {
				this.mi_lamp_flag = 0;
				this.left = [...this.left, ...this.mi_lamp_list];
				window.sessionStorage.setItem('list', JSON.stringify(this.left));
				this.mi_lamp_list = new Array(5);
				window.sessionStorage.removeItem('mi_lamp_list');
			},
			rollMobilePowerPack() {
				this.mobile_power_pack_flag = 1;
				this.left = api.shuffle(this.left);
				this.mobile_power_pack_list = this.left.slice(0, 7);
				this.mobile_power_pack_timer = setInterval(() => {
					this.left = api.shuffle(this.left);
					this.mobile_power_pack_list = this.left.slice(0, 7);
				}, 150);
			},
			stopRollMobilePowerPack() {
				clearInterval(this.mobile_power_pack_timer);
				setTimeout(() => {
					this.mobile_power_pack_list = api.pick(this.left, 7);
					console.info(JSON.stringify(this.mobile_power_pack_list));
					window.sessionStorage.setItem('mobile_power_pack_list', JSON.stringify(this.mobile_power_pack_list));
					window.sessionStorage.setItem('list', JSON.stringify(this.left));
					this.mobile_power_pack_flag = 2;
				}, 150);
			},
			reRollMobilePowerPack() {
				this.mobile_power_pack_flag = 0;
				this.left = [...this.left, ...this.mobile_power_pack_list];
				window.sessionStorage.setItem('list', JSON.stringify(this.left));
				this.mobile_power_pack_list = new Array(7);
				window.sessionStorage.removeItem('mobile_power_pack_list');
			}
		}
	}
</script>

<style>
	@import '../common/common.css';
</style>