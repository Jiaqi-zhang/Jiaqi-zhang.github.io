import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'

interface AbstractDialogProps {
  title: string
  abstract: string
  triggerLabel?: string
}

/** Displays a complete research abstract without leaving the current page. */
export default function AbstractDialog({
  title,
  abstract: abstractText,
  triggerLabel = 'See More',
}: AbstractDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline cursor-pointer rounded-sm p-0 align-baseline font-medium text-sky-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:text-sky-400 dark:focus-visible:ring-offset-neutral-900"
        >
          {triggerLabel}
        </button>
      </DialogTrigger>

      <DialogContent className="flex max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-2xl flex-col gap-0 overflow-hidden rounded-xl border-neutral-200 bg-white p-0 shadow-2xl sm:rounded-xl dark:border-neutral-700 dark:bg-neutral-900">
        <DialogHeader className="shrink-0 border-b border-neutral-200 px-4 py-4 text-left sm:px-6 sm:py-5 dark:border-neutral-700">
          <DialogTitle className="break-words pr-8 text-base leading-snug text-neutral-900 sm:text-lg dark:text-neutral-50">
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">
          <p className="text-sm font-bold italic text-neutral-800 dark:text-neutral-200">Abstract:</p>
          <DialogDescription className="mt-2 whitespace-pre-wrap break-words text-left text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
            {abstractText}
          </DialogDescription>
        </div>
      </DialogContent>
    </Dialog>
  )
}
