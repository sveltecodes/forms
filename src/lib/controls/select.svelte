<script lang="ts">
	import { Select, type Selected } from "bits-ui";
	import { twMerge } from "tailwind-merge";
	import type { FormControl } from "../form-control";
	import { theme } from "../themes";

	export let control: FormControl<any>;
	export let selected: any;

	const setValue = (e: Selected<any>) => control.value.next(e.value);
</script>

<!-- <Select.Root loop bind:selected={bindedValue}> -->
<div class={twMerge(theme.base.join(" "), $$props.class)}>
	<Select.Root loop {selected} onSelectedChange={setValue}>
		<Select.Trigger
			class={twMerge(theme.base.join(" "), "flex h-10 w-full items-center justify-between whitespace-nowrap border-2 rounded-md bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1")}>
			<Select.Value placeholder={control?.placeholder} />
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6" /></svg>
		</Select.Trigger>
		<Select.Content
			strategy="fixed"
			class="max-h-96 z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
			{#each control?.data as option}
				<Select.Item
					value={option.value}
					disabled={option?.disabled}
					class={twMerge(theme.select.item.join(" "), "h-9 flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-30")}>
					{option.label}
				</Select.Item>
			{/each}
		</Select.Content>
	</Select.Root>
</div>
