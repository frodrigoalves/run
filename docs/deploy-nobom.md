# Pipeline de Deploy sem BOM

Este guia descreve como concluir o setup do projeto Next.js + Prisma + Neon evitando o erro `Unexpected token "\uFEFF"` causado por arquivos JSON/TS gerados com **UTF-8 com BOM**.

## 1. Pré-requisitos

- Node.js 20
- npm
- Git
- Acesso ao painel da Neon para copiar a connection string (modo pooled)

## 2. Execução do script `deploy-nobom.ps1`

1. Abra o **PowerShell** no diretório do projeto.
2. Execute:

   ```powershell
   ./deploy-nobom.ps1
   ```

   Parâmetros opcionais:

   - `-SkipCleanup` mantém `node_modules`, `.next` e o `package-lock.json` existentes.
   - `-SkipInstall` pula o `npm install`.
   - `-SkipPrisma` evita `prisma generate` e `prisma db push`.

3. O script converte os arquivos críticos (`package.json`, `netlify.toml`, `next.config.*`, `.env.example`, `prisma/schema.prisma`, `src/lib/db.ts`, `src/app/api/health/route.ts`) para **UTF-8 sem BOM** usando `System.Text.UTF8Encoding($false)`.
4. Se `.env.local` não existir, ele é criado a partir de `.env.example`.
5. Durante a execução você verá um resumo das etapas e, ao final, as instruções para desenvolvimento local e deploy.

## 3. Configurar variáveis de ambiente

Edite `.env.local` preenchendo `DATABASE_URL` e `DIRECT_URL` com as credenciais do projeto Neon (`noisy-math-95750667`).

## 4. Validar Prisma + Banco

Após atualizar o `.env.local`, rode novamente:

```powershell
npx prisma generate
npx prisma db push
```

> Use `-SkipPrisma` no script se quiser realizar esses comandos manualmente.

## 5. Executar localmente

```powershell
npm run dev
```

Verifique:

- Aplicação: http://localhost:3000
- Healthcheck: http://localhost:3000/api/health

## 6. Deploy

```powershell
git add .
git commit -m "feat: deploy pipeline"
git push origin work
```

Em seguida faça o deploy no Netlify. A rota `/api/health` deve responder com `status: "healthy"`.

---

Seguindo este fluxo, os arquivos permanecem compatíveis com o parser JSON do Node.js, prevenindo o erro `\uFEFF` e permitindo concluir o setup end-to-end.
