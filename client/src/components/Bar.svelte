<script>
    import SearchBar from "./SearchBar.svelte";
</script>

<div class="bar">
    <img src="/images/welcome.png" alt="welcome"/>
    <div>
        <h2>輕鬆享受台北一日悠閒</h2>
        <p>探索每個角落，體驗城市的深度旅遊行程</p>
        <slot name="searchBar">searchBar will be in here</slot>
    </div>
    
</div>

<style lang="scss">
    .bar{
        width: 100%;
        height: 320px;
        background:linear-gradient(#AADDEE,#66AABB);
        overflow: hidden;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        div{
            z-index: 1;
            width: 1200px;
            *{
                margin: 2% 0;
            }
            h2,p{
                color: white;
            }
        }
        img{
            position: absolute;
            right:10%;
        }
    }
    @media screen and (max-width:1200px){
        .bar div{
            max-width: 100%;
        }
    }
</style>