<script lang="ts">
	import { onMount } from "svelte";
	import { writable } from "svelte/store";
	import { twMerge } from "tailwind-merge";
	import type { FormControl } from "../form-control";
	import { theme } from "../themes";

	export let control: FormControl<string | number>;
	export let element: HTMLInputElement;

	const errors = writable();

	control.errors.subscribe((e) => {
		errors.set(e);
	});

	const setValue = (e: Event) => {
		control.value.next((e.target as HTMLInputElement).value);
	};

	$: pristine = control.pristine;
	onMount(() => {
		if (control?.value) {
			control.value
				.subscribe((value: string) => {
					element.value = value;
				})
				.unsubscribe();
		}
	});
</script>

<input
	bind:this={element}
	on:change={setValue}
	name={control?.name}
	placeholder={control?.placeholder}
	data-1p-ignore
	autocomplete="off"
	class={twMerge(
		theme.base.join(" "),
		"h-10 focus:border-lime-600 rounded-md border-2 bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-foreground file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
		$$props.class
	)}
	{...$$props} />
