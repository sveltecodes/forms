<script lang="ts">
	import { writable } from "svelte/store";
	import { twMerge } from "tailwind-merge";
	import type { FormControl } from "../form-control";
	import Errors from "./errors.svelte";

	export let control: FormControl;

	const errors = writable();

	control.errors.subscribe((e) => {
		errors.set(e);
	});

	const setValue = (e: Event) => {
		control.value.next((e.target as HTMLInputElement).value);
	};
</script>

<input
	{...$$props}
	on:change={setValue}
	name={control?.name}
	placeholder={control?.placeholder}
	data-1p-ignore
	class={twMerge(
		"h-9 rounded-md border-2 border-slate-300 bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-slate-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
		$$props.class
	)} />

<Errors errors={control.errors} />
