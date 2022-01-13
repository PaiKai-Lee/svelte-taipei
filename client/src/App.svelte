<script>
	import { card } from "./store/store";
	import Header from "./components/Header.svelte";
	import Card from "./components/Card.svelte";
	import Footer from "./components/Footer.svelte";
	import SearchBar from "./components/SearchBar.svelte";
	import Bar from "./components/Bar.svelte";
	import Container from "./components/Container.svelte";
	import { onMount, afterUpdate } from "svelte";
	let searchName;
	let cardInfo;
	let nextPage;

	async function getData(url, { ...queryString } = {}) {
		if (Object.keys(queryString).length !== 0) {
			let queryList = Object.entries(queryString);
			let res = queryList.map((item) => (item = item.join("="))).join("&");
			url += `/?${res}`;
		}
		let res = await fetch(url);
		return await res.json();
	}

	function searchData() {
		console.log(searchName); //搜尋景點
	}

	let observer = new IntersectionObserver(
		async (entries) => {
			let lastCard = entries[0];
			if (lastCard.isIntersecting && nextPage !== null) {
				nextPage = typeof nextPage === "undefined" ? 1 : nextPage;
				let resultes = await getData("http://127.0.0.1:8888/api/attraction",{page:nextPage})
				let { data } = resultes;
				nextPage = resultes.nextPage;
				let newcardInfo = data.reduce((total, item) => {
					let obj = {
						viewName: item.name,
						stopName: item.mrt === null ? "無" : item.mrt,
						artType: item.category,
						imgUrl: item.images[0],
					};
					return [...total, obj];
				}, []);
				cardInfo = [...cardInfo, ...newcardInfo];
				observer.unobserve(lastCard.target);
				observer.observe(document.querySelector(".card:last-child"));
			}
		},
		{
			rootMargin: "50px",
		}
	);

	onMount(async () => {
		let resultes = await getData("http://127.0.0.1:8888/api/attraction");
		let { data } = resultes;
		nextPage = resultes.nextPage;
		cardInfo = data.reduce((total, item) => {
			let obj = {
				viewName: item.name,
				stopName: item.mrt === null ? "無" : item.mrt,
				artType: item.category,
				imgUrl: item.images[0],
			};
			return [...total, obj];
		}, []);
	});

	afterUpdate(() => {
		observer.observe(document.querySelector(".card:last-child"));
	});
</script>

<div class="wrap">
	<Header />
	<Bar>
		<SearchBar bind:searchName slot="searchBar" on:search={searchData} />
	</Bar>
	<Container>
		{#if cardInfo}
			{#each cardInfo as card}
				<Card {...card} />
			{/each}
		{:else}
			{#each $card as card}
				<Card {...card} />
			{/each}
		{/if}
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
