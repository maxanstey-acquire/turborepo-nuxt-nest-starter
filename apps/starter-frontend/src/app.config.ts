export default defineAppConfig({
  ui: {
    colors: {
      primary: 'parsley',
      secondary: 'emerald',
      success: 'emerald',
      info: 'sky',
      warning: 'amber',
      error: 'rose',
      neutral: 'slate',
    },
    table: {
      slots: {
        root: 'relative overflow-auto',
        base: 'min-w-full table table-fixed w-full',
        caption: 'sr-only',
        thead:
          'relative bg-emerald-950 text-emerald-50 border-b border-emerald-800',
        tbody:
          'bg-white divide-y divide-emerald-100 [&>tr]:data-[selectable=true]:hover:bg-emerald-50/70 [&>tr]:data-[selectable=true]:focus-visible:outline-emerald-600',
        tfoot: 'relative',
        tr: 'data-[selected=true]:bg-emerald-100 even:bg-emerald-50/40',
        th: 'px-4 py-3.5 text-xs font-semibold tracking-wide text-emerald-50 uppercase text-left rtl:text-right [&:has([role=checkbox])]:pe-0 capitalized capitalize',
        td: 'p-4 text-sm text-slate-800 [&:has([role=checkbox])]:pe-0 bg-white',
        separator:
          'absolute z-[1] left-0 w-full h-px bg-(--ui-border-accented)',
        empty: 'py-6 text-center text-sm text-muted',
        loading: 'py-6 text-center',
      },
    },
  },
});
