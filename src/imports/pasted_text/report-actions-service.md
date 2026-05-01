LLM-Friendly Prompt — Refactor Report Actions into Reusable Service

You are a senior front-end architect working inside an existing enterprise SaaS dashboard codebase.

Refactor the current report-level actions system into a reusable plug-and-play Report Actions service that can be attached to any report page or dashboard module.

Today, some report pages already have an Actions dropdown with options like:

Share report

Customize & share

Schedule

This behavior should be extracted into a reusable architecture so future report pages can enable the same actions with minimal code.

The goal is:

one shared actions framework

one shared UI pattern

one shared action registry

one shared service layer

one shared analytics/event model

easy enable/disable per report

easy future addition of new actions

Do not build this as a one-off dropdown.
Build it as a modular report actions platform.

Follow the existing design system and page patterns already used in the product.

Product Requirement

Create a reusable system called Report Actions Service.

This system should support these actions:

Share report

Customize & share

Schedule

These actions should be available as reusable capabilities that can be attached to any report surface.

Examples of target surfaces:

BirdAI reports

product reports

dashboards

widget-level reports

saved views

scheduled report bundles

The user should not experience different behavior depending on where the actions are used.
The experience should feel consistent everywhere.

Core Architecture Goal

Build this as five layers:

Report Actions Platform
├ Action registry
├ UI components
├ Service layer
├ Configuration model
└ Analytics/events
1. Action Registry

Create a central registry for supported report actions.

Example:

reportActionsRegistry
- share
- customizeShare
- schedule

Each action should define:

id

label

icon

availability conditions

handler

permissions

optional modal or drawer component

analytics event names

Example shape:

type ReportActionDefinition = {
  id: string;
  label: string;
  icon?: ReactNode;
  isVisible?: (context) => boolean;
  isEnabled?: (context) => boolean;
  handler?: (context) => void;
  renderPanel?: (context) => ReactNode;
  requiredPermission?: string;
  analytics?: {
    clicked: string;
    completed?: string;
  };
};

This registry should make it easy to add future actions like:

Export

Duplicate

Add to dashboard

Save as template

Send test

Run now

2. Shared UI Components

Build reusable UI components for report actions.

Required components:

ReportActionsButton
ReportActionsMenu
ReportActionMenuItem
ShareReportModal
CustomizeShareDrawer
ScheduleReportModal
ReportActionsButton

Reusable trigger button shown in page header or report header.

Example usage:

<ReportActionsButton context={reportContext} actions={['share', 'customizeShare', 'schedule']} />
ReportActionsMenu

Dropdown that renders actions from the registry based on context.

ShareReportModal

Standard modal for sharing a report.

Fields:

recipients

message

share permissions if applicable

optional copy link

optional internal/external share

CustomizeShareDrawer

Right-side drawer for customizing and sharing report output.

Fields can include:

theme

layout

title override

subtitle override

branding

include/exclude sections

export format

recipients

subject

body

ScheduleReportModal

Reusable modal for scheduling reports.

Fields:

frequency

time

day/week/month selection

recipients

subject

body

format

timezone

start date

optional end condition

All UI must follow the existing Birdeye design system.

3. Service Layer

Create a service layer that isolates business logic from UI.

Required services:

reportShareService
reportCustomizeService
reportScheduleService
reportActionsService
reportShareService

Responsibilities:

validate recipients

generate share payload

call share API

return success/error state

reportCustomizeService

Responsibilities:

persist customization config

apply customization presets

return preview-ready config

reportScheduleService

Responsibilities:

create schedule

edit schedule

validate recurrence

trigger test send

fetch existing schedules

reportActionsService

Responsibilities:

orchestrate action execution

map report context to available actions

route action to correct service/modal/drawer

4. Report Context Model

Every report page should pass a standard context object.

Example:

type ReportContext = {
  reportId: string;
  reportType: string;
  reportName: string;
  entityType: 'report' | 'dashboard' | 'widget' | 'savedView';
  ownerId?: string;
  permissions: string[];
  canSchedule?: boolean;
  canShare?: boolean;
  canCustomize?: boolean;
  exportFormats?: string[];
  supportsBranding?: boolean;
  supportsSectionVisibility?: boolean;
  existingScheduleId?: string;
};

This lets the same action system adapt based on report capability.

Example:

some reports support schedule

some widget reports only support share

some dashboards support customize + share but not scheduling

5. Plug-and-Play API

The final API should be simple enough that future engineers can enable actions on any page with minimal code.

Example target usage:

