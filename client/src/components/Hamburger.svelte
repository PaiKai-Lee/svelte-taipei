<script>
    export let size="30";
    export const status = false;
</script>

<button style="--size:{size}px">
    <span class="line line1" />
    <span class="line line2" />
    <span class="line line3" />
</button>

<style lang="scss">
    button{
        background-color: transparent;
        border: none;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
        width: var(--size);
        height: var(--size);
        cursor: pointer;
        .line {
            width: 90%;
            height: 10%;
            border-radius: 5px;
            border: 1px solid rgb(0, 0, 0);
            background-color: rgb(109, 109, 109);
            transition: transform 0.5s;
        }
        &:hover{        
            position: relative;
            .line1 {  
                position: absolute;
                transform: rotateZ(45deg);
            }
            .line2 {
                opacity: 0;
            }
            .line3 {
                position: absolute;
                transform: rotateZ(-45deg);
            }
        }
    }
</style>
