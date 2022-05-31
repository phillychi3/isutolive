<script>
	
	import timestamp from '@rockyli/timestamp'
	var day = 0
	var hour = 0
	var min = 0
	var sec = 0
	function clock(){
		const livetine = timestamp.current() - globalThis.livetine;
		day = Math.floor(livetine / (3600*24));
		hour = Math.floor(livetine % (3600*24) / 3600);
		min = Math.floor(livetine % 3600 / 60);
		sec = Math.floor(livetine % 60);
		console.log(day)
		console.log(hour)
		console.log(min)
		console.log(sec)

	}

	function totimestamp(time){
		globalThis.livetine = time
		clock();
		setInterval(clock,1000);
		return '<p>上次開台時間: ' +  timestamp.toDatetimeString(time, { format: 'YYYY' }) + "年" +  timestamp.toDatetimeString(time, { format: 'MM' }) + "月"  +  timestamp.toDatetimeString(time, { format: 'DD' }) + "日" + '</p>'

	}
	async function getapidata(){
		const data = await fetch('https://phillychi3.ml/dd/live?name=uto')
		return await data.json()
	}
	let promise = getapidata();



</script>

<main>
	<div class="bg">
			<div class="layer">
			<!-- svelte-ignore a11y-missing-attribute -->
			<img src="bg.jpg">
		</div>
	</div>
	<h1>天使開台了嗎?</h1>
	{#await promise}
	<p>讀取資料中</p>
	{:then data}
		{#if data[0].status == 'NONE'}
			<h2>天使現在還沒有開台喔</h2>
			{@html totimestamp(data[0].laststreamtime)}
			<h2>距離上次開台時間</h2>
			<p>{day}天{hour}時{min}分{sec}秒</p>
		{:else if data[0].status == 'LIVE_OFFLINE'}
			<h2>天使即將開台了!</h2>
			<iframe width="560" height="315" src={data[0].link} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
		{:else if data[0].status == 'OK'}
			<h2>天使正在開台</h2>
			<iframe width="560" height="315" src={data[0].link} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
		{/if}
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}



</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}
	.layer{
		background: #77afe4;
		filter: blur(3px);
	}
	.bg {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: -999;
		
	}
	.bg img {
		min-height: 100%;
		width: 100%;
		
	}
	h1 {
		color: black;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>