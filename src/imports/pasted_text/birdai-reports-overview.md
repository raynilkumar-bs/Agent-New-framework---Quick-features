LLM BUILD PROMPT — BirdAI Reports

Design and build a Reports section for BirdAI, an AI agent platform inside Birdeye.

BirdAI allows companies to run AI agents for:

Reviews

Social media

Listings

Ticketing

Data synchronization

Scheduled reporting

Automation workflows

The system already has a Monitor page that logs agent activities such as:

review responses

social publishing

ticket routing

listing updates

automation workflows

scheduled report delivery

The Reports section must sit on top of this activity data and convert it into business outcome insights.

The goal is to show:

what the AI team accomplished

how much work was automated

how business outcomes improved

which agents are performing best

what still needs human attention

This should feel like reporting for an AI operating system, not a generic analytics dashboard.

Follow the existing Birdeye dashboard design system:

card containers with subtle borders

12px radius

no shadows

consistent spacing

dark mode support

same filter components used in Monitor

same table and chart styles used in existing reports

Navigation Placement

Add Reports to the BirdAI navigation.

Current IA:

BirdAI
├ Overview
├ Monitor
├ Product agents
├ Data & system agents
├ Scheduled agents

Add:

BirdAI
├ Overview
├ Monitor
├ Product agents
├ Data & system agents
├ Scheduled agents
└ Reports
Reports IA

Inside the Reports section create the following structure:

Reports
├ Executive Impact
├ Agent Performance
├ Product Outcomes
│   ├ Reviews
│   ├ Social
│   ├ Listings
│   ├ Ticketing
│   └ Automation
├ Workflow Performance
├ Attention & Risk
└ Adoption & Usage

Each page should reuse the standard Birdeye report layout pattern.

Standard Report Page Layout

Each report page should follow this layout:

Page
├ Header
├ KPI summary cards
├ Primary chart
├ Secondary breakdown
├ BirdAI Insight summary
└ Drill-down table
Header

Each report page header contains:

Report title
Short description
Date filter
Export button
Schedule report button

Example:

Executive Impact
How BirdAI improved your business this month

[Last 30 days ▼]   [Export]   [Schedule]
KPI Summary Cards

Use 4-5 cards at the top.

Example:

Tasks automated
4,812

Human hours saved
96h

Automation rate
72%

Agent success rate
95%

Customer interactions handled
8,420

Cards should use the standard container surface:

border: 1px subtle
radius: 12px
no shadow
padding: 20px
1 Executive Impact Report

Purpose: show overall AI team value.

Metrics:

tasks automated

hours saved

automation rate

agent success rate

customer interactions handled

response time improvement

Example:

Executive Impact — Last 30 days

Tasks automated: 4,812
Human hours saved: 96h
Automation rate: 72%
Agent success rate: 95%
Customer interactions handled: 8,420

Charts:

automation trend

AI vs human workload split

top performing agents

Add a BirdAI Insight block:

Example:

BirdAI Insight

Your AI team handled 72% of repetitive customer interactions this month.
Review response and ticketing agents generated the highest time savings.
2 Agent Performance Report

Purpose: show how each agent is performing.

Metrics:

success rate

completion volume

failure rate

review required rate

average completion time

Example table:

Agent                    Success   Volume   Failures   Avg Time
Review response          96%       1,240    3%         12s
Social publishing        92%       640      5%         10s
Listing optimization     97%       320      2%         8s
Ticketing agent          94%       890      4%         14s

Charts:

actions completed by agent

success rate trends

3 Product Outcomes Report

Break outcomes by product area.

Sections:

Reviews
Social
Listings
Ticketing
Automation

Example — Reviews:

Reviews Outcome

Reviews responded by AI: 89%
Average response time: 1.2 minutes
Negative review recovery: +12%
Reviews generated: 312

Example — Social:

Social Outcome

Posts published by AI: 64
Engagement generated: 8,420
Comments responded: 312
Follower growth: +6.2%

Example — Listings:

Listings Outcome

Listings updated: 142
Profile views: +18%
Customer actions: +9%
Data accuracy: 98%
4 Workflow Performance Report

Purpose: measure automation workflows.

Metrics:

Active workflows
Scheduled reports delivered
Workflow success rate
Average execution time
Failures
Retries

Example:

Workflow Performance

Active workflows: 14
Scheduled reports delivered: 128
Workflow success rate: 94%
Average execution time: 3.4s

Charts:

workflow runs over time

success vs failures

5 Attention & Risk Report

Purpose: highlight supervision needs.

Metrics:

Requires review
Failed actions
Paused agents
Low confidence outputs
Integration issues

Example:

Attention & Risk

Requires review: 23
Failed actions: 7
Paused agents: 2
Low confidence outputs: 12

Include drill-down list linking to Monitor page filters.

6 Adoption & Usage Report

Purpose: show platform adoption.

Metrics:

Active agents
Templates enabled
Workflows created
Scheduled reports active
AI-assisted actions vs manual actions

Example:

Adoption & Usage

Active agents: 9
Templates enabled: 6
Workflows created: 14
Scheduled reports: 4
AI automation coverage: 58%
BirdAI Insight Blocks

Each report page should include a short AI summary.

Example:

BirdAI Insight

Social publishing performed best on Tuesday and Thursday posts.
Review response automation reduced response time by 64%.

These insights should summarize business meaning, not raw data.

Relationship with Monitor

Define clear separation:

Monitor → real-time activity
Reports → historical performance and outcomes

Monitor answers:

What did the agents do today?

Reports answer:

How much value did BirdAI deliver over time?
Functional Requirements

FR1
Add a Reports section inside BirdAI navigation.

FR2
Support report categories:

Executive Impact

Agent Performance

Product Outcomes

Workflow Performance

Attention & Risk

Adoption & Usage

FR3
Each report page must include:

header

date filter

KPI cards

chart

breakdown table

BirdAI Insight block

FR4
Reports must support:

export
schedule
share

FR5
Report drill-downs should link to:

agent pages
monitor activity
workflow logs
Design Guidelines

Use the same design tokens as the rest of BirdAI.

Card container:

border: 1px subtle
radius: 12px
padding: 20px
no shadow

Spacing between sections:

16px–24px

Charts and tables must reuse existing Birdeye reporting components.