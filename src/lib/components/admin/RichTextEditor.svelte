<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import {
		Bold,
		Italic,
		Heading2,
		Heading3,
		List,
		ListOrdered,
		Quote,
		Minus,
		Undo2,
		Redo2,
		RemoveFormatting
	} from 'lucide-svelte';

	interface Props {
		content?: string;
		name?: string;
		placeholder?: string;
	}

	let { content = '', name = 'description', placeholder = 'Tulis deskripsi produk...' }: Props = $props();

	let editorElement: HTMLDivElement;
	let editor: Editor | null = $state(null);
	let htmlContent = $state(content);

	onMount(() => {
		editor = new Editor({
			element: editorElement,
			extensions: [
				StarterKit.configure({
					heading: { levels: [2, 3] },
					bulletList: { keepMarks: true },
					orderedList: { keepMarks: true }
				})
			],
			content: content || '',
			editorProps: {
				attributes: {
					class: 'prose prose-sm max-w-none focus:outline-none min-h-[160px] px-3 py-2'
				}
			},
			onUpdate: ({ editor: ed }) => {
				const html = ed.getHTML();
				htmlContent = html === '<p></p>' ? '' : html;
			}
		});
	});

	onDestroy(() => {
		editor?.destroy();
	});

	function isActive(type: string, attrs?: Record<string, any>): boolean {
		return editor?.isActive(type, attrs) ?? false;
	}

	function btn(type: string, attrs?: Record<string, any>): string {
		const base = 'p-1.5 rounded-(--radius) transition-colors cursor-pointer';
		const active = 'bg-[var(--primary)] text-[var(--primary-foreground)]';
		const inactive = 'text-[var(--muted-foreground)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)]';
		return `${base} ${isActive(type, attrs) ? active : inactive}`;
	}
</script>

<div class="rounded-(--radius) border border-[var(--input)] bg-transparent ring-offset-[var(--background)] focus-within:ring-2 focus-within:ring-[var(--ring)] focus-within:ring-offset-2 overflow-hidden">
	<!-- Toolbar -->
	{#if editor}
		<div class="flex flex-wrap items-center gap-0.5 border-b border-[var(--input)] bg-[var(--secondary)]/50 px-2 py-1.5">
			<button type="button" class={btn('bold')} onclick={() => editor?.chain().focus().toggleBold().run()} title="Bold">
				<Bold class="h-4 w-4" />
			</button>
			<button type="button" class={btn('italic')} onclick={() => editor?.chain().focus().toggleItalic().run()} title="Italic">
				<Italic class="h-4 w-4" />
			</button>

			<div class="mx-1 h-5 w-px bg-[var(--border)]"></div>

			<button type="button" class={btn('heading', { level: 2 })} onclick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} title="Heading 2">
				<Heading2 class="h-4 w-4" />
			</button>
			<button type="button" class={btn('heading', { level: 3 })} onclick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} title="Heading 3">
				<Heading3 class="h-4 w-4" />
			</button>

			<div class="mx-1 h-5 w-px bg-[var(--border)]"></div>

			<button type="button" class={btn('bulletList')} onclick={() => editor?.chain().focus().toggleBulletList().run()} title="Bullet List">
				<List class="h-4 w-4" />
			</button>
			<button type="button" class={btn('orderedList')} onclick={() => editor?.chain().focus().toggleOrderedList().run()} title="Numbered List">
				<ListOrdered class="h-4 w-4" />
			</button>

			<div class="mx-1 h-5 w-px bg-[var(--border)]"></div>

			<button type="button" class={btn('blockquote')} onclick={() => editor?.chain().focus().toggleBlockquote().run()} title="Quote">
				<Quote class="h-4 w-4" />
			</button>
			<button
				type="button"
				class="p-1.5 rounded-(--radius) text-[var(--muted-foreground)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
				onclick={() => editor?.chain().focus().setHorizontalRule().run()}
				title="Horizontal Rule"
			>
				<Minus class="h-4 w-4" />
			</button>

			<div class="mx-1 h-5 w-px bg-[var(--border)]"></div>

			<button
				type="button"
				class="p-1.5 rounded-(--radius) text-[var(--muted-foreground)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
				onclick={() => editor?.chain().focus().clearNodes().unsetAllMarks().run()}
				title="Clear Formatting"
			>
				<RemoveFormatting class="h-4 w-4" />
			</button>

			<div class="flex-1"></div>

			<button
				type="button"
				class="p-1.5 rounded-(--radius) text-[var(--muted-foreground)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)] transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
				onclick={() => editor?.chain().focus().undo().run()}
				disabled={!editor?.can().undo()}
				title="Undo"
			>
				<Undo2 class="h-4 w-4" />
			</button>
			<button
				type="button"
				class="p-1.5 rounded-(--radius) text-[var(--muted-foreground)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)] transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
				onclick={() => editor?.chain().focus().redo().run()}
				disabled={!editor?.can().redo()}
				title="Redo"
			>
				<Redo2 class="h-4 w-4" />
			</button>
		</div>
	{/if}

	<!-- Editor content area -->
	<div bind:this={editorElement} class="text-sm"></div>

	<!-- Hidden input to carry HTML to form submission -->
	<input type="hidden" {name} value={htmlContent} />
</div>

<style>
	/* Placeholder styling */
	:global(.tiptap p.is-editor-empty:first-child::before) {
		content: attr(data-placeholder);
		float: left;
		color: var(--muted-foreground);
		pointer-events: none;
		height: 0;
	}

	/* Editor base styles */
	:global(.tiptap) {
		min-height: 160px;
	}

	:global(.tiptap:focus) {
		outline: none;
	}

	/* Prose styling inside editor */
	:global(.tiptap h2) {
		font-family: var(--font-serif);
		font-size: 1.25rem;
		font-weight: 700;
		margin-top: 1.25rem;
		margin-bottom: 0.5rem;
		line-height: 1.3;
	}

	:global(.tiptap h3) {
		font-family: var(--font-serif);
		font-size: 1.1rem;
		font-weight: 600;
		margin-top: 1rem;
		margin-bottom: 0.4rem;
		line-height: 1.4;
	}

	:global(.tiptap p) {
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
	}

	:global(.tiptap ul) {
		list-style-type: disc;
		padding-left: 1.5rem;
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
	}

	:global(.tiptap ol) {
		list-style-type: decimal;
		padding-left: 1.5rem;
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
	}

	:global(.tiptap li) {
		margin-top: 0.2rem;
		margin-bottom: 0.2rem;
	}

	:global(.tiptap blockquote) {
		border-left: 3px solid var(--border);
		padding-left: 1rem;
		margin-top: 0.75rem;
		margin-bottom: 0.75rem;
		color: var(--muted-foreground);
		font-style: italic;
	}

	:global(.tiptap hr) {
		border: none;
		border-top: 1px solid var(--border);
		margin-top: 1rem;
		margin-bottom: 1rem;
	}

	:global(.tiptap strong) {
		font-weight: 700;
	}

	:global(.tiptap em) {
		font-style: italic;
	}
</style>
