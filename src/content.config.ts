import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Each file in src/content/experience/ is one job.
const experience = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
  schema: z.object({
    company: z.string(),
    role: z.string(),
    location: z.string().optional(),
    label: z.string().optional(),   // shown instead of dates when filled in
    home: z.boolean().default(true), // false = hide from the homepage
    start: z.coerce.string(),      // "2026-06"
    end: z.coerce.string().optional(), // leave out if current
    summary: z.string(),
    tags: z.array(z.string()).default([]),
  }),
});

// Each file in src/content/projects/ is one project.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    kind: z.string().optional(),
    label: z.string().optional(),   // short tag on the left, e.g. "Course"
    order: z.number().default(99),  // lower numbers show first
    date: z.coerce.string().optional(),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { experience, projects };
