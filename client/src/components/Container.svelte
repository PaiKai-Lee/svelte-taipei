<div class ="container">
    <slot></slot>
</div>
<style lang="scss">
    .container{
        width: 1200px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    @media screen and (max-width: 1200px){
        .container{
            max-width:100%;
            justify-content:space-around;
        }
    }
</style>