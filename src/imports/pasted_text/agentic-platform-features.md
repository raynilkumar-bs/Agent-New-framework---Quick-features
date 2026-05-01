LLM Prompt — Build Agentic Platform Features (Respect Existing Design System)

You are extending an existing enterprise SaaS dashboard product.
Your task is to add Agentic product capabilities while strictly following the existing design system, layout patterns, navigation structure, and UI primitives already used in the application.

Do NOT redesign the UI from scratch.

Follow the same patterns used in:

Reports pages

Dashboard widgets

Table layouts

Side drawers

Modals

Cards / surface containers

Navigation hierarchy

Action menus

Reuse existing components wherever possible.

1. Global Design Rules (Critical)

Follow the existing product design system.

Container Surface

Use the standard container style used in Reports.

background: white
border: 1px solid #E5E7EB
border-radius: 12px
box-shadow: none
padding: 20px vertical, 24px horizontal

Every module must sit inside this container.

Structure:

Surface Container
 ├ Header
 ├ Divider (optional)
 └ Body

Spacing rules:

grid gap: 16–20px
divider: 1px solid #E5E7EB

Do not introduce shadows or custom cards.

2. Add New Top-Level Navigation: Agents

Extend the existing left navigation.

Insert a new item:

Agents

Placement:

Home
Dashboard
Agents
Reviews
Inbox
Listings
Social
Surveys
Campaigns
Workflows
Ticketing
Contacts
Reports

Agents is a platform capability, not a submodule.

Clicking Agents should open:

/agents
3. Agents Landing Page

Create a new page.

Route:

/agents

Purpose:
Central hub to manage and monitor AI agents.

Follow the existing page layout pattern used in Reports pages.

Page Structure
Agents Page
 ├ Page Header
 ├ Summary Metrics
 ├ Agent Directory
 ├ Recent Activity
 └ Needs Attention
Header

Use the same header pattern used in report pages.

Agents                                [Monitor]
Manage and monitor AI agents across your business

Right side primary CTA:

Monitor
4. Summary Metrics Section

Use the same metric cards used in analytics reports.

Example metrics:

Active Agents
Tasks Completed Today
Needs Attention
Automation Rate

Layout:

┌────────────────────────────────────────────┐
│ Active Agents │ Tasks Today │ Needs Review │
└────────────────────────────────────────────┘
5. Agent Directory

Show agents as cards inside a responsive grid.

Agents examples:

Review Response Agent
Review Generation Agent
Listing Optimization Agent
Social Publishing Agent
Social Engagement Agent
Ticketing Agent

Each card contains:

Agent Name
Short description
Status badge
Tasks today
Open button

Example structure:

┌───────────────────────────┐
│ Review Response Agent     │
│ Automatically replies     │
│ to incoming reviews       │
│                           │
│ Status: Active            │
│ Tasks today: 87           │
│                           │
│ [Open]                    │
└───────────────────────────┘
6. Recent Agent Activity

Show a timeline feed, not a table.

Example:

10:42 AM
Review Response Agent replied to a review

10:39 AM
Social Publishing Agent scheduled a post

10:34 AM
Ticketing Agent escalated a request

Layout:

┌────────────────────────────────────────────┐
│ Recent Activity                            │
│--------------------------------------------│
│ 10:42 Review Agent replied to 2⭐ review    │
│ 10:39 Social Agent posted campaign         │
│ 10:34 Ticketing Agent flagged escalation   │
└────────────────────────────────────────────┘

Each item should be clickable.

7. Needs Attention Section

Dedicated section to surface agent exceptions.

Examples:

Low confidence responses
Failed publishing tasks
Pending approvals
Agent errors

Example:

Needs Attention

Review Response Agent
2 responses require approval

Social Publishing Agent
1 failed post
8. Monitor Page

Route:

/agents/monitor

This page is an operations console for agent activity.

Page Layout
Monitor Page
 ├ Header
 ├ Activity Metrics
 ├ Filters
 └ Activity Feed
Header
Monitor
Track agent activity and outcomes
Filters

Reuse existing filter pattern used in report pages.

Filters:

