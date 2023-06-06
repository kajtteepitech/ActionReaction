<script>
    import { scale, slide, crossfade } from "svelte/transition";
    import { flip } from "svelte/animate";
    let name = ["WORLD!", "Svelt", "Ok"];
    let todo = [];
    let uid = 0;
    let value = "";
    let object = {
        user: "",
    };
    let nbr_click = 0;
    const [send, receive] = crossfade({
        fallback: scale,
    });
    const remove = (tod) => {
        todo = todo.filter((t) => t !== tod);
    };
    const add = (tod, done) => {
        tod.done = done;
        remove(tod);
        todo.concat(tod);
    };
</script>

<main>
    <form
        on:submit|preventDefault={() => {
            todo = todo.concat({
                name: value,
                done: false,
                id: uid++,
            });
            value = "";
        }}
    >
        <input type="text" bind:value />
        <button type="submit">OK</button>
    </form>
    <!-- <pre>{JSON.stringify(todo, null, 2)}</pre> -->
    <div>
        <ul style="list-style: none">
            <h1>To do</h1>
            {#each todo.filter((t) => !t.done) as tod (tod.id)}
                <label
                    out:send={{ key: tod.id }}
                    in:receive={{ key: tod.id }}
                    animate:flip
                >
                    <!-- transition:slide -->
                    <input type="text" bind:value={tod.name} />
                    <button
                        on:click={() => {
                            todo = todo.filter((t) => t != tod);
                        }}>R</button
                    >
                    <input type="checkbox" bind:checked={tod.done} />
                </label>
            {/each}
        </ul>
    </div>
    <div>
        <ul style="list-style: none">
            <h1>done</h1>
            {#each todo.filter((t) => t.done) as tod (tod.id)}
                <label
                    in:receive={{ key: tod.id }}
                    out:send={{ key: tod.id }}
                    animate:flip
                >
                    <input type="text" bind:value={tod.name} />
                    <button
                        on:click={() => {
                            todo = todo.filter((t) => t != tod);
                        }}>R</button
                    >
                    <input type="checkbox" bind:checked={tod.done} />
                </label>
            {/each}
        </ul>
    </div>
</main>

<!-- <h1>{object["user"]}</h1>
        
        
        <h1
        on:click={() => {
            nbr_click++;
            if (nbr_click > 2)
            nbr_click = 0;
        }}
        >
        hello {name[nbr_click]}
    </h1>
    
    <pre>{JSON.stringify(name, null, 2)}</pre>
    
    <p on:click={() => {
        name = ["tkt", ...name, "Hello"]
    }}>
    {name}
</p>

<form on:submit|preventDefault={() => {
    console.log("ok")
}}>
<input type="text" bind:value={object["user"]}/>
<button type="submit">Ok</button>
</form> -->

<!-- <style>
    form {
        background-color:rgb(158, 62, 7);
    }
</style> -->
<style>
    main {
        padding: 5vw;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2em;
    }

    form {
        grid-column: 1 / -1;
        display: flex;
        gap: 1em;
    }

    form input {
        width: 100%;
        font: inherit;
        border: 1px solid #ddd;
        border-radius: 0.25em;
        outline: 0 solid #eee;
        padding: 0.5em;

        transition: outline-width 75ms linear;
    }

    form input:focus {
        outline-width: 3px;
    }

    form button {
        cursor: pointer;
        padding: 0.5em 1em;
        border: 1px solid #ddd;
        border-radius: 0.25em;
        font: inherit;
    }

    form button:hover {
        background-color: #ddd;
    }

    h1 {
        text-transform: lowercase;
        font-weight: 100;
        margin-bottom: 1em;
    }

    label {
        display: flex;
        align-items: center;
        gap: 0.75em;

        background-color: #eee;
        border: 1px solid #ddd;
        border-radius: 0.25em;
        padding: 0.5em 0.75em;
        margin-bottom: 0.5em;
    }

    label button {
        flex-shrink: 0;
        cursor: pointer;

        margin-left: auto;
        border: none;
        width: 1.5em;
        height: 1.5em;
        background: no-repeat 50% 50%
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23676778' d='M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M17,7H14.5L13.5,6H10.5L9.5,7H7V9H17V7M9,18H15A1,1 0 0,0 16,17V10H8V17A1,1 0 0,0 9,18Z'%3E%3C/path%3E%3C/svg%3E");

        opacity: 0;

        transition-property: opacity;
    }

    label input {
        accent-color: crimson;
        flex-shrink: 0;
    }

    label:hover button {
        opacity: 1;
    }
</style>
