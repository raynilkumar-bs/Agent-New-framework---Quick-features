Create and enforce a consistent modern interaction pattern for all navigation icons across the product. This should apply to side navigation, top navigation, secondary navigation, sub-navigation, expandable menus, utility icons, and any future navigation items added later.

Goal:
Establish one shared system for icon hover, active, focus, and selected states so navigation feels consistent, polished, and scalable across the dashboard.

Requirements:

All navigation icons must follow the same interaction behavior

Hover, active, selected, and focus-visible states must be standardized

New navigation items must automatically inherit these states from the shared component/system

Do not allow custom one-off icon treatments in different modules

The styling should feel modern, minimal, and enterprise-ready

Keep the design clean and avoid noisy visual effects

Interaction rules:

Default state

icon uses neutral color

transparent background

no shadow

consistent icon size and alignment

icon sits inside a standard clickable container

Hover state

apply subtle background highlight behind the icon

slightly increase visual emphasis of the icon color

keep the hover effect soft and modern, not loud

use the same radius and padding for every icon container

Active / pressed state

apply a slightly stronger background than hover

maintain icon clarity and contrast

avoid dramatic scaling, glow, or heavy shadow

Selected / current page state

selected navigation item should have a clear active container treatment

icon color should reflect selected state

background should be persistent and visually distinct from hover

selected state should work for both parent and child navigation items

Focus-visible state

ensure keyboard accessibility

provide a visible focus ring or outline that fits the design system

focus treatment must be consistent across all icon buttons and nav items

Visual direction:

modern SaaS dashboard style

subtle background tint for hover

stronger tinted background for active/selected

rounded container

no heavy borders

no shadows unless already part of the system

use spacing and color hierarchy instead of effects

System enforcement:

create one reusable navigation item component

create one reusable icon container style

all future nav items must use this shared component

override inconsistent legacy icon states with this new standard

prevent teams from introducing custom hover or active styles

Component behavior:

support icon-only nav items

support icon + label nav items

support expandable nav groups

support nested child items

support collapsed sidebar mode

support light and dark mode

Suggested structure:
Navigation Item

container

icon slot

label slot

badge slot optional

expand/collapse chevron optional

State model:

default

hover

active

selected

focus-visible

disabled

Design tokens to define:

nav-icon-color-default

nav-icon-color-hover

nav-icon-color-active

nav-icon-color-selected

nav-item-bg-hover

nav-item-bg-active

nav-item-bg-selected

nav-item-radius

nav-item-padding

nav-focus-ring

Important:
This should be treated as a product-wide navigation standard, not a page-level fix. Any new navigation item introduced in the future must inherit these states by default through the design system component.

And here’s the shorter version if you want it as a direct build prompt:

Build a reusable product-wide navigation item system with consistent hover, active, selected, and focus-visible states for all navigation icons and labels. Apply this across sidebar, top nav, sub-nav, and nested navigation. Use a modern minimal SaaS style with subtle hover background, stronger selected background, consistent radius, spacing, and icon emphasis. No one-off custom styles. All future navigation items must inherit these states through a shared component and design tokens. Support icon-only, icon+label, expandable groups, collapsed sidebar, and light/dark mode.

A stronger product rule to add is this:

Navigation interactions must come from the design system component only; new items should never define their own hover or active behavior.

I can also turn this into a Figma-ready spec with exact state values and token names.