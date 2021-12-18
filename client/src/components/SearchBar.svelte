<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    export let searchName = "";
    function search() {
        dispatch("search", {
            data:searchName,
        });
        searchName=""
    }
</script>

<div class="searchBar">
    <input type="text" bind:value={searchName} />
    <button on:click={search}>
        <!-- <img src="" alt="" /> -->
    </button>
</div>

<style lang="scss">
    .searchBar{
        width: fit-content;
        height: 3em;
        border-radius: 10px;
        display: flex;
        align-items: center;
        input {
            width: 400px;
            font-size: 1.6em;
            padding-left: 10px;
            line-height: 1.8em;
            border: none;
        }
        button{
            width: 60px;
            height: 46px;
            border: none;
        }
    }
</style>
