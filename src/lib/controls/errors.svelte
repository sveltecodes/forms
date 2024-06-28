<script lang="ts">
	import type { Observable } from "rxjs";
	import type { ValidationResult } from "../validators/validator";

	export let errors: Observable<ValidationResult[]>;
</script>

{#await $errors}
	Loading...
{:then value}
	{#if value}
		{#each value as error}
			{error.messages.join(", ")}
		{/each}
	{/if}
{:catch error}
	Error: {error}
{/await}
