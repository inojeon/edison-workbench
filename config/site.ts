export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Workbench",
  description: "EDISON Simulation Workbench v.0.1",
  mainNav: [
    {
      title: "Input",
      href: "/input",
    },
    {
      title: "Run",
      href: "/run",
    },
    {
      title: "Jobs",
      href: "/jobs",
    },
    {
      title: "Result",
      href: "/result",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}
