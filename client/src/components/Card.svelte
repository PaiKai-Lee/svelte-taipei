<script>
    export let viewName = "景點名稱";
    export let stopName = "景點名稱";
    export let artType = "藝術類型";
    export let imgUrl = "https://fakeimg.pl/250x250/";
</script>

<div class="card">
    <a href="#5" class="photo"><img src={imgUrl} alt="Attractions" /></a>
    <div class="text">
        <div class="top">
            <p>{viewName}</p>
        </div>
        <div class="bottom">
            <p>{stopName}</p>
            <p>{artType}</p>
        </div>
    </div>
</div>

<style lang="scss">
    :root {
        --radius: 10px;
    }
    .card {
        border: 1px solid gray;
        border-radius: var(--radius);
        width: 270px;
        height: 240px;
        margin: 20px 0;
        box-shadow: 1px 1px 5px gray;
        a {
            width: 100%;
            height: 67.5%;
            text-decoration: none;
            img {
                border-radius: var(--radius);
                width: 100%;
                height: 67.5%;
                object-fit: cover;
            }
        }
        .text {
            padding: 0 10px;
            div {
                margin: 10px 0;
            }
            .top {
                font-weight: bolder;
            }
            .bottom {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }
    }
    @media screen and (max-width: 1200px) {
        .card {
            width: 45%;
            height: 40vw;
            .text {
                font-size: 2em;
            }
        }
    }
</style>
