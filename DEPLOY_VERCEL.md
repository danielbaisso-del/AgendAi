# Deploy no Vercel (teste)

1. Confirme que o arquivo `vercel.json` está na raiz do projeto (já incluído).
2. Faça push do repositório para o GitHub ou GitLab e conecte-o no painel do Vercel.
   - Build command: `npm run build` (ou `npm run vercel-build`)
   - Output directory: `dist`
3. Alternativamente, use o CLI do Vercel para um deploy rápido:

```bash
npm i -g vercel
vercel --prod
```

4. Para testar sem produção, rode `vercel` sem `--prod` e siga as instruções.

Obs: o build já foi verificado localmente e gera a pasta `dist`.
