export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Blip University",
  description: "Promoting Independent Thinking",

  navLinks: [
    {
      href: "/",
      label: "Home"
    },
    {
      href: "/courses",
      label: "Courses"
    },
    {
      href: "/contact",
      label: "Contact-Us"
    }
    
  ],
  dashboardLinks: [
    {
      href: "/fees",
      label: "Fees"
    },
    {
      href: "/registration",
      label: "Unit-Registration"
    },
    {
      href: "/results",
      label: "Results"
    }
  ]

}