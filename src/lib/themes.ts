export const theme = {
  base: [
    "border-slate-300 dark:border-slate-800",
    "text-violet-500",
    "placeholder:text-slate-300 dark:placeholder:text-slate-700",
    "focus:border-lime-600",
  ],
  label: [
    "text-slate-600 dark:text-slate-500",
  ],
  description: [
    "text-slate-500 dark:text-slate-600",
  ],
  select: {
    item: [
      "text-slate-500 dark:text-slate-400",
      "hover:bg-slate-100 dark:hover:bg-slate-600/50",
      "active:bg-slate-200 dark:active:bg-slate-700"
    ]
  },
  switch: {
    label: [
      "text-slate-600 dark:text-slate-500"
    ],
    root: [
      "data-[state=checked]:bg-violet-500 data-[state=unchecked]:bg-slate-700"
    ]
  }
}