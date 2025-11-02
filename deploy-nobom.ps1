[CmdletBinding()]
param(
  [switch]$SkipCleanup,
  [switch]$SkipInstall,
  [switch]$SkipPrisma
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Write-Heading {
  param(
    [string]$Message,
    [ConsoleColor]$Color = [ConsoleColor]::Cyan
  )
  Write-Host "`n╔" -ForegroundColor $Color -NoNewline
  Write-Host ("".PadRight(58, "═")) -ForegroundColor $Color -NoNewline
  Write-Host "╗" -ForegroundColor $Color
  Write-Host ("║  $Message".PadRight(59) + "║") -ForegroundColor $Color
  Write-Host "╚" -ForegroundColor $Color -NoNewline
  Write-Host ("".PadRight(58, "═")) -ForegroundColor $Color -NoNewline
  Write-Host "╝" -ForegroundColor $Color
}

function Convert-ToUtf8NoBom {
  param([string]$Path)

  if (-not (Test-Path $Path)) {
    return
  }

  $content = Get-Content -LiteralPath $Path -Raw -Encoding UTF8
  [System.IO.File]::WriteAllText((Resolve-Path $Path), $content, (New-Object System.Text.UTF8Encoding $false))
}

function Invoke-Step {
  param(
    [string]$Label,
    [ScriptBlock]$Action
  )

  Write-Host "[`$($script:stepIndex)/5] $Label..." -ForegroundColor Yellow
  try {
    & $Action
    Write-Host "✓ $Label" -ForegroundColor Green
  }
  catch {
    Write-Host "✗ $Label" -ForegroundColor Red
    throw
  }

  $script:stepIndex++
}

function Remove-State {
  $targets = @('node_modules', 'package-lock.json', '.next')
  foreach ($target in $targets) {
    if (Test-Path $target) {
      Remove-Item $target -Recurse -Force -ErrorAction SilentlyContinue
      Write-Host "  • Removed $target" -ForegroundColor DarkGray
    }
  }
}

Write-Heading -Message 'Deploy Pipeline: Next.js SSR + Neon PostgreSQL'

$script:stepIndex = 1

if (-not $SkipCleanup) {
  Invoke-Step -Label 'Limpando estado' -Action { Remove-State }
} else {
  $script:stepIndex++
}

Invoke-Step -Label 'Normalizando encoding UTF-8 (sem BOM)' -Action {
  $files = @(
    'package.json',
    'netlify.toml',
    'next.config.mjs',
    'next.config.ts',
    '.env.example',
    'prisma/schema.prisma',
    'src/lib/db.ts',
    'src/app/api/health/route.ts'
  )

  foreach ($file in $files) {
    if (Test-Path $file) {
      Convert-ToUtf8NoBom -Path $file
      Write-Host "  • $file" -ForegroundColor DarkGray
    }
  }
}

if (-not $SkipInstall) {
  Invoke-Step -Label 'Instalando dependências' -Action {
    npm install --no-fund --no-audit | Write-Host
  }
} else {
  $script:stepIndex++
}

Invoke-Step -Label 'Sincronizando arquivos de ambiente' -Action {
  if (-not (Test-Path '.env.local') -and (Test-Path '.env.example')) {
    Copy-Item '.env.example' '.env.local'
    Write-Host '  • .env.local criado a partir de .env.example' -ForegroundColor DarkGray
  }
  Write-Host '  • Atualize DATABASE_URL e DIRECT_URL com as credenciais Neon antes do deploy.' -ForegroundColor DarkGray
}

if (-not $SkipPrisma) {
  Invoke-Step -Label 'Gerando Prisma Client' -Action {
    npx prisma generate | Write-Host
  }

  Invoke-Step -Label 'Aplicando schema ao banco' -Action {
    npx prisma db push | Write-Host
  }
} else {
  $script:stepIndex += 2
}

Write-Heading -Message 'Próximos passos'
Write-Host 'LOCAL DEVELOPMENT:' -ForegroundColor Green
Write-Host '  → npm run dev' -ForegroundColor Green
Write-Host '  → http://localhost:3000/api/health' -ForegroundColor Green
Write-Host "`nDATABASE:" -ForegroundColor Green
Write-Host '  → npm run db:studio' -ForegroundColor Green
Write-Host '  → http://localhost:5555' -ForegroundColor Green
Write-Host "`nDEPLOY:" -ForegroundColor Green
Write-Host '  → git add . ; git commit -m "feat: deploy pipeline"' -ForegroundColor Green
Write-Host '  → git push origin work' -ForegroundColor Green
