<script>
export default {
	data() {
		return {
			resizeObserver: null,
			// Settings
			frameDuration: 100,
			paused: false,
			tailLength: 12,
			numberOfColsFactor: 40,
			numberOfHeadsFactor: 50,
			// State
			width: 0,
			height: 0,
			lastFrameTime: 0,
			explodedHeadsCountdown: 0,
			prevGrid: [],
			grid: [],
			static: false,
		};
	},
	computed: {
		trianglesPerRow() {
			let num = Math.ceil(this.width / this.numberOfColsFactor);
			if (num % 2 === 0) {
				// Number must be odd
				num += 1;
			}
			return num;
		},
		triangleSize() {
			return this.width / ((this.trianglesPerRow - 1) * 0.75);
		},
		triangleHeight() {
			return Math.floor((this.triangleSize * Math.sqrt(3)) / 2);
		},
		gapSize() {
			return this.triangleSize / 4;
		},
		rows() {
			return Math.ceil(this.height / (this.triangleHeight + this.gapSize));
		},
		numberOfTriangles() {
			return this.rows * this.trianglesPerRow;
		},
		numberOfHeads() {
			return Math.ceil(this.numberOfTriangles / this.numberOfHeadsFactor);
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
			this.explodedHeadsCountdown = 0;
			this.prevGrid = [];
			this.grid = [];
			for (let y = 0; y < this.rows; y++) {
				let row = [];
				for (let x = 0; x < this.trianglesPerRow; x++) {
					row.push(0);
				}
				this.prevGrid.push(row);
				this.grid.push(row);
			}
			this.spawn();
			// Redraw if static
			if (this.static === true) {
				this.drawStaticImage();
			}
		},
		drawFrame(timestamp) {
			// Draw new frame to canvas according to settings and state
			if (
				this.$refs.canvas &&
				(this.static === true ||
					(timestamp - this.lastFrameTime > this.frameDuration &&
						(this.lastFrameTime === 0 || !this.paused)))
			) {
				let canvas = this.$refs.canvas;
				let ctx = canvas.getContext('2d');
				// Background
				ctx.fillStyle = this.bgColor;
				ctx.fillRect(0, 0, this.width, this.height);
				// Triangles
				let rows = this.rows;
				let cols = this.trianglesPerRow;
				let gap = this.gapSize;
				let side = this.triangleSize;
				let height = this.triangleHeight;
				for (let y = 0; y < rows; y++) {
					let down = true; // Direction triange points; alternating
					let rowOffset = y * (gap + height); // Length between top of each row
					let colOffset = (side * 0.5 + gap) * -1; // Push alternate rows over to line them up
					let colorOffset = 2; // Start color order differently on alternate rows
					let xGap = gap;
					let xSideDn1 = 0;
					let xSideDn2 = side;
					let xSideDn3 = side * 0.5;
					let xSideUp1 = side * 0.5;
					let xSideUp2 = side;
					let xSideUp3 = side * 1.5;
					if (y % 2 === 1) {
						// Odd rows start with triangle pointed up and offset
						down = false;
						colOffset = 0;
						colorOffset = 0;
						xSideDn1 -= gap;
						xSideDn2 -= gap;
						xSideDn3 -= gap;
						xSideUp1 -= side + gap;
						xSideUp2 -= side + gap;
						xSideUp3 -= side + gap;
					}
					for (let x = 0; x < cols; x++) {
						let triangleVal = this.grid[y][x];
						ctx.fillStyle =
							triangleVal > 0 ? this.getColor(x + colorOffset) : this.deadColor; // Triangle color
						if (down === true) {
							ctx.beginPath();
							ctx.moveTo(xGap + xSideDn1 + colOffset, gap + rowOffset);
							ctx.lineTo(xGap + xSideDn2 + colOffset, gap + rowOffset);
							ctx.lineTo(xGap + xSideDn3 + colOffset, gap + height + rowOffset);
							ctx.fill();
							xSideDn1 += side;
							xSideDn2 += side;
							xSideDn3 += side;
						} else {
							ctx.beginPath();
							ctx.moveTo(xGap + xSideUp1 + colOffset, gap + height + rowOffset);
							ctx.lineTo(xGap + xSideUp2 + colOffset, gap + rowOffset);
							ctx.lineTo(xGap + xSideUp3 + colOffset, gap + height + rowOffset);
							ctx.fill();
							xSideUp1 += side;
							xSideUp2 += side;
							xSideUp3 += side;
						}
						down = !down;
						xGap += gap;
					}
				}
				// Prepare next frame
				this.updateGrid();
				this.lastFrameTime = timestamp;
			}
			if (!this.static) {
				window.requestAnimationFrame(this.drawFrame);
			}
		},
		updateGrid() {
			// Copy grid to previous grid
			this.prevGrid = this.grid.map((row) => row.slice(0));
			// Update countdown
			if (this.explodedHeadsCountdown > 0) {
				this.explodedHeadsCountdown -= 1;
			}
			// Update grid according to previous grid
			let gridWidth = this.trianglesPerRow;
			let gridHeight = this.rows;
			let headCount = 0;
			for (let y = 0; y < gridHeight; y++) {
				for (let x = 0; x < gridWidth; x++) {
					let triangleVal = this.prevGrid[y][x];
					let down = (x + y) % 2 === 0;
					if (triangleVal > 0) {
						// End of tail goes away
						this.grid[y][x] -= 1;
						// Head of the snake
						if (triangleVal === this.tailLength) {
							headCount += 1;
							// If heads exploded, remove the head
							if (this.explodedHeadsCountdown > 0) {
								this.grid[y][x] = 0;
								continue;
							}
							// Determine which triangles the snake can move to
							let topTarget, bottomTarget, leftTarget, rightTarget;
							if (down === true) {
								// A down triangle
								topTarget = this.prevGrid?.[y - 1]?.[x];
								bottomTarget = undefined;
								leftTarget = this.prevGrid?.[y]?.[x - 1];
								rightTarget = this.prevGrid?.[y]?.[x + 1];
							} else {
								// An up triangle
								topTarget = undefined;
								bottomTarget = this.prevGrid?.[y + 1]?.[x];
								leftTarget = this.prevGrid?.[y]?.[x - 1];
								rightTarget = this.prevGrid?.[y]?.[x + 1];
							}
							let canReachTop =
								typeof topTarget !== 'undefined' && topTarget === 0;
							let canReachBottom =
								typeof bottomTarget !== 'undefined' && bottomTarget === 0;
							let canReachLeft =
								typeof leftTarget !== 'undefined' && leftTarget === 0;
							let canReachRight =
								typeof rightTarget !== 'undefined' && rightTarget === 0;
							// Move to next triangle
							tries: while (true) {
								if (
									!canReachTop &&
									!canReachBottom &&
									!canReachLeft &&
									!canReachRight
								) {
									break tries;
								}
								switch (this.randomInt(0, 3)) {
									case 0:
										if (canReachTop) {
											this.grid[y - 1][x] = this.tailLength;
											break tries;
										}
										break;
									case 1:
										if (canReachBottom) {
											this.grid[y + 1][x] = this.tailLength;
											break tries;
										}
										break;
									case 2:
										if (canReachLeft) {
											this.grid[y][x - 1] = this.tailLength;
											break tries;
										}
										break;
									case 3:
										if (canReachRight) {
											this.grid[y][x + 1] = this.tailLength;
											break tries;
										}
										break;
								}
							}
						}
					}
				}
			}
			// Spawn if a head dies
			if (headCount < this.numberOfHeads && this.explodedHeadsCountdown === 0) {
				this.spawn();
			}
		},
		spawn() {
			// Seed random triangle
			let randomX = this.randomInt(0, this.trianglesPerRow - 1);
			let randomY = this.randomInt(0, this.rows - 1);
			this.grid[randomY][randomX] = this.tailLength;
		},
		getColor(index) {
			// Ordered triangle colors
			return this.colors[index % this.colors.length];
		},
		explodeHeads() {
			// Interation makes all snakes die
			this.explodedHeadsCountdown = this.tailLength + 1;
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
			deadColor: useRootCssVar('--bg-color-3'),
			bgColor: useRootCssVar('--bg-color-2'),
		};
	},
	mounted() {
		// Set up state
		this.resizeObserver = new ResizeObserver((entries) => {
			const { offsetWidth, offsetHeight } = entries[0].target;
			this.resize(offsetWidth, offsetHeight);
		});
		this.resizeObserver.observe(this.$refs.container);
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
	unmounted() {
		this.resizeObserver?.disconnect();
	},
};
</script>

<template>
	<div class="animation-triangle-snakes" ref="container">
		<canvas
			class="animation-triangle-snakes__canvas"
			ref="canvas"
			:width="width"
			:height="height"
			@click="explodeHeads"
		></canvas>
	</div>
</template>

<style lang="scss">
.animation-triangle-snakes {
	width: 100%;
	height: 100%;

	&__canvas {
		display: block;
		width: 100%;
		height: 100%;
	}
}
</style>
