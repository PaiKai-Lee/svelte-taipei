<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    export let searchName = "";
    function search() {
        dispatch("search");
        searchName=""
    }
</script>

<div class="searchBar">
    <input type="text" bind:value={searchName} />
    <button on:click={search}>
        <img src="images/search.svg" alt="" />
    </button>
</div>

<style lang="scss">
    .searchBar{
        width: fit-content;
        height: 3em;
        display: flex;
        align-items: center;
        input {
            border-radius: 15px 0 0 15px ;
            width: 400px;
            font-size: 1.6em;
            padding-left: 10px;
            line-height: 1.8em;
            border: none;
        }
        button{
            cursor: pointer;
            border-radius: 0 15px 15px 0;
            width: 60px;
            height: 46px;
            border: none;
            &:hover{
                background-color: rgb(206, 206, 206);
            }
        }
    }
</style>
