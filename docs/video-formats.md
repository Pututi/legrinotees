# Formatos de Video Recomendados para Web

Para usar videos en tu sitio web de Legrino Tees, aquí están los formatos recomendados y mejores prácticas:

## Formatos Recomendados

1. **MP4 (H.264)** - El formato más compatible para la web
   - Excelente compatibilidad con navegadores
   - Buena relación calidad/tamaño
   - Recomendado como formato principal

2. **WebM (VP9)** - Mejor compresión, pero menos compatible
   - Mejor calidad a tamaños más pequeños
   - No es compatible con Safari
   - Ideal como formato secundario

3. **AV1** - El formato más nuevo y eficiente
   - Excelente compresión
   - Compatibilidad limitada con navegadores más antiguos
   - Ideal para el futuro

## Estructura de Carpetas

Para organizar tus videos, recomendamos crear una carpeta `public/videos/` en la raíz de tu proyecto:

\`\`\`
legrino_tees/
├── public/
│   ├── videos/
│   │   ├── legrino-men.mp4
│   │   ├── legrino-men.webm
│   │   └── ...
\`\`\`

## Ejemplo de Implementación con Múltiples Formatos

\`\`\`jsx
<video autoPlay muted loop playsInline>
  <source src="/videos/legrino-men.webm" type="video/webm" />
  <source src="/videos/legrino-men.mp4" type="video/mp4" />
  Tu navegador no soporta el elemento de video.
</video>
\`\`\`

## Optimización de Videos

1. **Duración**: Mantén los videos cortos (5-15 segundos) para bucles
2. **Resolución**: 720p es suficiente para la mayoría de los casos
3. **Bitrate**: 1-2 Mbps para 720p, 2-4 Mbps para 1080p
4. **Compresión**: Usa herramientas como FFmpeg o servicios en línea

## Herramientas Recomendadas

- **FFmpeg**: Para conversión y compresión de videos
- **Handbrake**: Interfaz gráfica para compresión de videos
- **Cloudinary**: Servicio en la nube para optimización y entrega de videos

## Convertir GIF a Video

Los GIFs suelen ser mucho más pesados que los videos. Para convertir un GIF a video MP4:

\`\`\`bash
ffmpeg -i input.gif -b:v 0 -crf 25 -f mp4 -vcodec libx264 -pix_fmt yuv420p output.mp4
\`\`\`

## Consideraciones de Accesibilidad

- Siempre incluye los atributos `controls` cuando el video sea importante para el contenido
- Proporciona subtítulos cuando sea necesario
- Asegúrate de que los videos no reproduzcan audio automáticamente sin el atributo `muted`
\`\`\`

Ahora, vamos a crear un archivo de ejemplo para mostrar cómo convertir un GIF a video MP4 usando FFmpeg:
