# Scheduled Agent for Multi-Product Reports — End-to-End Product Requirement

## 1. Product overview

Build a standalone **Scheduled Agent** capability that allows users to combine reports from multiple Birdeye product areas into one automated workflow.

The user should be able to:

* select reports across multiple products
* combine them into one schedule
* customize the output
* define recipients, subject, and body
* choose output format
* review and manage all schedules from a dedicated management page
* create schedules through either **AI mode** or **Manual mode**

This should feel like an **agentic workflow builder**, not a basic report scheduler.

---

## 2. Core vision

The Scheduled Agent should act as a reusable automation layer for reporting across the platform.

Instead of scheduling one report at a time, the user creates one agent that can:

* pull data from multiple product modules
* generate a combined report package
* optionally style and summarize it
* send it on a recurring cadence

This should support both:

* single-report schedules
* multi-report cross-product schedules

---

## 3. Primary use cases

1. A marketing leader schedules a weekly digest combining Social, Reviews, and Surveys.
2. A support lead schedules a daily report combining Ticketing and Inbox metrics.
3. A multi-location business owner schedules a monthly executive report for Listings, Reviews, and Social.
4. An admin manages all schedules created by the team from a single control center.
5. A user creates a schedule using natural language instead of manual configuration.

---

## 4. Supported product areas

The Scheduled Agent must support combining reports from these modules:

* Reviews
* Inbox
* Listings
* Social
* Surveys
* Campaigns
* Workflows
* Ticketing
* Contacts

Example report options can include:

* Reviews & ratings
* Response rate
* Response time
* Review distribution
* Profile performance
* Response trends
* Survey NPS
* Survey responses
* Ticket count
* Ticket resolution time
* Lists & segments

The system should be extensible so new reportable modules can be added later without redesigning the workflow model.

---

## 5. Information architecture

### Entry points

The feature should have multiple entry points:

1. **Profile dropdown** → **Scheduled deliveries**
2. Reports share/export flow → **Create schedule**
3. Agent builder → **Scheduled Agent**
4. Dedicated report page → **Schedule this report**
5. AI customization drawer → ability to convert current report setup into a schedule

### Naming

Recommended naming:

* Profile menu entry: **Scheduled deliveries**
* Page title: **Scheduled deliveries**
* Builder object: **Scheduled Agent**

---

## 6. Experience model

The system should support two creation modes that both generate the same underlying workflow.

### Mode A — AI

Conversational builder where the user can type:

* Create a weekly report combining Reviews and Social
* Send it every Monday at 8 AM as PDF to leadership
* Use executive theme
* Add ticketing metrics too

The AI should convert this into a structured workflow graph.

### Mode B — Manual

Node-based builder where the user configures trigger, report modules, customization, and delivery settings directly.

Switching between AI and Manual must preserve the same workflow state.

---

## 7. Workflow model

### High-level workflow

```text
[Trigger / Schedule]
        ↓
[Select Reports Across Products]
        ↓
[Custom Report Agent]
        ↓
[Generate Summary / Optional AI Insights]
        ↓
[Send / Export Delivery]
```

### Core workflow nodes

* Trigger
* Report Selection
* Custom Report Agent
* AI Summary
* Delivery / Send Report

### Supported trigger types for v1

* Schedule-based trigger

### Future trigger types

* Review event
* Inbox event
* Listing event
* Social event
* Survey event
* Ticketing event
* External event

---

## 8. Schedule configuration

The schedule builder should feel similar to modern calendar recurrence patterns.

### Supported frequencies

* Daily
* Weekly
* Monthly

### Required schedule settings

* Frequency
* Time
* Day of week for weekly
* Day of month for monthly
* Time zone

### Optional future settings

* Start date
* End date
* Skip weekends
* Last business day of month
* Custom recurrence rules

Example:

* Weekly, Monday, 8:00 AM
* Monthly, Day 1, 9:00 AM
* Daily, 7:30 AM

---

## 9. Report selection model

Users must be able to select multiple reports from multiple modules in one workflow.

### Selection UX

* left panel or modal listing modules
* expandable categories per product area
* multi-select support
* selected reports summary panel

### Example selection

* Reviews → Response rate
* Reviews → Review distribution
* Social → Profile performance
* Surveys → Survey NPS
* Ticketing → Ticket count

### Scope behavior

Support:

* all selected reports combined into one delivery package
* optional future support for ordering sections
* optional future support for per-report customization

