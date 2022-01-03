<script>
	import Header from "./components/Header.svelte";
	import Card from "./components/Card.svelte";
	import Footer from "./components/Footer.svelte";
	import SearchBar from "./components/SearchBar.svelte";
	import Bar from "./components/Bar.svelte";
	import Container from "./components/Container.svelte";
	let cardInfo = [
		{
			viewName: "景點",
			stopName: "景",
			artType: "藝術",
			imgUrl: "https://fakeimg.pl/250x150/",
		},
		{
			viewName: "景點",
			stopName: "景",
			artType: "藝術",
			imgUrl: "https://fakeimg.pl/250x150/",
		},
		{
			viewName: "景點",
			stopName: "景",
			artType: "藝術",
			imgUrl: "https://fakeimg.pl/250x150/",
		},
		{
			viewName: "景點",
			stopName: "景",
			artType: "藝術",
			imgUrl: "https://fakeimg.pl/250x150/",
		},
		{
			viewName: "景點",
			stopName: "景",
			artType: "藝術",
			imgUrl: "https://fakeimg.pl/250x150/",
		},
	];
	let searchName;
	function searchData(e){
		console.log(searchName)//搜尋景點
	}
</script>

<div class="wrap">
	<Header />
	<Bar>
		<SearchBar bind:searchName slot="searchBar" on:search={searchData}/>
	</Bar>
	<Container>
		{#each cardInfo as card}
			<Card {...card} />
		{/each}
	</Container>
	<Footer />
</div>

<style lang="scss">
	.wrap {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
