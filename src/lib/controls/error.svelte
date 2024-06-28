<script lang="ts">
	import type { BehaviorSubject } from "rxjs";

	export let errors: BehaviorSubject<string[]>;
</script>

<span class="text-sm font-medium text-pink-500 mb-2">
	{#each $errors as error}
		{error}
	{/each}
</span>
