<script lang="ts">
	import { Label, Switch } from "bits-ui";
	import { twMerge } from "tailwind-merge";
	import type { FormControl } from "../form-control";
	import { theme } from "../themes";

	export let control: FormControl<boolean>;
</script>

<div class="flex justify-between items-center">
	{#if control?.placeholder}
		<Label.Root class={twMerge(theme.switch.label.join(" "), "text-sm font-medium")}>
			{control.placeholder}
		</Label.Root>
	{/if}
	<Switch.Root
		class={twMerge(
			"peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
			$$props.class,
			theme.switch.root.join(" ")
		)}>
		<Switch.Thumb class="pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"></Switch.Thumb>
	</Switch.Root>
</div>
