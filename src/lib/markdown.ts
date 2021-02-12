import marked from 'marked';
import toText from 'html-to-text';
import { HtmlSlice } from 'htmlslice';
import { highlight } from 'highlight.js';

const stripHtml = (text) => text.replace(/(<([^>]+)>)/gi, '');

type Section = {
  title: string;
  slug: string;
  children?: Section[];
};

export class TocRenderer extends marked.Renderer {
  meta: { title: string; slug: string; sections: Section[] };
  private rootHeaderLevel: number;
  private sectionTree: Section[];

  constructor({ title, slug }: { title: string; slug: string } | { title?: never; slug?: never }) {
    super();

    if (title && !slug) {
      throw new Error('Provide a slug as well');
    }

    this.meta = {
      title,
      slug,
      sections: [],
    };

    this.rootHeaderLevel = title ? 0 : 1;
    this.sectionTree = [];
  }

  heading(text: string, level: 1 | 2 | 3 | 4 | 5 | 6, raw: string, slugger: marked.Slugger) {
    const slug = slugger.slug(raw);

    if (level === this.rootHeaderLevel) {
      if (!this.meta.title) {
        this.meta.title = stripHtml(text);
        this.meta.slug = slug;
      } else {
        // eslint-disable-next-line no-console
        console.warn('Markdown contains multiple level 1 headers', text);
      }
    } else {
      while (this.sectionTree.length > level - (1 + this.rootHeaderLevel)) {
        this.sectionTree.pop();
      }

      const section = { title: stripHtml(text), slug };

      if (this.sectionTree.length) {
        const last = this.sectionTree[this.sectionTree.length - 1];

        if (!last.children) {
          last.children = [];
        }
        last.children.push(section);
      } else {
        this.meta.sections.push(section);
      }

      this.sectionTree.push(section);
    }

    return `<h${level} id="${slug}">${text}</h${level}>`;
  }
}

marked.setOptions({
  highlight(code, lang) {
    return (lang ? highlight(lang, code) : { value: code }).value;
  },
});

interface MarkdownOptions {
  baseUrl?: string;
  title?: string;
  slug?: string;
}

export function processMarkdown(
  markdown: string,
  { baseUrl = null, title, slug }: MarkdownOptions = {}
) {
  const renderer = new TocRenderer({ title, slug });
  const content = marked(markdown, { renderer, baseUrl });
  const slice = new HtmlSlice(content);

  const doNotFormat = (elm, fn, options) => fn(elm.children, options);

  return {
    ...renderer.meta,
    description: `${slice.slice(0, 500)}`,
    text: toText.fromString(content, {
      wordwrap: false,
      uppercaseHeadings: false,
      format: {
        blockquote: doNotFormat,
      },
    }),
    content,
  };
}
