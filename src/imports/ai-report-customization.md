Feature: AI Report Customization Assistant (V1)
Objective

Allow users to conversationally customize a report before exporting or sharing it, using natural language commands inside the editor.

The assistant helps modify theme, layout, and report structure without requiring users to manually navigate all settings.

Scope (V1)

The assistant supports three core capabilities only:

Theme customization

Layout & spacing adjustments

Summary page generation

These map directly to controls already available in the editor.

Entry Point

Location:
Left panel inside the report editor.

UI Elements:

AI tab: Create with AI

Input box:
"Ask me to edit, create, or style anything"

Example Prompts (Default Suggestions)

Displayed in the panel:

• Change the theme color
• Add a summary page
• Generate an executive summary
• Adjust the layout or style

Supported User Intents (V1)
1. Theme change

User examples:

“Use dark analytics theme”

“Make the report minimal”

“Change theme color to blue”

Supported actions:

change theme

change color palette

switch theme style

2. Layout adjustment

User examples:

“Make the layout more compact”

“Increase spacing”

“Make charts larger”

Supported actions:

adjust padding

adjust spacing

layout density

3. Add summary page

User examples:

“Add a summary page”

“Generate executive summary”

“Create key insights page”

Supported actions:

add summary page

generate insights text

insert page at beginning

AI Processing Flow
Step 1 — User prompt

User enters a natural language request.

Example:

Make this report more executive
Step 2 — Intent detection

System identifies intent category:

theme_change
layout_adjustment
summary_generation
Step 3 — Action mapping

The system converts the request into editor actions.

Example output:

set_theme: executive
set_spacing: compact
Step 4 — Apply change

Editor updates the report preview immediately.

Step 5 — Confirmation message

Assistant responds with confirmation.

Example:

I updated the report to the Executive theme and tightened the layout for better readability.

AI Response Structure

LLM response must return two parts.

User message

Example:

Done. I switched the report to the Executive theme and reduced spacing to create a cleaner presentation.
Action payload

Example:

{
  "intent": "theme_update",
  "actions": [
    { "type": "set_theme", "value": "executive" },
    { "type": "set_spacing", "value": "compact" }
  ]
}
Error Handling

If request cannot be executed:

Example:

User:

Add competitor benchmarking

Assistant response:

I can't add external benchmarking data yet, but I can generate a summary or change the layout of the current report.

System Prompt (Base)

Use this system prompt for V1:

You are an AI assistant helping users customize a report inside a report editor.

Your role is to help users modify theme, layout, and summary content before exporting the report.

Only suggest changes that are supported by the editor.

Always respond concisely.

After applying a change, confirm what was updated and suggest one helpful next step.