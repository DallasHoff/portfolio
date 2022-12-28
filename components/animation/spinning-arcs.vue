<script>
export default {
	data() {
		return {
			// Settings
			frameDuration: 1000 / 60, // 60 FPS
			paused: false,
			arcCount: 6,
			cropScale: 1.9,
			arcSliceSizeMin: 0.25,
			arcSliceSizeMax: 0.75,
			rotationSpeedNormal: 0.005,
			rotationSpeedFast: 0.015,
			rotationSpeedVariance: 0.5,
			lineWidthScale: 0.01,
			lineWidthVariance: 4,
			// State
			width: 0,
			height: 0,
			lastFrameTime: 0,
			rotationSpeed: 0,
			arcs: null,
			static: false,
		};
	},
	computed: {
		center() {
			// Center point
			let w = this.width;
			let h = this.height;
			let x = Math.floor(w * 0.5);
			let y = Math.floor(h * 0.7);
			return { x, y };
		},
		greaterDim() {
			// The greater of width and height
			return this.width > this.height ? this.width : this.height;
		},
	},
	methods: {
		randomInt(min, max) {
			// RNG: min and max inclusive
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min + 1) + min);
		},
		resize(width, height) {
			// Adjust canvas size and reset state
			this.width = width;
			this.height = height;
			this.lastFrameTime = 0;
			this.rotationSpeed = this.rotationSpeedNormal;
			this.arcs = null;
			this.updateArcs();
			// Redraw if static
			if (this.static === true) {
				this.drawStaticImage();
			}
		},
		drawFrame(timestamp) {
			// Draw new frame to canvas according to settings and state
			if (
				this.$refs.canvas &&
				this.arcs !== null &&
				(this.static === true ||
					(timestamp - this.lastFrameTime > this.frameDuration &&
						(this.lastFrameTime === 0 || !this.paused)))
			) {
				let canvas = this.$refs.canvas;
				let ctx = canvas.getContext('2d');
				let { x, y } = this.center;
				// Background
				ctx.fillStyle = this.bgColor;
				ctx.fillRect(0, 0, this.width, this.height);
				// Arcs
				this.arcs.forEach((arc) => {
					ctx.beginPath();
					ctx.lineWidth = arc.width;
					ctx.strokeStyle = arc.color;
					ctx.arc(
						x,
						y,
						arc.r,
						arc.angle * Math.PI,
						(arc.angle - arc.slice) * Math.PI
					);
					ctx.stroke();
				});
				// Prepare next frame
				this.updateArcs();
				this.lastFrameTime = timestamp;
			}
			if (!this.static) {
				window.requestAnimationFrame(this.drawFrame);
			}
		},
		updateArcs() {
			if (this.arcs === null) {
				// Generate a set of arcs
				let arcs = [];
				let gapSize = Math.floor(
					this.greaterDim / this.arcCount / this.cropScale
				);
				let ccw = false;
				for (let i = 0; i < this.arcCount; i++) {
					let widthVariation =
						1 + this.randomInt(0, this.lineWidthVariance * 100) / 100;
					let speedVariation =
						1 + this.randomInt(0, this.rotationSpeedVariance * 100) / 100;
					arcs.push({
						r: gapSize * (i + 1),
						angle: this.randomInt(0, 200) / 100,
						slice:
							this.randomInt(
								this.arcSliceSizeMin * 100,
								this.arcSliceSizeMax * 100
							) / 100,
						width: this.greaterDim * this.lineWidthScale * widthVariation,
						color: this.getColor(i),
						speedVariation: speedVariation,
						ccw: ccw,
					});
					ccw = !ccw;
				}
				this.arcs = arcs;
			} else {
				// Update arc angles to rotate them
				this.arcs = this.arcs.map((arc) => ({
					...arc,
					angle:
						(arc.angle +
							this.rotationSpeed * arc.speedVariation * (arc.ccw ? -1 : 1)) %
						2,
				}));
			}
		},
		getColor(index) {
			// Ordered arc colors
			return this.colors[index % this.colors.length];
		},
		fastSpeed() {
			this.rotationSpeed = this.rotationSpeedFast;
		},
		normalSpeed() {
			this.rotationSpeed = this.rotationSpeedNormal;
		},
		drawStaticImage() {
			// Render some frames without animation
			requestAnimationFrame(() => {
				for (let i = 0; i < 20; i++) {
					this.drawFrame();
				}
			});
		},
	},
	setup() {
		// Get colors from CSS variables
		return {
			colors: [
				useRootCssVar('--accent-color-a3'),
				useRootCssVar('--accent-color-b3'),
				useRootCssVar('--accent-color-c3'),
			],
			bgColor: useRootCssVar('--bg-color-3'),
		};
	},
	mounted() {
		// Set up state
		const resizeObserver = new ResizeObserver((entries) => {
			const { offsetWidth, offsetHeight } = entries[0].target;
			this.resize(offsetWidth, offsetHeight);
		});
		resizeObserver.observe(this.$refs.container);
		// Draw
		if (window.matchMedia('(prefers-reduced-motion)').matches) {
			// Render static image
			this.static = true;
			this.drawStaticImage();
		} else {
			// Start animation
			window.requestAnimationFrame(this.drawFrame);
		}
	},
};
</script>

<template>
	<div class="animation-spinning-arcs" ref="container">
		<canvas
			class="animation-spinning-arcs__canvas"
			ref="canvas"
			:width="width"
			:height="height"
			@mousedown="fastSpeed"
			@mouseup="normalSpeed"
			@mouseleave="normalSpeed"
			@touchstart="fastSpeed"
			@touchend="normalSpeed"
		></canvas>
	</div>
</template>

<style lang="scss">
.animation-spinning-arcs {
	width: 100%;
	height: 100%;

	&__canvas {
		display: block;
		width: 100%;
		height: 100%;
	}
}
</style>