Search
Agent
Status
Date Range
Activity Metrics
Total Activities Today
Successful Tasks
Needs Review
Failed Tasks
Activity Feed

Timeline structure:

┌────────────────────────────────────────────┐
│ Agent Activity                             │
│--------------------------------------------│
│ 10:42 Review Agent replied to review       │
│ 10:39 Social Agent posted scheduled post   │
│ 10:32 Ticketing Agent escalated issue      │
└────────────────────────────────────────────┘

Future-ready for:

Conversation drill-down
Agent reasoning
Approval actions
9. Agent Builder — Creation Modes

The system must support two workflow creation modes.

[ AI ]   [ Manual ]

Both generate the same workflow graph.

AI Mode

Conversational workflow creation.

Example prompts:

Create a weekly report combining reviews and social metrics.

Send it every Monday at 9am to leadership.

Use executive theme and export as PDF.

The system converts this to a structured workflow.

Manual Mode

Node-based workflow builder.

Nodes include:

Trigger
Generate Report
Custom Report Agent
Send Report

Example:

Schedule Trigger
      ↓
Generate Reports
      ↓
Custom Report Agent
      ↓
Send Email

Switching between AI and Manual must preserve the workflow.

10. Custom Report Agent Node

Add a workflow node called:

Custom Report Agent

Purpose:
Transform raw reports into presentation-ready output.

Clicking the node opens a right side drawer.

Drawer modes:

AI
Manual
AI Mode

User can describe formatting.

Examples:

Make this report executive friendly
Use dark analytics theme
Add cover page
Reduce padding
Use Inter font

System maps to structured settings.

Manual Mode

Provide controls for:

Theme
Layout
Page Cover
Colors
Font
Spacing
Headers & Footers
11. Scheduled Deliveries Page

Entry point:

Profile dropdown.

Add menu item:

Scheduled deliveries

This opens a standalone page.

Route:

/scheduled-deliveries

This page manages recurring report schedules.

Page Layout
Scheduled Deliveries
 ├ Summary Cards
 ├ Filters
 ├ Tabs
 └ Schedule Table
Summary Cards
Active Schedules
Total Sends
Recipients Reached
Failed Deliveries
Tabs
My Schedules
Team Schedules
Drafts

Admin users see all schedules.

Table Columns
Schedule Name
Reports Included
Owner
Recipients
Frequency
Next Run
Last Sent
Format
Status
Actions

Statuses:

Active
Paused
Draft
Failed
Expired
12. Schedule Creation Flow

Example schedule agent:

Agent
 ├ Reports
 │   ├ Reviews
 │   ├ Social
 │   └ Ticketing
 │
 ├ Schedule
 │   Weekly Monday 08:00
 │
 ├ Format
 │   PDF
 │
 └ Delivery
     recipients
     subject
     body
13. Data Model Example
ScheduledReportAgent
{
  id,
  name,

  reports: [
    { module: "reviews", report: "response_rate" },
    { module: "social", report: "profile_performance" }
  ],

  schedule: {
    frequency: "weekly",
    day: "monday",
    time: "08:00"
  },

  format: "pdf",

  recipients: [
    "leadership@company.com"
  ],

  subject: "Weekly executive report",
  body: "Attached is your weekly report."
}
14. Key Product Principles

Follow these rules when implementing.

Agents are first-class objects

Agents are not buried in settings.

Monitoring is critical

Users must see:

what agents did
what succeeded
what failed
what needs approval
Activity must be understandable

Design for:

Scan → Inspect → Intervene
AI + Manual must coexist

AI creates workflows quickly.
Manual mode provides precision control.

Human supervision is required

Agents should surface:

errors
low confidence
approval required
failures
15. Implementation Scope (V1)

Build:

Agents navigation

Agents landing page

Monitor page

Agent directory

Activity feed

Needs attention section

AI / Manual builder shell

Custom Report Agent drawer

Scheduled deliveries page

Schedule table

Create schedule flow

Do not build yet:

agent reasoning UI
multi-agent orchestration
complex approval systems
Final Product Definition

This feature introduces a new platform capability:

Agents

A centralized AI workforce layer where users can create, monitor, customize, and supervise AI agents that perform business tasks across the product.