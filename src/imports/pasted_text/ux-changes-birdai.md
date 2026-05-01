


Core UX Change

Do not show items like:

3 activities require review

2 failed actions

as KPI cards in the top metrics row.

Those are not metrics.
They are actionable alerts.

Move them into a notification system using a bell icon in the top-right area near search and filters.

So the monitor is split into:

Metrics = passive operational stats

Notifications = urgent attention items

Activity feed = historical and live agent activity

Inspection panel = detailed view of one activity

Bell icon example:
[🔔 5]
The bell count should represent unresolved alerts only.

Operational Metrics Row

Keep only real metrics here.

Use 4 cards similar to the current style.

Recommended metrics:

Agent actions today

Successful actions

Automation rate

Average response time

Do not use:

requires review

failed actions

inside this KPI strip.

Those belong in notifications.

Notification System

Add a notification bell in the header.

Clicking the bell opens a right-side dropdown or floating panel.

Notification panel title:
Notifications

Notification categories:

Requires review

Failed actions

Agent alerts

Each notification item should include:

agent name

event summary

timestamp

status icon

quick action

Example notification items:

Review Response Agent
Drafted response requires approval
10:08 AM
[Review]

Social Publishing Agent
Post failed due to token expiration
10:15 AM
[Fix connection]

Ticketing Agent
Escalation suggested due to low confidence
10:34 AM
[Inspect]

Only warning and critical notifications should count toward the bell badge.

Notification states:

unread

read

resolved

Resolved notifications should disappear from the active count.

Relationship Between Notifications and Monitor

Use this behavioral model:

Notifications = what needs attention
Monitor = what agents did

When a user clicks a notification:

open the Monitor page if not already open

scroll or focus the related activity

open the inspection panel for that activity


Rename product name as BirdAI

