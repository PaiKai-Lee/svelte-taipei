<script>
    import ToggleBtn from "./Hamburger.svelte";
    export let title = "台北一日遊";
    export let login = false;
    export let headerHeight = 5;
</script>

<main style="--headerHeight: {headerHeight}vh;">
    <div class="title"><a href="/">{title}</a></div>
    <div class="right">
        <ul>
            <li>預定行程</li>
            <li>{login === true ? "登出" : "登入/註冊"}</li>
        </ul>
    </div>
    <ToggleBtn/>
</main>

<style lang="scss">
    :root {
        --text-color: black;
    }
    main {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        background-color: white;
        height: var(--headerHeight);
        width: 1200px;
        .title {
            font-size: x-large;
            font-weight: bolder;
            a {
                text-decoration: none;
                &:visited {
                    color: var(--text-color);
                }
                &:hover {
                    opacity: 0.6;
                }
            }
        }
        .right {
            ul {
                display: flex;
                width: 10em;
                justify-content: space-around;
                list-style-type: none;
            }
        }
    }
    @media screen and (max-width:1200px){
        main{
            max-width:100%;
        }
    }
</style>
