<script>
export default {
	data() {
		return {
			resizeObserver: null,
			// Settings
			frameDuration: 100,
			paused: false,
			approxSquareSize: 24,
			spawnRarity: 6,
			initialSpawnFactor: 5,
			// State
			width: 0,
			height: 0,
			squareSize: 24,
			gridWidth: 0,
			gridHeight: 0,
			lastFrameTime: 0,
			prevGrid: [],
			grid: [],
			static: false,
		};
	},
	methods: {
		randomInt(min, max) {
			// RNG: min and max inclusive
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min + 1) + min);
		},
		idx(index, axis) {
			// Make any out-of-bound index wrap around
			let checkAgainst = axis === 'y' ? this.gridHeight : this.gridWidth;
			if (index > checkAgainst - 1) return 0;
			if (index < 0) return checkAgainst - 1;
			return index;
		},
		resize(width, height) {
			// Adjust canvas size and reset state
			this.width = width;
			this.height = height;
			this.squareSize = width / Math.round(width / this.approxSquareSize);
			let gridWidth = Math.ceil(this.width / this.squareSize);
			let gridHeight = Math.ceil(this.height / this.squareSize);
			this.gridWidth = gridWidth;
			this.gridHeight = gridHeight;
			this.prevGrid = [];
			this.grid = [];
			for (let y = 0; y < gridHeight; y++) {
				let row = [];
				for (let x = 0; x < gridWidth; x++) {
					row.push(0);
				}
				this.prevGrid.push(row);
				this.grid.push(row);
			}
			this.lastFrameTime = 0;
			// Spawn some initial squares
			if (this.initialSpawnFactor !== 0) {
				let numSquares =
					((gridWidth / 3) * (gridHeight / 3)) / this.initialSpawnFactor;
				for (let i = 0; i < numSquares; i++) {
					this.spawn();
				}
			}
			// Redraw if static
			if (this.static === true) {
				this.drawStaticImage();
			}
		},
		add(x, y) {
			// Add a living square to the grid
			const xIdx = this.idx(x, 'x');
			const yIdx = this.idx(y, 'y');
			if (this.grid?.[yIdx]?.[xIdx] !== undefined) {
				this.grid[yIdx][xIdx] = 1;
			}
		},
		spawn(x, y) {
			// Add squares to sustain the population
			let spawnY = y || this.randomInt(0, this.gridHeight - 1);
			let spawnX = x || this.randomInt(0, this.gridWidth - 1);
			let orientation = this.randomInt(0, 3);
			switch (orientation) {
				case 0:
					this.add(spawnX, spawnY - 1);
					this.add(spawnX + 1, spawnY);
					this.add(spawnX - 1, spawnY + 1);
					this.add(spawnX, spawnY + 1);
					this.add(spawnX + 1, spawnY + 1);
					break;
				case 1:
					this.add(spawnX + 1, spawnY);
					this.add(spawnX, spawnY + 1);
					this.add(spawnX - 1, spawnY + 1);
					this.add(spawnX - 1, spawnY);
					this.add(spawnX - 1, spawnY - 1);
					break;
				case 2:
					this.add(spawnX, spawnY + 1);
					this.add(spawnX - 1, spawnY);
					this.add(spawnX + 1, spawnY - 1);
					this.add(spawnX, spawnY - 1);
					this.add(spawnX - 1, spawnY - 1);
					break;
				case 3:
					this.add(spawnX - 1, spawnY);
					this.add(spawnX, spawnY - 1);
					this.add(spawnX + 1, spawnY - 1);
					this.add(spawnX + 1, spawnY);
					this.add(spawnX + 1, spawnY + 1);
					break;
			}
		},
		updateGrid() {
			// Copy grid to previous grid
			this.prevGrid = this.grid.map((row) => row.slice(0));
			// Update grid according to previous grid
			for (let y = 0; y < this.gridHeight; y++) {
				for (let x = 0; x < this.gridWidth; x++) {
					// Count neighbors
					let sq = this.prevGrid[y][x];
					let t = this.prevGrid[this.idx(y - 1, 'y')][x];
					let tr = this.prevGrid[this.idx(y - 1, 'y')][this.idx(x + 1, 'x')];
					let r = this.prevGrid[y][this.idx(x + 1, 'x')];
					let br = this.prevGrid[this.idx(y + 1, 'y')][this.idx(x + 1, 'x')];
					let b = this.prevGrid[this.idx(y + 1, 'y')][x];
					let bl = this.prevGrid[this.idx(y + 1, 'y')][this.idx(x - 1, 'x')];
					let l = this.prevGrid[y][this.idx(x - 1, 'x')];
					let tl = this.prevGrid[this.idx(y - 1, 'y')][this.idx(x - 1, 'x')];
					let numNeighbors = t + tr + r + br + b + bl + l + tl;
					// Determine if square lives or dies
					if (numNeighbors <= 1 || numNeighbors >= 4) {
						// Dies
						this.grid[y][x] = 0;
					} else if (numNeighbors === 3) {
						// Reproduces
						this.grid[y][x] = 1;
					}
				}
			}
			// Chance to spawn
			if (this.randomInt(1, this.spawnRarity) === 1) {
				this.spawn();
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
				let scale = this.squareSize;
				ctx.fillStyle = this.deadColor;
				ctx.fillRect(0, 0, this.width, this.height);
				// Update squares
				for (let y = 0; y < this.gridHeight; y++) {
					for (let x = 0; x < this.gridWidth; x++) {
						let squareVal = this.grid[y][x];
						// Fill square if alive
						if (squareVal === 1) {
							ctx.fillStyle = this.aliveColor;
							ctx.fillRect(x * scale, y * scale, scale, scale);
						}
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
		handleClick(evt) {
			// Spawn squares where user clicks
			let canvas = this.$refs.canvas;
			let canvasRect = canvas.getBoundingClientRect();
			let x = Math.floor((evt.clientX - canvasRect.left) / this.squareSize);
			let y = Math.floor((evt.clientY - canvasRect.top) / this.squareSize);
			this.spawn(x, y);
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
			aliveColor: useRootCssVar('--accent-color-b3'),
			deadColor: useRootCssVar('--bg-color-3'),
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
	<div class="animation-game-of-life" ref="container">
		<canvas
			class="animation-game-of-life__canvas"
			ref="canvas"
			:width="width"
			:height="height"
			@click="handleClick($event)"
		></canvas>
	</div>
</template>

<style lang="scss">
.animation-game-of-life {
	width: 100%;
	height: 100%;

	&__canvas {
		display: block;
		width: 100%;
		height: 100%;
	}
}
</style>
