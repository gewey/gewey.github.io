# Viktor Agent Organization Script
# Moves agents to category folders (keeps architect, heretic, librarian, memory_scryer in root)

$ErrorActionPreference = "Continue"
cd V:\Agents

# Cloud & Azure Architecture
$cloud = @('azure-principal-architect','azure-saas-architect','arch','azure-logic-apps-expert')
foreach ($a in $cloud) { if (Test-Path "$a.agent.md") { Move-Item "$a.agent.md" "Cloud-Azure-Architecture\" -Force } }

# Infrastructure as Code
$iac = @('azure-iac-generator','azure-iac-exporter','azure-verified-modules-bicep','azure-verified-modules-terraform','bicep-implement','bicep-plan','terraform','terraform-azure-implement','terraform-azure-planning','terraform-iac-reviewer')
foreach ($a in $iac) { if (Test-Path "$a.agent.md") { Move-Item "$a.agent.md" "Infrastructure-as-Code\" -Force } }

# MCP Experts
$mcp = @('python-mcp-expert','csharp-mcp-expert','go-mcp-expert','java-mcp-expert','kotlin-mcp-expert','php-mcp-expert','ruby-mcp-expert','rust-mcp-expert','swift-mcp-expert','typescript-mcp-expert','mcp-m365-agent-expert')
foreach ($a in $mcp) { if (Test-Path "$a.agent.md") { Move-Item "$a.agent.md" "MCP-Experts\" -Force } }

# Microsoft Agent Framework
$msagent = @('microsoft-agent-framework-python','microsoft-agent-framework-dotnet','declarative-agents-architect','custom-agent-foundry')
foreach ($a in $msagent) { if (Test-Path "$a.agent.md") { Move-Item "$a.agent.md" "Microsoft-Agent-Framework\" -Force } }

# .NET & C#
$dotnet = @('CSharpExpert','expert-dotnet-software-engineer','csharp-dotnet-janitor','dotnet-upgrade','dotnet-maui','WinFormsExpert','semantic-kernel-dotnet','semantic-kernel-python')
foreach ($a in $dotnet) { if (Test-Path "$a.agent.md") { Move-Item "$a.agent.md" "DotNet-CSharp\" -Force } }

# Frontend & Web
$frontend = @('expert-react-frontend-engineer','expert-nextjs-developer','aem-frontend-specialist','accessibility','electron-angular-native','drupal-expert','laravel-expert-agent','pimcore-expert','shopify-expert')
foreach ($a in $frontend) { if (Test-Path "$a.agent.md") { Move-Item "$a.agent.md" "Frontend-Web\" -Force } }

# Database & Data
$db = @('postgresql-dba','ms-sql-dba','mongodb-performance-advisor','neo4j-docker-client-generator','neon-migration-specialist','neon-optimization-analyzer','kusto-assistant','elasticsearch-observability')
foreach ($a in $db) { if (Test-Path "$a.agent.md") { Move-Item "$a.agent.md" "Database-Data\" -Force } }

# Linux & System Admin
$linux = @('arch-linux-expert','centos-linux-expert','debian-linux-expert','fedora-linux-expert','arm-migration')
foreach ($a in $linux) { if (Test-Path "$a.agent.md") { Move-Item "$a.agent.md" "Linux-SysAdmin\" -Force } }

# Testing & QA
$testing = @('playwright-tester','tdd-red','tdd-green','tdd-refactor','diffblue-cover','gem-chrome-tester')
foreach ($a in $testing) { if (Test-Path "$a.agent.md") { Move-Item "$a.agent.md" "Testing-QA\" -Force } }

# DevOps & CI/CD
$devops = @('devops-expert','github-actions-expert','se-gitops-ci-specialist','gem-devops','octopus-deploy-release-notes-mcp')
foreach ($a in $devops) { if (Test-Path "$a.agent.md") { Move-Item "$a.agent.md" "DevOps-CICD\" -Force } }

# Code Analysis & Quality
$quality = @('cast-imaging-impact-analysis','cast-imaging-software-discovery','cast-imaging-structural-quality-advisor','gilfoyle','janitor','se-security-reviewer','se-responsible-ai-code')
foreach ($a in $quality) { if (Test-Path "$a.agent.md") { Move-Item "$a.agent.md" "Code-Analysis-Quality\" -Force } }

# Planning & Architecture (SKIP architect.agent.md - stays in root)
$planning = @('gem-planner','gem-orchestrator','planner','plan','implementation-plan','prd','context-architect','repo-architect')
foreach ($a in $planning) { if (Test-Path "$a.agent.md") { Move-Item "$a.agent.md" "Planning-Architecture\" -Force } }

# Research & Documentation
$research = @('gem-researcher','research-technical-spike','task-researcher','microsoft_learn_contributor','adr-generator','gem-documentation-writer','se-technical-writer','code-tour')
foreach ($a in $research) { if (Test-Path "$a.agent.md") { Move-Item "$a.agent.md" "Research-Documentation\" -Force } }

# Implementation & Coding
$impl = @('gem-implementer','4.1-Beast','beast-mode','gpt-5-beast-mode','rust-gpt-4.1-beast-mode','blueprint-mode','blueprint-mode-codex','expert-cpp-software-engineer','principal-software-engineer')
foreach ($a in $impl) { if (Test-Path "$a.agent.md") { Move-Item "$a.agent.md" "Implementation-Coding\" -Force } }

# Review & Testing
$review = @('gem-reviewer','address-comments','debug','se-system-architecture-reviewer')
foreach ($a in $review) { if (Test-Path "$a.agent.md") { Move-Item "$a.agent.md" "Review-Testing\" -Force } }

# Observability & Monitoring
$observe = @('comet-opik','dynatrace-expert','pagerduty-incident-responder')
foreach ($a in $observe) { if (Test-Path "$a.agent.md") { Move-Item "$a.agent.md" "Observability-Monitoring\" -Force } }

# Security & Compliance
$security = @('jfrog-sec','stackhawk-security-onboarding')
foreach ($a in $security) { if (Test-Path "$a.agent.md") { Move-Item "$a.agent.md" "Security-Compliance\" -Force } }

# Meta & Workflow
$meta = @('critical-thinking','demonstrate-understanding','devils-advocate','mentor')
foreach ($a in $meta) { if (Test-Path "$a.agent.md") { Move-Item "$a.agent.md" "Meta-Workflow\" -Force } }

# Business & Project Management
$business = @('atlassian-requirements-to-jira','amplitude-experiment-implementation','apify-integration-expert','monday-bug-fixer','launchdarkly-flag-cleanup','lingodotdev-i18n','meta-agentic-project-scaffold','simple-app-idea-generator')
foreach ($a in $business) { if (Test-Path "$a.agent.md") { Move-Item "$a.agent.md" "Business-ProjectMgmt\" -Force } }

# Specialized Development
$specialized = @('clojure-interactive-programming','openapi-to-application','api-architect','droid','wg-code-alchemist','wg-code-sentinel')
foreach ($a in $specialized) { if (Test-Path "$a.agent.md") { Move-Item "$a.agent.md" "Specialized-Development\" -Force } }

# Content & Media
$content = @('reepl-linkedin','search-ai-optimization-expert')
foreach ($a in $content) { if (Test-Path "$a.agent.md") { Move-Item "$a.agent.md" "Content-Media\" -Force } }

# Power Platform & M365
$power = @('power-platform-expert','power-platform-mcp-integration-expert','power-bi-dax-expert','power-bi-data-modeling-expert','power-bi-performance-expert','power-bi-visualization-expert','salesforce-expert')
foreach ($a in $power) { if (Test-Path "$a.agent.md") { Move-Item "$a.agent.md" "Power-Platform-M365\" -Force } }

# UX & Design
$ux = @('se-ux-ui-designer','insiders-a11y-tracker','technical-content-evaluator')
foreach ($a in $ux) { if (Test-Path "$a.agent.md") { Move-Item "$a.agent.md" "UX-Design\" -Force } }

# Specialized Tools (SKIP librarian.agent.md - stays in root)
$tools = @('context7','task-planner','specification','prompt-builder','prompt-engineer','refine-issue','tech-debt-remediation-plan','modernization','software-engineer-agent-v1','Thinking-Beast-Mode','Ultimate-Transparent-Thinking-Beast-Mode','voidbeast-gpt41enhanced','se-product-manager-advisor','hlbpa')
foreach ($a in $tools) { if (Test-Path "$a.agent.md") { Move-Item "$a.agent.md" "Specialized-Tools\" -Force } }

Write-Host "✅ Agent organization complete!"
Write-Host "Root agents preserved: architect, heretic, librarian, memory_scryer"
