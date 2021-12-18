<script>
    let year = new Date().getFullYear();
    export let footerHeight = 2.5;
</script>

<main class="test" style="height: {footerHeight}rem;">
        <p>&#169 {year}</p>
</main>

<style lang="scss">
    main {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid gray;
        width: 100%;
        p {
            font-size: 1.15rem;
        }        
    }
</style>
