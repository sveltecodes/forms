<script lang="ts">
	import { writable } from "svelte/store";
	import { twMerge } from "tailwind-merge";
	import type { FormControl } from "../form-control";
	import { theme } from "../themes";

	export let control: FormControl<string | number>;

	const errors = writable();

	control.errors.subscribe((e) => {
		errors.set(e);
	});

	const setValue = (e: Event) => {
		control.value.next((e.target as HTMLInputElement).value);
	};
</script>

<textarea
	{...$$props}
	on:change={setValue}
	name={control?.name}
	placeholder={control?.placeholder}
	data-1p-ignore
	autocomplete="off"
	class={twMerge(
		theme.base.join(" "),
		"h-9 rounded-md border-2 bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-foreground file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
		$$props.class
	)} />