<ReportActionsButton
  context={{
    reportId: 'social-profile-performance',
    reportType: 'social',
    reportName: 'Profile performance',
    entityType: 'report',
    permissions: ['share_report', 'schedule_report'],
    canShare: true,
    canCustomize: true,
    canSchedule: true,
    exportFormats: ['pdf', 'xls', 'ppt'],
    supportsBranding: true,
    supportsSectionVisibility: true,
  }}
  actions={['share', 'customizeShare', 'schedule']}
/>

This should automatically render the same Actions dropdown and wire the correct behavior.

6. Target UX

The action trigger should continue to look like the existing pattern:

[Actions ▼]
  - Share report
  - Customize & share
  - Schedule

But now it is reusable and powered by shared infrastructure.

Do not hardcode dropdown items inside individual report pages.

7. Routing / Invocation Rules

Action behavior:

Share report

Opens modal:

choose recipients

optional message

send / copy link

Customize & share

Opens right drawer:

customize presentation

choose recipients

share/export/send

Schedule

Opens modal:

set recurrence

choose recipients

subject

body

save schedule

If a report already has schedule data, opening Schedule should allow editing.

8. Persistence Requirements

Ensure the service supports:

create new share action

save customization presets

save schedules

fetch existing schedule config

update existing schedule

retry failed schedule send

Customization should be storable independently from scheduling.

This allows:

customize once

share now

schedule later

9. Analytics Requirements

Track all important user actions.

Events:

report_action_opened
report_action_clicked
share_report_started
share_report_completed
customize_share_opened
customize_share_completed
schedule_report_started
schedule_report_completed
schedule_report_updated
schedule_report_failed

Include metadata:

reportId

reportType

entityType

actionId

userRole

10. Error Handling

Support reusable error and success patterns.

Cases:

invalid email

missing permissions

unsupported format

scheduling failure

API timeout

duplicate schedule conflict

UI should show:

inline form errors

toast success states

retry states where relevant

11. Permission Model

Actions should respect permissions.

Examples:

user can share but not schedule

user can schedule only reports they own

admin can manage all schedules

some reports may be read-only

Use report context plus permissions to determine visibility and disabled states.

12. Suggested File Structure

Use a scalable modular structure.

/report-actions
  /components
    ReportActionsButton.tsx
    ReportActionsMenu.tsx
    ShareReportModal.tsx
    CustomizeShareDrawer.tsx
    ScheduleReportModal.tsx

  /registry
    reportActionsRegistry.ts

  /services
    reportActionsService.ts
    reportShareService.ts
    reportCustomizeService.ts
    reportScheduleService.ts

  /hooks
    useReportActions.ts
    useReportSchedule.ts
    useReportShare.ts

  /types
    reportActions.types.ts

  /utils
    reportActionsPermissions.ts
    reportActionsMapping.ts
13. Implementation Strategy

Refactor existing report pages to stop owning action logic directly.

Instead:

remove page-specific dropdown logic

replace with shared ReportActionsButton

pass standardized ReportContext

rely on registry + services

Do this incrementally so existing pages keep working.

14. Backward Compatibility

Do not break existing report pages.
Refactor in a way that allows gradual migration.

Migration strategy:

wrap current implementation with shared components

extract handlers into services

extract action metadata into registry

replace old pages one by one

15. Future-Proofing

Design the architecture so future actions can be added without rewriting report pages.

Possible future actions:

Export

Duplicate report

Save template

Run now

Add to workflow

Add to BirdAI reporting agent

Notify via Slack

Send test report

16. Final Engineering Goal

At the end of this refactor, any engineer should be able to add report actions to a new report page by doing something as simple as:

<ReportActionsButton
  context={reportContext}
  actions={['share', 'customizeShare', 'schedule']}
/>

No duplicated modal logic.
No duplicated dropdown logic.
No page-specific business logic.

This must behave like a reusable platform capability.

Suggested usage going forward

Use this as your internal rule:

When building any new report page

Always ask:

does this report support share?

does this report support customization?

does this report support schedule?

If yes, do not build anything manually.
Use the shared Report Actions platform.

Standard implementation pattern
const reportContext = buildReportContext({
  reportId: 'executive-impact',
  reportType: 'birdai',
  reportName: 'Executive Impact',
  entityType: 'report',
  permissions,
  capabilities: {
    share: true,
    customize: true,
    schedule: true,
  },
});

<ReportActionsButton
  context={reportContext}
  actions={['share', 'customizeShare', 'schedule']}
/>
Good rule for the team

Any new report-level action must be:

added to registry

backed by service layer

added to analytics model

exposed through shared UI

Not embedded directly inside one page.