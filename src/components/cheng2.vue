<template>
	<div class="child-page-bg">
		<div class="prize-area">
			<div class="prize-con one-prize" id="prize-con-big">
				<img src="../assets/prizes/red-pocket.gif" class="prize-pic" id="prize-pic-big"/>
				<button v-if="red_pocket_flag == 0" @click="rollRedPocket()" v-text="str.roll" class="rolling-btn"></button>
				<button v-else-if="red_pocket_flag == 1" @click="stopRollRedPocket()" v-text="str.stop" class="rolling-btn"></button>
				<button v-else @click="reRollRedPocket()" v-text="str.restart" class="rolling-btn"></button>
			</div>
		</div>
		<div class="winner-area">
			<div class="winner-con" id="one-winner">
				<div v-for="person in red_pocket_list" class="avatar-con">
					<div class="avatar-bg">
						<transition name="flip-list" mode="out-in" tag="div">
							<img v-if="person && person.src" :key="person.id" :src="person.src" class="avatar-pic"/>
						</transition>
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
		name: 'cheng2',
		data() {
			return {
				str: str,
				left: [],
				red_pocket_list: [],
				red_pocket_flag: 2,
				red_pocket_timer: null
			}
		},
		beforeMount() {
			this.left = JSON.parse(window.sessionStorage.getItem('list'));
			this.red_pocket_list = JSON.parse(window.sessionStorage.getItem('red_pocket_list'));
			if (!this.red_pocket_list) {
				this.red_pocket_list = new Array(1);
				this.red_pocket_flag = 0;
			}
		},
		methods: {
			rollRedPocket() {
				this.red_pocket_flag = 1;
				this.left = api.shuffle(this.left);
				this.red_pocket_list = this.left.slice(0, 1);
				this.red_pocket_timer = setInterval(() => {
					this.left = api.shuffle(this.left);
					this.red_pocket_list = this.left.slice(0, 1);
				}, 150);
			},
			stopRollRedPocket() {
				clearInterval(this.red_pocket_timer);
				setTimeout(() => {
					this.red_pocket_list = api.pick(this.left, 1);
					console.info(JSON.stringify(this.red_pocket_list));
					window.sessionStorage.setItem('red_pocket_list', JSON.stringify(this.red_pocket_list));
					window.sessionStorage.setItem('list', JSON.stringify(this.left));
					this.red_pocket_flag = 2;
				}, 150);
			},
			reRollRedPocket() {
				this.red_pocket_flag = 0;
				this.left = [...this.left, ...this.red_pocket_list];
				window.sessionStorage.setItem('list', JSON.stringify(this.left));
				this.red_pocket_list = new Array(1);
				window.sessionStorage.removeItem('red_pocket_list');
			}
		}
	}
</script>

<style>
	@import '../common/common.css';
	#prize-pic-big {
		width: 280px;
		height: 340px;
		margin-top: -40px;
	}

 	#prize-con-big .rolling-btn {
		margin-left: 80px;
	}

	#one-winner {
		position: fixed;
		left: 50%;
		margin-top: -180px;
		margin-left: -180px;
	}

	#one-winner .avatar-con {
		width: 320px;
		height: 400px;
	}

	#one-winner .avatar-pic {
		width: 320px;
		height: auto;
	}
</style>