<script lang="ts">
	import { twMerge } from "tailwind-merge";
	import { theme } from "../themes";

	export let label: string;
	export let description: string = null;
</script>

<div class="flex flex-col gap-1">
	<div class="flex flex-col gap-0.5 px-[1px]">
		<label class={twMerge(theme.label.join(" "), "font-medium text-sm disabled:opacity-50", $$props.class)}>{label}</label>
		{#if description}
			<p class={twMerge(theme.description.join(" "), "text-xs ", $$props.class)}>{description}</p>
		{/if}
	</div>
	<slot />
</div>
