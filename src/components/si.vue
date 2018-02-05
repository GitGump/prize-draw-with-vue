<template>
	<div class="child-page-bg">
		<div class="prize-area">
			<div class="prize-con">
				<img src="../assets/prizes/cook-cup.gif" class="prize-pic"/>
				<button v-if="cook_cup_flag == 0" @click="rollCookCup()" class="rolling-btn" v-text="str.roll"></button>
				<button v-else-if="cook_cup_flag == 1" @click="stopRollCookCup()" v-text="str.stop" class="rolling-btn"></button>
				<button v-else @click="reRollCookCup()" v-text="str.restart" class="rolling-btn"></button>
			</div>
			<div class="prize-con">
				<img src="../assets/prizes/latex-pillow.gif" class="prize-pic"/>
				<button v-if="latex_pillow_flag == 0" @click="rollLatexPillow()" class="rolling-btn" v-text="str.roll"></button>
				<button v-else-if="latex_pillow_flag == 1" @click="stopRollLatexPillow()" v-text="str.stop" class="rolling-btn"></button>
				<button v-else @click="reRollLatexPillow()" v-text="str.restart" class="rolling-btn"></button>
			</div>
		</div>
		<div class="winner-area">
			<div class="winner-con">
				<div v-for="person in cook_cup_list" class="avatar-con">
					<div class="avatar-bg">
						<transition-group name="flip-list" mode="out-in" tag="div">
							<img v-if="person && person.src" :key="person.id" :src="person.src" class="avatar-pic"/>
						</transition-group>
					</div>
					<span v-if="person && person.name" v-text="person.name" class="winner-info"></span>
				</div>
			</div>
			<div class="winner-con">
				<div v-for="person in latex_pillow_list" class="avatar-con">
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
		name: 'si',
		data() {
			return {
				str: str,
				left: [],
				cook_cup_list: [],
				latex_pillow_list: [],
				cook_cup_flag: 2,
				latex_pillow_flag: 2,
				cook_cup_timer: null,
				latex_pillow_timer: null
			}
		},
		beforeMount() {
			this.left = JSON.parse(window.sessionStorage.getItem('list'));
			this.cook_cup_list = JSON.parse(window.sessionStorage.getItem('cook_cup_list'));
			if (!this.cook_cup_list) {
				this.cook_cup_list = new Array(5);
				this.cook_cup_flag = 0;
			}
			this.latex_pillow_list = JSON.parse(window.sessionStorage.getItem('latex_pillow_list'));
			if (!this.latex_pillow_list) {
				this.latex_pillow_list = new Array(4);
				this.latex_pillow_flag = 0;
			}
		},
		methods: {
			rollCookCup() {
				this.cook_cup_flag = 1;
				this.left = api.shuffle(this.left);
				this.cook_cup_list = this.left.slice(0, 5);
				this.cook_cup_timer = setInterval(() => {
					this.left = api.shuffle(this.left);
					this.cook_cup_list = this.left.slice(0, 5);
				}, 150);
			},
			stopRollCookCup() {
				clearInterval(this.cook_cup_timer);
				setTimeout(() => {
					this.cook_cup_list = api.pick(this.left, 5);
					console.info(JSON.stringify(this.cook_cup_list));
					window.sessionStorage.setItem('cook_cup_list', JSON.stringify(this.cook_cup_list));
					window.sessionStorage.setItem('list', JSON.stringify(this.left));
					this.cook_cup_flag = 2;
				}, 150);
			},
			reRollCookCup() {
				this.cook_cup_flag = 0;
				this.left = [...this.left, ...this.cook_cup_list];
				window.sessionStorage.setItem('list', JSON.stringify(this.left));
				this.cook_cup_list = new Array(5);
				window.sessionStorage.removeItem('cook_cup_list');
			},
			rollLatexPillow() {
				this.latex_pillow_flag = 1;
				this.left = api.shuffle(this.left);
				this.latex_pillow_list = this.left.slice(0, 4);
				this.latex_pillow_timer = setInterval(() => {
					this.left = api.shuffle(this.left);
					this.latex_pillow_list = this.left.slice(0, 4);
				}, 150);
			},
			stopRollLatexPillow() {
				clearInterval(this.latex_pillow_timer);
				setTimeout(() => {
					this.latex_pillow_list = api.pick(this.left, 4);
					console.info(JSON.stringify(this.latex_pillow_list));
					window.sessionStorage.setItem('latex_pillow_list', JSON.stringify(this.latex_pillow_list));
					window.sessionStorage.setItem('list', JSON.stringify(this.left));
					this.latex_pillow_flag = 2;
				}, 150);
			},
			reRollLatexPillow() {
				this.latex_pillow_flag = 0;
				this.left = [...this.left, ...this.latex_pillow_list];
				window.sessionStorage.setItem('list', JSON.stringify(this.left));
				this.latex_pillow_list = new Array(4);
				window.sessionStorage.removeItem('latex_pillow_list');
			}
		}
	}
</script>

<style>
	@import '../common/common.css';
</style>