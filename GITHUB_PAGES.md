# Публикация на GitHub Pages

## Сборка локально

Требуется Node.js 22 или новее.

```bash
npm ci
npm run build
npm run preview
```

Vite создаёт готовый сайт в `dist/`. Проект использует `vite-plugin-singlefile`: HTML, CSS, JavaScript и импортированные локальные изображения встраиваются в итоговый `dist/index.html`.

## Публикация через GitHub Actions

1. Отправьте исходники в ветку `main`.
2. В репозитории откройте **Settings → Pages**.
3. В поле **Build and deployment → Source** выберите **GitHub Actions**.
4. Откройте вкладку **Actions** и дождитесь успешного выполнения `Deploy to GitHub Pages`.

Workflow `.github/workflows/deploy.yml` при каждом push в `main` устанавливает зависимости через `npm ci`, выполняет `npm run build` и публикует содержимое `dist/`.

## Изображения

Оригинальные фотографии находятся в `src/assets/images/` и импортируются из TypeScript-файлов. Не переименовывайте их без одновременного обновления импортов. Не загружайте `node_modules/` и `dist/` в Git: GitHub Actions собирает `dist/` заново.

В `vite.config.ts` используется `base: "./"`, поэтому относительные пути работают и на GitHub Pages в подпапке репозитория.