---

## 10. Custom Report Agent

Add a workflow node called **Custom Report Agent**.

This node should open a right-side drawer and let users customize output before delivery.

### Modes

* AI
* Manual

### Supported customization areas

* Theme
* Layout
* Page cover
* Colors
* Font type
* Padding & spacing
* Headers & footers

### AI examples

* Use dark analytics theme
* Make the layout compact
* Create an executive summary first page
* Use Inter font
* Add page numbers in the footer

### Manual controls

* theme picker
* layout selection
* cover page controls
* color palette controls
* typography controls
* spacing density controls
* header/footer toggles

### Preview behavior

Changes should update report preview in real time or near-real-time.

---

## 11. Output formats

Supported v1 formats:

* XLS
* PDF
* PPT
* PNG

The selected format applies to the scheduled delivery.

Future support:

* ZIP package for multiple file types
* Shareable link delivery
* Embedded dashboard view

---

## 12. Delivery configuration

The user must be able to configure:

* Recipients
* Subject line
* Email body
* Output format

### Recipients

* allow selecting internal users
* allow entering email addresses
* support multiple recipients

### Subject

Editable text field with smart default.
Example:
Scheduled report: Multi-product performance - Last 30 days

### Body

Editable rich text or plain text area with smart default.
Example:
Your scheduled report for Reviews, Social, and Ticketing is ready for review.

Optional future support:

* tokens like report date range, owner name, company name

---

## 13. Dedicated management page

Create a standalone page called **Scheduled deliveries**.
This must not live inside the Reports left navigation hierarchy.

### Purpose

A control center for managing recurring report delivery workflows.

### Who can see what

#### Standard user

* My schedules
* Drafts

#### Admin

* My schedules
* Team schedules
* All schedules
* Drafts

### Page structure

#### Header

* Title: Scheduled deliveries
* Primary CTA: Create schedule

#### Summary cards

* Active schedules
* Total sends
* Unique recipients
* Failed schedules

#### Filters

* Time range
* Status
* Frequency
* Format
* Owner (admin only)

#### Views / tabs

* My schedules
* Team schedules
* Drafts

#### Draft section

Pinned section at top for unsent schedule drafts.

#### Main table columns

* Schedule name
* Reports included
* Owner
* Recipients
* Frequency
* Next run
* Last sent
* Format
* Status
* Actions

### Supported statuses

* Active
* Paused
* Draft
* Failed
* Expired

### Row actions

* Edit
* Duplicate
* Pause / Resume
* Run now
* View history
* Delete

---

## 14. Admin behavior

Admins must be able to:

* view schedules created by others
* filter by owner
* inspect schedule status and history
* duplicate or edit schedules if permissions allow

Future support:

* ownership transfer
* audit trail
* team-level permissions

---

## 15. AI mode requirements

The AI builder should parse natural language into structured workflow objects.

### Supported AI intents

* create a schedule
* edit a schedule
* add reports
* remove reports
* change frequency
* change recipients
* change format
* apply styling
* add executive summary

### Example input

Create a monthly report combining Reviews, Social, and Surveys. Send it on the first day of every month at 8 AM as a PDF to the leadership team. Use executive theme and add a summary page.

### Expected AI output

* Trigger → Monthly, Day 1, 8 AM
* Reports → Reviews, Social, Surveys
* Theme → Executive
* Summary page → Enabled
* Format → PDF
* Recipients → leadership team

### AI constraints

AI must only map to supported product areas, settings, and actions.
If the request is unsupported, the AI should explain the closest available option.

---

## 16. Manual mode requirements

The manual builder must support drag-and-configure or click-and-configure node workflows.

### Left panel options

#### Triggers

* Schedule-based

#### Tasks

* Generate report
* Custom Report Agent
* Generate summary
* Send report

#### Product sections

* Reviews
* Inbox
* Listings
* Social
* Surveys
* Campaigns
* Workflows
* Ticketing
* Contacts

### Manual capabilities

* add/remove nodes
* reorder tasks when supported
* configure each step independently
* preview final workflow

---

## 17. Design system requirements

### Global surface standard

All containers used in this feature must follow the standardized dashboard surface system.

Use:

* subtle border
* no shadows
* consistent radius
* consistent spacing

Recommended base surface style:

* background: surface primary
* border: 1px subtle border
* border radius: 12px
* box shadow: none
* padding: 20px vertical, 24px horizontal

