<script lang="ts">
	import { twMerge } from "tailwind-merge";
	import { theme } from "../themes";

	export let label: string;
	export let description: string = null;
</script>

<div class="flex flex-col gap-2">
	<div class="flex flex-col gap-0.5">
		<label class={twMerge(theme.label.join(" "), "px-[1px] font-medium text-sm disabled:opacity-50", $$props.class)}>{label}</label>
		{#if description}
			<p class={twMerge(theme.description.join(" "), "px-[1px] text-xs ", $$props.class)}>{description}</p>
		{/if}
	</div>
	<slot />
</div>
