Build a new dedicated page called "Scheduled deliveries" that is accessible from the user profile dropdown, not from inside the Reports navigation tree.

This page should manage recurring report schedules as a separate product surface. It should not reuse the existing Reports > Shared by me mental model directly, though it can visually borrow the table/card language for consistency.

Purpose:
Allow users to view, create, manage, pause, and inspect scheduled report deliveries.
If the logged-in user is an admin, they should also be able to see schedules created by other users in the organization.

Page goals:
- show all recurring report schedules in one place
- differentiate between schedules created by the current user and schedules created by others
- support admin visibility into team schedules
- provide operational visibility into next run, last sent, recipients, file format, and schedule health
- make it easy to create a new schedule
- make it easy to edit, pause, duplicate, or run a schedule manually

Entry point:
Profile dropdown menu item:
"Scheduled deliveries"

Page header:
- title: Scheduled deliveries
- primary CTA: Create schedule

Summary cards:
- Active schedules
- Total sends
- Unique recipients
- Failed schedules

Top filters:
- Time range
- Status
- Frequency
- Format
- Owner (admin only)

Views or tabs:
- Scheduled by me
- Team schedules (admin only)
- Drafts

Draft section near top:
Show draft schedules separately before the main table.

Main table columns:
- Schedule name
- Reports included
- Owner
- Recipients
- Frequency
- Next run
- Last sent
- Format
- Status
- Actions

Row metadata:
- schedule name as primary text
- secondary line can show included report modules, delivery type, or template/theme
- recipients can show count + first recipient
- status should use color-coded pills
- actions should live in a three-dot menu

Supported statuses:
- Active
- Paused
- Draft
- Failed
- Expired

Row actions:
- Edit
- Duplicate
- Pause or Resume
- Run now
- View history
- Delete

Admin behavior:
If user is admin, show an owner column and owner filter.
Allow visibility into all scheduled deliveries across the workspace.

Non-admin behavior:
Show only schedules owned by current user by default.

Empty state:
If no schedules exist, show a helpful empty state with CTA:
"Create your first scheduled delivery"

Visual direction:
- keep consistency with existing Birdeye page patterns
- use a clean management-console layout
- this should feel like an automation management page, not a report library
- avoid making it look like Shared by me with renamed labels
- operational clarity is more important than decorative visuals

Design tone:
Professional, lightweight, scalable, enterprise-ready.

Important:
This must be a standalone page-level feature.
Do not place this inside the Reports left navigation hierarchy.
Do not treat it as a report detail variation.
Treat it as a control center for recurring report delivery workflows.