### Navigation consistency

All navigation icons and items used for this feature must inherit the product-wide navigation state system.

Support standardized:

* default
* hover
* active
* selected
* focus-visible

Do not allow custom one-off states.

---

## 18. Brand motion

If the product supports brand motion, use the subtle AI aura shimmer on the logo during major page transitions only.

This should:

* run once on page navigation
* support light and dark mode
* use violet → indigo → blue motion language
* respect reduced motion preferences
* remain subtle and premium

This is optional enhancement behavior and should not block core scheduling workflows.

---

## 19. Data model

```json
{
  "scheduledAgent": {
    "id": "string",
    "name": "Weekly executive digest",
    "owner": "balaji@company.com",
    "reports": [
      { "module": "reviews", "report": "response_rate" },
      { "module": "social", "report": "profile_performance" },
      { "module": "ticketing", "report": "ticket_count" }
    ],
    "schedule": {
      "frequency": "weekly",
      "day": "monday",
      "time": "08:00",
      "timezone": "Asia/Kolkata"
    },
    "customization": {
      "theme": "executive",
      "layout": "presentation",
      "pageCover": true,
      "font": "Inter",
      "spacing": "comfortable",
      "headersFooters": {
        "pageNumbers": true,
        "generatedDate": true
      }
    },
    "summary": {
      "enabled": true,
      "type": "executive"
    },
    "delivery": {
      "format": "pdf",
      "recipients": [
        "leadership@company.com"
      ],
      "subject": "Scheduled report: Weekly executive digest",
      "body": "Your scheduled report is ready."
    },
    "status": "active",
    "nextRun": "2026-03-16T08:00:00+05:30",
    "lastSent": "2026-03-09T08:00:00+05:30"
  }
}
```

---

## 20. End-to-end happy path

1. User opens **Scheduled deliveries**.
2. User clicks **Create schedule**.
3. User chooses **AI** or **Manual**.
4. User selects or describes reports across multiple products.
5. User configures schedule frequency and timing.
6. User customizes output through **Custom Report Agent**.
7. User adds recipients, subject, body, and format.
8. User previews the workflow.
9. User saves the schedule.
10. Schedule appears in **My schedules**.
11. System generates and sends report on next run.
12. User can inspect status and history later.

---

## 21. Edge cases

* No reports selected
* Invalid or empty recipient list
* Schedule conflicts with unsupported time zone logic
* Unsupported output format for selected report type
* Partial module failure during report generation
* Delivery failure due to invalid email
* AI request references unsupported module or style
* User switches between AI and Manual mid-setup
* Admin views schedules with restricted permissions

---

## 22. Acceptance criteria

### Creation

* user can create a schedule combining reports from multiple products
* user can configure daily, weekly, or monthly cadence
* user can set time and recurrence details

### Customization

* user can apply report styling through Custom Report Agent
* AI and Manual modes remain in sync

### Delivery

* user can set recipients, subject, body, and format
* system stores schedule and shows next run

### Management

* user can see schedules on Scheduled deliveries page
* admin can see team schedules
* user can edit, duplicate, pause, resume, or delete schedules

### Consistency

* feature uses standard dashboard surfaces
* feature uses standard navigation states
* feature remains usable in light and dark mode

---

## 23. Success metrics

* number of schedules created
* number of multi-product schedules created
* percentage of schedules created through AI mode
* weekly active scheduled deliveries
* reduction in manual report exports
* delivery success rate
* average recipients per schedule

---

## 24. Future roadmap

### V2

* conditional sends
* threshold-based alerting
* send only when data changes significantly
* template library
* organization-wide shared schedule templates
* schedule cloning between teams
* slide-ready executive summaries
* AI-generated narrative insights per module
* workflow approval before activation

### V3

* event-based report agents
* Slack / Teams delivery
* audience-specific report variations
* role-based visibility and schedule governance
* schedule analytics dashboard

---

## 25. Build direction for LLM / prototype tools

Build this as a standalone enterprise-ready feature called **Scheduled deliveries** with a workflow object called **Scheduled Agent**.

The experience must support:

* AI workflow creation
* Manual workflow creation
* cross-product report selection
* customization through a Custom Report Agent drawer
* recurring delivery scheduling
* dedicated management page for schedules
* admin visibility into team schedules

Do not frame this as a simple report scheduler.
Treat it as an agentic reporting automation system that combines multiple product areas into one reusable workflow.
